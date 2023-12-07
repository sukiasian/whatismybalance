import Util from '../src/utils/Util';
import Server from '../src/Server';
import Database from '../src/database/Database';
import UmzugManager from '../src/database/UmzugManager';

export default class TestManager {
	private static SERVER;

    static {
        Util.configureDotenvTest();
		Util.handleErrorsOnExit();

		Server.start();

		this.SERVER = Server.getServer();
    }

    private static closeServer = (): void => {
        this.SERVER.close();
    };

    public static start = async (): Promise<void> => {
		await Database.connect();
		await UmzugManager.run();
		
		await Database.createTestUser();
		
		Server.start();
    };

    public static stop = async (): Promise<void> => {
        this.closeServer();

		await Database.disconnect();
    };

    static {
        this.start();
    }
}
