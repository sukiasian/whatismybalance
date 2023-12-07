import * as path from 'path';
import * as dotenv from 'dotenv';
import { Sequelize } from "sequelize-typescript";
import { ResponseStatus, HttpStatus } from "../types/enums";
import { ServerResponseBody } from "../types/interfaces";

export default class Util { 
	public static handleErrorsOnExit = (): void => {}

	public static defineResponseStatus = (httpStatus: number): ResponseStatus => {
        if (httpStatus >= HttpStatus.OK && httpStatus < HttpStatus.FORBIDDEN) {
            return ResponseStatus.SUCCESS;
        } else if (httpStatus >= HttpStatus.INTERNAL_SERVER_ERROR) {
            return ResponseStatus.ERROR;
        }

        return ResponseStatus.FAILURE;
    };

	public static catchAsync = (fn) => {
        return (req, res, next) => {
            fn(req, res, next).catch(next);
        };
    };

	private static shutdownOpenProcesses = async (server: any, sequelize: Sequelize): Promise<void> => {
        let errorExists: any;

        server.close((err: any) => {
            if (err) {
                console.log('Error occured. ', err);

                errorExists = err;
            }
        });

        await sequelize.close();

        console.log('Sequelize disconnected.');

        process.exit(errorExists ? 1 : 0);
    };

	public static exitHandler = (server: any, sequelize: Sequelize) => {
        process
            .on('unhandledRejection', (reason, p) => {
                console.log('Unhandled Rejection: ', reason, p);

                this.shutdownOpenProcesses(server, sequelize);
            })
            .on('uncaughtException', (err) => {
                console.log('Uncaught Exception thrown');

                this.shutdownOpenProcesses(server, sequelize);
            })
            .on('SIGTERM', () => {
                console.log('SIGTERM signal received.');

                this.shutdownOpenProcesses(server, sequelize);
            })
            .on('SIGINT', () => {
                console.log('SIGINT signal received.');

                this.shutdownOpenProcesses(server, sequelize);
            })
            .on('beforeExit', () => {
                console.log('Exit occured.');

                this.shutdownOpenProcesses(server, sequelize);
            });
    };

	public static createResponseBody = <T = any>(message?: string, data?: T) => {
        const resBody: ServerResponseBody<T> = {
            status: ResponseStatus.SUCCESS,
        };

        if (message) {
            resBody.message = message;
        }

        if (data) {
            resBody.data = data;
        }

        return resBody;
    };

	public static configureDotenvTest = (): void => {
        dotenv.config({
            path: path.resolve(__dirname, '../', '../', 'test.env'),
        });
    };
}