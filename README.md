# FinApi - Sistema Financeiro 💰

Uma API REST para gerenciamento de contas bancárias digitais, desenvolvida para simular operações básicas de uma instituição financeira.

## 📋 Descrição

O FinApi é um sistema backend que simula as principais funcionalidades de um banco digital, permitindo criar contas, realizar depósitos e saques, consultar extratos e gerenciar informações dos clientes. O projeto foi desenvolvido com foco em boas práticas de desenvolvimento e validação de regras de negócio.

## ✨ Funcionalidades

### Operações Implementadas
- ✅ Criar uma conta bancária
- ✅ Buscar extrato bancário do cliente
- ✅ Realizar depósitos
- ✅ Realizar saques
- ✅ Buscar extrato por período específico
- ✅ Atualizar dados da conta
- ✅ Obter informações da conta
- ✅ Deletar uma conta
- ✅ Consultar saldo atual

## 🔐 Regras de Negócio

O sistema implementa as seguintes validações de segurança:

- ✅ Não permite cadastro de contas com CPF duplicado
- ✅ Impede consulta de extrato em contas inexistentes
- ✅ Bloqueia depósitos em contas que não existem
- ✅ Não permite saques em contas inexistentes
- ✅ Impede saques com saldo insuficiente
- ✅ Não permite exclusão de contas inexistentes

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **JavaScript** - Linguagem de programação

## 📦 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/yyhago/finapi-nodejs.git
cd finapi
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto:
```bash
npm start
```


## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request
