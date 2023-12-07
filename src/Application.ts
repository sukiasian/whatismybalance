import * as express from 'express';
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

		this.app.use(ApiRoute.USERS, UserRouter.ROUTER);
	
		this.app.use(GlobalErrorController.handle)

		this.app.all('*', (req, res) => {
			res.status(404);
		})
	}

	static { 
		this.configureApp();
	}

	public static getApp = (): express.Application => { 
		return this.app;
	}
}