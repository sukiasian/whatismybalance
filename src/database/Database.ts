import { SyncOptions } from "sequelize";
import { Sequelize } from "sequelize-typescript";
import { User } from "../models/User";


export default class Database {
	static SEQUELIZE: Sequelize; 

	static { 	
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

	public static createTestUser = async (): Promise<void> => { 
		if((await User.findAll()).length === 0) { 
			await User.create({ name: 'Test user' });
		}
	}

	public static connect = async (): Promise<void> => { 
		try {
			const syncOptions: SyncOptions = {
				force: false
			};

			await this.SEQUELIZE.sync(syncOptions);

			console.log('Synchronized');
		} catch (err) {
			console.log(err);
		}
	}

	public static disconnect = async(): Promise<void> => { 
		this.SEQUELIZE.close();
	}
}