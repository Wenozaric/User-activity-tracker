import { create } from "zustand"
import tasksService from "../api/tasks.service"
import { type Task, type TaskFromFrontend } from '../api/tasks.service'


interface TasksStore{
    isOpen: boolean
    setIsOpen: (a: boolean) => void

    tasksIsLoading: boolean

    tasks: Task[] | []
    getTasks: () => Promise<void>
    addTask: (newTask: TaskFromFrontend) => Promise<void>
    deleteTask: (selectedTask: Task) => Promise<void>
    editTask: (selectedTask: Task) => Promise<void>
}

export const useTaskStore = create<TasksStore>(set => ({

    tasksIsLoading: true,

    isOpen: false,
    setIsOpen: (bool) => {
        set({ isOpen: bool})
    },

    tasks: [],

    getTasks: async () => {
        try {
            set({ tasksIsLoading: true });

            const res = await tasksService.getTasks();
            const data = Array.isArray(res)
                ? res
                : (res && (res as any).tasks ? (res as any).tasks : []);
            set({ tasks: data });

        } catch (e) {
            console.error("Ошибка в getTasks:", e);
            set({ tasks: [] });
        } finally {
            set({ tasksIsLoading: false });
        }
    },

    addTask: async (newTask) => {
        try {
            set({ tasksIsLoading: true })
            const completedTask = await tasksService.addTask(newTask)
            set((state) => ({
                tasks: [...state.tasks, completedTask],
                isOpen: false
            }))

        } catch (e) {
            console.error(e)
        } finally {
            set({ tasksIsLoading: false })
        }
    },

    deleteTask: async (selectedTask) => {
        try {
            await tasksService.deleteTask(selectedTask)
            set((state) => ({
                tasks: state.tasks.filter(t => t.id !== selectedTask.id)
            }))
        } catch (e) {
            console.error(e)
        }
    },

    editTask: async (selectedTask) => {
        try {
            await tasksService.editTask(selectedTask)
            set((state) => ({
                tasks: state.tasks.map(t =>
                    t.id === selectedTask.id ? selectedTask : t
                )
            }))
        } catch (e) {
            console.error(e)
        }
    }
}))