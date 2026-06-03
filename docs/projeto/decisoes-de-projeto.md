# Decisões de Projeto — DisciplinasUFLA

**Disciplina:** Engenharia de Software
**Professor:** Johnatan Oliveira
**Projeto:** DisciplinasUFLA

---

# 1. Introdução

Este documento apresenta algumas decisões tomadas durante o desenvolvimento do sistema DisciplinasUFLA.

O objetivo do projeto é criar uma plataforma onde estudantes possam compartilhar materiais acadêmicos de forma organizada.

---

# 2. Organização do Sistema

O projeto foi dividido em partes:

| Parte          | Função                |
| -------------- | --------------------- |
| Frontend       | Interface do usuário  |
| Backend        | Regras de negócio     |
| Banco de Dados | Armazenar informações |
| Docker         | Executar os serviços  |

Essa separação ajudou a deixar o projeto mais organizado.

---

# 3. Decisões de Projeto

## DP01 — Separação entre Frontend e Backend

### Decisão

Separar o sistema em frontend e backend usando API REST.

### Justificativa

Isso deixou o projeto mais organizado e facilitou o desenvolvimento.

### Requisitos atendidos

* RNF02
* RNF04

---

## DP02 — Uso do Prisma ORM

### Decisão

Usar Prisma ORM para acessar o PostgreSQL.

### Justificativa

O Prisma facilitou consultas ao banco e criação das tabelas.

### Requisitos atendidos

* RF09
* RNF06

---

## DP03 — Instância Única do Prisma

### Decisão

Criar apenas uma instância do Prisma Client.

### Justificativa

Evita conexões desnecessárias com o banco de dados.

### Requisitos atendidos

* RNF04

---

## DP04 — Arquivos salvos na pasta uploads

### Decisão

Salvar arquivos enviados na pasta `uploads`.

### Justificativa

Deixa o banco mais leve e facilita o gerenciamento dos arquivos.

### Requisitos atendidos

* RF02
* RF04

---

## DP05 — Autenticação com JWT

### Decisão

Usar JWT para autenticação.

### Justificativa

Protege rotas privadas e mantém login do usuário.

### Requisitos atendidos

* RF01
* RF06
* RNF04

---

## DP06 — Validação de Upload

### Decisão

Validar tamanho do arquivo no frontend e backend.

### Justificativa

Melhora a segurança e evita uploads inválidos.

### Requisitos atendidos

* RF02
* RNF01

---

## DP07 — Uso de Docker

### Decisão

Usar Docker Compose para executar frontend, backend e banco.

### Justificativa

Facilitou a configuração do ambiente para todos do grupo.

### Requisitos atendidos

* RNF02

---

## DP08 — Uso de Variáveis de Ambiente

### Decisão

Guardar credenciais no `.env`.

### Justificativa

Evita exposição de dados sensíveis no código.

### Requisitos atendidos

* RNF04

---

# 4. Resumo

| ID   | Decisão                            |
| ---- | ---------------------------------- |
| DP01 | Separação entre frontend e backend |
| DP02 | Uso do Prisma ORM                  |
| DP03 | Instância única do Prisma          |
| DP04 | Arquivos na pasta uploads          |
| DP05 | JWT para autenticação              |
| DP06 | Validação de upload                |
| DP07 | Docker Compose                     |
| DP08 | Variáveis de ambiente              |
