import { Router } from 'express';
import UserController from '../controllers/UserController';

export default class UserRouter {
    public static ROUTER: Router;

    public static prepareRouter = (): void => {
        this.ROUTER
            .route('/:id/balance')
            .patch(UserController.updateUserBalance);

        this.ROUTER
            .route('/')
            .get(UserController.getUsers);
    };

	static { 
		this.ROUTER = Router();

		this.prepareRouter();
	}
}
