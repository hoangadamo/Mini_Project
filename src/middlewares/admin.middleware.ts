import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { CustomRequest } from './jwt.middleware';
import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

@Injectable()
export class AdminMiddleware implements NestMiddleware {
  async use(req: CustomRequest, res: Response, next: NextFunction) {
    
  }
}
