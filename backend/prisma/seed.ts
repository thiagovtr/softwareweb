import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const subjects = [
    "Introdução aos Algoritmos",
    "Administração aplicada a Sistemas de Informação",
    "Introdução aos Sistemas Digitais",
    "Introdução a Computação",
    "Funções Elementares",
    "Introdução à Programação Orientada a Objetos",
    "Administração Estratégica",
    "Sistemas de Informação",
    "Estatística Aplicada",
    "Matemática Discreta",
    "Estruturas de Dados",
    "Teoria Econômica",
    "Arquitetura de Computadores",
    "Introdução a Sistemas de Banco de Dados",
    "Mentoria Acadêmica I",
    "Organizações, Sistemas e Métodos",
    "Sistemas Operacionais",
    "Redes de Computadores",
    "Gestão de Tecnologia da Informação",
    "Engenharia de Software",
    "Interação Humano-Computador",
    "Sistemas Distribuídos",
    "Empreendedorismo em Sistemas de Informação",
    "Sistemas Gerenciadores de Banco de Dados",
    "Segurança, Auditoria e Avaliação de Sistemas de Informação",
    "Grafos e suas Aplicações",
    "Programação WEB",
    "Inteligência Artificial",
    "Gerência de Projetos de Software",
    "Processos de Software",
    "Complexidade e Projetos de Algoritmos",
    "Metodologia de Pesquisa",
    "Qualidade de Software",
    "Mentoria Acadêmica II",
    "Projeto Integrador I",
    "Programação Paralela e Concorrente",
    "Práticas de Programação Orientada a Objetos",
    "Técnicas de Programação Aplicada à Engenharia",
    "Estudos Avançados em Tecnologias Educacionais",
    "Programação Aplicada com Suporte de IA",
    "Mineração de Dados",
    "Teoria da Computação",
    "Linguagens Formais e Autômatos",
    "Modelagem e Implementação de Software",
    "Inteligência de Negócios",
    "Administração de Serviços de Redes de Computadores",
    "Desenvolvimento de Aplicativos para Dispositivos Móveis",
    "Estudos Avançados em Engenharia de Software",
    "Gestão do Conhecimento Tecnologia e Inovação",
    "Redes de Sensores Sem Fio",
    "Software Livre e Empreendedorismo Cooperativo",
    "Computação em Nuvem",
    "Informática na Educação",
    "Projet e Inst de Infra-estruturas de Redes de Computadores",
    "Recuperação da Informação",
    "Estudos Avançados em Mineração Web e Aplicações",
    "Acessibilidade em Sistemas Computacionais",
    "Gestão do Conhecimento no Setor Público",
    "Inovação Aberta",
    "Manutenção e Evolução de Software",
    "Governo Eletrônico",
    "Arquitetura de Software",
    "Teste de Software",
    "Desenvolvimento de Software Livre",
    "Introdução a Deep Learning",
    "Fundamentos de Sistemas Multimídia",
    "Devops na Prática",
    "Internet das Coisas: Fundamentos e Aplicações",
    "Aplicações de Processamento Digital de Áudio Profissional",
    "Big-data: Processamento de Dados Massivos",
    "Aplicações de Redes Neurais Artificiais",
    "Geometria Analítica e Álgebra Linear",
    "Cálculo I",
    "Métodos Quantitativos",
    "Gestão de Custos",
    "Marketing",
    "Administração de Recursos Humanos II",
    "Sistemas de Informações Gerenciais",
    "Pesquisa Operacional",
    "Planejamento Empresarial",
    "Consultoria Empresarial",
    "Mudança e Inovação Organizacional",
    "Empreendedorismo",
    "Sistema de Informação para o Setor Público",
    "Gestão e Desenvolvimento de Pessoas no Setor Público",
    "Estratégias Empresariais na Era Digital",
    "Inovação e Competitividade",
    "Comportamento Humano nas Organizações",
    "Marketing Digital",
    "Contabilidade Geral",
    "Mercado de Capitais",
    "Redes de Cooperação",
    "Macroeconomia",
    "Teoria das Finanças Públicas",
    "Relações Internacionais",
    "Economia Brasileira Contemporânea",
    "Licitação, Contrato e Convênios",
    "Governança na Administração Pública",
    "Estratégia no Setor Público",
    "Sociologia das Organizações do Trabalho",
    "Métodos Quantitativos Aplicados à Gestão Pública",
    "Ação Coletiva",
    "Marketing Público",
    "Introdução à Filosofia",
    "Sociologia",
  ];

  for (const subject of subjects) {
    await prisma.subject.upsert({
      where: {
        name: subject,
      },
      update: {},
      create: {
        name: subject,
      },
    });
  }

  console.log("Matérias cadastradas com sucesso!");

  const passwordHash = await hash("admin123", 8);

  await prisma.user.upsert({
    where: {
      email: "admin@estudante.ufla.br",
    },
    update: {},
    create: {
      name: "Administrador",
      email: "admin@estudante.ufla.br",
      password: passwordHash,
      isAdmin: true,
    },
  });

  console.log("Seed executada com sucesso!");
}

main()
  .catch((error) => {
    console.log(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
