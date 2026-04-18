import { useEffect, useState } from 'react'
import statsService from '../api/stats.service'
import { useStateStore } from '../store/useStatsStore'


export const ProgressBar = () => {
	const [fullTime, setFullTime] = useState<number>(100)
	const [currentTime, setCurrentTime] = useState<number>(0)
	const percent = fullTime > 0 ? Math.round((currentTime / fullTime) * 100) : 0

	const setMaxTime = useStateStore(state => state.setMaxTime)
	const getDescription = (p: number) => {
		if (p === 0) return 'Task is ready to start. Set your timer and begin.'
		if (p < 30) return 'Just starting out. Keep going!'
		if (p < 70) return 'Great pace! You are halfway through.'
		if (p < 100) return 'Almost there! Just a few more minutes.'
		if (p < 150) return 'Goal achieved! Outstanding!'
		return 'You have exceeded the target. This is legendary!'
	}

	const changeTime = useStateStore(state => state.updateTimeToday)

	const time = useStateStore(state => state.totalTimeToday)
	useEffect(() => {
		if (time !== null && time !== undefined && time != 0) setCurrentTime(time)
	}, [time])

	const goalTime = useStateStore(state => state.goalTime)
	useEffect(() => {
		if (goalTime !== null && goalTime !== undefined && goalTime != 0) setFullTime(goalTime)
	}, [goalTime])

	const r = 45
	const circumference = 2 * Math.PI * r
	const visualPercent = Math.min(percent, 100)
	const offset = circumference - (visualPercent / 100) * circumference

	const isOverdrive = percent >= 150
	const hue = Math.min(percent * 1.2, 190)
	const mainColor = isOverdrive ? '#00A3FF' : `hsl(${hue}, 75%, 50%)`

	const changeTimeToday = (increment: number) => {
		setCurrentTime(currentTime + increment)
		changeTime(increment)
	}

	const changeFullTime = () => {
		const newTime = prompt('Enter full time (min):', fullTime.toString())
		if (newTime && !isNaN(Number(newTime))) {
			setFullTime(Number(newTime))

			statsService.updateDatabaseInfo({ minutes: 0, maxTime: Number(newTime)})
			setMaxTime(Number(newTime)) 
		}
	}

	return (
		<div className='flex flex-col bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-[16px] m-3'>
			<div className='flex'>
				<div className='relative w-44 h-44 flex-shrink-0'>
					<style>
						{`
							@keyframes pulse-glow1 {
								0%, 100% { filter: drop-shadow(0 0 3px ${mainColor}); }
								50% { filter: drop-shadow(0 0 8px ${mainColor}); }
							}
							.glow-active1 { animation: pulse-glow1 5s infinite ease-in-out; }
						`}
					</style>

					<svg
						viewBox='0 0 110 110'
						className='w-full h-full transform -rotate-90 overflow-visible'
					>
						<circle
							cx='55'
							cy='55'
							r={r}
							stroke='#1c1c26'
							strokeWidth='8'
							fill='transparent'
						/>
						<circle
							cx='55'
							cy='55'
							r={r}
							stroke={mainColor}
							strokeWidth='8'
							fill='transparent'
							strokeDasharray={circumference}
							strokeDashoffset={offset}
							strokeLinecap='round'
							className='transition-all duration-1000 ease-out glow-active1'
						/>
					</svg>
					<div className='absolute inset-0 flex flex-col items-center justify-center'>
						<span
							className='text-3xl font-black transition-colors duration-1000'
							style={{ color: mainColor }}
						>
							{percent}%
						</span>
					</div>
				</div>

				<div className='flex flex-col gap-6 ml-5'>
					<div className='space-y-2'>
						<h3 className='text-white font-bold text-lg'>
							Current Progress Status
						</h3>
						<p className='text-gray-400 text-sm min-h-[64px] max-w-[300px]'>
							{getDescription(percent)}
						</p>
					</div>

					<div className='flex items-center gap-3'>
						<button
							onClick={() => {
								changeTimeToday(5)
								statsService.updateDatabaseInfo({
									minutes: 5,
									maxTime: fullTime,
								})}
							}
							className='px-5 py-2.5 rounded-full border border-gray-800 text-gray-400 text-xs hover:text-white transition-all active:scale-95'
						>
							+5 min
						</button>
						<button
							onClick={() => {
								changeTimeToday(15)
								statsService.updateDatabaseInfo({
									minutes: 15,
									maxTime: fullTime,
								})}
							}
							className='px-5 py-2.5 rounded-full border border-gray-800 text-gray-400 text-xs hover:text-white transition-all active:scale-95'
						>
							+15 min
						</button>
						<button
							onClick={() => {
								changeFullTime()}}
							className='px-6 py-2.5 rounded-full border border-gray-700 text-gray-200 text-xs font-bold hover:bg-white/10 transition-all active:scale-95'
						>
							Change full time
						</button>
					</div>
				</div>
			</div>

			<div className='mt-4 pt-4 border-t border-white/5'>
				<p className='text-gray-500 text-sm'>
					Current time:{' '}
					<span className='text-white font-mono'>{currentTime}m</span> /
					<span className='text-gray-400 font-mono'> {fullTime}m</span>
				</p>
			</div>
		</div>
	)
}
