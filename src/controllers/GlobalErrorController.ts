import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { Environment, HttpStatus } from '../types/enums';

export default class GlobalErrorController {
    public static sendErrorProd = (err: any, res: Response): void => {
        if (err.isOperational) {
            console.log(`${err}`);

            res.status(err.statusCode).json({
                status: err.status,
                message: err.message,
            });
        } else {
            console.log(`${err}`);

            res.status(err.statusCode).json({
                status: err.status,
                message: 'Unknown error occured.',
            });
        }
    };
    public static sendErrorDev = (err: any, res: Response): void => {
        console.log(`${err}`);

        res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack,
        });
    };
    public static sendErrorTest = (err: any, res: Response): void => {
        if (err.isOperational) {
            console.log(`${err}`);

            res.status(err.statusCode).json({
                message: err.message,
            });
        } else {
            console.log(`${err}`);

            res.status(err.statusCode).json({
                status: err.status,
				message: 'Unknown error occured.'
            });
        }
    };

    public static handle: ErrorRequestHandler = (
        err: any,
        req: Request,
        res: Response,
        next: NextFunction
    ): void => {
        err.statusCode = err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
        err.message = err.message || 'ErrorMessages.UNKNOWN_ERROR'

        switch (process.env.NODE_ENV) {
            case Environment.DEVELOPMENT:
                GlobalErrorController.sendErrorDev(err, res);

                break;

            case Environment.TEST:
                GlobalErrorController.sendErrorTest(err, res);
				
                break;

            case Environment.PRODUCTION:
                GlobalErrorController.sendErrorProd(err, res);

                break;
        }
    };
}