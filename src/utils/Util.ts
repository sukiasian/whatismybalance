import { ResponseStatus, HttpStatus } from "../types/enums";

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

}