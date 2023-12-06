import Application from "./Application"

export default class Server { 
	private static SERVER;
	private static PORT: number;

	static { 
		this.PORT = parseInt(process.env.PORT, 10) || 7070
	}

	public static start = (): void => { 
		this.SERVER = Application.getApp().listen(7070, () => { 
			console.log(`Server is listening on ${this.PORT }`);
		})
	}

	public static getServer = () => {
		return this.SERVER;
	}
}