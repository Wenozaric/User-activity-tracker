import { NextFunction, Request, Response } from "express"

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    if(req.session.userId) next()
    else return res.status(401).json({message: 'Не авторизирован'})
}