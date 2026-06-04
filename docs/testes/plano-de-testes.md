# Evidências de Testes — DisciplinasUFLA

**Projeto:** DisciplinasUFLA  
**Disciplina:** Engenharia de Software  
**Professor:** Johnatan Oliveira  
**Data:** 30/05/2026

| Integrante                     | Papel no Scrum |
| ------------------------------ | -------------- |
| Thiago Vinícius Tristão Rojas  | Product Owner  |
| Bruno Santos Vilas Boas        | Scrum Master   |
| Christian Silva Mesquita       | Dev Team       |
| Guilherme dos Santos Fernandes | Dev Team       |
| Matheus Levi Tavares           | Dev Team       |

---

# 1. Objetivo

Validar os principais fluxos da aplicação DisciplinasUFLA, garantindo que os requisitos funcionais e não funcionais definidos no backlog sejam atendidos.

---

# 2. Tipos de Teste Aplicados

| Tipo                    | Descrição                                               |
| ----------------------- | ------------------------------------------------------- |
| Funcional (Caixa Preta) | Validação das funcionalidades pela interface do usuário |
| Usabilidade             | Verificação da experiência do usuário e feedback visual |
| Integração              | Testes de comunicação entre frontend e backend          |

---

### CT02 — Bloqueio de E-mail Não Institucional

---

## CT01 — Login com E-mail Institucional

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

### CT07 — Busca e Filtro

**Resultado esperado:** Usuário cconseguir cadastar com o email institucional.

**Resultado obtido:** Usuário cadastrado com sucesso e redirecionado para login ou página inicial.

**Evidência 1:**



**Evidência 2:**



---

## 4. Bugs Identificados

Nenhum bug crítico encontrado.

---
