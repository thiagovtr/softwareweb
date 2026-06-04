# Evidências de Testes — DisciplinasUFLA

**Projeto:** DisciplinasUFLA  
**Data:** 03/06/2026  
**Responsáveis:** Dev Team

---

## 1. Resultado Geral

| ID   | Cenário                              | Status |
| ---- | ------------------------------------ | ------ |
| CT01 | Login institucional                  | ✅      |
| CT02 | Bloqueio de e-mail não institucional | ✅      |
| CT03 | Upload de material                   | ✅      |
| CT04 | Bloqueio de arquivo > 100MB          | ✅      |
| CT05 | Download de arquivo                  | ✅      |
| CT06 | Curtidas                             | ✅      |
| CT07 | Busca e filtro                       | ✅      |
| CT08 | Cadastro de Usuário                  | ✅      |

---

## 2. Casos de Teste

### CT01 — Login Institucional

**Resultado esperado:** Login realizado com sucesso.

**Resultado obtido:** Login funcionando corretamente.

**Evidência 1:**

> <img width="1920" height="947" alt="{CB004C3B-BA1B-4AD2-833F-E98029BF4849}" src="https://github.com/user-attachments/assets/4e973d38-f98f-4bfb-9f23-a47d13e38038" />

**Evidência 2:**

> <img width="1920" height="947" alt="{FED44274-9DB3-42C7-8F58-D902C71B5525}" src="https://github.com/user-attachments/assets/2ec5c42f-e0b2-48e1-9dd9-c58b159c2ded" />

---

### CT02 — Bloqueio de E-mail Não Institucional

**Resultado esperado:** Cadastro bloqueado.

**Resultado obtido:** Sistema bloqueou corretamente e exibiu mensagem de erro.

**Evidência 1:**

> <img width="1920" height="945" alt="{927DF9AC-E54B-4C57-8639-DE7F85CEB0D4}" src="https://github.com/user-attachments/assets/d292b820-4b22-4c06-84e7-2b85276a6e58" />

**Evidência 2:**

> <img width="1920" height="944" alt="{7C110716-751E-44C0-A4B8-AABA876143B9}" src="https://github.com/user-attachments/assets/74118bab-c9fc-4c6b-be80-249e084762d5" />

---

### CT03 — Upload de Material

**Resultado esperado:** Arquivo enviado e exibido no feed.

**Resultado obtido:** Upload realizado com sucesso.

**Evidência 1:**

> <img width="1920" height="944" alt="{6725FED1-0C55-44D3-B2BD-17F264728F1B}" src="https://github.com/user-attachments/assets/341f9b15-61dc-432b-89aa-4db065cc6eab" />

**Evidência 2:**

> <img width="1920" height="943" alt="{A252C8DD-DC3D-4628-B54C-C74DFC75E1B1}" src="https://github.com/user-attachments/assets/aa474225-a031-40b4-9951-8e658ea12280" />

**Evidência 3:**

> <img width="1920" height="943" alt="{42E9249C-E86A-4F30-BB55-4927131A2ABB}" src="https://github.com/user-attachments/assets/73d122fd-c4b7-4207-8112-1313469c5002" />

---

### CT04 — Arquivo Acima de 100MB

**Resultado esperado:** Upload rejeitado.

**Resultado obtido:** Sistema bloqueou corretamente o envio.

**Evidência 1:**

> <img width="673" height="29" alt="{30937F64-4B2C-4B47-B60C-8E852420F8A1}" src="https://github.com/user-attachments/assets/5bff74f5-953d-4932-ae9a-a804d20def0a" />

**Evidência 2:**

> <img width="1920" height="943" alt="{53F38189-5D70-4058-A071-2C5B14D340E8}" src="https://github.com/user-attachments/assets/0b5d4362-75dd-4e11-9a3d-835216f94c88" />

---

### CT05 — Download de Arquivo

**Resultado esperado:** Download iniciado corretamente.

**Resultado obtido:** Download realizado sem erros.

**Evidência:**

> <img width="1920" height="945" alt="{A4FB3951-8F20-4584-BF6F-30538DD7769F}" src="https://github.com/user-attachments/assets/2b094c57-9547-435a-ba7c-54f5a7cd2e72" />

---

### CT06 — Curtidas

**Resultado esperado:** Atualização imediata da curtida.

**Resultado obtido:** Curtidas funcionando corretamente.

**Evidência 1:**

> <img width="347" height="528" alt="{06BF0135-EB1A-4246-999E-380B9E95E686}" src="https://github.com/user-attachments/assets/ba5831b2-0be8-4d5e-a488-8d0b795ad09c" />

**Evidência 2:**

> <img width="323" height="499" alt="{6C913EEA-6CC4-4A5A-A989-816E12FA8067}" src="https://github.com/user-attachments/assets/8bc25f05-9907-459f-88d5-2a201e347e69" />

---

### CT07 — Busca e Filtro

**Resultado esperado:** Exibir arquivos corretos.

**Resultado obtido:** Busca e filtros funcionando corretamente.

**Evidência 1:**

> <img width="491" height="582" alt="{A26EBD37-0F4D-4C9A-BEDE-815A7E2FB78C}" src="https://github.com/user-attachments/assets/07bedf36-22bf-4ab6-a2ce-c9a4516783e0" />

**Evidência 2:**

> <img width="1920" height="946" alt="{EC56A75A-E8C2-48DC-94DA-D267B239FA25}" src="https://github.com/user-attachments/assets/454c33a8-b5af-4ec2-8592-2fdde2080087" />

---

### CT08 — Cadastro de Usuário 

**Resultado esperado:** Usuário cadastrado com sucesso.

**Resultado obtido:** Cadastro realizado corretamente utilizando e-mail institucional.

**Evidência 1:**

<img width="1919" height="909" alt="image" src="https://github.com/user-attachments/assets/a2f2920b-4609-4cf6-8b3d-41a94e11a810" />

**Evidência 2: **

<img width="1905" height="911" alt="image" src="https://github.com/user-attachments/assets/ddd4d3dd-c3c7-46e1-9982-2357dac083dd" />

---

## 3. Bugs Identificados

Nenhum bug crítico encontrado.

---

## 4. Conclusão

Todos os testes executados foram aprovados. As principais funcionalidades do sistema estão funcionando corretamente.
