/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.table({
      path: req.path,
      body: req.body,
    });

    next();
  }
}
