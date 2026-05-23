import { PrismaClient } from "@prisma/client";

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
    "Gerência de Projetos de Software"
  ];

  for (const subject of subjects) {

      await prisma.subject.upsert({
        where: {
          name: subject
        },
    
        update: {},
    
        create: {
          name: subject
        }
      });
  
    }

  console.log("Matérias cadastradas com sucesso!");

}

main()
  .catch((error) => {
    console.log(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
