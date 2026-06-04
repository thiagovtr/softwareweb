# Padrões de Projeto — DisciplinasUFLA

## 1. Introdução

Este documento apresenta alguns padrões e práticas utilizados durante o desenvolvimento da aplicação DisciplinasUFLA.

---

# 2. Arquitetura em Camadas

O projeto foi dividido em camadas:

* Frontend (React)
* Controllers
* Services
* Banco de Dados (Prisma/PostgreSQL)

## Objetivo

Separar a interface, as regras de negócio e o acesso ao banco de dados.

---

# 3. Singleton

O padrão Singleton foi utilizado na criação da instância do Prisma Client.

## Onde foi aplicado

``configs/prisma.ts``

A aplicação utiliza apenas uma instância do Prisma durante toda a execução.

## Objetivo

Evitar múltiplas conexões desnecessárias com o banco de dados.

---

# 4. Middleware Pattern

Middlewares foram utilizados para autenticação e validações.

## Exemplo

* `isAuthenticated`

## Objetivo

Executar verificações antes da requisição chegar aos controllers.

---

# 5. Service Layer Pattern

As regras de negócio foram separadas na camada de Services.

## Exemplos

* `CreateFileService`
* `ListFilesService`
* `CreateUserService`

## Objetivo

Evitar lógica de negócio diretamente nos controllers.

---

# 6. React Hooks (Observer)

O React utiliza atualização automática de interface através de estados e hooks.

## Onde foi aplicado

* `useState`
* `useEffect`

## Exemplo

Na tela Home, quando o usuário altera a busca ou o filtro de disciplina, os arquivos são atualizados automaticamente sem recarregar a página.
