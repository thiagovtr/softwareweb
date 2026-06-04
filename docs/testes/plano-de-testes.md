# Plano de Testes — DisciplinasUFLA

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

# 3. Casos de Teste

---

## CT01 — Login com E-mail Institucional

| Campo                 | Detalhe                       |
| --------------------- | ----------------------------- |
| Requisito relacionado | RF01                          |
| Pré-condição          | Usuário cadastrado no sistema |

### Passos

1. Acessar a tela de login;
2. Inserir e-mail institucional válido;
3. Inserir senha correta;
4. Clicar em “Entrar”.

### Resultado esperado

O sistema deve autenticar o usuário e redirecioná-lo para a Home.

---

## CT02 — Bloqueio de E-mail Não Institucional

| Campo                 | Detalhe                     |
| --------------------- | --------------------------- |
| Requisito relacionado | RF06                        |
| Pré-condição          | Usuário na tela de cadastro |

### Passos

1. Preencher os dados do formulário;
2. Inserir e-mail não institucional;
3. Enviar cadastro.

### Resultado esperado

O sistema deve impedir o cadastro e exibir mensagem de erro.

---

## CT03 — Upload de Material

| Campo                 | Detalhe             |
| --------------------- | ------------------- |
| Requisito relacionado | RF02                |
| Pré-condição          | Usuário autenticado |

### Passos

1. Acessar a tela de upload;
2. Selecionar arquivo válido;
3. Preencher os campos obrigatórios;
4. Enviar arquivo.

### Resultado esperado

O sistema deve armazenar o arquivo e exibir confirmação de sucesso.

---

## CT04 — Bloqueio de Arquivo Acima de 100MB

| Campo                 | Detalhe             |
| --------------------- | ------------------- |
| Requisito relacionado | RNF01               |
| Pré-condição          | Usuário autenticado |

### Passos

1. Selecionar arquivo acima de 100MB;
2. Tentar realizar upload.

### Resultado esperado

O sistema deve bloquear o envio e exibir mensagem de erro.

---

## CT05 — Download de Arquivo

| Campo                 | Detalhe                       |
| --------------------- | ----------------------------- |
| Requisito relacionado | RF04                          |
| Pré-condição          | Arquivo disponível no sistema |

### Passos

1. Localizar um arquivo;
2. Clicar em “Baixar”.

### Resultado esperado

O download deve iniciar corretamente sem corromper o arquivo.

---

## CT06 — Sistema de Curtidas

| Campo                 | Detalhe             |
| --------------------- | ------------------- |
| Requisito relacionado | RF11                |
| Pré-condição          | Usuário autenticado |

### Passos

1. Localizar um arquivo;
2. Clicar em “Curtir”.

### Resultado esperado

O sistema deve atualizar a quantidade de curtidas corretamente.

---

## CT07 — Busca e Filtro por Disciplina

| Campo                 | Detalhe                            |
| --------------------- | ---------------------------------- |
| Requisito relacionado | RF03 / RF10                        |
| Pré-condição          | Existência de arquivos cadastrados |

### Passos

1. Digitar termo na busca;
2. Selecionar disciplina no filtro.

### Resultado esperado

O sistema deve exibir apenas arquivos relacionados aos filtros aplicados.

---

### CT08 — Cadastro de Usuário 

| Campo                     | Detalhe                |
| ------------------------- | ---------------------- |
| **Requisito relacionado** | RF06                   |
| **Pré-condição**          | Usuário não cadastrado |

**Passos para execução:**

1. Acessar a tela de cadastro
2. Preencher nome, e-mail institucional e senha
3. Clicar em "Cadastrar"

**Resultado esperado:** Usuário cadastrado com sucesso e redirecionado para login ou página inicial.

---

# 4. Matriz de Rastreabilidade

| Requisito | Caso de Teste |
| --------- | ------------- |
| RF01      | CT01          |
| RF02      | CT03          |
| RF03      | CT07          |
| RF04      | CT05          |
| RF06      | CT02          |
| RF10      | CT07          |
| RF11      | CT06          |
| RNF01     | CT04          |
| RF06      | CT08          |
