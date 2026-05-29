# Sprint 04 

## 1. Identificação do Grupo

Projeto: DisciplinasUFLA

| Integrante | Papel no Scrum |
|---|---|
| Thiago Vinícius Tristão Rojas | Product Owner |
| Bruno Santos Vilas Boas | Scrum Master |
| Christian Silva Mesquita | Dev Team |
| Guilherme dos Santos Fernandes | Dev Team |
| Matheus Levi Tavares | Dev Team |

Data da Sprint: 02/05/2026 a 09/05/2026


## 2. Objetivo da Sprint

Definir e justificar as decisões de projeto da aplicação DisciplinasUFLA, decompondo o sistema em módulos e aplicando princípios de engenharia de software como coesão, baixo acoplamento e responsabilidade única.


## 3. Itens do Sprint Backlog

| ID | Tipo | Item do Backlog | Descrição | Prioridade | Status |
|---|---|---|---|---|---|
| D01 | Decisão de Projeto | Definição da Arquitetura em Camadas | Decompor o sistema em camadas de apresentação, serviços e persistência | Alta | Concluído |
| D02 | Decisão de Projeto | Configuração Prisma/Docker | Definir Prisma ORM como camada de persistência e Docker como ambiente de execução | Alta | Em andamento |
| D03 | Documentação | Justificativas técnicas das decisões | Documentar cada decisão com base em princípios de projeto | Alta | Concluído |
| D04 | Documentação | Análise de alternativas | Avaliar e registrar alternativas consideradas e descartadas | Média | Concluído |
| D05 | Documentação | Criação do sprint-04.md | Documentar esta sprint no repositório | Baixa | Concluído |

---

## 4. Relação com o Conteúdo da Disciplina

Esta sprint está diretamente relacionada ao conteúdo de *Princípios de Projeto de Software. As decisões tomadas refletem a aplicação prática de conceitos fundamentais como **alta coesão* (cada módulo tem uma única responsabilidade bem definida), *baixo acoplamento* (as camadas se comunicam por interfaces, sem dependência direta entre si), *abstração* (uso de ORM para abstrair o banco de dados) e *modularidade* (uso de Docker para isolar o ambiente de execução). A análise de alternativas de implementação evidencia a capacidade de avaliar trade-offs técnicos, competência central dos princípios de projeto.

---

## 5. Artefatos Produzidos

- Documento de decisões de projeto com descrição de cada módulo e sua responsabilidade
- Tabela de decisões técnicas com justificativas baseadas em princípios de projeto
- Análise de alternativas de implementação (armazenamento de arquivos e autenticação)
- Atualização do Product Backlog com novos itens de infraestrutura
- Arquivo docs/projeto/decisoes-de-projeto.md
- Arquivo docs/sprints/sprint-04.md

---
## 6. Evidências no GitHub

- *Arquivos criados/atualizados:*
  - docs/sprints/sprint-04.md
  - docs/projeto/decisoes-de-projeto.md

- *Commits relevantes:*
  - docs: definição da arquitetura em camadas e decisões de projeto (sprint 4)
  - docs: análise de alternativas — armazenamento de arquivos e autenticação
  - chore: configuração inicial do Prisma ORM e Docker Compose
  - docs: criação do arquivo sprint-04.md

- *Tag da sprint:* sprint-04

---

## 7. Atualização do Backlog

| ID | Item | Status | Relacionamento |
| :--- | :--- | :--- | :--- |
| D01 | Definição da Arquitetura | Concluído | Alinhado com RNF02 e RNF04 |
| D02 | Configuração Prisma/Docker | Em andamento | Suporte para RF09 e RNF07 |
| RT01 | Tela e Lógica de Login | Em Planejamento | Iniciando Sprint 5 |


## 8. Resultados Obtidos

Ao final desta sprint, o grupo possui uma visão clara de como o código será organizado. A aplicação dos princípios de projeto permitiu reduzir o acoplamento entre os módulos, o que facilitará a implementação das funcionalidades de upload e download nas próximas etapas.
