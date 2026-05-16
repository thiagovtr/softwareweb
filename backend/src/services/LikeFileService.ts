import { prisma } from "../configs/prisma";
import { AppError } from "../errors/AppError";

interface LikeFileRequest {
  fileId: number;
  userId: number;
}

class LikeFileService {

  async execute({
    fileId,
    userId
  }: LikeFileRequest) {
  
    const likeAlreadyExists = await prisma.like.findFirst({
      where: {
        fileId,
        userId
      }
    });
  
    if (likeAlreadyExists) {
    
      await prisma.like.delete({
        where: {
          id: likeAlreadyExists.id
        }
      });
    
      return {
        message: "Like removido"
      };
    
    }
  
    const like = await prisma.like.create({
      data: {
        fileId,
        userId
      }
    });
  
    return like;
  
  }

}

export { LikeFileService };