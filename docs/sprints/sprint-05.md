# Sprint 05

## 1. Identificação do Grupo

Projeto: DisciplinasUFLA

| Integrante | Papel no Scrum |
|---|---|
| Thiago Vinícius Tristão Rojas | Product Owner |
| Bruno Santos Vilas Boas | Scrum Master |
| Christian Silva Mesquita | Dev Team |
| Guilherme dos Santos Fernandes | Dev Team |
| Matheus Levi Tavares | Dev Team |

Data da Sprint: 09/05/2026 a 16/05/2026

---

## 2. Objetivo da Sprint

Identificar problemas recorrentes no design de código da aplicação DisciplinasUFLA, selecionar padrões de projeto (Design Patterns) pertinentes e justificar tecnicamente sua adoção, descrevendo os benefícios arquiteturais esperados e o impacto nos modelos produzidos anteriormente.

---

## 3. Itens do Sprint Backlog

| ID | Tipo | Item do Backlog | Descrição | Prioridade | Status |
|---|---|---|---|---|---|
| M04 | Padrões de Projeto | Identificação de problemas de design | Mapear problemas recorrentes na arquitetura definida na Sprint 4 | Alta | Concluído |
| M05 | Padrões de Projeto | Aplicação do padrão Singleton | Centralizar instância do Prisma Client | Alta | Concluído |
| M06 | Padrões de Projeto | Aplicação do padrão Strategy | Criar interface genérica de armazenamento intercambiável | Alta | Concluído |
| M07 | Documentação | Justificativas técnicas dos padrões | Documentar benefícios esperados e impacto nos modelos | Alta | Concluído |
| D02 | Infraestrutura | Configuração Prisma/Docker | Finalizar configuração do ambiente com Docker Compose e Prisma | Alta | Concluído |
| RT01 | Funcionalidade | Tela e Lógica de Login | Implementar lógica de validação de e-mails institucionais | Alta | Concluído |
| RT02 | Funcionalidade | Refatoração do Feed | Corrigir exibição de mídias e layout dos cards | Média | Concluído |
| D03 | Segurança | Isolamento de credenciais com .env | Remover chave JWT exposta no código; aplicar dotenv | Alta | Concluído |
| D04 | Infraestrutura | Ajuste de rastreamento do repositório | Limpar cache .vite e atualizar .gitignore | Baixa | Concluído |

---

## 4. Relação com o Conteúdo da Disciplina

Esta sprint está diretamente relacionada ao conteúdo de *Padrões de Projeto (Design Patterns). A identificação de problemas recorrentes de acoplamento e gerenciamento de recursos, seguida da seleção e aplicação dos padrões **Singleton* (criacional) e *Strategy* (comportamental), demonstra a capacidade de reconhecer situações-problema clássicas no design de software e aplicar soluções reutilizáveis e bem fundamentadas do catálogo GoF. A justificativa técnica de cada padrão e seu impacto nos modelos anteriores evidenciam a compreensão integrada dos conteúdos de requisitos, modelagem, princípios e padrões.

---

## 5. Representação da Aplicação na Solução e Impacto nos Modelos

A aplicação dos padrões altera dinamicamente o comportamento esperado da estrutura definida no diagrama de classes inicial:

* *Adaptação no Diagrama de Classes:* A classe Arquivo deixa de interagir diretamente com o sistema de arquivos ou com instâncias puras de banco. Ela passa a delegar o salvamento físico para a interface injetada do padrão Strategy, diminuindo o acoplamento sistêmico.
* *Refinamento no Diagrama de Sequência:* No fluxo de upload, o componente do sistema invoca a estratégia configurada em tempo de execução para persistir o arquivo. Após o sucesso da escrita assíncrona, a instância Singleton do Prisma é chamada para registrar o caminho absoluto no banco de dados.

---

## 6. Registro de Acompanhamento da Sprint

### Planejamento
O foco central desta sprint foi mergulhar nas minúcias do design de código. A equipe reuniu-se para garantir que as decisões de arquitetura em camadas tomadas na Sprint 4 fossem blindadas contra problemas comuns de acoplamento e gargalos de infraestrutura no ecossistema Node.js/Prisma.

### Execução
Os membros da equipe de desenvolvimento trabalharam em par para definir as interfaces e contratos de código. Christian e Guilherme focaram no encapsulamento da estratégia de armazenamento (relacionada ao *RF02* e *RF04), enquanto Matheus isolou o cliente do banco de dados utilizando a estrutura de classe única (*Singleton). Thiago (PO) validou que os benefícios esperados estão estritamente alinhados com as restrições de desempenho (*RNF06*).

---

## 7. Atualização do Backlog

| ID | Item | Status | Relacionamento |
| :--- | :--- | :--- | :--- |
| M04 | Aplicação de Padrões de Projeto | *Concluído* | Garante viabilidade técnica para RF02, RF04 e RNF04 |
| D02 | Configuração Prisma/Docker | *Concluído* | Infraestrutura base e banco integrados com sucesso |
| RT01 | Tela e Lógica de Login | *Concluído* | Iniciada a codificação da lógica de validação de e-mails institucionais |
| RT02 | Refatoração do Feed e Exibição de Mídias | Concluído | Corrige o bug de imagens quebradas para PDFs/ZIPs e ajusta o layout dos cards (RF05) |
| D03 | Isolamento de Credenciais com .env | Concluído | Remove a chave JWT exposta no código, aplicando dotenv no servidor (RNF02 - Segurança) |
| D04 | Ajuste de Rastreamento do Repositório | Concluído | Limpa a pasta de cache .vite e atualiza o .gitignore para evitar conflitos na main |
| DOC05 | Relatório de Padrões GoF (Sprint 5) | Concluído | Consolida a documentação técnica dos padrões Singleton, Chain of Responsibility e Proxy |
---

## 8. Resultados Obtidos

Ao término da Sprint 5, o grupo estabeleceu uma fundação técnica robusta e escalável para o sistema DisciplinasUFLA. A adoção do Singleton mitigou riscos críticos de sobrecarga de banco de dados, enquanto o Strategy conferiu a modularidade necessária para que novas formas de armazenamento sejam agregadas sem fricção de código. 

Toda a documentação técnica foi consolidada, revisada pelos pares e publicada com sucesso no GitHub na pasta correspondente.

*Arquivo de documentação gerado:* docs/sprints/sprint-05.md

