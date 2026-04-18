import { useEffect, useState, useMemo } from 'react'
import { useStateStore } from '../store/useStatsStore'
import { type DayCalendar } from '../api/stats.service'

export const Calendar = () => {
	const days = useStateStore(state => state.showAllDays) || []
	const fetchDays = useStateStore(state => state.getAllDays)
	const [selectedDay, setSelectedDay] = useState<null | DayCalendar>(null)

	useEffect(() => {
		fetchDays()
	}, [])

	const TOTAL_SLOTS = 200

	const displayDays = useMemo(() => {
		if (!days) return []
		return days.slice(-TOTAL_SLOTS)
	}, [days])

	const slots = useMemo(() => [...Array(TOTAL_SLOTS)].map((_, i) => i), [])

	const getColor = (time: number, goal: number) => {
		if (!time || time === 0) return '#161b22'
		const percent = time / goal
		if (percent > 1.5) return '#00ccff'
		const ratio = Math.min(percent, 1)
		const hue = ratio * 120
		return `hsl(${hue}, 75%, 50%)`
	}

	return (
		<div className='flex flex-col bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-[16px] m-3 w-fit shadow-2xl'>
			<div className='mb-3'>
				<h3 className='text-white font-bold text-lg'>Last 200 Sessions</h3>
			</div>
			<div className='grid grid-flow-col grid-rows-4 gap-1 p-2 bg-black/20 rounded-lg'>
				{slots.map(index => {
					const offset = TOTAL_SLOTS - displayDays.length
					const dayData = displayDays[index - offset]

					return (
						<div
							key={index}
							className={`w-5 h-5 border-[1px] border-white/5 rounded-sm transition-all duration-300 
                                ${dayData ? 'cursor-pointer hover:scale-125 hover:z-10 shadow-inner' : 'opacity-10 bg-[#161b22]'}`}
							style={{
								backgroundColor: dayData
									? getColor(dayData.time, dayData.goalTime)
									: '#161b22',
							}}
							onMouseEnter={() => dayData && setSelectedDay(dayData)}
						/>
					)
				})}
			</div>
			<div className='h-10 mt-4 flex items-center justify-between px-2'>
				{selectedDay ? (
					<div className='text-white text-xs animate-in fade-in slide-in-from-left-2'>
						<span className='text-gray-400'>
							🕒{' '}
							{new Date(selectedDay.createdAt).toLocaleTimeString([], {
								hour: '2-digit',
								minute: '2-digit',
							})}
						</span>
						<span className='ml-3 font-bold'>
							{selectedDay.time} мин из {selectedDay.goalTime}
						</span>
					</div>
				) : (
					<div className='text-white/20 text-[10px] italic uppercase tracking-wider'>
						Move your mouse over the square
					</div>
				)}
			</div>
		</div>
	)
}