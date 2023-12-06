import { Transaction, TransactionOptions, } from "sequelize";
import Database from "../database/Database";

export default class UserDao { 
	static transactionOptions: TransactionOptions; 

	static {
		this.transactionOptions = { 
			isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED, // as this gives the best balance between safety and performance together with optimistic locking  
		}
	}

	static updateBalance = async () => { 
		await Database.SEQUELIZE.transaction();
	}
}