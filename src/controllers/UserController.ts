import UserService from "../services/UserService";
import Util from "../utils/Util";
import { HttpStatus, ResponseMessage } from "../types/enums";

export default class UserController { 
	static updateUserBalance = Util.catchAsync(async (req, res, next) => { 
		const transactionDate = new Date();

		const { amount } = req.body;
		const { id } = req.params;
		
		const newBalance = await UserService.updateUserBalance(id, amount, transactionDate);

		const responseBody = Util.createResponseBody(`${ResponseMessage.SUCCESSFUL_TRANSACTION} Amount is: ${amount}. Now your balance is: ${newBalance}`)

		res.status(HttpStatus.OK).json(responseBody);
	})
}