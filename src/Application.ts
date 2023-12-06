import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import GlobalErrorController from './controllers/GlobalErrorController';
import UserRouter from './routers/UserRouter';
import { ApiRoute } from './types/enums';

export default class Application { 
	private static app: express.Application;

	static { 
		this.app = express();
	}

	public static configureApp = (): void => { 
		this.app.use(express.json({ limit: '10Kb' }));
        this.app.use(cookieParser());

		this.app.use(ApiRoute.USERS, UserRouter.ROUTER);
	
		this.app.use(GlobalErrorController.handle)
	}

	static { 
		this.configureApp();
	}

	public static getApp = (): express.Application => { 
		return this.app;
	}
}