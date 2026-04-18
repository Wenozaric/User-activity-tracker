import { NextFunction, Request, Response } from "express";
import { dbClient } from "../shared/prisma.js";

export const checkDayToday = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.session || !req.session.username) return res.status(400).json({ message: 'Нет куки' })
    const username = req.session.username
    if (!username) return res.status(400).json({ message: 'Нет пользователя' })
    try{

        const user = await dbClient.user.findUnique({
            where: { username: username },
            select: { id: true, maxTime: true, goalTime: true}
        })

        if (!user) {
            return res.status(404).json({ message: 'Пользователь не найден' })
        }

        const now = new Date()
        const startOfToday = new Date(now.setHours(0, 0, 0, 0))

        const exist = await dbClient.day.findFirst({
            where: {
                userId: user.id,
                createdAt: startOfToday
            }
        })

        try {
            const startOfToday = new Date();
            startOfToday.setHours(0, 0, 0, 0);
            await dbClient.day.create({
                data: {
                    time: 0,
                    goalTime: user.goalTime || 100,
                    userId: user.id,
                    createdAt: startOfToday
                }
            });
            const checkUser = await dbClient.user.update({
                where: { id: user.id },
                data: { days: { increment: 1 } },
                select: { days: true, username: true }
            });

            console.log(`[MIDDLEWARE SUCCESS] Юзер: ${checkUser.username}, Стало дней: ${checkUser.days}`);


        } catch (e: any) {
            if (e.code === 'P2002') {
            } else {
                throw e;
            }
        }
        next()
    } catch ( e ) {
        console.log('ошибка призма')
        console.log(e)
        return res.status(400).json({message: 'Ошибка призма'})
    }
}