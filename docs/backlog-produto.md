# Product Backlog

## 1. Visão geral
O Product Backlog reúne as funcionalidades, necessidades e melhorias da solução proposta.

## 2. Estratégia de priorização
A priorização focou na base essencial do sistema. Colocamos com prioridade "Alta" a criação da tela de login e a função básica de enviar arquivos. Funcionalidades como o download e os filtros para buscar resumos ficaram para as próximas etapas.

---

## 3. Backlog do produto
| ID | Tipo | Item do backlog | Descrição | Prioridade | Critérios de aceitação | Estimativa | Sprint prevista |
|---|---|---|---|---|---|---|---|
| RF01 | Requisito Funcional | Tela e Lógica de Login | Sistema de autenticação de usuários | Alta | 100% dos logins devem aceitar apenas e-mails institucionais (@ufla.br) e autenticar em até 2s | 3 pts | Sprint 5 |
| RF02 | Requisito Funcional | Tela de Envio de Material | Interface para upload de arquivos | Alta | Upload deve ser concluído com sucesso em até 5s para arquivos de até 100MB em 95% dos casos | 5 pts | Sprint 5 |
| RF03 | Requisito Funcional | Tela de Busca | Interface para procurar materiais | Média | Busca deve retornar resultados em até 2s e filtrar corretamente em 100% dos testes | 3 pts | Sprint 5 |
| RF04 | Requisito Funcional | Função de Download | Lógica para baixar arquivos | Média | Download deve iniciar em até 2s após clique e completar sem erro em 95% dos casos | 4 pts | Sprint 6 |
| RF05 | Requisito Funcional | Exclusão | Autor pode apagar seu envio | Média | Apenas o autor deve conseguir excluir e a ação deve ser concluída em até 2s em 100% dos testes | 2 pts | Sprint 5 |
| RNF01 | Requisito Não Funcional | Restrição de Tamanho | Limite de upload | Alta | 100% dos uploads acima de 100MB devem ser rejeitados automaticamente | 2 pts | Sprint 4 |
| RNF02 | Requisito Não Funcional | Plataforma Web | Execução no navegador | Alta | Sistema deve funcionar em 100% dos testes nos navegadores Chrome, Firefox e Edge (últimas 2 versões) | 1 pt | Sprint 3 |
| RNF03 | Requisito Não Funcional | Usabilidade | Facilidade de uso | Alta | Usuário deve realizar upload ou download em no máximo 3 cliques em 90% dos testes de uso | 5 pts | Sprint 5 |
| RNF04 | Requisito Não Funcional | Estabilidade do Sistema | Operação contínua | Alta | Sistema deve manter disponibilidade ≥ 99% e suportar pelo menos 100 usuários simultâneos sem falhas críticas | 3 pts | Sprint 4 |
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

**US04**  
**Critérios de aceitação:**
- O botão de exclusão deve pedir uma confirmação adicional para evitar exclusões acidentais.
- Deve existir uma área onde mostre todos os envios no perfil do usuário.
