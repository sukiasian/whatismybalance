import UserService from "../services/UserService";
import Util from "../utils/Util";

export default class UserController { 
	static updateUserBalance = Util.catchAsync(async (req, res, next) => { 
		const { operation, amount } = res.body;

		await UserService.updateUserBalance(operation, amount);

		res.status();
	})
}