import express, { Request, Response } from 'express'
import { checkAuth } from '../src/middleware/authMiddleware.js'
import { dbClient } from '../src/shared/prisma.js'

const tasks = express.Router()

tasks.get('/getTasks', checkAuth, async (req: Request, res: Response) => {
    if (!req.session) return res.status(400).json({ message: 'Нет пользователя' })
    const usernameSession = req.session.username
    if (!usernameSession) return res.status(400).json({ message: 'Нет пользователя' })
    try{
        const user = await dbClient.user.findUnique({
            where:{
                username: usernameSession
            },
            select:{
                tasks: true
            }
        })
        if (!user) return res.status(400).json({ message: "Юзера нет" })
        return res.status(200).json({tasks: user.tasks})
    } catch( e ) {
        return res.status(400).json({message: "Ошибка призма"})
    }
})

tasks.post('/addTask', checkAuth, async (req: Request, res: Response) => {
    if (!req.session) return res.status(400).json({ message: 'Нет пользователя' })
    const usernameSession = req.session.username
    if (!usernameSession) return res.status(400).json({ message: 'Нет пользователя' })
    if (req.body.title == '') return res.status(400).json({ message: 'Название пустое' })
    try {
        const user = await dbClient.user.findUnique({
            where: {
                username: usernameSession
            },
            select: {
                tasks: true,
                id: true
            }
        })
        if (!user) return res.status(400).json({ message: "Юзера нет" })

        const task = await dbClient.task.create({
            data: {
                title: req.body.title,
                description: req.body.description,
                user: {
                    connect: { id: user.id }
                }
            }
        })
        return res.status(200).json(task)
    } catch (e) {
        return res.status(400).json({ message: "Ошибка призма" })
    }
})

tasks.delete('/deleteTask', checkAuth, async (req: Request, res: Response) => {
    if (!req.session) return res.status(400).json({ message: 'Нет пользователя' })
    const usernameSession = req.session.username
    if (!usernameSession) return res.status(400).json({ message: 'Нет пользователя' })
    if (req.body.title == '') return res.status(400).json({ message: 'Название пустое' })
    try {
        const user = await dbClient.user.findUnique({
            where: {
                username: usernameSession
            },
            select: {
                tasks: true,
                id: true
            }
        })
        if (!user) return res.status(400).json({ message: "Юзера нет" })

        const deletedTask = await dbClient.task.delete({
            where: {
                id: Number(req.body.id), // Убедитесь, что тип совпадает (Int в схеме = Number в JS)
            },
        })
        return res.status(200).json({message: "Удаление прошло успешно"})
    } catch (e) {
        return res.status(400).json({ message: "Ошибка призма" })
    }
})

tasks.patch('/editTask', checkAuth, async (req: Request, res: Response) => {
    if (!req.session) return res.status(400).json({ message: 'Нет пользователя' })
    const usernameSession = req.session.username
    if (!usernameSession) return res.status(400).json({ message: 'Нет пользователя' })
    if (req.body.title == '') return res.status(400).json({ message: 'Название пустое' })
    try {
        const user = await dbClient.user.findUnique({
            where: {
                username: usernameSession
            },
            select: {
                tasks: true,
                id: true
            }
        })
        if (!user) return res.status(400).json({ message: "Юзера нет" })

        const updateTask = await dbClient.task.update({
            where: {
                id: Number(req.body.id) // Берем ID из URL или тела запроса
            },
            data: {
                title: req.body.title,
                description: req.body.description
            }
        })
        return res.status(200).json({ message: "Обновление успешно" })
    } catch (e) {
        return res.status(400).json({ message: "Ошибка призма" })
    }
})

export default tasks