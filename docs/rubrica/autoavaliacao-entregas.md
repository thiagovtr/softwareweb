# Autoavaliação das Entregas

**Projeto:** DisciplinasUFLA  
**Disciplina:** Engenharia de Software  

## 1. Objetivo
Apresentar a autoavaliação da equipe referente ao produto de software entregue e aos artefatos de documentação produzidos, confrontando o resultado final com os requisitos exigidos pela disciplina.

## 2. Checklist de Artefatos Produzidos

| Artefato / Fase | Status | Observação da Equipe |
| --- | :---: | --- |
| **Engenharia de Requisitos** | Concluído | RFs, RNFs e User Stories mapeados e priorizados. |
| **Modelagem UML** | Concluído | Diagramas de Classes e de Sequência coerentes com o escopo. |
| **Decisões e Padrões de Projeto** | Concluído | Padrões Singleton e Strategy justificados e aplicados no Node.js. |
| **Arquitetura de Software** | Concluído | Camadas bem definidas  e containerização via Docker. |
| **Qualidade e Testes** | Concluído | 8 casos de teste manuais funcionais criados, executados e aprovados. |
| **Gerenciamento Scrum** | Concluído | Histórico documentado das Sprints 1 a 8 com rastreabilidade. |

## 3. Avaliação do Produto Final

### 3.1. Pontos Fortes
*   **Ambiente Padronizado:** A utilização do Docker e Docker Compose garante que o avaliador consiga rodar a aplicação imediatamente, sem configurar banco de dados local.
*   **Tratamento de Exceções:** Implementação robusta no backend (Multer) para impedir arquivos maiores que 100MB e validação estrita para aceitar apenas e-mails `@estudante.ufla.br`.
*   **Interface Fluida:** Aplicação do padrão Observer via React Hooks, permitindo interações sociais (curtidas e favoritos) em tempo real, sem recarregar a página.

### 3.2. Pontos de Melhoria 
*   **Paginação do Feed:** O sistema atualmente carrega todos os materiais de uma vez. Para escalar, seria necessário implementar paginação no endpoint `GET /files`.
*   **Testes Automatizados:** Devido à restrição de tempo nas Sprints finais, a validação de qualidade foi feita via testes funcionais manuais de Caixa Preta, abrindo espaço para a futura implementação de testes E2E com ferramentas como Cypress.
