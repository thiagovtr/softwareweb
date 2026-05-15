import { prisma } from "../configs/prisma";
import { AppError } from "../errors/AppError";

class ListFilesService {

  async execute(subjectId?: number) {

    const files = await prisma.file.findMany({

      where: subjectId
        ? { subjectId }
        : undefined,

      include: {
        
        _count: {
          select: {
            likes: true
          }
        },
      
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },

  subject: true

},

      orderBy: {
        createdAt: "desc"
      }

    });

    const filesWithUrl = files.map((file) => {

      return {
        ...file,

        _count: undefined,

        likes: file._count.likes,

        url: `http://localhost:3333/uploads/${file.filename}`
      };

    });

    return filesWithUrl;
  }

}

export { ListFilesService };