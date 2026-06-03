## DisciplinasUFLA
Sistema web para compartilhamento de materiais acadêmicos entre estudantes da Universidade Federal de Lavras (UFLA).

## Desenvolvendo uma aplicação Web
Trabalho Final em grupo para a Disciplina de GCC188 - Engenharia de Software no Curso de Sistemas de Informação na Universidade Federal de Lavras (UFLA).

## 1. Identificação do projeto
**Nome do projeto:** DisciplinasUFLA  

**Problema escolhido:**  
Dificuldade em compartilhar conteúdos acadêmicos para os estudantes da UFLA.  

**Solução escolhida:**  
Desenvolver uma aplicação web que permite o compartilhamento  de arquivos entre estudantes para facilitar o acesso a conteúdos acadêmicos.  
**Turma/Semestre:** 2026/01  
**Docente:** Johnatan Oliveira

## 2. Contextualização do Problema

Atualmente, muitos estudantes encontram dificuldades para acessar materiais acadêmicos compartilhados por outros colegas. A troca de conteúdos costuma ocorrer por meio de grupos em aplicativos de mensagens ou redes sociais, o que pode gerar desorganização e dificuldade para localizar arquivos importantes.

Além disso, a ausência de um local centralizado para armazenar conteúdos acadêmicos dificulta o acesso rápido às informações e prejudica o processo de estudo dos alunos.

## 3. Justificativa da Proposta de Solução

A criação de uma aplicação web específica para compartilhamento de conteúdos acadêmicos permitirá organizar melhor os materiais disponibilizados pelos estudantes.

Com essa solução, será possível facilitar o acesso aos conteúdos, melhorar a organização dos arquivos e contribuir para o aprendizado coletivo. Além disso, a plataforma permitirá que os estudantes encontrem rapidamente os materiais necessários para seus estudos.

## 4. Definição Preliminar do Produto

Será desenvolvido um sistema web para compartilhamento de conteúdos acadêmicos entre estudantes.

**Funcionalidades principais:**

- Cadastro de usuários
- Login com autenticação JWT
- Upload de arquivos acadêmicos
- Download de arquivos
- Visualização de materiais
- Sistema de curtidas
- Sistema de favoritos
- Comentários em arquivos
- Perfil do usuário
- Edição e exclusão de materiais
- Visualizador de imagens integrado
- Modo escuro (Dark Mode)

O sistema será acessado por meio de navegadores web e utilizado por estudantes da universidade.

## 5. Integrantes do grupo
- Thiago Vinícius Tristão Rojas — Product Owner  
- Bruno Santos Vilas Boas — Scrum Master  
- Christian Silva Mesquita — Dev Team  
- Guilherme dos Santos Fernandes — Dev Team  
- Matheus Levi Tavares — Dev Team  

## 6. Organização Inicial do Projeto em Formato Ágil

O projeto será desenvolvido utilizando a metodologia Scrum, organizada em sprints semanais.

O grupo utilizou:
- Product Backlog
- Sprint Backlog
- Kanban
- Controle de versionamento com Git e GitHub

As atividades foram registradas no repositório GitHub ao longo de todas as sprints.

## 7. Definição do Escopo da Aplicação Web

O sistema contempla:

- autenticação de usuários;
- gerenciamento de materiais acadêmicos;
- upload e download de arquivos;
- interação entre usuários;
- organização por disciplinas;
- mecanismos de busca e favoritos.

Funcionalidades adicionais foram incorporadas ao longo das sprints conforme a evolução incremental do projeto.

## 8. Tecnologias Utilizadas

**Frontend**

- React
- TypeScript
- Tailwind CSS
- Axios
- React Router DOM
- Vite

**Backend**

- Node.js
- Express
- TypeScript
- Prisma ORM
- JWT Authentication
- Multer

**Banco de Dados**

- PostgreSQL

**Infraestrutura**

- Docker
- Docker Compose

## 9. Como executar o projeto

**Pré-requisitos**

- Docker Desktop instalado

**1. Clonar o repositório**

``git clone <URL_DO_REPOSITORIO>``

**2. Criar o arquivo .env**

Dentro da pasta backend, copie o arquivo ``.env.example`` e renomeie para ``.env``

**3. Executar o projeto**

Na raiz do projeto, execute:

``docker compose up --build``

**4. Acessar a aplicação**

**Frontend:**

http://localhost:5173

## 10. Sprints do Projeto

Sprint 1 – Definição do problema e visão do produto  
Sprint 2 - Levantemento e priorização de requisitos funcionais e não-funcionais  
Sprint 3 – Modelagem do sistema  
Sprint 4 – Princípios de Projeto  
Sprint 5 - Aplicação da padronização do Projeto  
Sprint 6 - Definição da Arquitetura de Software  
Sprint 7 - Planejamento e documentação de testes  
Sprint 8 - Consolidação do projeto, revisão dos incrementos e evidências
de validação  

## 11. Licença

Este projeto está sob a licença MIT.