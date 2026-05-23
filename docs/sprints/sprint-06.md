# Sprint 06

## 1. Identificação do Grupo

Projeto: DisciplinasUFLA

| Integrante | Papel no Scrum |
|---|---|
| Thiago Vinícius Tristão Rojas | Product Owner |
| Bruno Santos Vilas Boas | Scrum Master |
| Christian Silva Mesquita | Dev Team |
| Guilherme dos Santos Fernandes | Dev Team |
| Matheus Levi Tavares | Dev Team |

Data da Sprint: 16/05/2026 a 23/05/2026


## 2. Objetivo da Sprint

Definir e documentar a arquitetura da aplicação DisciplinasUFLA, descrevendo sua estrutura, componentes, responsabilidades e comunicação entre frontend, backend e banco de dados.

## 3.  Visão Arquitetural da Solução

O sistema DisciplinasUFLA foi desenvolvido seguindo uma arquitetura em camadas, separando frontend, backend e banco de dados.

A aplicação utiliza:

* Frontend web para interação com os usuários;
* Backend responsável pelas regras de negócio e API REST;
* Banco de dados PostgreSQL para persistência das informações;
* Docker para padronização e automação do ambiente de execução.

A comunicação entre frontend e backend ocorre por meio de requisições HTTP utilizando API REST.

---

## 4. Arquitetura da Aplicação

## Frontend

Responsável pela interface visual do sistema e interação com os usuários.

### Tecnologias:

* React
* TypeScript
* Tailwind CSS
* Axios
* React Router DOM

### Responsabilidades:

* Cadastro e login de usuários;
* Upload de arquivos;
* Busca de materiais;
* Filtro por disciplina;
* Exibição de arquivos;
* Curtidas e exclusão de arquivos.

---

## Backend

Responsável pelas regras de negócio, autenticação e comunicação com o banco de dados.

### Tecnologias:

* Node.js
* Express
* Prisma ORM
* JWT
* Multer
* BcryptJS

### Responsabilidades:

* Autenticação de usuários;
* Controle de uploads;
* Gerenciamento de arquivos;
* Controle de curtidas;
* Validação de permissões;
* Comunicação com banco de dados.

---

## Banco de Dados

### Tecnologia:

* PostgreSQL

### Responsabilidades:

* Armazenamento de usuários;
* Armazenamento de arquivos;
* Armazenamento de disciplinas;
* Persistência de curtidas.

---

## Infraestrutura

### Tecnologias:

* Docker
* Docker Compose

### Responsabilidades:

* Automatização da execução do projeto;
* Padronização do ambiente;
* Integração entre frontend, backend e banco de dados.

---

---

## 5. Organização em Camadas

A arquitetura foi organizada nas seguintes camadas:

## Camada de Apresentação

Responsável pela interface do usuário no frontend React.

## Camada de Controle

Responsável pelos Controllers do backend, recebendo requisições HTTP e retornando respostas.

## Camada de Serviço

Responsável pelas regras de negócio da aplicação.

## Camada de Persistência

Responsável pelo acesso ao banco de dados utilizando Prisma ORM.
---

## 6. Justificativa da Arquitetura

A arquitetura em camadas foi escolhida por proporcionar:

* Melhor organização do código;
* Separação de responsabilidades;
* Facilidade de manutenção;
* Escalabilidade futura;
* Facilidade de testes;
* Reutilização de componentes.

O uso do Docker foi adotado para facilitar a execução do sistema em diferentes ambientes e simplificar a configuração do projeto.

---

## 7. Relação entre Arquitetura e Requisitos

A arquitetura adotada atende diretamente aos requisitos definidos no backlog do produto.

Exemplos:

* O backend com JWT atende os requisitos de autenticação e segurança;
* O PostgreSQL garante persistência e integridade dos dados;
* O Docker facilita a disponibilidade e execução do sistema;
* A separação frontend/backend melhora manutenção e desempenho.

---

## 8. Estrutura da Aplicação

## Backend

* Controllers
* Services
* Middlewares
* Configs
* Routes
* Prisma

## Frontend

* Pages
* Components
* Services
* Routes

-----

## 9. Incrementos Produzidos na Sprint

* Definição da arquitetura do sistema;
* Organização estrutural do projeto;
* Configuração completa com Docker;
* Integração entre frontend, backend e banco de dados;
* Automatização de migrations e seed do Prisma;
* Padronização do ambiente de execução.


*Arquivo de documentação gerado:* docs/sprints/sprint-06.md