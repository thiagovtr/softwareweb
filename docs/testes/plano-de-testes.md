# Plano de Testes — DisciplinasUFLA

**Projeto:** DisciplinasUFLA  
**Disciplina:** Engenharia de Software  
**Professor:** Johnatan Oliveira  
**Versão:** 1.0  
**Data:** 30/05/2026  

| Integrante | Papel no Scrum |
|---|---|
| Thiago Vinícius Tristão Rojas | Product Owner |
| Bruno Santos Vilas Boas | Scrum Master |
| Christian Silva Mesquita | Dev Team |
| Guilherme dos Santos Fernandes | Dev Team |
| Matheus Levi Tavares | Dev Team |

---

## 1. Objetivo

Validar os fluxos principais da aplicação DisciplinasUFLA, garantindo que os requisitos funcionais e não funcionais definidos no backlog sejam atendidos antes da entrega final.

---

## 2. Tipos de Teste Aplicados

| Tipo | Descrição |
|---|---|
| **Funcional (Caixa Preta)** | Validação das regras de negócio pela interface do usuário, com foco em entradas e saídas esperadas |
| **Usabilidade** | Verificação de feedback visual (Toasts, alertas) e limite de cliques |
| **Integração** | Validação da comunicação entre frontend (React) e API (Node.js/Express) |

---

## 3. Casos de Teste

---

### CT01 — Validação de Login com E-mail Institucional

| Campo | Detalhe |
|---|---|
| **Status** | ⏳ A executar |
| **Requisito relacionado** | RF01 |
| **Pré-condição** | Usuário não autenticado, cadastrado com e-mail @estudante.ufla.br |

**Passos para execução:**
1. Acessar a tela de login
2. Inserir e-mail `@estudante.ufla.br` e senha correta
3. Clicar em "Entrar"

**Resultado esperado:** Login bem-sucedido. Token JWT gerado e redirecionamento para a Home.

**Resultado obtido:** _A preencher após execução_

**Evidência:** _A anexar após execução_

---

### CT02 — Bloqueio de E-mail Não Institucional no Cadastro

| Campo | Detalhe |
|---|---|
| **Status** | ⏳ A executar |
| **Requisito relacionado** | RF06 |
| **Pré-condição** | Usuário na tela de Cadastro |

**Passos para execução:**
1. Preencher os campos de cadastro
2. Inserir e-mail genérico (ex.: `@gmail.com`)
3. Submeter o formulário

**Resultado esperado:** Sistema bloqueia o cadastro e exibe Toast de erro de validação.

**Resultado obtido:** _A preencher após execução_

**Evidência:** _A anexar após execução_

---

### CT03 — Upload de Material Válido

| Campo | Detalhe |
|---|---|
| **Status** | ⏳ A executar |
| **Requisito relacionado** | RF02 |
| **Pré-condição** | Usuário autenticado |

**Passos para execução:**
1. Clicar em "Enviar Material"
2. Selecionar arquivo PDF de até 100MB
3. Preencher os dados obrigatórios
4. Clicar em "Enviar"

**Resultado esperado:** Arquivo salvo com sucesso. Toast verde de confirmação exibido. Arquivo aparece no feed.

**Resultado obtido:** _A preencher após execução_

**Evidência:** _A anexar após execução_

---

### CT04 — Bloqueio de Arquivo Acima do Limite (RNF01)

| Campo | Detalhe |
|---|---|
| **Status** | ⏳ A executar |
| **Requisito relacionado** | RNF01 |
| **Pré-condição** | Usuário autenticado |

**Passos para execução:**
1. Tentar selecionar arquivo com tamanho superior a 100MB
2. Clicar em "Enviar"

**Resultado esperado:** O middleware Multer rejeita o upload e exibe mensagem de limite excedido ao usuário.

**Resultado obtido:** _A preencher após execução_

**Evidência:** _A anexar após execução_

---

### CT05 — Download de Arquivo (Blob)

| Campo | Detalhe |
|---|---|
| **Status** | ⏳ A executar |
| **Requisito relacionado** | RF04 / RNF07 |
| **Pré-condição** | Usuário autenticado, arquivo disponível no feed |

**Passos para execução:**
1. Localizar um arquivo no feed
2. Clicar no botão "Baixar"

**Resultado esperado:** Download do arquivo iniciado localmente com o nome original, sem abrir novas abas no navegador.

**Resultado obtido:** _A preencher após execução_

**Evidência:** _A anexar após execução_

---

### CT06 — Curtir Material em Tempo Real

| Campo | Detalhe |
|---|---|
| **Status** | ⏳ A executar |
| **Requisito relacionado** | RF11 |
| **Pré-condição** | Usuário autenticado, arquivo disponível no feed |

**Passos para execução:**
1. Localizar um arquivo no feed
2. Clicar no botão "Curtir"

**Resultado esperado:** Contador de curtidas aumenta em +1 imediatamente, sem recarregar a página.

**Resultado obtido:** _A preencher após execução_

**Evidência:** _A anexar após execução_

---

### CT07 — Busca e Filtro por Disciplina

| Campo | Detalhe |
|---|---|
| **Status** | ⏳ A executar |
| **Requisito relacionado** | RF03 / RF10 |
| **Pré-condição** | Existência de arquivos cadastrados no banco |

**Passos para execução:**
1. Digitar um termo na barra de busca
2. Selecionar uma disciplina no filtro

**Resultado esperado:** A grade de arquivos atualiza exibindo apenas os itens que coincidem com os critérios de busca e filtro.

**Resultado obtido:** _A preencher após execução_

**Evidência:** _A anexar após execução_

---

## 4. Matriz de Rastreabilidade (Requisitos × Testes)

| ID Requisito | Descrição | Caso de Teste | Status |
|---|---|---|---|
| RF01 | Login com e-mail institucional | CT01 | ⏳ A executar |
| RF06 | Cadastro com e-mail institucional | CT02 | ⏳ A executar |
| RF02 | Upload de material | CT03 | ⏳ A executar |
| RNF01 | Restrição de tamanho (100MB) | CT04 | ⏳ A executar |
| RF04 / RNF07 | Download e integridade do arquivo | CT05 | ⏳ A executar |
| RF11 | Sistema de curtidas | CT06 | ⏳ A executar |
| RF03 / RF10 | Busca e filtro por disciplina | CT07 | ⏳ A executar |
