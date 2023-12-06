import { Sequelize } from "sequelize-typescript";
import { SyncOptions } from "sequelize";
import { User } from "../models/User";


export default class Database {
	static SEQUELIZE: Sequelize; 

	static { 	
		// @ts-ignore
		this.SEQUELIZE = new Sequelize({
			dialect: 'postgres',
			dialectOptions: {
				multipleStatements: true,
			},
			host: process.env.HOST || 'localhost',
			port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
			username: process.env.DATABASE_USERNAME || 'postgres',
			password: process.env.DATABASE_PASSWORD || 'postgres',
			database: process.env.DATABASE_NAME || 'postgres',
			logging: false,
			pool: {
				max: 10,
				min: 0,
				acquire: 30000,
				idle: 10000,
			},
			models: [User]
		});
	}

	public static connect = async (): Promise<void> => { 
		try {
			const syncOptions: SyncOptions = {
				force: true
			};

			await this.SEQUELIZE.sync(syncOptions);

			console.log('Synchronized');
		} catch (err) {
			console.log(err);
		}
	}
}