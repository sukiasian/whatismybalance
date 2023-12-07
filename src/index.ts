import * as dotenv from 'dotenv';
import Database from "./database/Database";
import Server from "./Server";
import UmzugManager from './database/UmzugManager';
import Util from './utils/Util';
import { User } from './models/User';

dotenv.config({ path: __dirname + './.env' });

(async () => { 
	Util.handleErrorsOnExit();

	await Database.connect();
	await UmzugManager.run();
	
	await Database.createTestUser();
	
	Server.start();
})()
