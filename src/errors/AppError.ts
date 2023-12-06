
import Util from '../utils/Util';
import { ErrorMessage, HttpStatus } from '../types/enums';

export default class AppError extends Error {
    public statusCode: HttpStatus;
    public isOperational: boolean;
    public status: string;

    constructor(statusCode: HttpStatus, message: ErrorMessage | string) {
        super(message as string);
		
        this.statusCode = statusCode;
        this.status = Util.defineResponseStatus(statusCode);
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}
