import { prisma } from "../configs/prisma";
import { hash } from "bcryptjs";
import { AppError } from "../errors/AppError";
import jwt from "jsonwebtoken";

interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  async execute({ name, email, password }: CreateUserRequest) {
    if (!email.endsWith("@estudante.ufla.br")) {
      throw new AppError("Use um e-mail institucional da UFLA");
    }

    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userAlreadyExists) {
      throw new AppError("Usuário já existe");
    }

    const passwordHash = await hash(password, 8);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash,
      },
    });

    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET as string,
      {
        subject: user.id.toString(),
        expiresIn: "30d",
      },
    );

    return {
      user,
      token,
    };
  }
}

export { CreateUserService };
