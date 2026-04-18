import cron from 'node-cron'
import { dbClient } from './prisma.js';

export const initCronTasks = async() => {
    //минута, час, день, месяц, день недели
    cron.schedule('0 0 * * *', async () => {
        try {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const users = await dbClient.user.findMany({
                select:{
                    id: true,
                    goalTime: true
                }
            })
            for( const user of users){
                await dbClient.day.create({
                    data:{
                        userId: user.id,
                        time: 0,
                        goalTime: user.goalTime,
                        createdAt: new Date()
                    }
                })
                await dbClient.user.update({
                    where: { id: user.id },
                    data: {
                        days: {
                            increment: 1
                        }
                    }
                });
            }
            console.log(`Созданы записи для ${users.length} пользователей`);
        } catch (error) {
            console.error('Ошибка при создании дня:', error);
        }
    });
};