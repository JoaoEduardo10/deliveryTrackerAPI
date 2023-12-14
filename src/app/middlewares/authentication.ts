/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from 'express';
import { Unauthorized } from '../errors/api-error';
import { compareJwt } from '../helpers/jsonwebtoken';

export class AuthenticationMiddleware {
  static async middleware(req: Request, _res: Response, next: NextFunction) {
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw new Unauthorized('Voçê não esta altenticado!');
    }

    const [type, token_auth] = authorization.split(' ');

    const type_jwt = process.env.TYPE_JWT;

    if (type != type_jwt) {
      throw new Unauthorized('Voçê não esta altenticado!');
    }

    try {
      const token = compareJwt(token_auth);

      if (token == undefined) {
        throw new Unauthorized('Voçê não esta altenticado!');
      }

      next();
    } catch (error: any) {
      throw new Unauthorized(error.message);
    }
  }
}
