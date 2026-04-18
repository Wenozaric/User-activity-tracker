import { create } from "zustand";
import statsService from '../api/stats.service'
import { type DayCalendar } from "../api/stats.service";

interface stateStoreData{
    totalTimeToday: number,
    goalTime: number | null,

    days: number,
    totalTime: number,
    maxTime: number,

    showAllDays: DayCalendar[] | null,
    isLoadingToday: boolean,
    isLoadingAllTime: boolean,

    updateTimeToday: (a: number) => void,

    getInformationStore: () => Promise<void>,
    getInformationTodayStore: () => Promise<void>,
    setMaxTime: (b: number) => void,

    getAllDays: () => Promise<void>,

}

export const useStateStore = create<stateStoreData>((set, get) => ({
    totalTimeToday: 0,
    goalTime: null,

    days: 0,
    totalTime: 0,
    maxTime: 0,

    showAllDays: null,
    isLoadingToday: true,
    isLoadingAllTime: true,

    updateTimeToday: (increment) => {
        const oldTimeToday = get().totalTimeToday
        const oldTimeAll = get().totalTime
        set(_state => ({ totalTimeToday: oldTimeToday + increment, totalTime: oldTimeAll + increment }))
    },

    getInformationTodayStore: async () => {
        try {
            const res = await statsService.getInformationToday()
            set({ totalTimeToday: res.totalTimeToday, goalTime: res.goalTime })
        } catch (e) {
            console.log(e)
            set({ totalTime: 0, goalTime: null })
        } finally {
            set({ isLoadingToday: false })
        }
    },

    getInformationStore: async () => {
       try{
           const res = await statsService.getInformation()
           //console.log('days res ' + res.days)
           //console.log(res.totalTime)
           //console.log(res.maxTime)
           set({days: res.days, totalTime: res.totalTime, maxTime: res.maxTime})
       } catch ( e ){
            //console.log(e)
            set({days: 0, totalTime: 0, maxTime: 0})
       } finally{
            //console.log('finally fetch all time')
           set({ isLoadingAllTime: false})
       }
    },

    setMaxTime: (data: number) => {
        set({ goalTime: data})
    },

    getAllDays: async () => {
        try{
            const res = await statsService.getAllDays()
            set({ showAllDays : res.days})
        } catch (e) {
            console.log(e)
        } finally {

        }
    }
}))