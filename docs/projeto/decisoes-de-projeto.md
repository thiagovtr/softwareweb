# Decisões de Projeto — DisciplinasUFLA

**Disciplina:** Engenharia de Software  
**Professor:** Johnatan Oliveira  
**Projeto:** DisciplinasUFLA  
**Versão:** 1.0  
**Data:** 09/05/2026  

| Integrante | Papel no Scrum |
|---|---|
| Thiago Vinícius Tristão Rojas | Product Owner |
| Bruno Santos Vilas Boas | Scrum Master |
| Christian Silva Mesquita | Dev Team |
| Guilherme dos Santos Fernandes | Dev Team |
| Matheus Levi Tavares | Dev Team |

---

## 1. Introdução

Este documento registra as principais decisões de projeto tomadas durante o desenvolvimento da aplicação web DisciplinasUFLA, uma plataforma de compartilhamento de materiais acadêmicos entre estudantes da UFLA.

As decisões aqui descritas foram tomadas com base nos princípios de qualidade de software — alta coesão, baixo acoplamento, abstração e modularidade — e têm como objetivo garantir que o sistema seja organizado, mantível, seguro e escalável.

Cada decisão é acompanhada de sua justificativa técnica, do princípio de projeto que a fundamenta, das alternativas consideradas e do requisito que ela atende.

---

## 2. Decomposição da Solução em Módulos

A aplicação foi decomposta em quatro camadas principais, cada uma com responsabilidade bem definida e independente das demais:

| Camada | Componente | Responsabilidade |
|---|---|---|
| Apresentação | Frontend (React + TypeScript) | Interface visual e interação com o usuário |
| Controle | Controllers (Express) | Recebe requisições HTTP e direciona para os serviços |
| Serviço | Services (Node.js) | Concentra as regras de negócio e validações críticas |
| Persistência | Prisma ORM + PostgreSQL | Gerencia o esquema e as operações no banco de dados |
| Infraestrutura | Docker + Docker Compose | Padroniza e automatiza o ambiente de execução |

Essa decomposição garante que alterações em uma camada não produzam efeitos colaterais nas demais, facilitando manutenção, testes e evolução incremental do sistema.

---

## 3. Decisões de Projeto

### DP01 — Arquitetura em Camadas

**Decisão:** Organizar o sistema em camadas de apresentação, controle, serviço e persistência, com comunicação via API REST entre frontend e backend.

**Justificativa técnica:** A separação em camadas isola as responsabilidades de cada parte do sistema. O frontend não conhece os detalhes do banco de dados, e o banco de dados não conhece a interface do usuário. Isso permite substituir qualquer tecnologia de uma camada sem impactar as demais — por exemplo, trocar o banco de dados de PostgreSQL para outro SGBD sem alterar o frontend.

**Princípio de projeto:** Baixo acoplamento e separação de responsabilidades.

**Requisitos atendidos:** RNF04 (Estabilidade), RNF06 (Tempo de resposta), RNF02 (Plataforma web).

**Alternativa considerada e descartada:** Aplicação monolítica com lógica de negócio misturada à camada de apresentação. Descartada por dificultar manutenção e escalabilidade futura.

---

### DP02 — Prisma ORM como Camada de Persistência

**Decisão:** Utilizar o Prisma ORM para todo o acesso ao banco de dados PostgreSQL, com o esquema de dados definido no arquivo `prisma/schema.prisma`.

**Justificativa técnica:** O Prisma abstrai o banco de dados por meio de um esquema declarativo e de uma API de consulta tipada. Isso elimina a necessidade de escrever SQL bruto para operações comuns, reduz erros de digitação em queries e facilita migrações de esquema com rastreabilidade. O Prisma também garante que o modelo de dados do código esteja sempre sincronizado com o banco de dados real.

**Princípio de projeto:** Abstração.

**Requisitos atendidos:** RNF07 (Integridade de dados), RF09 (Associação de arquivos ao autor).

**Alternativa considerada e descartada:** Uso de SQL bruto com o driver `pg` diretamente. Descartado por aumentar a verbosidade do código, dificultar migrações e aumentar o risco de erros em queries complexas.

---

### DP03 — Instância Única do Prisma Client (Padrão Singleton)

**Decisão:** Centralizar a instância do `PrismaClient` em um único módulo (`src/lib/prisma.ts`), reutilizado por toda a aplicação.

**Justificativa técnica:** O Prisma ORM gerencia internamente um pool de conexões com o banco de dados. Se múltiplas instâncias do `PrismaClient` forem criadas — por exemplo, uma por requisição ou por módulo — o pool de conexões se esgota rapidamente, causando falhas sob carga moderada. A centralização em uma única instância garante que o pool seja reutilizado de forma eficiente.

**Princípio de projeto:** Padrão Singleton (criacional) — garantia de instância única com ponto de acesso global.

**Requisitos atendidos:** RNF04 (suportar 100 usuários simultâneos sem falhas), RNF06 (tempo de resposta).

**Alternativa considerada e descartada:** Criação de nova instância do `PrismaClient` a cada arquivo de serviço. Descartada por resultar em esgotamento do pool de conexões sob carga.

---

### DP04 — Armazenamento de Arquivos no Sistema de Arquivos do Servidor

**Decisão:** Salvar os arquivos enviados pelos usuários no sistema de arquivos do servidor (diretório `uploads/`) e registrar apenas o caminho relativo no banco de dados.

**Justificativa técnica:** Armazenar arquivos como BLOB no banco de dados aumenta significativamente o tamanho das tabelas, degrada o desempenho das consultas e dificulta o backup. Salvar no sistema de arquivos mantém o banco de dados enxuto e permite que os arquivos sejam servidos diretamente pelo servidor web ou por um CDN no futuro.

**Princípio de projeto:** Separação de responsabilidades — o banco de dados armazena metadados; o sistema de arquivos armazena conteúdo binário.

**Requisitos atendidos:** RF02 (Upload de material), RF04 (Download de arquivos), RNF07 (Integridade de dados).

**Alternativa considerada e descartada:** Armazenamento de arquivos como BLOB no PostgreSQL. Descartado por degradar o desempenho das consultas e aumentar desnecessariamente o tamanho do banco de dados.

---

### DP05 — Interface de Armazenamento Desacoplada (Padrão Strategy)

**Decisão:** Definir uma interface genérica `StorageStrategy` com implementações concretas intercambiáveis (`LocalStorageStrategy`, com possibilidade futura de `S3StorageStrategy`).

**Justificativa técnica:** Acoplar os controllers de upload diretamente a funções nativas de escrita em disco tornaria inviável qualquer migração futura para armazenamento em nuvem (ex.: AWS S3) sem refatoração massiva do código. A interface `StorageStrategy` permite que o meio físico de armazenamento seja substituído sem alterar os controllers, respeitando o princípio Open/Closed do SOLID.

**Princípio de projeto:** Padrão Strategy (comportamental) — encapsulamento de algoritmos intercambiáveis; princípio Open/Closed.

**Requisitos atendidos:** RF02 (Envio de material), RF04 (Download), escalabilidade futura.

**Alternativa considerada e descartada:** Chamada direta às funções `fs.writeFile` e `fs.readFile` do Node.js nos controllers. Descartada por criar acoplamento direto entre a lógica de negócio e o mecanismo de armazenamento.

---

### DP06 — Autenticação com JWT e Restrição a E-mails Institucionais

**Decisão:** Utilizar JSON Web Tokens (JWT) para autenticação stateless, com validação obrigatória de e-mails no domínio `@estudante.ufla.br` tanto no frontend quanto no backend.

**Justificativa técnica:** JWT permite autenticação sem armazenamento de sessão no servidor, facilitando escalabilidade horizontal. A dupla validação (frontend para feedback imediato ao usuário; backend por segurança) garante que a regra de negócio seja sempre aplicada independentemente do cliente utilizado. Senhas são armazenadas com hash via BcryptJS, nunca em texto plano.

**Princípio de projeto:** Alta coesão — a lógica de autenticação é centralizada no backend; defesa em profundidade.

**Requisitos atendidos:** RF01 (Login), RF06 (Cadastro), RNF05 (Segurança).

**Alternativa considerada e descartada:** Autenticação via OAuth externo (Google). Descartada pois não garantiria restrição a e-mails institucionais da UFLA, abrindo a plataforma para usuários externos.

---

### DP07 — Validação de Tamanho de Arquivo no Frontend e no Backend

**Decisão:** Validar o tamanho máximo de 100MB tanto no frontend (para feedback imediato) quanto no backend via middleware Multer (por segurança).

**Justificativa técnica:** A validação no frontend melhora a experiência do usuário ao fornecer feedback instantâneo sem necessidade de realizar o upload. A validação no backend garante que a regra seja aplicada mesmo que o cliente tente contorná-la. Essa abordagem de defesa em profundidade é essencial para requisitos de segurança e integridade.

**Princípio de projeto:** Alta coesão — cada camada tem responsabilidade clara sobre a validação que lhe compete.

**Requisitos atendidos:** RNF01 (Restrição de tamanho de upload), RF02 (Upload de material).

**Alternativa considerada e descartada:** Validação apenas no frontend. Descartada por ser facilmente contornável por requisições diretas à API.

---

### DP08 — Ambiente Conteinerizado com Docker

**Decisão:** Utilizar Docker e Docker Compose para orquestrar os três serviços da aplicação (frontend, backend e banco de dados) em containers isolados.

**Justificativa técnica:** A conteinerização elimina inconsistências de ambiente entre máquinas de desenvolvimento e produção (o chamado problema "na minha máquina funciona"). O Docker Compose permite inicializar toda a infraestrutura com um único comando (`docker-compose up`), incluindo a criação automática do banco de dados via migrations do Prisma e a execução do seed com dados iniciais.

**Princípio de projeto:** Modularidade — cada serviço é isolado em seu próprio container com responsabilidade e ciclo de vida independentes.

**Requisitos atendidos:** RNF02 (Plataforma web), RNF04 (Estabilidade e disponibilidade).

**Alternativa considerada e descartada:** Instalação manual das dependências em cada máquina sem conteinerização. Descartada por gerar inconsistências de ambiente e dificultar a configuração para novos membros do time.

---

### DP09 — Isolamento de Credenciais com Variáveis de Ambiente

**Decisão:** Armazenar todas as credenciais e configurações sensíveis (chave JWT, URL do banco de dados) em variáveis de ambiente via arquivo `.env`, nunca no código-fonte.

**Justificativa técnica:** Expor credenciais no código-fonte representa um risco crítico de segurança, especialmente em repositórios públicos. O uso do pacote `dotenv` carrega as variáveis de ambiente em tempo de execução sem incluí-las no histórico de commits. O arquivo `.env.example` documenta as variáveis necessárias sem expor valores reais.

**Princípio de projeto:** Segurança por design.

**Requisitos atendidos:** RNF05 (Segurança e proteção de dados).

**Alternativa considerada e descartada:** Hardcode das credenciais diretamente no código. Descartada por representar risco de segurança crítico e impossibilidade de uso em ambientes diferentes (desenvolvimento, produção) sem alterar o código.

---

## 4. Resumo das Decisões

| ID | Decisão | Princípio Principal | Requisitos |
|---|---|---|---|
| DP01 | Arquitetura em camadas com API REST | Baixo acoplamento | RNF02, RNF04, RNF06 |
| DP02 | Prisma ORM como camada de persistência | Abstração | RNF07, RF09 |
| DP03 | Singleton para instância do Prisma Client | Singleton (GoF) | RNF04, RNF06 |
| DP04 | Arquivos no sistema de arquivos do servidor | Separação de responsabilidades | RF02, RF04, RNF07 |
| DP05 | Interface StorageStrategy desacoplada | Strategy (GoF) / Open-Closed | RF02, RF04 |
| DP06 | JWT + restrição a e-mails @estudante.ufla.br | Alta coesão / Segurança | RF01, RF06, RNF05 |
| DP07 | Validação de tamanho no frontend e no backend | Alta coesão / Defesa em profundidade | RF02, RNF01 |
| DP08 | Conteinerização com Docker Compose | Modularidade | RNF02, RNF04 |
| DP09 | Credenciais em variáveis de ambiente (.env) | Segurança por design | RNF05 |

---

## 5. Rastreabilidade com os Requisitos

| Requisito | Decisões que o atendem |
|---|---|
| RF01 — Login com e-mail institucional | DP06 |
| RF02 — Upload de material | DP04, DP05, DP07 |
| RF04 — Download de arquivos | DP04, DP05 |
| RF06 — Cadastro de usuário | DP06 |
| RF09 — Associação de arquivo ao autor | DP02 |
| RNF01 — Restrição de tamanho (100MB) | DP07 |
| RNF02 — Plataforma web (multi-navegador) | DP01, DP08 |
| RNF04 — Estabilidade (100 usuários simultâneos) | DP01, DP03, DP08 |
| RNF05 — Segurança (senhas criptografadas) | DP06, DP09 |
| RNF06 — Tempo de resposta (≤ 3s em 95%) | DP01, DP03 |
| RNF07 — Integridade de dados | DP02, DP04 |

---

## 6. Referências

- VALENTE, Marco Tulio. *Engenharia de Software Moderna*. Cap. 5 — Princípios de Projeto. Disponível em: https://engsoftmoderna.info/cap5.html
- VALENTE, Marco Tulio. *Engenharia de Software Moderna*. Cap. 6 — Padrões de Projeto. Disponível em: https://engsoftmoderna.info/cap6.html
- GAMMA, E. et al. *Design Patterns: Elements of Reusable Object-Oriented Software*. Addison-Wesley, 1994.
- Documentação oficial do Prisma ORM: https://www.prisma.io/docs
- Documentação oficial do Docker: https://docs.docker.com
