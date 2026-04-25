# Product Backlog

## 1. Visão geral
O Product Backlog reúne as funcionalidades, necessidades e melhorias da solução proposta.

## 2. Estratégia de priorização
A priorização focou na base essencial do sistema. Colocamos com prioridade "Alta" a criação da tela de login e a função básica de enviar arquivos. Funcionalidades como o download e os filtros para buscar resumos ficaram para as próximas etapas.

---

## 3. Backlog do produto
| ID | Tipo | Item do backlog | Descrição | Prioridade | Critérios de aceitação | Estimativa | Sprint prevista |
|---|---|---|---|---|---|---|---|
| RF01 | Requisito Funcional | Tela e Lógica de Login | Sistema de autenticação de usuários | Alta | Permitir cadastro e login apenas com e-mails da UFLA | 3 pts | Sprint 5 |
| RF02 | Requisito Funcional | Tela de Envio de Material | Interface para o aluno fazer upload | Alta | Ter um botão para selecionar o arquivo | 5 pts | Sprint 5 |
| RF03 | Requisito Funcional | Tela de Busca | Interface para procurar resumos, slides e exercícios | Média | Ter uma barra de pesquisa e filtrar materiais pelo nome da disciplina | 3 pts | Sprint 5 |
| RF04 | Requisito Funcional | Função de Download | Lógica para baixar o arquivo salvo | Média | Fazer o download do material correspondente ao clicar no botão | 4 pts | Sprint 6 |
| RNF01 | Requisito Não Funcional | Restrição de Tamanho do Arquivo | Limite máximo de armazenamento por upload | Alta | O tamanho do arquivo não pode ultrapassar 100MB | 2 pts | Sprint 4 |
| RNF02 | Requisito Não Funcional | Plataforma Web | O sistema deve ser executado em navegadores web | Alta | O sistema deve rodar via web sem precisar de instalação local | 1 pt | Sprint 3 |

---

## 4. Histórias de Usuário
**US01**  
Como estudante que tem bons resumos, eu quero acessar uma tela de envio de arquivos simples e intuitiva, para que eu possa compartilhar meu material com os outros alunos.

**Critérios de aceitação:**
- Deve ter filtro por disciplina;
- Deve ter filtro por tipo de material, como resumos ou lista de atividades;
- Deve haver um botão para selecionar arquivo que a pessoa quer enviar;

**US02**  
Como estudante, eu quero poder filtrar as atividades ou resumos antigos pelo ano ou semestre, para que eu possa focar em estudar o formato mais recente de cobrança dos professores.

**Critérios de aceitação:**
- A tela de busca deve ter um filtro chamado "Ano/Semestre".

**US03**  
Como usuário da comunidade acadêmica, eu quero entrar no sistema usando meu e-mail institucional, para garantir que o ambiente seja restrito e seguro.

**Critérios de aceitação:**
- O sistema deve validar o domínio do e-mail.