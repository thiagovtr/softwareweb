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

## 4. Decisões de Projeto e Justificativas

Abaixo estão as principais decisões tomadas, fundamentadas em princípios de qualidade de software:

| Decisão | Justificativa Técnica | Princípio de Projeto |
| :--- | :--- | :--- |
| **Uso de Prisma ORM** | Garante a integridade dos dados e facilita o mapeamento entre o modelo relacional e o código. | **Abstração** |
| **Arquitetura em Camadas** | Isola a lógica de banco de dados da interface, permitindo trocas de tecnologias sem afetar o usuário final. | **Baixo Acoplamento** |
| **Validação no Backend** | Garante que regras críticas (como e-mail @estudante.ufla.br) sejam aplicadas independente do cliente. | **Alta Coesão** |
| **Ambiente em Docker** | Facilita a configuração do ambiente de desenvolvimento e produção, evitando erros de "na minha máquina funciona". | **Modularidade** |


## 5. Análise de Alternativas

* **Armazenamento de Arquivos:** Avaliamos salvar os arquivos diretamente no banco de dados (BLOB), mas optamos por salvar no sistema de arquivos do servidor e registrar apenas o caminho no banco. Isso melhora a performance e escalabilidade do sistema.
* **Autenticação:** Escolhemos o uso de e-mail institucional obrigatório para garantir que a plataforma permaneça exclusiva para a comunidade acadêmica da UFLA.


## 6. Registro de Acompanhamento da Sprint

### Planejamento
O foco foi transformar os diagramas UML da Sprint 3 em uma estrutura técnica sólida. Definimos as tecnologias (Prisma, Docker) e como elas atenderiam aos requisitos funcionais (RF) e não funcionais (RNF).

### Execução
O grupo discutiu a responsabilidade de cada módulo. Decidimos que a validação de tamanho de arquivo (RNF01) será feita tanto no frontend (para feedback rápido) quanto no backend (por segurança).


## 7. Atualização do Backlog

| ID | Item | Status | Relacionamento |
| :--- | :--- | :--- | :--- |
| D01 | Definição da Arquitetura | Concluído | Alinhado com RNF02 e RNF04 |
| D02 | Configuração Prisma/Docker | Em andamento | Suporte para RF09 e RNF07 |
| RT01 | Tela e Lógica de Login | Em Planejamento | Iniciando Sprint 5 |


## 8. Resultados Obtidos

Ao final desta sprint, o grupo possui uma visão clara de como o código será organizado. A aplicação dos princípios de projeto permitiu reduzir o acoplamento entre os módulos, o que facilitará a implementação das funcionalidades de upload e download nas próximas etapas.
