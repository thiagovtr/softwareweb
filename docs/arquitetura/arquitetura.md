## 1. Visão Geral da Arquitetura

O sistema DisciplinasUFLA foi projetado combinando estilos arquiteturais para garantir escalabilidade e manutenção. Em um escopo macro, o sistema adota a arquitetura Cliente-Servidor (Client-Server). Internamente, para o gerenciamento de persistência e regras de negócio, o backend utiliza a Arquitetura de Repositório em conjunto com uma estrutura em camadas.

Toda a infraestrutura da aplicação é conteinerizada via Docker, garantindo isolamento entre os ambientes.

---

## 2. Padrões Arquiteturais Adotados

### 2.1. Arquitetura de Repositório 
O núcleo do backend foi desenhado utilizando o padrão de Repositório. Isso significa que a aplicação possui um ponto central de persistência e estado (o banco de dados PostgreSQL) e o acesso a esses dados é intermediado e abstraído por uma camada específica de repositório.
* **Isolamento:** As regras de negócio não conhecem a linguagem SQL. Elas solicitam dados à camada de repositório.
* **Vantagem:** Se o banco de dados mudar no futuro, apenas a camada do repositório precisa ser alterada, mantendo o restante do sistema intacto.

### 2.2. Cliente-Servidor 
A aplicação desacopla totalmente a interface de usuário da lógica de processamento:
* **Cliente (React):** Consome os dados, gerencia o estado da interface (UI) e lida com as interações do usuário de forma reativa.
* **Servidor (Node.js/Express):** Fornece uma API RESTful, processa as requisições, valida a autenticação (JWT) e orquestra a comunicação com o Repositório de dados.

### 2.3. Arquitetura em Camadas
Para suportar o padrão de repositório, o servidor foi subdividido em:
1. **Routes (Roteamento):** Recebe e mapeia as requisições HTTP.
2. **Controllers (Controladores):** Trata a entrada e saída (JSON), além de lidar com uploads (Multer).
3. **Services (Serviços):** Contém a lógica de negócio principal e validações de sistema.
4. **Repositories/ORM:** A camada de repositório propriamente dita, gerenciada pelo Prisma Client, que interage com o PostgreSQL.

---

## 3. Stack Tecnológico

### 3.1. Frontend (Apresentação)
* **Framework:** React.js construído com Vite.
* **Estilização:** TailwindCSS.
* **Navegação e UX:** React Router Dom, SweetAlert2 e React Toastify.

### 3.2. Backend (Lógica de Negócios e Repositório)
* **Framework Web:** Node.js com Express.
* **Segurança:** Autenticação stateless via JSON Web Tokens (JWT) e criptografia com Bcrypt.
* **Gerenciamento de Arquivos:** Multer para processamento multipart/form-data.

### 3.3. Persistência de Dados (Repositório)
* **Banco de Dados Relacional:** PostgreSQL.
* **Mapeamento Objeto-Relacional (ORM):** Prisma. Ele atua como o motor do padrão de Repositório, fornecendo consultas tipadas seguras e gerenciamento automatizado de migrações estruturais.

---

## 4. Diagrama Estrutural da Aplicação

O fluxo de comunicação e a separação do Repositório funcionam da seguinte forma:

```text
[ Interface do Usuário / Navegador ]
          |
          | (Requisições HTTP / JSON)
          v
+-----------------------------------+
|            FRONTEND               |
|      (Cliente React / Vite)       |
+-----------------------------------+
          |
          | (API RESTful)
          v
+-----------------------------------+
|             BACKEND               |
|          (Servidor Node)          |
|                                   |
|  1. Controllers (Entrada/Saída)   |
|  2. Services (Regras de Negócio)  |
|                                   |
|  +-----------------------------+  |
|  |       REPOSITÓRIO           |  | <-- Centralização do acesso aos dados
|  |      (Prisma Client)        |  |
|  +-----------------------------+  |
+-----------------------------------+
          |
          | (Operações SQL via Repositório)
          v
+-----------------------------------+
|         BANCO DE DADOS            |
|          (PostgreSQL)             |
+-----------------------------------+