import { defaultConfig } from "./config";

export interface Task{

    id: Number
    title: string
    description: string
    isCompleted: boolean

    createdAt: string
    completedAt?: string | null

}

export interface TaskFromFrontend{
    title: string
    description: string
}

interface ResMessage{
    message: string
}


const tasksService = {
    getTasks: async() => {
        const { data } = await defaultConfig.get<Task[]>('/getTasks')
        return data
    },
    addTask: async (newTask: TaskFromFrontend) => {
        const { data } = await defaultConfig.post<Task>('/addTask', newTask)
        return data
    },
    deleteTask: async (selectedTask: Task) => {
        const { data } = await defaultConfig.delete<ResMessage>('/deleteTask', { data: selectedTask })
        return data
    },
    editTask: async (selectedTask: Task) => {
        const { data } = await defaultConfig.patch<ResMessage>('/editTask', selectedTask)
        return data
    }
}

export default tasksService