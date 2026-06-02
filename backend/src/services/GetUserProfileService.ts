import { prisma } from "../configs/prisma";

class GetUserProfileService {
  async execute(profileId: number, loggedInUserId: number) {
    const user = await prisma.user.findUnique({
      where: { id: profileId },
      include: {
        _count: {
          select: { files: true }
        },
        files: {
          orderBy: { createdAt: "desc" },
          include: {
            subject: true,
            user: { select: { id: true, name: true, email: true } },
            _count: { select: { likes: true } },
            likes: { where: { userId: loggedInUserId } },
            favorites: { where: { userId: loggedInUserId } }
          }
        },
        favorites: profileId === loggedInUserId ? {
          orderBy: { id: "desc" },
          include: {
            file: {
              include: {
                subject: true,
                user: { select: { id: true, name: true, email: true } },
                _count: { select: { likes: true } },
                likes: { where: { userId: loggedInUserId } },
                favorites: { where: { userId: loggedInUserId } }
              }
            }
          }
        } : false
      }
    });

    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    const formatFile = (file: any) => ({
      ...file,
      _count: undefined,
      likes: file._count.likes,
      hasLiked: file.likes?.length > 0,
      isFavorite: file.favorites?.length > 0,
      url: `http://localhost:3333/uploads/${file.filename}`,
    });

    const uploadedFiles = user.files.map(formatFile);
    
    const favoriteFiles = user.favorites 
      ? user.favorites.map((fav: any) => formatFile(fav.file)) 
      : [];

    return {
      profile: {
        id: user.id,
        name: user.name,
        email: user.email,
        totalUploads: user._count.files,
      },
      uploadedFiles,
      favoriteFiles
    };
  }
}

export { GetUserProfileService };