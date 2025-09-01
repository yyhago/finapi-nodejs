const { v4: uuid } = require('uuid');
const { Router } = require('express');
const router = Router();

const databaseTemporario = [];

// Criar conta bancária
router.post('/criarConta', (request, response) => {
    const {nome, cpf} = request.body;

    databaseTemporario.push({
        id: uuid(),
        nome,
        cpf,
        extrato: []
    })
    return response.json({ message: "Conta Criada com sucesso!"})
})


// Realizar depósito bancário!
router.post('/:cpf/:saldoDeposito', (request, response) => {
    const { cpf, saldoDeposito } = request.params
    const dadosConta = databaseTemporario.find(databaseTemporario => databaseTemporario.cpf === cpf)

    if(!dadosConta){
        return response.status(401).json({message: "Conta não encontrada"})
    }

    dadosConta.extrato.push({
        tipo: "deposito",
        valor: Number(saldoDeposito),
        data: new Date()
    })

    return response.json({message: `Depósito realizado com sucesso!`})
})


// Consultar extrato bancário
router.get('/:cpf', (request, response) => {
    const {cpf} = request.params;
    const dadosConta = databaseTemporario.find(databaseTemporario => databaseTemporario.cpf === cpf);

    if(!dadosConta){
        return response.status(401).json({message : "Conta não encontrada"});
    }
    return response.json({dadosConta});
})

module.exports = router