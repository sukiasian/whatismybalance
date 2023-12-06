import { Router } from 'express';
import UserController from '../controllers/UserController';

export default class UserRouter {
    public static ROUTER: Router;

	static { 
		this.ROUTER = Router();
	}

    public static prepareRouter = (): void => {
        this.ROUTER
            .route('/balance')
            .patch(UserController.updateUserBalance);
    };
}
