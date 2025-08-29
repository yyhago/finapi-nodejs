const { v4: uuid } = require('uuid');
const { Router } = require('express');
const router = Router();

const databaseTemporario = [];

router.post('/', (request, response) => {
    const {nome, cpf} = request.body;

    databaseTemporario.push({
        id: uuid(),
        nome,
        cpf,
        extrato: []
    })
    return response.json({ message: "Enviado para o banco de dados com sucesso!"})
})

module.exports = router