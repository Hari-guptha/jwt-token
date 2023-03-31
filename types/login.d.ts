import { Request, Response, NextFunction } from "express"

export { }
declare global {
    namespace Express {
        req: Request;
        res: Response;
        next: NextFunction;
    }
}