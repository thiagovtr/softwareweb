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

Data da Sprint: 02/06/2026 a 09/05/2026


## 2. Objetivo da Sprint

Definir e justificar as decisões de projeto da aplicação DisciplinasUFLA, decompondo o sistema em módulos e aplicando princípios de engenharia de software como coesão, baixo acoplamento e responsabilidade.


## 3. Decomposição da Solução

Para garantir a **modularidade** e a **facilidade de manutenção**, a aplicação foi decomposta nos seguintes componentes principais:

* **Camada de Apresentação (Frontend):** Interface Web desenvolvida para permitir a interação do estudante com o sistema.
* **Camada de Serviços (Backend):** Concentra a lógica de negócio, como a validação de e-mails institucionais e o processamento de arquivos.
* **Camada de Persistência (Banco de Dados):** Utiliza o **Prisma ORM** para gerenciar o esquema e garantir a integridade dos dados.
* **Infraestrutura (Docker):** Ambiente conteinerizado para garantir que o sistema funcione de forma idêntica em diferentes máquinas.


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

---
