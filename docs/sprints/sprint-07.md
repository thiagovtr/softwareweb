# Sprint 07

## 1. Identificação

- **Número da sprint:** 7
- **Período:** 23/05/2026 a 30/05/2026
- **Data da entrega:** 30/05/2026

| Integrante | Papel no Scrum |
|---|---|
| Thiago Vinícius Tristão Rojas | Product Owner |
| Bruno Santos Vilas Boas | Scrum Master |
| Christian Silva Mesquita | Dev Team |
| Guilherme dos Santos Fernandes | Dev Team |
| Matheus Levi Tavares | Dev Team |

---

## 2. Objetivo da Sprint

Planejar e documentar a estratégia de testes da aplicação DisciplinasUFLA, definindo os objetivos de teste, os tipos aplicáveis, os casos de teste para os principais incrementos (Autenticação, Upload/Download e Filtros), e a matriz de rastreabilidade entre requisitos e testes.

---

## 3. Itens do Sprint Backlog

| ID | Tipo | Item do Backlog | Descrição | Prioridade | Status |
|---|---|---|---|---|---|
| QA01 | Qualidade | Plano de Testes e Objetivos | Elaborar o plano estratégico de testes da aplicação | Alta | Concluído |
| QA02 | Qualidade | Casos de Teste Manuais (Caixa Preta) | Definir cenários de teste funcionais com pré-condições, passos e resultados esperados | Alta | Concluído |
| QA03 | Qualidade | Matriz de Rastreabilidade | Vincular cada requisito a pelo menos um caso de teste | Alta | Concluído |
| DOC01 | Documentação | Revisão dos Critérios de Aceitação | Revisar e confirmar critérios de aceitação definidos na Sprint 2 | Média | Concluído |
| DOC02 | Documentação | Criação do sprint-07.md | Documentar esta sprint no repositório | Baixa | Concluído |

---

## 4. Relação com o Conteúdo da Disciplina

Esta sprint está diretamente relacionada à primeira parte do conteúdo de **Testes de Software**. As atividades realizadas — elaboração do plano de testes, definição de casos de teste por técnica de caixa preta, e criação da matriz de rastreabilidade — correspondem às etapas fundamentais do planejamento e documentação de testes estudadas na disciplina. A técnica de **Caixa Preta** (testes funcionais baseados em entradas e saídas esperadas, sem visibilidade do código interno) é aplicada diretamente nos cenários mapeados. Os testes de integração planejados validam a comunicação entre frontend e backend, reforçando a coerência com a arquitetura definida na Sprint 6.

---

## 5. Artefatos Produzidos

- Plano de Testes com objetivos, escopo e tipos de teste aplicáveis
- 7 Casos de Teste estruturados (CT01 a CT07) com pré-condições, passos de execução e resultados esperados
- Matriz de Rastreabilidade vinculando os principais requisitos funcionais e não funcionais aos casos de teste correspondentes
- Revisão dos critérios de aceitação definidos na Sprint 2
- Arquivo `docs/testes/plano-de-testes.md`
- Arquivo `docs/sprints/sprint-07.md`

---

## 6. Evolução da Aplicação Web

Nesta sprint, o foco foi o planejamento e a documentação de testes. Não houve desenvolvimento de novas funcionalidades. A aplicação está funcional nos seus fluxos principais (autenticação, upload, listagem, download, curtidas, filtros), e os casos de teste elaborados serão executados na Sprint 8 para validar esses fluxos de forma sistemática antes da apresentação final.

---

## 7. Dificuldades Encontradas

- **Mapeamento de casos limites (edge cases):** Houve dificuldade inicial em definir como testar a restrição de uploads acima de 100MB, pois seria necessário gerar um arquivo artificialmente grande apenas para validar o comportamento do middleware Multer e o retorno visual na interface.
- **Definição do escopo de testes:** O grupo precisou avaliar entre implementar testes automatizados com bibliotecas específicas (Jest, Cypress) ou optar por testes manuais estruturados. Optou-se pelos testes funcionais manuais (Caixa Preta) dado o tempo disponível, priorizando a cobertura dos fluxos principais de negócio.

---

## 8. Revisão do Incremento

- **O que foi concluído:** O plano estratégico de testes está finalizado. Os 7 casos de teste cobrem os fluxos principais da aplicação. A matriz de rastreabilidade interliga os requisitos do backlog aos casos de teste elaborados. Os critérios de aceitação foram revisados e confirmados.
- **O que ficou pendente:** A execução prática dos casos de teste e o registro dos resultados (sucesso ou falha) ficaram reservados para a Sprint 8.

---

## 9. Pendências para a Próxima Sprint

- Executar os casos de teste CT01 a CT07 e registrar os resultados
- Documentar as evidências de teste (capturas de tela, logs de resultado)
- Registrar eventuais bugs encontrados e suas correções
- Consolidar a documentação final do projeto
- Preparar o histórico resumido das sprints para a apresentação final
- Atualizar o Product Backlog final

---

## 10. Plano de Testes

### A. Objetivos do Teste

Garantir a integridade, usabilidade e segurança dos fluxos principais da plataforma de compartilhamento de materiais acadêmicos, verificando que os requisitos funcionais e não funcionais definidos nas sprints anteriores são satisfeitos pelo sistema implementado.

### B. Tipos de Testes Adotados

| Tipo | Descrição |
|---|---|
| **Testes Funcionais (Caixa Preta)** | Validação das regras de negócio pela interface do usuário, focando em entradas e saídas esperadas sem visualizar o código interno |
| **Testes de Usabilidade** | Verificação de feedback visual (Toasts, alertas SweetAlert2) e conformidade com o limite de cliques definido no RNF03 |
| **Testes de Integração** | Validação da comunicação entre o Frontend (React) e a API (Node.js/Express) nas requisições HTTP de criação de arquivos e curtidas |

---

## 11. Casos de Teste

| ID | Cenário de Teste | Pré-condição | Passos para Execução | Resultado Esperado |
|---|---|---|---|---|
| **CT01** | Validação de Login com E-mail Institucional | Usuário não autenticado, cadastrado com e-mail @estudante.ufla.br | 1. Acessar a tela de login. 2. Inserir e-mail @estudante.ufla.br e senha correta. 3. Clicar em "Entrar". | Login bem-sucedido. Token JWT gerado e redirecionamento para a Home. |
| **CT02** | Bloqueio de E-mail Não Institucional no Cadastro | Usuário na tela de Cadastro | 1. Preencher os campos de cadastro. 2. Inserir e-mail genérico (ex.: @gmail.com). 3. Submeter o formulário. | Sistema bloqueia o cadastro e exibe Toast de erro de validação. |
| **CT03** | Upload de Material Válido | Usuário autenticado | 1. Clicar em "Enviar Material". 2. Selecionar arquivo PDF de até 100MB. 3. Preencher os dados obrigatórios. 4. Clicar em "Enviar". | Arquivo salvo com sucesso. Toast verde de confirmação exibido. Arquivo aparece no feed. |
| **CT04** | Bloqueio de Arquivo Acima do Limite (RNF01) | Usuário autenticado | 1. Tentar selecionar arquivo maior que 100MB. 2. Clicar em "Enviar". | O middleware (Multer) rejeita o upload e exibe mensagem de limite excedido ao usuário. |
| **CT05** | Download de Arquivo (Blob) | Usuário autenticado, arquivo disponível no feed | 1. Localizar um arquivo no feed. 2. Clicar no botão "Baixar". | Download do arquivo iniciado localmente com o nome original, sem abrir novas abas no navegador. |
| **CT06** | Curtir Material em Tempo Real | Usuário autenticado, arquivo disponível no feed | 1. Localizar um arquivo no feed. 2. Clicar no botão "Curtir". | Contador de curtidas aumenta em +1 imediatamente, sem recarregar a página. |
| **CT07** | Busca e Filtro por Disciplina | Existência de arquivos cadastrados no banco | 1. Digitar um termo na barra de busca. 2. Selecionar uma disciplina no filtro. | A grade de arquivos atualiza exibindo apenas os itens que coincidem com os critérios de busca e filtro. |

---

## 12. Matriz de Rastreabilidade (Requisitos × Testes)

| ID Requisito | Descrição do Requisito | Caso de Teste Vinculado | Status |
|---|---|---|---|
| RF01 / RF06 | Autenticação e Cadastro Institucional | CT01, CT02 | A executar na Sprint 8 |
| RF02 / RNF01 | Upload de Arquivos e Limite de 100MB | CT03, CT04 | A executar na Sprint 8 |
| RF04 / RNF07 | Download de Arquivos e Integridade | CT05 | A executar na Sprint 8 |
| RF11 | Sistema de Likes | CT06 | A executar na Sprint 8 |
| RF03 / RF10 | Busca e Filtro por Disciplina | CT07 | A executar na Sprint 8 |
| RNF03 | Usabilidade — máximo 3 cliques | CT03, CT05 (contagem de cliques) | A executar na Sprint 8 |
| RNF05 | Segurança — bloqueio de acessos não autorizados | CT01, CT02 | A executar na Sprint 8 |

---

## 13. Quadro Kanban (Sprint 7)

| A Fazer | Em Andamento | Concluído |
|---|---|---|
| Executar CT01–CT07 (Sprint 8) | — | Plano de Testes |
| Registrar evidências (Sprint 8) | — | Casos de Teste (CT01–CT07) |
| — | — | Matriz de Rastreabilidade |
| — | — | Revisão dos Critérios de Aceitação |
| — | — | sprint-07.md |
