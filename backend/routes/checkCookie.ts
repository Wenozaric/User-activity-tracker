import express, { Request, Response } from "express";
import { loginFn } from "./loginReq.js";


const cookieRouter = express.Router()

cookieRouter.get('/checkCookie', async (req: Request, res: Response) => {
    if (!req.session || !req.session.username) return res.status(400).json({ message: 'Нет куки' })

    const user = await loginFn(req, true)
    if (!user) return res.status(400).json({ message: 'Нет юзера' })

    return res.status(200).json({
        message: "Успешная проверка куки",
        data: {
            username: user.username,
            email: user.email,
            id: user.id
        }
    });
})

export default cookieRouter
