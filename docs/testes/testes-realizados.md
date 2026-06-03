# Evidências de Testes

**Projeto:** DisciplinasUFLA  
**Data de Execução:** 03/06/2026
**Responsável pela execução:** Dev Team  
**Versão testada:** Sprint 07 → Sprint 08  

---

## 1. Resultado Geral

| ID | Cenário de Teste | Resultado | Status |
|---|---|---|---|
| CT01 | Validação de Login com E-mail Institucional | Aprovado | ✅ |
| CT02 | Bloqueio de E-mail Não Institucional no Cadastro | Aprovado | ✅ |
| CT03 | Upload de Material Válido | Aprovado | ✅ |
| CT04 | Bloqueio de Arquivo Acima do Limite | Aprovado | ✅ |
| CT05 | Download de Arquivo (Blob) | Aprovado | ✅ |
| CT06 | Curtir Material em Tempo Real | Aprovado | ✅ |
| CT07 | Busca e Filtro por Disciplina | Aprovado | ✅ |

---

## 2. Detalhamento dos Casos de Teste

### CT01 — Validação de Login com E-mail Institucional ✅

| Campo | Detalhe |
|---|---|
| **Status** | ✅ Aprovado |
| **Data de execução** | 03/06/2026 |
| **Executado por** | Dev Team |
| **Pré-condição** | Usuário cadastrado com e-mail @estudante.ufla.br |

**Passos executados:**
1. Acessou-se a tela de login da aplicação
2. Inserido e-mail `@estudante.ufla.br` e senha correta
3. Clicado em "Entrar"

**Resultado esperado:** Login bem-sucedido. Token JWT gerado e redirecionamento para a Home.

**Resultado obtido:** Login realizado com sucesso. Token JWT gerado corretamente e usuário redirecionado para a página principal.

**Evidência 1:**

> <img width="1920" height="947" alt="{CB004C3B-BA1B-4AD2-833F-E98029BF4849}" src="https://github.com/user-attachments/assets/4e973d38-f98f-4bfb-9f23-a47d13e38038" />

**Evidência 2:**

> <img width="1920" height="947" alt="{FED44274-9DB3-42C7-8F58-D902C71B5525}" src="https://github.com/user-attachments/assets/2ec5c42f-e0b2-48e1-9dd9-c58b159c2ded" />

---

### CT02 — Bloqueio de E-mail Não Institucional no Cadastro ✅

| Campo | Detalhe |
|---|---|
| **Status** | ✅ Aprovado |
| **Data de execução** | 03/06/2026 |
| **Executado por** | Dev Team |
| **Pré-condição** | Usuário na tela de Cadastro |

**Passos executados:**
1. Acessou-se a tela de cadastro
2. Preenchidos os campos com e-mail genérico (ex.: `@gmail.com`)
3. Submetido o formulário

**Resultado esperado:** Sistema bloqueia o cadastro e exibe Toast de erro de validação.

**Resultado obtido:** Cadastro bloqueado com sucesso. Toast de erro exibido informando que apenas e-mails `@estudante.ufla.br` são aceitos.

**Evidência 1:**

> <img width="1920" height="945" alt="{927DF9AC-E54B-4C57-8639-DE7F85CEB0D4}" src="https://github.com/user-attachments/assets/d292b820-4b22-4c06-84e7-2b85276a6e58" />


**Evidência 2:**

> <img width="1920" height="944" alt="{7C110716-751E-44C0-A4B8-AABA876143B9}" src="https://github.com/user-attachments/assets/74118bab-c9fc-4c6b-be80-249e084762d5" />

---

### CT03 — Upload de Material Válido ✅

| Campo | Detalhe |
|---|---|
| **Status** | ✅ Aprovado |
| **Data de execução** | 03/06/2026 |
| **Executado por** | Dev Team |
| **Pré-condição** | Usuário autenticado |

**Passos executados:**
1. Clicado em "Enviar Material"
2. Selecionado arquivo PDF de até 100MB
3. Preenchidos os dados obrigatórios (nome, disciplina)
4. Clicado em "Enviar"

**Resultado esperado:** Arquivo salvo com sucesso. Toast verde de confirmação exibido. Arquivo aparece no feed.

**Resultado obtido:** Upload realizado com sucesso dentro do tempo esperado. Toast verde de confirmação exibido. Arquivo listado corretamente no feed com nome e autor.

**Evidência 1:**

> <img width="1920" height="944" alt="{6725FED1-0C55-44D3-B2BD-17F264728F1B}" src="https://github.com/user-attachments/assets/341f9b15-61dc-432b-89aa-4db065cc6eab" />

**Evidência 2:**

> <img width="1920" height="943" alt="{A252C8DD-DC3D-4628-B54C-C74DFC75E1B1}" src="https://github.com/user-attachments/assets/aa474225-a031-40b4-9951-8e658ea12280" />

**Evidência 3:**

> <img width="1920" height="943" alt="{42E9249C-E86A-4F30-BB55-4927131A2ABB}" src="https://github.com/user-attachments/assets/73d122fd-c4b7-4207-8112-1313469c5002" />

---

### CT04 — Bloqueio de Arquivo Acima do Limite — RNF01 ✅

| Campo | Detalhe |
|---|---|
| **Status** | ✅ Aprovado |
| **Data de execução** | 03/06/2026 |
| **Executado por** | Dev Team |
| **Pré-condição** | Usuário autenticado |

**Passos executados:**
1. Tentou-se selecionar e enviar arquivo com tamanho superior a 100MB
2. Clicado em "Enviar"

**Resultado esperado:** O middleware Multer rejeita o upload e exibe mensagem de limite excedido ao usuário.

**Resultado obtido:** O middleware Multer realmente rejeitou o upload e exibe mensagem de limite excedido ao usuário.

**Evidência 1:**

> <img width="673" height="29" alt="{30937F64-4B2C-4B47-B60C-8E852420F8A1}" src="https://github.com/user-attachments/assets/5bff74f5-953d-4932-ae9a-a804d20def0a" />

**Evidência 2:**

> <img width="1920" height="943" alt="{53F38189-5D70-4058-A071-2C5B14D340E8}" src="https://github.com/user-attachments/assets/0b5d4362-75dd-4e11-9a3d-835216f94c88" />

---

### CT05 — Download de Arquivo (Blob) ✅

| Campo | Detalhe |
|---|---|
| **Status** | ✅ Aprovado |
| **Data de execução** | 03/06/2026 |
| **Executado por** | Dev Team |
| **Pré-condição** | Usuário autenticado, arquivo disponível no feed |

**Passos executados:**
1. Localizado um arquivo no feed
2. Clicado no botão "Baixar"

**Resultado esperado:** Download do arquivo iniciado localmente com o nome original, sem abrir novas abas no navegador.

**Resultado obtido:** Download iniciado corretamente com o nome original do arquivo. Nenhuma nova aba foi aberta. Arquivo baixado sem corrupção.

**Evidência:**

> <img width="1920" height="945" alt="{A4FB3951-8F20-4584-BF6F-30538DD7769F}" src="https://github.com/user-attachments/assets/2b094c57-9547-435a-ba7c-54f5a7cd2e72" />

---

### CT06 — Curtir Material em Tempo Real ✅

| Campo | Detalhe |
|---|---|
| **Status** | ✅ Aprovado |
| **Data de execução** | 03/06/2026 |
| **Executado por** | Dev Team |
| **Pré-condição** | Usuário autenticado, arquivo disponível no feed |

**Passos executados:**
1. Localizado um arquivo no feed
2. Clicado no botão "Curtir"

**Resultado esperado:** Contador de curtidas aumenta em +1 imediatamente, sem recarregar a página.

**Resultado obtido:** Contador atualizado em +1 imediatamente após o clique, sem recarregamento da página. Ao clicar novamente, o contador decrementou corretamente (descurtir).

**Evidência:**

> 📷 _Cole aqui a captura de tela mostrando o contador de curtidas antes e após o clique_

---

### CT07 — Busca e Filtro por Disciplina ✅

| Campo | Detalhe |
|---|---|
| **Status** | ✅ Aprovado |
| **Data de execução** | 03/06/2026 |
| **Executado por** | Dev Team |
| **Pré-condição** | Existência de arquivos cadastrados no banco |

**Passos executados:**
1. Digitado um termo na barra de busca
2. Selecionada uma disciplina no filtro

**Resultado esperado:** A grade de arquivos atualiza exibindo apenas os itens que coincidem com os critérios de busca e filtro.

**Resultado obtido:** A grade filtrou corretamente os arquivos conforme o termo digitado e a disciplina selecionada. Arquivos não correspondentes foram ocultados. Resultados retornados dentro do tempo esperado (< 2s).

**Evidência 1:**

> <img width="347" height="528" alt="{06BF0135-EB1A-4246-999E-380B9E95E686}" src="https://github.com/user-attachments/assets/ba5831b2-0be8-4d5e-a488-8d0b795ad09c" />

**Evidência 2:**

> <img width="323" height="499" alt="{6C913EEA-6CC4-4A5A-A989-816E12FA8067}" src="https://github.com/user-attachments/assets/8bc25f05-9907-459f-88d5-2a201e347e69" />


---

## 3. Matriz de Resultados Consolidada

| ID | Cenário | Requisito | Resultado | Observação |
|---|---|---|---|---|
| CT01 | Login com e-mail institucional | RF01 | ✅ Aprovado | — |
| CT02 | Bloqueio de e-mail não institucional | RF06 | ✅ Aprovado | — |
| CT03 | Upload de material válido | RF02 | ✅ Aprovado | — |
| CT04 | Bloqueio de arquivo > 100MB | RNF01 | ✅ Aprovado | — |
| CT05 | Download de arquivo (Blob) | RF04 / RNF07 | ✅ Aprovado | — |
| CT06 | Curtir material em tempo real | RF11 | ✅ Aprovado | — |
| CT07 | Busca e filtro por disciplina | RF03 / RF10 | ✅ Aprovado | — |

---

## 4. Bugs Identificados

---

## 5. Conclusão

Dos 7 casos de teste executados, **7 foram aprovados (≈ 100%)**.

Os fluxos principais da aplicação — autenticação com e-mail institucional, upload de materiais válidos, download, curtidas e filtros — estão funcionando corretamente conforme os critérios de aceitação definidos na Sprint 2.
