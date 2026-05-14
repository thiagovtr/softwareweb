import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../errors/AppError";

import authConfig from "../configs/auth";

interface TokenPayload {
  sub: string;
}

export function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {

  const authToken = request.headers.authorization;

  if (!authToken) {
    throw new AppError("Token não informado", 401);
  }

  const [, token] = authToken.split(" ");

  try {

    const { sub } = verify(
      token,
      authConfig.jwt.secret
    ) as TokenPayload;

    request.user_id = sub;

    return next();

  } catch {
    throw new AppError("Token inválido", 401);
  }
}