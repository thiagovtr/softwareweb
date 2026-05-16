# Sprint 05

## 1. Identificação do Grupo

Projeto: DisciplinasUFLA

| Integrante | Papel no Scrum |
|---|---|
| Thiago Vinícius Tristão Rojas | Product Owner |
| Bruno Santos Vilas Boas | Scrum Master |
| Christian Silva Mesquita | Dev Team |
| Guilherme dos Santos Fernandes | Dev Team |
| Matheus Levi Tavares | Dev Team |

Data da Sprint: 09/05/2026 a 16/05/2026


## 2. Objetivo da Sprint

Identificar problemas recorrentes no design de código da aplicação Disciplinas UFLA e selecionar padrões de projeto (Design Patterns) pertinentes, justificando tecnicamente sua adoção e descrevendo os benefícios arquiteturais esperados.

## 3. Análise de Problemas Recorrentes e Padrões Adotados

Durante o refinamento da arquitetura definida na sprint anterior, a equipe de desenvolvimento mapeou dois problemas críticos que poderiam comprometer a qualidade do código, a performance e a manutenção do sistema:

* **Problema de Conexão com Banco de Dados:** O **Prisma ORM** gerencia internamente um pool de conexões. Se novas instâncias do `PrismaClient` forem criadas a cada requisição ou em múltiplos módulos independentes, ocorrerá um esgotamento rápido das conexões do banco de dados, quebrando o sistema sob carga moderada.
* **Problema de Acoplamento no Armazenamento:** A decisão de salvar arquivos no sistema local do servidor foi tomada por desempenho. No entanto, acoplar diretamente os controladores de upload (RF02) a funções nativas de escrita em disco impedirá o sistema de migrar para um serviço de nuvem (como AWS S3) no futuro sem exigir uma refatoração em massa.

Para solucionar essas dores, foram selecionados e aplicados os seguintes padrões de projeto:

---

## 4. Descrição e Justificativa Técnica dos Padrões

| Padrão GoF | Tipo | Descrição da Aplicação no Projeto | Justificativa Técnica & Benefícios |
| :--- | :--- | :--- | :--- |
| **Singleton** | Criacional | Utilizado para centralizar e instanciar uma única interface global de acesso ao **Prisma Client** em toda a aplicação. | Garante que o pool de conexões do Prisma seja reutilizado de forma otimizada. Isso atende diretamente ao requisito de estabilidade **RNF04** (suportar 100 usuários simultâneos) e evita o vazamento de recursos. |
| **Strategy** | Comportamental | Criação de uma interface genérica de armazenamento (`StorageStrategy`) com implementações concretas intercambiáveis (ex: `LocalStorageStrategy` e `S3StorageStrategy`). | Garante o princípio *Open/Closed* do SOLID. Isola a lógica do requisito **RF02** (Envio de Material) do meio físico onde o arquivo é salvo, facilitando a portabilidade do sistema e a criação de testes automatizados com *mocks*. |

---

## 5. Representação da Aplicação na Solução e Impacto nos Modelos

A aplicação dos padrões altera dinamicamente o comportamento esperado da estrutura definida no diagrama de classes inicial:

* **Adaptação no Diagrama de Classes:** A classe `Arquivo` deixa de interagir diretamente com o sistema de arquivos ou com instâncias puras de banco. Ela passa a delegar o salvamento físico para a interface injetada do padrão *Strategy*, diminuindo o acoplamento sistêmico.
* **Refinamento no Diagrama de Sequência:** No fluxo de upload, o componente do sistema invoca a estratégia configurada em tempo de execução para persistir o arquivo. Após o sucesso da escrita assíncrona, a instância *Singleton* do Prisma foi chamada para registrar o caminho absoluto no banco de dados.

---

## 6. Registro de Acompanhamento da Sprint

### Planejamento
O foco central desta sprint foi mergulhar nas minúcias do design de código. A equipe reuniu-se para garantir que as decisões de arquitetura em camadas tomadas na Sprint 4 fossem blindadas contra problemas comuns de acoplamento e gargalos de infraestrutura no ecossistema Node.js/Prisma.

### Execução
Os membros da equipe de desenvolvimento trabalharam em par para definir as interfaces e contratos de código. Christian e Guilherme focaram no encapsulamento da estratégia de armazenamento (relacionada ao **RF02** e **RF04**), enquanto Matheus isolou o cliente do banco de dados utilizando a estrutura de classe única (*Singleton*). Thiago (PO) validou que os benefícios esperados estão estritamente alinhados com as restrições de desempenho (**RNF06**).

---

## 7. Atualização do Backlog

| ID | Item | Status | Relacionamento |
| :--- | :--- | :--- | :--- |
| M04 | Aplicação de Padrões de Projeto (GoF) | **Concluído** | Garante viabilidade técnica para RF02, RF04 e RNF04 |
| D02 | Configuração Prisma/Docker | **Concluído** | Infraestrutura base e banco integrados com sucesso |
| RT01 | Tela e Lógica de Login | *Em andamento* | Iniciada a codificação da lógica de validação de e-mails institucionais |

---

## 8. Resultados Obtidos

Ao término da Sprint 5, o grupo estabeleceu uma fundação técnica robusta e escalável para o sistema DisciplinasUFLA. A adoção do *Singleton* mitigou riscos críticos de sobrecarga de banco de dados, enquanto o *Strategy* conferiu a modularidade necessária para que novas formas de armazenamento sejam agregadas sem fricção de código. 

Toda a documentação técnica foi consolidada, revisada pelos pares e publicada com sucesso no GitHub na pasta correspondente.

**Arquivo de documentação gerado:** `docs/sprints/sprint-05.md`
