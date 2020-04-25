<h3 align="center">
  Desafio GoStack: Fundamentos Node.js
</h3>
<p align="center">
  <img alt="License" src="https://img.shields.io/badge/License-MIT-%2304D361">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/VtrAlves/database-upload-node?color=%2304D361">
  <img alt="MadeBy" src="https://img.shields.io/badge/made%20by-Vitor%20Alves-%2304D361">
</p>

## ❕ Sobre o desafio

Esse desafio foi solicitado pela Rocketseat com as instruções passadas [nesse repositório](https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-database-upload). Nele utilizamos banco de dados e upload de arquivos com typescript.

## 💻 Alterações do desafio

Foi baixado o [template](https://github.com/Rocketseat/gostack-template-typeorm-upload) enviado e assim criei as rotas para criação / listagem / Importação CSV / exclusão de transações e listagem do balanço.

Utilizei também o conceito de migrations, entidades, repositórios e serviços.

## 📖 Bibliotecas Utilizadas

- `Express`: Utilizado para escutar e responder requisições realizadas.
- `ts-node-dev`: Utilizado para reiniciar o servidor a cada mudança nos arquivos. (Instalado em ambiente de desenvolvimento)
- `Typescript`: Utilizado para carregar as configurações em tsconfig.json e gerar a build para produção caso necessário. (Instalado em ambiente de desenvolvimento)
- `csv-parse`: Utilizado para gerar um ID unico em cada repositório criado.
- `express-async-errors`: Utilizado par ao express conseguir tratar erros assíncronos.
- `multer`: Utilizado para o tratamento de arquivos enviados por multipart-form.
- `typeorm`: Utilizado para mapear dados relacionais para objetos JS
- `pg`: Base do postgres, é utilizado pelo typeorm para poder tratar as querys na linguagem correta.
- `Jest`: Utilizado para realização de testes automatizados na aplicação. (Instalado em ambiente de desenvolvimento)
- `Eslint`: Utilizado para verificação de erros na aplicação. O mesmo também é utilizado para ajustar o código no padrão configurado na aplicação. (Instalado em ambiente de desenvolvimento)
- `Prettier`: Utilizado para auxiliar o eslint ao ajustar o código escrito no padrão configurado na aplicação. (Instalado em ambiente de desenvolvimento)


## 🚀 Iniciar aplicação

Primeiramente é necessário baixar as dependências com o comando:

> yarn

Após a instalação, crie a tabela `desafio06` para todar a aplicação e `gostack_desafio06_tests`	para rodar os testes e em seguida para a criação das tabelas utilize o seguinte comando:

> yarn typeorm migration:run

Após a instalação, para iniciar o servidor utilize o comando:

> yarn start

Caso deseja rodar os testes, utilize o seguinte comando:

> yarn test

---

Made with ❤ by [Vitor](https://github.com/VtrAlves)
