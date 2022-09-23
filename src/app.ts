import 'reflect-metadata';
import compression from 'compression';
import cookieParser from 'cookie-parser';
// import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import { NODE_ENV, PORT } from '@/env';
import { expressRouters } from '@/constants/routers';
import dbConnect from '@/db';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor() {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    dbConnect()
      .then(() => {
        this.initializeMiddlewares();
        this.initializeRoutes();
      })
      .catch(e => {
        console.error(e);
      });
  }

  public async listen() {
    this.app.listen(this.port, () => {
      console.log(`=================================`);
      console.log(`======= ENV: ${this.env} =======`);
      console.log(`🚀 App listening on the port ${this.port}`);
      console.log(`🎮 http://localhost:${this.port}`);
      console.log(`=================================`);
    });
  }

  public getServer() {
    return this.app;
  }

  private initializeMiddlewares() {
    if (this.env === 'production') {
      this.app.use(hpp());
      this.app.use(helmet());
    }

    const middlewares = [compression(), express.json(), express.urlencoded({ extended: true }), cookieParser()];

    middlewares.forEach(middleware => this.app.use(middleware));
    // this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
  }

  private initializeRoutes() {
    expressRouters.forEach(_router => {
      const { route, router } = _router;
      this.app.use(route, router);
    });
    this.app;
  }
}

export default App;
