import UserDao from "../daos/UserDao"
import AppError from "../errors/AppError";
import { User } from "../models/User";
import { ErrorMessage, HttpStatus } from "../types/enums";

export default class UserService { 
	private static validateUpdateBalanceInputs = (amount: number): void => { 
		if(!amount || typeof amount !== 'number') {
			throw new AppError(HttpStatus.FORBIDDEN, ErrorMessage.AMOUNT_SHOULD_BE_A_NUMBER);
		}
	}
	
	public static updateUserBalance = async (userId: string, amount: number, transactionDate: Date): Promise<number> => { 
		this.validateUpdateBalanceInputs(amount);

		return UserDao.updateBalance(userId, amount, transactionDate);
	}

	public static getUsers = async (): Promise<User[]> => { 
		return UserDao.getUsers();
	}
}