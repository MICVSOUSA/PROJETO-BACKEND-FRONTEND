# Projeto ASW - Plataforma de Memórias (Full Stack)

Este repositório contém o projeto completo da disciplina de Aplicações e Serviços na Web (ASW), desenvolvido pelo **Grupo 25**.

## Membros do Grupo
- Mariana Pardal, nº 64128
- Matilde Sousa, nº 64142

---

## Estrutura do Projeto

O projeto está dividido em duas partes principais:

1. **[Backend (ASW_PROJ)](./ASW_PROJ)**: API REST construída com Node.js, Express e Prisma ORM.
2. **[Frontend (proj-frontend)](./proj-frontend)**: Interface web moderna construída com React, TypeScript e Vite.

---

## Pré-requisitos

Antes de começar, certifica-te de que tens instalado:
- [Node.js](https://nodejs.org/) (versão LTS recomendada)
- [PostgreSQL](https://www.postgresql.org/) (em execução na porta 5432)
- [DBeaver](https://dbeaver.io/) ou outro cliente SQL (opcional, para visualização de dados)

---

## Como Iniciar

Segue estes passos para colocar o projeto a funcionar localmente:

### 1. Configuração do Backend (API)
Navega para a pasta do backend:
```bash
cd ASW_PROJ
```

Instala as dependências:
```bash
npm install
```

Sincroniza a base de dados e gera o cliente Prisma:
```bash
npx prisma db push
npx prisma generate
```

Inicia o servidor em modo de desenvolvimento:
```bash
npx tsx watch src/server.ts
```
O backend ficará disponível em `http://localhost:3000`. Podes aceder à documentação interativa em `http://localhost:3000/api-docs`.

### 2. Configuração do Frontend
Abre um novo terminal e navega para a pasta do frontend:
```bash
cd proj-frontend
```

Instala as dependências:
```bash
npm install
```

Inicia o servidor de desenvolvimento do Vite:
```bash
npm run dev
```
O frontend ficará disponível em `http://localhost:5173` (ou na porta indicada no terminal).

---

## Funcionalidades Implementadas

O projeto oferece uma plataforma completa para gestão de memórias e grupos:

- **Autenticação**: Registo e Login de utilizadores com JWT.
- **Grupos**: Criação, edição e remoção de grupos, gestão de membros e cargos (Admin/Member).
- **Memórias (Entries)**: Publicação de memórias com texto, imagens (via Cloudinary), links e tags.
- **Interatividade**: Comentários e reações (emojis) em cada memória.
- **Pesquisa**: Filtros avançados por texto, tags, grupos e datas.
- **Documentação**: API totalmente documentada via Swagger/OpenAPI.

---

## Divisão de Trabalho

O trabalho foi dividido com uma pessoa a desenvolver a backEnd (Matilde Sousa) e a outra a frontEnd (Mariana Pardal), mas sempre a ajudar uma a outra quando precisavamos e também houve envolvimento de ambas no desenvolvimento das duas partes. Por isso conseguimos dizer que foi uma divisão de trabalho justa e equilibrada.

---
