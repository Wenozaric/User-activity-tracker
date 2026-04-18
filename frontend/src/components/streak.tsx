import { useEffect, useMemo } from 'react'
import { useStateStore } from "../store/useStatsStore"

export const Streak = () => {
	const totalDays = 15
	
	let streakBroke = false
	let streak = 0
	let streakFullTime = 0

	const fetchDays = useStateStore(state => state.getAllDays)

	useEffect(() => {
		fetchDays()
	}, [])

	const streakDay = useStateStore(state => state.showAllDays) || []
	const reversedDays = useMemo(() => {
		return [...streakDay].reverse()
	}, [streakDay])

	if (streakDay.length != 0){
		reversedDays.forEach(value => {
			if (!streakBroke) {
				if (value.time == 0) {
					streakBroke = true
				} else {
					streak += 1
					if (value.time >= value.goalTime) streakFullTime += 1
				}
			}
		})
	}

	let percentStreak = Math.min(100, (streak / totalDays) * 100)
	let percentStreakFullTime = Math.min(100, (streakFullTime / totalDays) * 100)

	console.log('ps ' + percentStreak)
	console.log('ft ' + percentStreakFullTime)

	console.log('streak ' + streak)
	console.log('streakFullTine ' + streakFullTime)

	const getColor = (percent: number) => {
		if (percent < 30)
			return 'from-red-500 to-orange-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]'
		if (percent < 70)
			return 'from-orange-500 to-yellow-400 shadow-[0_0_10px_rgba(249,115,22,0.4)]'
		return 'from-emerald-500 to-teal-400 shadow-[0_0_10px_rgba(16,185,129,0.4)]'
	}
    return (
			<div className='flex flex-col grow bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-[16px] m-3'>
				<div className='flex grow flex-col'>
					<h3 className='text-white font-bold text-lg'>Current streak</h3>
					<div className='flex flex-row justify-between w-[100%]'>
						<div>
							<h3 className='text-gray-400 font-bold text-[10px] uppercase'>
								did a bit of work
							</h3>
							<span
								className={`text-xl font-black ${streak == 0 ? 'text-red-600' : 'text-emerald-400'}`}
							>
								{streak} {streak == 1 ? 'day' : 'days'}
							</span>
						</div>
						<div>
							<h3 className='text-gray-400 font-bold text-[10px] uppercase'>
								Full Productivity
							</h3>
							<span
								className={`text-xl font-black ${streakFullTime == 0 ? 'text-red-600' : 'text-emerald-400'}`}
							>
								{streakFullTime} {streakFullTime == 1 ? 'day' : 'days'}
							</span>
						</div>
					</div>

					<div className='flex grow flex-col w-[100%] mt-6 px-1'>
						<div className='flex justify-between text-[8px] text-gray-500 font-bold uppercase tracking-widest mb-3'>
							<span>15 days ago</span>
							<span>Today</span>
						</div>
						<div className='flex justify-between bg-white/5 backdrop-blur-xl border border-white/10 rounded-[16px]'>
							<div
								className={`flex h-[10px] bg-gradient-to-r ${getColor(percentStreak)} rounded-[16px]`}
								style={{ width: `${percentStreak}%` }}
							></div>
						</div>
						<div className='flex text-[8px] text-gray-500 font-bold uppercase tracking-widest mb-3'>
							<span className='mt-3'>Did a bit of work</span>
						</div>
					</div>
					<div className='flex grow flex-col w-[100%] mt-6 px-1'>
						<div className='flex justify-between text-[8px] text-gray-500 font-bold uppercase tracking-widest mb-3'>
							<span>15 days ago</span>
							<span>Today</span>
						</div>
						<div className='flex justify-between bg-white/5 backdrop-blur-xl border border-white/10 rounded-[16px]'>
							<div
								className={`flex h-[10px] bg-gradient-to-r ${getColor(percentStreakFullTime)} rounded-[16px]`}
								style={{ width: `${percentStreakFullTime}%` }}
							></div>
						</div>
						<div className='flex text-[8px] text-gray-500 font-bold uppercase tracking-widest mb-3'>
							<span className='mt-3'>Full Productivity</span>
						</div>
					</div>
				</div>
			</div>
		)
}