# Sprint 02

## 1. Identificação do Grupo

Projeto: DisciplinasUFLA

| Integrante | Papel no Scrum |
|---|---|
| Thiago Vinícius Tristão Rojas | Product Owner |
| Bruno Santos Vilas Boas | Scrum Master |
| Christian Silva Mesquita | Dev Team |
| Guilherme dos Santos Fernandes | Dev Team |
| Matheus Levi Tavares | Dev Team |

Data da Sprint: 11/04/2026 a 25/04/2026



## 2. Objetivo da Sprint 

Identificar, descrever, organizar e priorizar os requisitos da plataforma de compartilhamento de materiais acadêmicos.

## 3. Itens do Sprint Backlog


## 4. Objetivos do Projeto

Objetivo geral:

Desenvolver uma aplicação web que permita o compartilhamento organizado de conteúdos acadêmicos entre estudantes.

Objetivos específicos:

- Permitir o cadastro de usuários
- Permitir autenticação por login
- Permitir o envio de arquivos acadêmicos
- Permitir o download de arquivos
- Facilitar o acesso aos conteúdos compartilhados
- Melhorar a organização dos materiais acadêmicos



## 5. Product Backlog Inicial

| ID | Tipo | Item do backlog | Descrição | Prioridade | Critérios de aceitação | Estimativa | Sprint prevista |
|---|---|---|---|---|---|---|---|
| RF01 | Requisito Funcional | Tela e Lógica de Login | Sistema de autenticação de usuários | Alta | 100% dos logins devem aceitar apenas e-mails institucionais (@estudante.ufla.br) e autenticar em até 2s | 3 pts | Sprint 5 |
| RF02 | Requisito Funcional | Tela de Envio de Material | Interface para upload de arquivos | Alta | Upload deve ser concluído com sucesso em até 5s para arquivos de até 100MB em 95% dos casos | 5 pts | Sprint 5 |
| RF03 | Requisito Funcional | Tela de Busca | Interface para procurar materiais | Média | Busca deve retornar resultados em até 2s e filtrar corretamente em 100% dos testes | 3 pts | Sprint 5 |
| RF04 | Requisito Funcional | Função de Download | Lógica para baixar arquivos | Média | Download deve iniciar em até 2s após clique e completar sem erro em 95% dos casos | 4 pts | Sprint 6 |
| RF05 | Requisito Funcional | Exclusão | Autor pode apagar seu envio | Média | Apenas o autor deve conseguir excluir e a ação deve ser concluída em até 2s em 100% dos testes | 2 pts | Sprint 5 |
| RF06 | Requisito Funcional | Cadastro de Usuário | Criação de conta no sistema | Alta | Cadastro deve ser concluído em até 3s e armazenar corretamente os dados em 100% dos testes | 3 pts | Sprint 4 |
| RF07 | Requisito Funcional | Logout | Encerramento de sessão do usuário | Baixa | Logout deve ser realizado em até 1s em 100% dos testes | 1 pt | Sprint 4 |
| RF08 | Requisito Funcional | Visualização de Arquivos | Listagem de materiais disponíveis | Alta | Lista de arquivos deve carregar em até 2s em 95% dos acessos | 3 pts | Sprint 5 |
| RF09 | Requisito Funcional | Associação de Arquivos | Vincular arquivo ao autor | Alta | 100% dos arquivos devem estar corretamente associados ao usuário que realizou o upload | 2 pts | Sprint 4 |
| RF10 | Requisito Funcional | Filtro por Disciplina | Listar arquivos por disciplina | Média | Filtro deve retornar resultados corretos em até 2s em 95% dos testes | 3 pts | Sprint 6 |
| RF11 | Requisito Funcional | Sistema de Likes | Permitir que usuários curtam arquivos | Média | Usuário autenticado deve conseguir curtir/descurtir um arquivo em até 1s e o sistema deve atualizar a contagem corretamente em 100% dos testes | 3 pts | Sprint 6 |
| RNF01 | Requisito Não Funcional | Restrição de Tamanho | Limite de upload | Alta | 100% dos uploads acima de 100MB devem ser rejeitados automaticamente | 2 pts | Sprint 4 |
| RNF02 | Requisito Não Funcional | Plataforma Web | Execução no navegador | Alta | Sistema deve funcionar em 100% dos testes nos navegadores Chrome, Firefox e Edge (últimas 2 versões) | 1 pt | Sprint 3 |
| RNF03 | Requisito Não Funcional | Usabilidade | Facilidade de uso | Alta | Usuário deve realizar upload ou download em no máximo 3 cliques em 90% dos testes de uso | 5 pts | Sprint 5 |
| RNF04 | Requisito Não Funcional | Estabilidade do Sistema | Operação contínua | Alta | Sistema deve manter disponibilidade ≥ 99% e suportar pelo menos 100 usuários simultâneos sem falhas críticas | 3 pts | Sprint 4 |
| RNF05 | Requisito Não Funcional | Segurança | Proteção de dados | Alta | 100% das senhas devem ser armazenadas com criptografia e acessos não autorizados devem ser bloqueados em testes | 4 pts | Sprint 4 |
| RNF06 | Requisito Não Funcional | Tempo de Resposta | Desempenho geral | Alta | 95% das requisições devem ser respondidas em até 3s | 3 pts | Sprint 5 |
| RNF07 | Requisito Não Funcional | Integridade de Dados | Consistência dos arquivos | Alta | 100% dos arquivos devem manter integridade após upload e download | 3 pts | Sprint 5 |

Histórias de Usuário

### US01
Como estudante, eu quero me cadastrar no sistema usando meu e-mail institucional, para que eu possa acessar a plataforma com segurança.

**Critérios de aceitação:**
- O sistema deve permitir cadastro apenas com e-mails *@estudante.ufla.br*;
- O cadastro deve ser concluído em até 3 segundos;
- O sistema deve impedir cadastros duplicados;

---

### US02
Como usuário, eu quero fazer login no sistema, para que eu possa acessar minhas funcionalidades.

**Critérios de aceitação:**
- O login deve aceitar apenas e-mails institucionais;
- A autenticação deve ocorrer em até 2 segundos;
- O sistema deve exibir erro para credenciais inválidas;

---

### US03
Como usuário, eu quero fazer logout do sistema, para que eu possa encerrar minha sessão com segurança.

**Critérios de aceitação:**
- O logout deve encerrar a sessão em até 1 segundo;
- O usuário deve ser redirecionado para a tela inicial ou login;

---

### US04
Como estudante, eu quero enviar arquivos acadêmicos, para que eu possa compartilhar materiais com outros alunos.

**Critérios de aceitação:**
- Deve existir um botão para selecionar arquivo;
- O upload deve aceitar arquivos de até 100MB;
- O envio deve ser concluído em até 5 segundos em 95% dos casos;
- Apenas usuários autenticados podem enviar arquivos;

---

### US05
Como usuário, eu quero visualizar os arquivos disponíveis, para que eu possa encontrar materiais de estudo.

**Critérios de aceitação:**
- A lista de arquivos deve carregar em até 2 segundos;
- Os arquivos devem exibir informações básicas (nome, autor, disciplina);

---

### US06
Como usuário, eu quero buscar arquivos, para que eu possa encontrar conteúdos específicos.

**Critérios de aceitação:**
- Deve existir uma barra de pesquisa;
- A busca deve retornar resultados em até 2 segundos;
- Os resultados devem ser corretos em 100% dos testes;

---

### US07
Como usuário, eu quero filtrar arquivos por disciplina, para que eu possa facilitar minha busca por conteúdo.

**Critérios de aceitação:**
- Deve existir filtro por disciplina;
- O filtro deve retornar resultados corretos em até 2 segundos;

---

### US08
Como usuário, eu quero baixar arquivos, para que eu possa acessar os materiais offline.

**Critérios de aceitação:**
- O download deve iniciar em até 2 segundos;
- O arquivo deve ser baixado sem corrupção em 95% dos casos;

---

### US09
Como usuário, eu quero que cada arquivo mostre quem enviou, para que eu possa identificar a autoria do material.

**Critérios de aceitação:**
- 100% dos arquivos devem exibir o autor;
- O autor deve ser o usuário que realizou o upload;

---

### US10
Como usuário, eu quero excluir meus arquivos enviados, para que eu possa gerenciar meus conteúdos.

**Critérios de aceitação:**
- Apenas o autor pode excluir o arquivo;
- Deve haver confirmação antes da exclusão;
- A exclusão deve ser concluída em até 2 segundos;

---

### US11
Como usuário, eu quero que o sistema seja rápido e estável, para que não atrapalhe meus estudos.

**Critérios de aceitação:**
- O sistema deve responder em até 3 segundos em 95% das requisições;
- O sistema deve suportar pelo menos 100 usuários simultâneos;
- O sistema deve ter disponibilidade mínima de 99%;

## 6. Planejamento da Sprint 1 e da Sprint 2

Sprint 1:

Durante a Sprint 1 foram realizadas as seguintes atividades:

- Formação do grupo
- Escolha do problema a ser desenvolvido
- Criação do repositório no GitHub
- Criação da estrutura inicial do projeto
- Criação do README.md
- Definição do Product Backlog inicial
- Criação do arquivo sprint-01.md

Sprint 2:

Durante a Sprint 2 serão realizadas as seguintes atividades:

- Levantamento dos requisitos funcionais
- Levantamento dos requisitos não funcionais
- Criação de histórias de usuário
- Priorização do Product Backlog
- Organização dos requisitos no GitHub

## 7. Arquivo docs/sprints/sprint-02.md

O arquivo sprint-02.md foi criado dentro da pasta:

docs/sprints/
