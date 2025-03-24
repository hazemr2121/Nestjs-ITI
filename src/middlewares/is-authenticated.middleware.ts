/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class IsAuthenticatedMiddleware implements NestMiddleware {
  constructor(private readonly configService: ConfigService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Authorization header missing or malformed',
      );
    }

    const token = authHeader.split(' ')[1];

    try {
      const jwtSecret = this.configService.get<string>('JWT_SECERT');
      if (!jwtSecret) {
        throw new UnauthorizedException('JWT secret is not configured');
      }
      const decoded = jwt.verify(token, jwtSecret);
      //   req['user'] = decoded; // Attach decoded user info to the request object
      next();
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
