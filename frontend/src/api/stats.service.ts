import { defaultConfig } from "./config";

interface DaysType{
    days: number,
    totalTime: number, //это за всё время
    maxTime: number // максимальное время в день за всё время
}

interface TodayType{
    message: string,
    totalTimeToday: number, //это за этот день
    goalTime: number  
}

interface updateType{
    totalTime: number
}

interface updateInfoType{
    minutes: number,
    maxTime: number
}

export interface DayCalendar{
    time: number,
    goalTime: number,
    createdAt: Date,
}

interface getAllDays{
    days: DayCalendar[]
}

export interface MyError {
    message: string
}

const statsService = {
    getInformation: async () => {
        const { data } = await defaultConfig.get<DaysType>('/getDays')
        return data
    },
    getInformationToday: async () => {
        const { data } = await defaultConfig.get<TodayType>('/getToday')
        if( data.message ) console.log(data.message)
        return data
    },
    updateDatabaseInfo: async (postData: updateInfoType) => {
        const { data } = await defaultConfig.post<updateType>('/updateDayTime', postData)
        return data
    },
    getAllDays: async() => {
        const { data } = await defaultConfig.get <getAllDays>('/getAllDays')
        return data
    }
}

export default statsService