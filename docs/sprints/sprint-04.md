# Sprint 04

## 1. Identificação

- **Número da sprint:** 4
- **Período:** 02/05/2026 a 09/05/2026
- **Data da entrega:** 09/05/2026

| Integrante | Papel no Scrum |
|---|---|
| Thiago Vinícius Tristão Rojas | Product Owner |
| Bruno Santos Vilas Boas | Scrum Master |
| Christian Silva Mesquita | Dev Team |
| Guilherme dos Santos Fernandes | Dev Team |
| Matheus Levi Tavares | Dev Team |

---

## 2. Objetivo da Sprint

Definir e justificar as decisões de projeto da aplicação DisciplinasUFLA, decompondo o sistema em módulos e aplicando princípios de engenharia de software como alta coesão, baixo acoplamento e responsabilidade única.

---

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

Esta sprint está diretamente relacionada ao conteúdo de **Princípios de Projeto de Software**. As decisões tomadas refletem a aplicação prática de conceitos fundamentais como **alta coesão** (cada módulo tem uma única responsabilidade bem definida), **baixo acoplamento** (as camadas se comunicam por interfaces, sem dependência direta entre si), **abstração** (uso de ORM para abstrair o banco de dados) e **modularidade** (uso de Docker para isolar o ambiente de execução). A análise de alternativas de implementação evidencia a capacidade de avaliar trade-offs técnicos, competência central dos princípios de projeto.

---

## 5. Artefatos Produzidos

- Documento de decisões de projeto com descrição de cada módulo e sua responsabilidade
- Tabela de decisões técnicas com justificativas baseadas em princípios de projeto
- Análise de alternativas de implementação (armazenamento de arquivos e autenticação)
- Atualização do Product Backlog com novos itens de infraestrutura
- Arquivo `docs/projeto/decisoes-de-projeto.md`
- Arquivo `docs/sprints/sprint-04.md`

---

## 6. Evolução da Aplicação Web

Nesta sprint, foram iniciadas as configurações de infraestrutura da aplicação. A configuração do Prisma ORM e do Docker Compose está em andamento (item D02), preparando o ambiente de desenvolvimento para o início da codificação das funcionalidades nas próximas sprints. A decomposição em camadas bem definidas (apresentação, serviços, persistência) orienta diretamente a organização do código-fonte que será produzido.

---

## 7. Dificuldades Encontradas

- A escolha entre salvar arquivos como BLOB no banco de dados versus armazenar no sistema de arquivos exigiu análise cuidadosa de trade-offs de desempenho e escalabilidade.
- A definição dos limites de responsabilidade entre a camada de serviços e a camada de controle (controllers) gerou discussão sobre onde aplicar as validações de regra de negócio.

---

## 8. Revisão do Incremento

- **O que foi concluído:** A arquitetura em camadas foi definida e documentada. As decisões de projeto foram registradas com justificativas técnicas claras. A análise de alternativas foi concluída.
- **O que ficou pendente:** A configuração completa do Prisma e do Docker (item D02) ficou em andamento, a ser finalizada no início da Sprint 5.

---

## 9. Pendências para a Próxima Sprint

- Finalizar a configuração do Prisma ORM e Docker Compose
- Identificar problemas recorrentes de design de código na arquitetura definida
- Selecionar e aplicar padrões de projeto (GoF) pertinentes à solução
- Documentar os padrões com justificativas técnicas e impacto nos modelos

---

## 10. Decomposição da Solução

O sistema DisciplinasUFLA foi decomposto nas seguintes camadas:

| Camada | Descrição | Tecnologia |
|---|---|---|
| Apresentação (Frontend) | Interface web para interação do estudante com o sistema | React + TypeScript + Tailwind CSS |
| Controle (Controllers) | Recebe requisições HTTP e direciona para os serviços correspondentes | Node.js + Express |
| Serviços (Business Logic) | Concentra as regras de negócio e validações críticas | Node.js |
| Persistência (ORM) | Gerencia o esquema e as operações no banco de dados | Prisma ORM + PostgreSQL |
| Infraestrutura | Ambiente conteinerizado para execução padronizada | Docker + Docker Compose |

---

## 11. Decisões de Projeto e Justificativas

| Decisão | Justificativa Técnica | Princípio de Projeto |
|---|---|---|
| Uso do Prisma ORM | Abstrai o acesso ao banco de dados, facilitando manutenção e migrações | Abstração |
| Arquitetura em Camadas | Isola a lógica de negócio da interface e do banco, permitindo substituição de componentes sem impacto geral | Baixo Acoplamento |
| Validação no Backend | Garante que regras críticas (ex.: e-mail @estudante.ufla.br) sejam aplicadas independentemente do cliente | Alta Coesão |
| Ambiente em Docker | Padroniza o ambiente de execução, eliminando inconsistências entre máquinas de desenvolvimento | Modularidade |

---

## 12. Análise de Alternativas

**Armazenamento de Arquivos:**
Avaliamos salvar os arquivos diretamente no banco de dados (BLOB). Optamos por salvar no sistema de arquivos do servidor e registrar apenas o caminho no banco. Essa abordagem melhora o desempenho das consultas ao banco e a escalabilidade do sistema, uma vez que arquivos binários grandes não sobrecarregam o banco de dados.

**Autenticação:**
Avaliamos o uso de OAuth externo (ex.: login com Google). Optamos pelo e-mail institucional obrigatório (@estudante.ufla.br) para garantir que a plataforma permaneça restrita à comunidade acadêmica da UFLA, mantendo o controle sobre quem tem acesso ao sistema.

---

## 13. Quadro Kanban (Sprint 4)
<img width="1443" height="842" alt="image" src="https://github.com/user-attachments/assets/8d9a7e3a-27e7-403d-9333-868d9cb4652c" />

