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
## 5. Artefatos Produzidos

- Documento de análise dos problemas recorrentes de design identificados
- Descrição e justificativa técnica dos padrões Singleton e Strategy aplicados à solução
- Representação do impacto dos padrões nos diagramas de classes e de sequência da Sprint 3
- Relatório de Padrões GoF consolidado
- Infraestrutura do projeto (Prisma + Docker) finalizada
- Lógica de autenticação com validação de e-mail institucional implementada
- Credenciais isoladas em variáveis de ambiente (.env)
- Arquivo docs/padroes/padroes-de-projeto.md
- Arquivo docs/sprints/sprint-05.md

---
## 6. Evidências no GitHub

- *Arquivos criados/atualizados:*
  - docs/sprints/sprint-05.md
  - docs/padroes/padroes-de-projeto.md
  - src/lib/prisma.ts (implementação do Singleton)
  - src/services/storage/StorageStrategy.ts (interface Strategy)
  - src/services/storage/LocalStorageStrategy.ts (implementação concreta)
  - .env.example
  - .gitignore (atualizado)

- *Commits relevantes:*
  - feat: implementação do Singleton para instância do PrismaClient
  - feat: criação da interface StorageStrategy e implementação local
  - feat: lógica de validação de e-mail institucional no login
  - fix: correção de exibição de mídias no feed de arquivos
  - security: isolamento de credenciais JWT com dotenv
  - chore: limpeza do cache .vite e atualização do .gitignore
  - docs: relatório de padrões GoF (Singleton e Strategy) — sprint 5

- *Tag da sprint:* sprint-05

---
## 7. Evolução da Aplicação Web

Esta sprint marcou o início concreto do desenvolvimento da aplicação. Foram implementadas:

- *Autenticação:* lógica de validação de e-mails institucionais (@estudante.ufla.br) no backend
- *Infraestrutura completa:* Docker Compose configurado, banco de dados PostgreSQL integrado via Prisma ORM com migrations e seed funcionais
- *Padrões de projeto em código:* implementação do Singleton (Prisma Client centralizado) e da interface Strategy (armazenamento desacoplado)
- *Segurança:* credenciais removidas do código e isoladas em variáveis de ambiente
- *Correções no feed:* exibição correta de tipos de arquivo (PDF, ZIP) e layout dos cards ajustado

---

## 8. Resultados Obtidos

Ao término da Sprint 5, o grupo estabeleceu uma fundação técnica robusta e escalável para o sistema DisciplinasUFLA. A adoção do Singleton mitigou riscos críticos de sobrecarga de banco de dados, enquanto o Strategy conferiu a modularidade necessária para que novas formas de armazenamento sejam agregadas sem fricção de código. 

Toda a documentação técnica foi consolidada, revisada pelos pares e publicada com sucesso no GitHub na pasta correspondente.

*Arquivo de documentação gerado:* docs/sprints/sprint-05.md

