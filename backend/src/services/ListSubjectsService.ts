import { prisma } from "../configs/prisma";

class ListSubjectsService {
  async execute() {
    const subjects = await prisma.subject.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return subjects;
  }
}

export { ListSubjectsService };
