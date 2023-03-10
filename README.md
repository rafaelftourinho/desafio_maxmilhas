# Boas-vindas ao meu repositório para o desafio da MaxMilhas

<p>
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/rafaelftourinho/desafio_maxmilhas?color=6E40C9&style=flat-square">
  <img alt="GitHub Top Language" src="https://img.shields.io/github/languages/top/rafaelftourinho/desafio_maxmilhas?color=6E40C9&style=flat-square">
  <a href="https://github.com/rafaelftourinho/desafio_maxmilhas/commits/main">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/rafaelftourinho/desafio_maxmilhas?color=6E40C9&style=flat-square">
  </a>
</p>
<hr>

## Tópicos 

[Tecnologias utilizadas](#tecnologias-utilizadas)

[Sobre o projeto](#sobre-o-projeto)

[Descrição da API](#descrição-da-api)

[Pré-Requisitos](#pré-requisitos)

[Instalação e uso](#instalação-e-uso)

<br>
<hr>

## Tecnologias utilizadas
- <strong>Linguagens de programação: [NodeJs](https://nodejs.org/en/), [TypeScript](https://www.typescriptlang.org/);
- Banco de dados: [MySQL](https://www.mysql.com/);
- Arquiteturas: [DDD](), [Arquitetura Hexagonal]();
- Princípios: [SOLID](), [Clean Code]();
- Organização e padrão: [ESLint]();
- Ferramentas DevOps: [Docker](), [Git]();
- Segurança: [Helmet](https://www.npmjs.com/package/helmet);
- Testes: [Jest](https://jestjs.io/), [Mocha](https://mochajs.org/), [Sinon](https://sinonjs.org/releases/latest/mocks/), [Chai](https://www.chaijs.com/).
</strong>
<hr>

## Sobre o projeto

Este projeto é uma aplicação web desenvolvida utilizando as linguagens de programação <strong>NodeJs e TypeScript</strong>, que seguem os princípios do <strong>SOLID e Clean Code</strong>. A arquitetura segue o padrão <strong>DDD e Arquitetura Hexagonal</strong>, o que garante a escalabilidade e manutenibilidade do código. <br>
O banco de dados utilizado é o <strong>MySQL</strong> e para garantir a organização e padrão do código, está sendo utilizado o <strong>ESLint</strong>. <br>
As ferramentas DevOps são <strong>Docker e Git</strong>, que garantem a automatização do processo de deploy e gerenciamento de versões. <br>
Para garantir a segurança da aplicação, está sendo utilizado o <strong>Helmet</strong>. <br>
Por fim, para garantir a qualidade do código, estão sendo realizados testes com as ferramentas <Strong>Jest, Mocha, Sinon e Chai</strong>.
<hr>

## Descrição da API
  A seguir, a descrição básica da API para orientar a integração por outros times:

  <details open>

    baseUrl = http://localhost:3001

    Adicionar um CPF na lista restrita
        Método HTTP: POST
        URL: baseUrl/cpf
        Dados enviados: { "cpf": "64852893055" }
        Erro: retorna uma exceção do tipo "InvalidCpfException" ou "ExistsCpfException" 

    Verificar um CPF na lista restrita
        Método HTTP: GET
        URL: baseUrl/cpf/{cpf}
        Sucesso: retorna o CPF e a data de criação no formato ISO 8601 - UTC 
        ex: { "cpf": "64852893055", createdAt: "2019-12-
        17T22:22:08.547Z"}
        Erro: retorna uma exceção do tipo "NotFoundCpfException" ou "InvalidCpfException"

    Remover um CPF da lista restrita
        Método HTTP: DELETE
        URL: baseUrl/cpf/{cpf}
        Erro: retorna uma exceção do tipo "NotFoundCpfException" ou "InvalidCpfException"

    Visualizar todos os CPFs da lista restrita
        Método HTTP: GET
        URL: baseUrl/cpf
        Sucesso: retorna um array de objetos, cada um representando um CPF da lista restrita
        ex: [ { "cpf": "64852893055", createdAt: "2019-12-
        17T22:22:08.547Z"} ]
  </details>

<hr>

## Pré-Requisitos
  - Necessário [Docker](https://docs.docker.com/get-docker/) instalado;
  - Necessário o [npm](https://balta.io/blog/node-npm-instalacao-configuracao-e-primeiros-passos) ou outro pacote similar no computador ou no container;
  - Necessária a instação do [Node.js](https://nodejs.org/pt-br/download/package-manager/) no computador ou no container;

<hr>

## Instalação e uso

```bash
# Abra um terminal e copie este repositório com o comando
git@github.com:rafaelftourinho/desafio_maxmilhas.git

# Navegue até a pasta raíz da aplicação

# Caso esteja usando o VsCode, pode utilizar o comando no terminal dentro da pasta
code .

# Entre na pasta backend
cd app/backend 

# Instale as dependências de backend
npm i

# Suba o container docker
docker-compose up -d

# A porta utilizada para rodar o node está mapeada na 3001 e a porta disponibilizada para o database é a 3002

# Ao subir o container, a aplicação irá startar automaticamente e a criação do banco de dados será feita (migrate) assim como dados pré-inseridos (seed)

# Para rodar os testes, você precisa estar na pasta backend

# Para rodar os testes de integração
npm run test:integration

# Para rodar os testes unitários
npm run test:unitary

# Para verificar os dados que volta da API .
http://localhost:3001/cpf/
```

<br>

## Licença
Esse projeto está sob a licença MIT. Veja [LICENSE](https://pt.wikipedia.org/wiki/Licen%C3%A7a_MIT) para mais detalhes.
