const { v4: uuid } = require('uuid');
const { Router } = require('express');
const router = Router();

const databaseTemporario = [];

function middlewareCPF(request, response, next){
    const { cpf } = request.params;
    const dadosConta = databaseTemporario.find(db => db.cpf === String(cpf));
    
    if(!dadosConta){
        return response.status(401).json({message : "Conta não encontrada!"});
    }
    
    request.dadosConta = dadosConta;
    return next();
}

function diferencaPagamentos(dadosConta){
    return dadosConta.extrato.reduce((acc, operacao) => {
        if(operacao.tipo === 'credito'){
            return acc + Number(operacao.valor);
        } else {
            return acc - Number(operacao.valor);
        }
    }, 0);
}

// Criar uma nova conta bancária
router.post('/criarConta', (request, response) => {
    const {nome, cpf} = request.body;
    
    const dadosConta = databaseTemporario.find(db => db.cpf === String(cpf));
    if(dadosConta){
        return response.json({ message: "Usuário já existente!"})
    }
    
    databaseTemporario.push({
        id: uuid(),
        nome: String(nome),
        cpf: String(cpf),
        extrato: []
    });
    return response.json({ message: "Conta Criada com sucesso!"});
});

// Consultar extrato completo da conta
router.get('/:cpf', middlewareCPF, (request, response) => {
    const {dadosConta} = request;
    return response.json({dadosConta});
});

// Consultar extrato filtrado por uma data específica
router.get('/:cpf/buscarData', middlewareCPF, (request, response) => {
    const { dadosConta } = request;
    const { data } = request.query;

    if (!data) {
        return response.status(400).json({ message: "Data não informada!" });
    }

    const formatoData = new Date(data + " 00:00");

    const extratoFiltrado = dadosConta.extrato.filter((operacao) => {
        return new Date(operacao.data).toDateString() === formatoData.toDateString();
    });

    return response.json(extratoFiltrado);
});

// Atualizar informações da conta
router.put('/:cpf/atualizarConta', middlewareCPF, (request, response) => {
    const {dadosConta} = request;
    const {nome} = request.body;

    if (!nome) {
        return response.status(400).json({ message: "Nome não informado!" });
    }

    dadosConta.nome = nome;

    return response.status(200).json({ message: "Conta atualizada com sucesso!", dadosConta });
});

// Realizar saque em uma conta
router.post('/:cpf/realizarsaque', middlewareCPF, (request, response) => {
    const { valor } = request.body;
    const { dadosConta } = request;
    
    const saldoAtual = diferencaPagamentos(dadosConta);
    
    if (saldoAtual < valor) {
        return response.status(400).json({ message: "Saldo insuficiente" });
    }
    
    dadosConta.extrato.push({
        tipo: "debito", 
        valor: Number(valor),
        data: new Date()
    });
    
    return response.status(201).json({ message: "Saque realizado com sucesso!" });
});

// Realizar depósito em uma conta
router.post('/:cpf/deposito', middlewareCPF, (request, response) => {
    const { valor } = request.body;
    const { dadosConta } = request;
    
    if (!valor || isNaN(valor)) {
        return response.status(400).json({ message: "Valor inválido para depósito!" });
    }

    dadosConta.extrato.push({
        tipo: "credito", 
        valor: Number(valor),
        data: new Date()
    });
    
    return response.json({message: `Depósito de R$${valor} realizado com sucesso!`});
});

// Deletar uma conta bancária
router.delete('/:cpf/deletarConta', middlewareCPF, (request, response) => {
    const {cpf} = request.params;
    const indexDatabase = databaseTemporario.findIndex(db => db.cpf === cpf);

    if(indexDatabase === -1){
        return response.status(400).json({message: "Conta bancária não encontrada"});
    }
    
    databaseTemporario.splice(indexDatabase, 1);
    return response.status(200).json({ message: "Conta bancária deletada com sucesso"});
})

module.exports = router;
