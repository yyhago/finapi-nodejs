const { v4: uuid } = require('uuid');
const { Router } = require('express');
const router = Router();

const databaseTemporario = [];



function middlewareCPF(request, response, next){
    const {cpf} = request.params;
    const dadosConta = databaseTemporario.find(databaseTemporario => databaseTemporario.cpf === cpf);

    if(!dadosConta){
        return response.status(401).json({message : "Conta não encontrada!"});
    }

    request.dadosConta = dadosConta;
    return next()
}

function diferencaPagamentos(dadosConta){
    return dadosConta.extrato.reduce((acc, operacao) => {
        if(operacao.tipo === 'credito'){
            return acc + operacao.valor;
        } else {
            return acc - operacao.valor;
        }
    }, 0);
}




// Criar conta bancária
router.post('/criarConta', (request, response) => {
    const {nome, cpf} = request.body;

    const dadosConta = databaseTemporario.find(databaseTemporario => databaseTemporario.cpf === cpf)
    if(dadosConta){
        return response.json({ message: "Usuário já existente!"})
    }

    databaseTemporario.push({
        id: uuid(),
        nome,
        cpf,
        extrato: []
    })
    return response.json({ message: "Conta Criada com sucesso!"})
})


// Realizar depósito bancário!
router.post('/:cpf/:realizardeposito', middlewareCPF, (request, response) => {
    const { saldoDeposito } = request.params;
    const { dadosConta } = request;

    dadosConta.extrato.push({
        tipo: "credito",
        valor: Number(saldoDeposito),
        data: new Date()
    })

    return response.json({message: `Depósito realizado com sucesso!`})
})


//Realizar saque bancário
router.post('/realizarsaque/:cpf', middlewareCPF, (request, response) => {
    const { valor } = request.body;
    const { dadosConta } = request;

    const saldoAtual = diferencaPagamentos(dadosConta);

    if(saldoAtual < valor){
        return response.status(400).json({ message: "Saldo insuficiente" });
    }

    dadosConta.extrato.push({
        tipo: "debito",
        valor: Number(valor),
        data: new Date()
    });

    return response.status(201).json({ message: "Saque realizado com sucesso!" });
});


// Consultar extrato bancário
router.get('/:cpf', middlewareCPF, (request, response) => {
    const {dadosConta} = request
    return response.json({dadosConta});
})

module.exports = router