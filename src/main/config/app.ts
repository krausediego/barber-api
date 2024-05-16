import 'express-async-errors';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { readdirSync } from 'fs';
import { Server } from 'http';
import path from 'path';

import { LoggingManager } from '@/domain/interfaces';
import env from '@/main/config/environments/application';
import { makeLogging } from '@/main/factories/infra';
import { trace } from '@/main/middlewares';

export class App {
  public readonly app: express.Express;

  private server: Server;

  constructor(private readonly logger: LoggingManager) {
    this.app = express();
  }

  getApp(): express.Express {
    return this.app;
  }

  setupEnvironments(): App {
    this.app.use(express.json());
    this.app.use(
      cors({
        origin: 'http://localhost:5173',
        credentials: true,
      }),
    );
    this.app.use(cookieParser());

    return this;
  }

  errorHandler(
    error: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ): express.Response {
    if (env.mode !== 'development' && !!(error as any)?.statusCode) {
      return res.status((error as any)?.statusCode ?? 400).json({
        error: error?.message ?? 'unknown',
      });
    }

    this.logger.error({ error }, 'Internal Server Error');
    return res.status(500).json({ error: 'Internal Server Error' });
  }

  setupRoutes(): App {
    const router = express.Router();
    this.app.use(trace);

    this.app.use('/api', router);

    router.get('/', (_, res) => res.status(200).send('ok'));

    const routerPath = path.resolve(__dirname, '../routes');
    readdirSync(routerPath)
      .filter(file => !file.endsWith('.map'))
      .forEach(async file => {
        (await import(`${routerPath}/${file}`)).default(router);
      });

    this.app.use(this.errorHandler.bind(this));

    return this;
  }

  disconnect(): Promise<boolean> {
    return new Promise((resolve, _reject) => {
      this.server.close(() => {
        this.logger.debug('Server shutdown...');
        resolve(true);
      });
    });
  }

  listen(port: number): void {
    this.server = this.app.listen(port, () => {
      this.logger.info(`⚡ App listen on port ${port}.`);
    });
  }
}

export default new App(makeLogging()).setupEnvironments().setupRoutes();
