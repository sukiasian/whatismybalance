import { Transaction, TransactionOptions, } from "sequelize";
import Database from "../database/Database";
import AppError from "../errors/AppError";
import { User } from "../models/User";
import { ErrorMessage, HttpStatus } from "../types/enums";

export default class UserDao { 
	private static transactionOptions: TransactionOptions; 

	static {
		this.transactionOptions = { 
			isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED, // as this gives the best balance between safety and performance together with optimistic locking
		}
	}

	private static calculateUserBalance = (currentUserBalance: number, amount: number): number => { 
		if (currentUserBalance + amount < 0) { 
			throw new AppError(HttpStatus.FORBIDDEN, ErrorMessage.INSUFFICIENT_FUNDS); 
		}
		
		return currentUserBalance + amount;
	}

	static updateBalance = async (userId: string, amount: number, transactionDate: Date): Promise<number> => { 
		const transaction = await Database.SEQUELIZE.transaction(this.transactionOptions);

		const maxTrials = 10; 
		let trials = 0; 

		const user = await User.findByPk(userId, { transaction });

		if(!user) { 		
			throw new AppError(HttpStatus.NOT_FOUND, ErrorMessage.USER_NOT_FOUND);
		}

		const newUserBalance = this.calculateUserBalance(user.balance, amount);

		while (trials < maxTrials) {
			try { 
				const user = await User.findByPk(userId, { transaction });

				if(!user) { 
					throw new AppError(HttpStatus.NOT_FOUND, ErrorMessage.USER_NOT_FOUND)
				}

				await user.update({
					balance: newUserBalance,
				}, { transaction });
			
				break;
			} catch(err) { 
				if (trials === maxTrials - 1) { 
					throw new AppError(HttpStatus.BAD_REQUEST, `Transaction made on ${transactionDate} with an amount of ${amount} is failed after 10 trials. Please, try again.`)
				}

				trials++;   

				await transaction.rollback();
			}
		}

		await transaction.commit();

		return newUserBalance;
	}
}