import { Umzug, SequelizeStorage } from 'umzug';
import Database from "./Database";

export default class UmzugManager { 
	public static run = async () => {
		const umzug = new Umzug({
			migrations: { glob: './migrations/*.js' },
			context: Database.SEQUELIZE.getQueryInterface(),
			storage: new SequelizeStorage({ sequelize: Database.SEQUELIZE }),
			logger: console,
		}); 

		try { 
			await umzug.up();
		} catch (err) { 
			console.log('Error during migration: ', err);
		}
	}
}