import * as dotenv from 'dotenv';
import Database from "./database/Database";
import Server from "./Server";




(async () => { 
	dotenv.config({ path: './.env' })
	
	await Database.connect();
	
	Server.start();
})()
