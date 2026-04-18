import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

export const validateMiddleware = (zodSchema: z.ZodSchema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try{
            req.body = zodSchema.parse(req.body)
            next()
        } catch ( e ){
            return res.status(400).json({message: 'Валидация не прошла'})
        }
    }
}
