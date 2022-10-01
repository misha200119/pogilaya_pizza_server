import 'reflect-metadata';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import { ADMIN_EMAIL, ADMIN_PWD, NODE_ENV, PORT } from '@/env';
import { expressRouters } from '@/constants/routers';
import dbConnect from '@/db';
import User from './db/models/user/model';
import Roles from './constants/db/models/user/roles';
import bcrypt from 'bcrypt';
import middlewares from '@/constants/middlewares';
import AuthService from '@/services/auth';
import errorMiddleware from '@/constants/middlewares/errorMiddleware';
class App {
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor() {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;

    // important !!! initilaize error middleware always must be last
    dbConnect()
      .then(async () => {
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initilaizeErrorMiddleware();
        await this.initializeAdminAccout();
      })
      .catch(e => {
        console.error(e);
      });
  }

  public async listen() {
    this.app.listen(this.port, () => {
      console.log(`=================================`);
      console.log(`======= ENV: ${this.env} ========`);
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

    middlewares.forEach(middleware => this.app.use(middleware));
  }

  private initilaizeErrorMiddleware() {
    this.app.use(errorMiddleware);
  }

  private initializeRoutes() {
    expressRouters.forEach(_router => {
      const { route, router } = _router;
      this.app.use(route, router);
    });
    this.app;
  }

  private async initializeAdminAccout() {
    try {
      const existingAdmin = await User.findOne({ role: Roles.ADMIN });

      if (!existingAdmin) {
        await AuthService.registration(ADMIN_EMAIL, ADMIN_PWD, Roles.ADMIN);
        return;
      }

      existingAdmin.login = ADMIN_EMAIL;
      existingAdmin.password = await bcrypt.hash(ADMIN_PWD, 7);

      await existingAdmin.save();
    } catch (e) {
      console.log(e);
    }
  }
}

export default App;
