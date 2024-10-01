import { Injectable, NestMiddleware, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

export interface CustomRequest extends Request {
  user?: any;
}

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  async use(req: CustomRequest, res: Response, next: NextFunction) {
    const token = req.headers.token as string;
    if (token) {
      const accessToken = token.split(' ')[1];
      jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
        if (err) {
          throw new ForbiddenException("Token is not valid");
        }
        req.user = user;
        next();
      });
    } else {
      throw new UnauthorizedException("You're not authenticated");
    }
  }
}
