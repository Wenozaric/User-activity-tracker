import express, { Request, Response } from 'express'
import { checkAuth } from '../src/middleware/authMiddleware.js'
import { checkDayToday } from '../src/middleware/checkDayToday.js'
import { dbClient } from '../src/shared/prisma.js'

const statsProfile = express.Router()

statsProfile.get('/getDays', checkAuth, checkDayToday, async(req: Request, res: Response) => {
    const username = req.session.username
    if (!username) return res.status(400).json({ message: 'Нет пользователя' })

    try{
        const user = await dbClient.user.findUnique({
            where: { username: username },
            select: { days: true, totalTime: true, maxTime: true}
        })
        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' })
        }
        
        return res.status(200).json({ days: user.days, totalTime: user.totalTime, maxTime: user.maxTime })
    } catch ( e ){
        return res.status(400).json({message : "всё сломалось"})
    }
})

statsProfile.get('/getToday', checkAuth, checkDayToday, async(req: Request, res:Response) => {
    const username = req.session.username
    if (!username) return res.status(400).json({ message: 'Нет пользователя' })

    try {
        const user = await dbClient.user.findUnique({
            where: { username: username },
            select: { id: true, maxTime: true }
        })

        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' })
        }
        const now = new Date()
        const startOfToday = new Date(now.setHours(0, 0, 0, 0))

        const dayFounded = await dbClient.day.findFirst({
            where: {
                userId: user.id,
                createdAt: { gte: startOfToday }
            },
            orderBy: {
                createdAt: 'desc'
            },
            select: {
                time: true,
                goalTime: true
            }
        })

        if (!dayFounded) return res.status(400).json({ message: "всё сломалось" })
        return res.status(200).json({ totalTimeToday: dayFounded.time, goalTime: dayFounded.goalTime })
    } catch (e) {
        return res.status(400).json({ message: "всё сломалось" })
    }
})

statsProfile.post('/updateDayTime', checkAuth, checkDayToday, async(req: Request, res: Response) => {
    const username = req.session.username

    const { minutes, maxTime} = req.body
    if (!username) return res.status(400).json({ message: 'Нет пользователя' })

    try{
        const now = new Date()
        const startOfToday = new Date(now.setHours(0, 0, 0, 0))

        const user = await dbClient.user.findUnique({
            where: {
                username: username
            },
            select: { id: true }
        })
        if (!user) return res.status(404).json({ message: 'Пользователь не найден' })

        const updatedData = await dbClient.$transaction(async (tx) => {
            const lastDayEntry = await tx.day.findFirst({
                where: {
                    userId: user.id,
                    createdAt: { gte: startOfToday }
                },
                orderBy: { createdAt: 'desc' },
                select: { id: true }
            });

            if (!lastDayEntry) throw new Error("Day not found");
            const dayUpdate = await tx.day.update({
                where: { id: lastDayEntry.id },
                data: {
                    time: { increment: Number(minutes) },
                    ...(maxTime !== undefined && { goalTime: Number(maxTime) })
                }
            });
            const userUpdate = await tx.user.update({
                where: { id: user.id },
                data: {
                    totalTime: { increment: Number(minutes) },
                    goalTime: maxTime
                }
            });

            return { userUpdate };
        });

        res.json({ message: 'Success', totalTime: updatedData.userUpdate.totalTime })
    } catch ( e ) {
        console.error(e)
        res.status(500).json({ message: 'Database error' })
    }
})


statsProfile.get('/getAllDays', checkAuth, checkDayToday, async(req: Request, res: Response) => {
    const usernameSession = req.session.username
    if (!usernameSession) return res.status(400).json({ message: 'Нет пользователя' })
    try{
        const user = await dbClient.user.findUnique({
            where:{
                username: usernameSession
            },
            include:{
                allDays:{
                    select:{
                        time: true,
                        goalTime: true,
                        createdAt: true
                    },
                    orderBy: {
                        createdAt: 'asc'
                    }

                }
            }
        })
        if (!user) return res.status(400).json({ message: "Юзера нет" })

        return res.status(200).json({days: user.allDays})
    } catch ( e ) {
        console.log('-prisma')
        return res.status(400).json({message: "Призма всё"})
    }
})

export default statsProfile