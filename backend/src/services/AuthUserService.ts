import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { prisma } from "../configs/prisma";

import authConfig from "../configs/auth";

interface AuthRequest {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new AppError("Email ou senha inválidos");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email ou senha inválidos");
    }

    const token = sign({}, authConfig.jwt.secret as string, {
      subject: String(user.id),
      expiresIn: "1d",
    });

    return {
      user,
      token,
    };
  }
}

export { AuthUserService };
