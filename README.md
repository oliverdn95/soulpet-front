# SoulPet - Projeto DevOps 3 - Front-End

[SoulPet - Projeto DevOps 3 - Back-End](https://github.com/oliverdn95/soulpet-back)


## Integrantes:

- **Ana Schwaab** - [Github](https://github.com/anaschwaab), [LinkedIn](https://www.linkedin.com/in/ana-schwaab/)
- **Bruna Faria de Souza** - [Github](https://github.com/Brunafariia), [LinkedIn](https://www.linkedin.com/in/bruna-faria-de-souza-7b31a019b/)
- **Danilo Araújo de Oliveira** - [Github](https://github.com/oliverdn95), [LinkedIn](https://www.linkedin.com/in/oliverdn95/)
- **Luis Guedes** - [Github](https://github.com/luisgued3s), [LinkedIn](https://www.linkedin.com/in/guedes-luis/)
- **Nilson Mazurchi** - [Github](https://github.com/nilsonmazurchi), [LinkedIn](https://www.linkedin.com/in/nilson-mazurchi/)

## Lista de conteúdos:
- [SoulPet Front-end](#soulpet---projeto-devops-3---front-end)
- [Integrandes do projeto](#integrantes)
- [O que é o SoulPet API](#o-que-é-o-soulpet-api)
- [O que consigo fazer com o SoulPet API?](#o-que-consigo-fazer-com-o-soulpet-api)
- [Tecnologias usadas](#tecnologias-usadas)
- [Melhorias em desenvolvimento](#melhorias-que-estão-em-desenvolvimento)
- [Para rodar o projeto](#para-rodar-o-projeto)
  1. [Baixar MySQL, git e Node.js.](#para-rodar-o-projeto)
  2. [Fazer `git clone` do repositório.](#para-rodar-o-projeto)
  3. [Instalar dependências do projeto.](#para-rodar-o-projeto)
- [Funcionalidades da API](#funcionalidades-da-api)
  7. [Home](#home)
  2. [Agendamentos](#agendamentos)
  3. [Clientes](#clientes)
  4. [Pedidos](#pedidos)
  5. [Pets](#pets)
  6. [Produtos](#produtos)
  7. [Servicos](#servicos)
- [Agradecimentos Especiais](#soulcode-academy---bootcamp-react-nodejs)

## O que é o SoulPet API?
É uma API para você utilizar para gerenciar seu Pet Shop, e o Soul, vem de SoulCode Academy.

## O que consigo fazer com o SoulPet API?
É uma interface gráfica para gerenciar um Pet Shop, com ele é possível:
- gerenciar clientes.
- gerenciar pets.
- gerenciar pedido.
- gerenciar pets.
- gerenciar produtos.
- gerenciar servicos.

### Tecnologias usadas:
Um projeto feito com uso de `Axios`, `Bootstrap`, `Bootstrap-icons`, `React`, `React-Bootstrap`, `React-Dom`, `React-Hook-Form`, `React-Hot-Toast`, `React-Router-Dom`, `React-Scripts`, `Web-Vitals`.

### Melhorias que estão em desenvolvimento:
  Nenhuma melhoria prevista por enquanto.
  <!-- TODO -->


## Para rodar o projeto
1. É necessário que tenha o [MySQL Workbench](https://www.mysql.com/products/workbench/), [git](https://git-scm.com/book/pt-br/v2/Come%C3%A7ando-Instalando-o-Git) e o [Node.Js](https://nodejs.org/en/download) instalados.

2. É necessário fazer o clone do repositório para sua máquina 
- ```git clone https://github.com/oliverdn95/soulpet-back.git```

3. Instalar as dependências do projeto: 
- dentro da pasta raiz do projeto executar o comando: ```npm install```


## Funcionalidades da API

- ### Home
    Dashboard interativa com contador de total de clientes, pets, produtos, serviços e agendamentos, cadastrados no banco de dados.

    É possível pesquisar pelo nome do Cliente, e puxando pelo nome dele é possível ver os pets, pedidos e agendamentos feitos pelo cliente.

- ### Agendamentos
    Na tela de agendamentos é possível ver a data agendado para o atendimento e se esse atendimento está pendente ou não, é possível também editar e excluir dados desse agendamento.

- ### Clientes
    Na tela de Clientes é possível ver a lista de Clientes, emails, telefones e nas ações é possível excluir um cliente, editar, ver os pets do cliente e ver os dados do endereço dele.
    É possível adicionar clicando no botão `+ Clientes`.

- ### Pedidos
    Na tela de Pedidos é possivel ver uma ordenação de pedidos, com os Nomes dos produtos, Datas de compra, Clientes Comprador e nas ações podemos ver detalhes  do pedido, editar o pedido e até mesmo excluir ele.
    É possível adicionar clicando no botão `+ Pedidos`.

- ### Pets
    Na tela de Pets é possível ver o nome dos pets, excluir, editar e ver mais informações do pet.
    É possível adicionar clicando no botão `+ Pets`.

- ### Produtos
    Na tela produtos é possível ver o nome dos produtos, descrição, preço, desconto, validade do descontoe a categoria, é possível fazer filtragem por nome e categoria e editar/excluir individualmente cada produto.
    É possível adicionar clicando no botão `+ Pets`.

- ### Servicos
    Na tela de Serviços é listado todos os serviços cadastradados e seus respectivos preços, editar e excluir individualmente cada um deles.
    É possível adicionar clicando no botão `+ Pets`.


## SoulCode Academy - Bootcamp React Node.js
Agradecimento especial para os Professores:

- Gabriel Braga  - [Github](https://github.com/gabriel-soulcode), [LinkedIn](https://www.linkedin.com/in/f-gabriel-braga/)
- Jose Almir  - [Github](https://github.com/jose-almir), [LinkedIn](https://www.linkedin.com/in/jose-almir/)

