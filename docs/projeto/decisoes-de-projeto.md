# Decisões de Projeto — DisciplinasUFLA

**Disciplina:** Engenharia de Software
**Professor:** Johnatan Oliveira
**Projeto:** DisciplinasUFLA
**Versão:** 1.0
**Data:** 09/05/2026

| Integrante                     | Papel no Scrum |
| ------------------------------ | -------------- |
| Thiago Vinícius Tristão Rojas  | Product Owner  |
| Bruno Santos Vilas Boas        | Scrum Master   |
| Christian Silva Mesquita       | Dev Team       |
| Guilherme dos Santos Fernandes | Dev Team       |
| Matheus Levi Tavares           | Dev Team       |

---

# 1. Introdução

Este documento apresenta as principais decisões de projeto tomadas durante o desenvolvimento do sistema DisciplinasUFLA.

O objetivo do projeto é criar uma plataforma web para compartilhamento de materiais acadêmicos entre estudantes da UFLA, permitindo upload, download, busca e organização de arquivos por disciplina.

---

# 2. Organização da Solução

O sistema foi dividido em camadas, cada uma com uma responsabilidade específica.

| Camada              | Responsabilidade                           |
| ------------------- | ------------------------------------------ |
| Frontend            | Interface visual e interação com o usuário |
| Controllers         | Receber requisições HTTP                   |
| Services            | Regras de negócio                          |
| Prisma + PostgreSQL | Persistência dos dados                     |
| Docker              | Ambiente de execução                       |

---

# 3. Decisões de Projeto

## DP01 — Arquitetura em Camadas

### Decisão

Separar o sistema em frontend, controllers, services e banco de dados.

### Justificativa

A separação das responsabilidades deixou o projeto mais organizado e facilitou o desenvolvimento em equipe. Alterações no frontend, por exemplo, não exigem mudanças diretas no banco de dados.

### Princípio aplicado

Separação de responsabilidades.

### Requisitos atendidos

* RNF02
* RNF04
* RNF05

---

## DP02 — Uso do Prisma ORM

### Decisão

Utilizar Prisma ORM para comunicação com o PostgreSQL.

### Justificativa

O Prisma simplifica consultas ao banco de dados, reduz a quantidade de SQL manual e facilita a criação de migrations.

### Princípio aplicado

Abstração.

### Requisitos atendidos

* RF09
* RNF06

---

## DP03 — Instância Única do Prisma Client

### Decisão

Criar apenas uma instância do `PrismaClient` em `configs/prisma.ts`.

### Justificativa

Evita múltiplas conexões desnecessárias com o banco de dados e melhora a estabilidade da aplicação.

### Princípio aplicado

Singleton.

### Requisitos atendidos

* RNF04
* RNF05

---

## DP04 — Armazenamento de Arquivos no Servidor

### Decisão

Salvar arquivos enviados na pasta `uploads/` e armazenar apenas o nome/caminho no banco.

### Justificativa

Isso deixa o banco mais leve e facilita o gerenciamento dos arquivos.

### Princípio aplicado

Separação de responsabilidades.

### Requisitos atendidos

* RF02
* RF04
* RNF06

---

## DP05 — Autenticação com JWT

### Decisão

Utilizar JWT para autenticação dos usuários.

### Justificativa

JWT simplifica o controle de sessão e protege rotas privadas do sistema.

Além disso, o sistema aceita apenas e-mails institucionais `@estudante.ufla.br`.

### Princípio aplicado

Segurança.

### Requisitos atendidos

* RF01
* RF06
* RNF04

---

## DP06 — Validação de Upload no Frontend e Backend

### Decisão

Validar tamanho dos arquivos tanto no frontend quanto no backend.

### Justificativa

O frontend fornece resposta imediata ao usuário, enquanto o backend garante segurança caso alguém tente enviar arquivos inválidos diretamente pela API.

### Princípio aplicado

Validação em múltiplas camadas.

### Requisitos atendidos

* RF02
* RNF01

---

## DP07 — Uso de Docker

### Decisão

Utilizar Docker e Docker Compose para executar frontend, backend e banco de dados.

### Justificativa

Facilitou a configuração do ambiente e evitou problemas de compatibilidade entre computadores diferentes.

### Princípio aplicado

Modularidade.

### Requisitos atendidos

* RNF02
* RNF04

---

## DP08 — Uso de Variáveis de Ambiente

### Decisão

Armazenar configurações sensíveis em arquivos `.env`.

### Justificativa

Evita exposição de credenciais no código-fonte e facilita mudanças entre ambiente local e produção.

### Princípio aplicado

Segurança.

### Requisitos atendidos

* RNF04

---

# 4. Resumo das Decisões

| ID   | Decisão                   | Princípio                      |
| ---- | ------------------------- | ------------------------------ |
| DP01 | Arquitetura em camadas    | Separação de responsabilidades |
| DP02 | Prisma ORM                | Abstração                      |
| DP03 | Instância única do Prisma | Singleton                      |
| DP04 | Arquivos em `uploads/`    | Separação de responsabilidades |
| DP05 | JWT para autenticação     | Segurança                      |
| DP06 | Validação dupla de upload | Validação em múltiplas camadas |
| DP07 | Docker Compose            | Modularidade                   |
| DP08 | Variáveis de ambiente     | Segurança                      |

---

# 5. Rastreabilidade dos Requisitos

| Requisito                              | Decisões relacionadas |
| -------------------------------------- | --------------------- |
| RF01 — Login institucional             | DP05                  |
| RF02 — Upload de arquivos              | DP04, DP06            |
| RF04 — Download de arquivos            | DP04                  |
| RF06 — Cadastro de usuários            | DP05                  |
| RF09 — Associação de arquivos ao autor | DP02                  |
| RNF01 — Limite de upload               | DP06                  |
| RNF02 — Plataforma web                 | DP01, DP07            |
| RNF04 — Segurança                      | DP05, DP08            |
| RNF05 — Estabilidade                   | DP01, DP03            |
| RNF06 — Integridade de dados           | DP02, DP04            |
