import { prisma } from "../configs/prisma";
import { hash } from "bcryptjs";

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: CreateUserRequest) {

    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email
      }
    });

    if (userAlreadyExists) {
      throw new Error("Usuário já existe");
    }

    const passwordHash = await hash(password, 8);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash
      }
    });

    return user;
  }
}

export { CreateUserService };