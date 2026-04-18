import { validateMiddleware } from '../src/middleware/validateMiddleware.js'
import { loginSchema, RegisterSchema } from '../src/shared/schemas.js'
import express, { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { dbClient } from '../src/shared/prisma.js'

const loginReq = express.Router()

export const loginFn = async (req: Request, isCookieCheck: boolean) => {
    try {
        const whereFind = isCookieCheck
            ? req.session?.username
            : req.body?.username;

        if (!whereFind) {
            console.log('Username не найден. Session:', !!req.session);
            return null;
        }

        const user = await dbClient.user.findUnique({
            where: { username: whereFind },
            select: {
                password: true,
                username: true,
                id: true,
                email: true
            }
        });

        if (!user) return null;

        if (isCookieCheck) return user;

        if (!req.body?.password) return null

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (isMatch) {
            req.session.userId = user.id;
            req.session.username = user.username;
            await new Promise((resolve) => req.session.save(() => resolve(true)));
            return user;
        }

        return null;
    } catch (e) {
        console.error('Ошибка в loginFn:', e);
        return null;
    }
}

loginReq.post("/login", validateMiddleware(loginSchema), async (req: Request, res: Response) => {
    if (req.session.username) return res.status(400).json({ message: "Уже авторизирован" })

    const user = await loginFn(req, false)
    if (!user) return res.status(400).json({ message: "Нет юзера" });

    return res.status(200).json({
        message: "Успешная авторизация",
        data: {
            username: user.username,
            email: user.email,
            id: user.id
        }
    });

})

loginReq.post("/register", validateMiddleware(RegisterSchema), async (req: Request, res: Response) => {
    try {
        if (req.session.username) return res.status(400).json({ message: "Уже авторизирован" })
        const {username, email, password} = req.body
        const existingUser = await dbClient.user.findFirst({
            where: {
                OR: [{ username }, { email }]
            }
        });

        if (existingUser) {
            if (existingUser.email === req.body.email) return res.status(400).json({ message: 'Email занят' });
            if (existingUser.username === req.body.username) return res.status(400).json({ message: 'Username занят' });
        }
        const hashPassword = await bcrypt.hash(password, 10) 
        const newUser = await dbClient.user.create({
            data: {
                username: username,
                email: email,
                password: hashPassword,
                days: 0
            }
        })

        const user = await loginFn(req, false)
        if (!user) return res.status(400).json({ message: "Не удалось войти в аккаунт после регистрации" })

        return res.status(200).json({
            message: "Успешная авторизация",
            data: {
                username: user.username,
                email: user.email,
                id: user.id
            }
        });
    } catch (e) {
        return res.status(500).json({ message: "Ошибка Prisma" })
    }
})

export default loginReq