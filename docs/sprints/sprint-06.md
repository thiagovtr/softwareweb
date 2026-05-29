# Sprint 06

## 1. Identificação

- **Número da sprint:** 6
- **Período:** 16/05/2026 a 23/05/2026
- **Data da entrega:** 23/05/2026

| Integrante | Papel no Scrum |
|---|---|
| Thiago Vinícius Tristão Rojas | Product Owner |
| Bruno Santos Vilas Boas | Scrum Master |
| Christian Silva Mesquita | Dev Team |
| Guilherme dos Santos Fernandes | Dev Team |
| Matheus Levi Tavares | Dev Team |

---

## 2. Objetivo da Sprint

Definir e documentar formalmente a arquitetura da aplicação DisciplinasUFLA, descrevendo sua estrutura em camadas, os componentes e suas responsabilidades, a comunicação entre frontend, backend e banco de dados, e as justificativas técnicas das escolhas arquiteturais.

---

## 3. Itens do Sprint Backlog

| ID | Tipo | Item do Backlog | Descrição | Prioridade | Status |
|---|---|---|---|---|---|
| A01 | Arquitetura | Visão arquitetural da solução | Definir e documentar a arquitetura em camadas da aplicação | Alta | Concluído |
| A02 | Arquitetura | Descrição dos componentes | Documentar frontend, backend, banco de dados e infraestrutura | Alta | Concluído |
| A03 | Arquitetura | Justificativa das escolhas arquiteturais | Relacionar cada decisão arquitetural aos requisitos | Alta | Concluído |
| A04 | Infraestrutura | Configuração completa com Docker | Integrar frontend, backend e banco via Docker Compose | Alta | Concluído |
| A05 | Infraestrutura | Migrations e seed do Prisma | Automatizar criação e popular o banco de dados | Alta | Concluído |
| A06 | Documentação | Criação do sprint-06.md | Documentar esta sprint no repositório | Baixa | Concluído |

---

## 4. Relação com o Conteúdo da Disciplina

Esta sprint está diretamente relacionada ao conteúdo de **Arquitetura de Software**. A definição formal da arquitetura em camadas — separando apresentação, controle, serviços e persistência — demonstra a aplicação prática dos conceitos de organização estrutural de sistemas de software em alto nível. A documentação das responsabilidades de cada componente, das tecnologias adotadas e da comunicação via API REST reflete a compreensão de estilos e padrões arquiteturais. A relação explícita entre as decisões arquiteturais e os requisitos funcionais e não funcionais evidencia a coerência entre arquitetura e qualidade esperada do sistema.

---

## 5. Artefatos Produzidos

- Documento de arquitetura de software com visão geral, descrição por camada e justificativas
- Descrição das tecnologias adotadas em cada componente (React, Node.js, Prisma, PostgreSQL, Docker)
- Estrutura de pastas do projeto documentada (frontend e backend)
- Relação explícita entre arquitetura, requisitos e atributos de qualidade
- Ambiente Docker completamente configurado e integrado
- Migrations e seed do Prisma automatizados
- Arquivo `docs/arquitetura/arquitetura.md`
- Arquivo `docs/sprints/sprint-06.md`

---

## 6. Evolução da Aplicação Web

Esta sprint consolidou a infraestrutura completa da aplicação. A partir desta entrega, o ambiente de desenvolvimento pode ser inicializado com um único comando (`docker-compose up`), com o banco de dados criado automaticamente via migrations e populado com dados iniciais pelo seed do Prisma. O sistema está funcional nos seus fluxos principais (autenticação, upload, listagem), servindo como base estável para a fase de testes da Sprint 7.

---

## 7. Dificuldades Encontradas

- A integração entre os três containers Docker (frontend, backend e banco de dados) exigiu ajustes nas configurações de rede e nas variáveis de ambiente para garantir comunicação correta entre os serviços.
- A ordem de inicialização dos containers (banco deve estar disponível antes do backend) exigiu o uso de healthchecks no Docker Compose.

---

## 8. Revisão do Incremento

- **O que foi concluído:** A arquitetura foi documentada formalmente. A configuração completa com Docker está funcional. Migrations e seed do Prisma estão automatizados. Todos os itens do Sprint Backlog foram concluídos.
- **O que ficou pendente:** Nenhum item ficou pendente nesta sprint.

---

## 9. Pendências para a Próxima Sprint

- Elaborar o plano de testes da aplicação
- Definir os tipos de teste aplicáveis (funcional, usabilidade, integração)
- Criar os casos de teste para os principais fluxos (autenticação, upload, download, busca, curtidas)
- Elaborar a matriz de rastreabilidade entre requisitos e casos de teste

---

## 10. Arquitetura da Aplicação

### Visão Geral

O sistema DisciplinasUFLA adota uma **arquitetura em camadas**, separando frontend, backend e banco de dados. A comunicação entre frontend e backend ocorre por meio de requisições HTTP utilizando **API REST**. O ambiente de execução é padronizado com **Docker**.

---

### Frontend

**Tecnologias:** React · TypeScript · Tailwind CSS · Axios · React Router DOM

**Responsabilidades:**
- Cadastro e login de usuários
- Upload de arquivos acadêmicos
- Busca e filtro por disciplina
- Exibição de materiais disponíveis
- Curtidas e exclusão de arquivos

**Estrutura de pastas:**
```
src/
├── pages/
├── components/
├── services/
└── routes/
```

---

### Backend

**Tecnologias:** Node.js · Express · Prisma ORM · JWT · Multer · BcryptJS

**Responsabilidades:**
- Autenticação e autorização de usuários (JWT)
- Controle e validação de uploads (Multer + regras de negócio)
- Gerenciamento de arquivos e curtidas
- Comunicação com o banco de dados via Prisma ORM

**Estrutura de pastas:**
```
src/
├── controllers/
├── services/
├── middlewares/
├── routes/
├── configs/
└── prisma/
```

---

### Banco de Dados

**Tecnologia:** PostgreSQL

**Responsabilidades:**
- Armazenamento de usuários, arquivos, disciplinas e curtidas
- Garantia de integridade referencial dos dados
- Persistência dos caminhos dos arquivos enviados

---

### Infraestrutura

**Tecnologias:** Docker · Docker Compose

**Responsabilidades:**
- Automação da execução do projeto com um único comando
- Padronização do ambiente entre diferentes máquinas
- Integração e orquestração de frontend, backend e banco de dados

---

## 11. Organização em Camadas

| Camada | Responsabilidade |
|---|---|
| Apresentação | Interface do usuário — componentes React |
| Controle | Controllers do backend — recebem requisições HTTP e retornam respostas |
| Serviço | Regras de negócio da aplicação |
| Persistência | Acesso ao banco de dados via Prisma ORM |

---

## 12. Justificativa da Arquitetura

A **arquitetura em camadas** foi escolhida por proporcionar:

- Separação clara de responsabilidades entre interface, lógica de negócio e persistência
- Facilidade de manutenção e evolução independente de cada camada
- Escalabilidade futura — cada camada pode ser substituída ou expandida sem impactar as demais
- Facilidade de testes — a separação permite testar cada camada de forma isolada
- Reutilização de componentes e serviços

O **Docker** foi adotado para eliminar inconsistências entre ambientes de desenvolvimento, garantindo que o sistema funcione de forma idêntica em qualquer máquina.

---

## 13. Relação entre Arquitetura e Requisitos

| Decisão Arquitetural | Requisitos Atendidos |
|---|---|
| JWT no backend para autenticação | RF01 (Login), RF06 (Cadastro), RNF05 (Segurança) |
| Multer para controle de upload | RF02 (Upload), RNF01 (Restrição de tamanho 100MB) |
| PostgreSQL + Prisma ORM | RNF07 (Integridade de dados), RF09 (Associação de arquivos) |
| Arquitetura em camadas | RNF04 (Estabilidade), RNF06 (Tempo de resposta) |
| Docker Compose | RNF02 (Plataforma web), RNF04 (Disponibilidade) |

---

## 14. Quadro Kanban (Sprint 6)

| A Fazer | Em Andamento | Concluído |
|---|---|---|
| — | — | Visão arquitetural da solução |
| — | — | Descrição dos componentes |
| — | — | Justificativa das escolhas arquiteturais |
| — | — | Configuração completa com Docker |
| — | — | Migrations e seed do Prisma |
| — | — | sprint-06.md |
