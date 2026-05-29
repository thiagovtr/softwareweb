# Sprint 07

## 1. Identificação

* **Número da sprint:** 7
* **Período:** [Preencher com a data de início] a 23/05/2026

* ---

## 2. Objetivo da Sprint

O principal objetivo desta sprint foi planejar e estruturar a estratégia de testes para a aplicação web Disciplinas UFLA. O foco esteve na documentação dos critérios de validação dos principais incrementos do projeto (Autenticação, Upload/Download e Filtros), garantindo que os Requisitos Funcionais e Não Funcionais sejam verificados sistematicamente antes da entrega final.

---
## 3. Itens do Sprint Backlog

* [QA] Elaboração do Plano e Objetivos de Testes (P1)
* [QA] Definição dos Casos de Teste Manuais (Caixa Preta)
* [QA] Criação da Matriz de Rastreabilidade (Requisitos x Testes)
* [DOC] Revisão dos Critérios de Aceitação
* [DOC] Atualização do Relatório da Sprint 7

---
## 4. Relação com o Conteúdo da Disciplina

Esta etapa aplica diretamente os conceitos da primeira parte do módulo de *Testes de Software*. O trabalho prático enfatizou o planejamento, a organização em cenários de teste e a documentação rigorosa da qualidade, validando se o produto construído atende às especificações iniciais através de técnicas de validação Funcional (Caixa Preta).

---
## 5. Artefatos Produzidos

Durante esta sprint, a equipe produziu a documentação completa de Qualidade de Software (QA), detalhada na seção de Evidências abaixo. Os artefatos incluem:
1. Plano de Testes e Estratégia.
2. Casos de Teste Estruturados (CTs).
3. Matriz de Rastreabilidade.

---
## 6. Evidências no GitHub

*Arquivos criados/atualizados:*
* docs/sprints/sprint-07.md
* Atualização do Kanban (GitHub Projects) para a fase de testes.

*Commits relevantes:*
* docs: criação do plano de testes e casos de teste funcionais (sprint 7)
* docs: elaboração da matriz de rastreabilidade

*Tag da sprint:* sprint-07

---
## 7. Evolução da Aplicação Web (Documentação de Testes)

Abaixo encontra-se a estratégia formal de testes desenhada pela equipe:

### A. Objetivos do Teste e Tipos Aplicáveis
* *Objetivo:* Garantir a integridade, usabilidade e segurança dos fluxos principais da plataforma de compartilhamento de materiais acadêmicos.
* *Tipos de Testes Adotados:*
  1. *Testes Funcionais (Caixa Preta):* Validação das regras de negócio através da interface de usuário, focando em entradas e saídas esperadas sem visualizar o código fonte interno.
  2. *Testes de Usabilidade:* Verificação de feedback visual (Toasts, alertas SweetAlert2) e limites de cliques.
  3. *Testes de Integração:* Validação da comunicação entre o Frontend (React) e a API (Node.js/Express) nas requisições HTTP (criação de arquivos e curtidas).
 
  ### B. Casos e Cenários de Teste (Checklist)

| ID do Teste | Cenário de Teste | Pré-condição | Passos para Execução | Resultado Esperado |
| :--- | :--- | :--- | :--- | :--- |
| **CT01** | Validação de Login com E-mail Institucional | Usuário não autenticado | 1. Acessar tela de login.<br>2. Inserir e-mail `@estudante.ufla.br` e senha correta.<br>3. Clicar em Entrar. | Login bem-sucedido. Token JWT gerado e redirecionamento para a Home. |
| **CT02** | Bloqueio de E-mail Não Institucional | Usuário na tela de Cadastro | 1. Inserir dados.<br>2. Usar e-mail genérico (ex: `@gmail.com`).<br>3. Submeter formulário. | Sistema bloqueia o cadastro e exibe um Toast de erro de validação. |
| **CT03** | Upload de Material Válido | Usuário autenticado | 1. Clicar em Enviar Material.<br>2. Anexar PDF de 5MB.<br>3. Preencher dados e enviar. | Arquivo salvo com sucesso. Sistema exibe Toast verde e o arquivo aparece no feed. |
| **CT04** | Bloqueio de Arquivo Gigante (RNF01) | Usuário autenticado | 1. Selecionar arquivo maior que 100MB.<br>2. Tentar enviar. | O middleware (Multer) rejeita o upload e exibe mensagem de limite excedido. |
| **CT05** | Funcionalidade de Download (Blob) | Usuário na Home/Detalhes | 1. Clicar no botão "Baixar" de um arquivo do feed. | O arquivo inicia o download local com o nome original sem abrir novas abas. |
| **CT06** | Curtir Material em Tempo Real | Usuário autenticado | 1. Clicar no botão "Curtir" de um material. | O contador aumenta em +1 imediatamente sem recarregar a página. |
| **CT07** | Busca e Filtro de Disciplinas | Existência de arquivos no banco | 1. Digitar termo no input de busca.<br>2. Selecionar uma disciplina no Select. | A grade (grid) se atualiza mostrando apenas os arquivos que coincidem com os critérios. |

