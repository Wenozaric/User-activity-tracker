import { useId } from 'react' 
import { useStateStore } from '../store/useStatsStore'

export const SecondProgressBar = () => {
	const uniqueId = useId().replace(/:/g, '')
	const totalTimeInDb = useStateStore(state => state.totalTime) || 0

	const daysCount = useStateStore(state => state.days) || 1
	const goalTime = useStateStore(state => state.goalTime) || 100
	const averageTimePerDay = Math.round(totalTimeInDb / daysCount)
	const percent = Math.round((averageTimePerDay / goalTime) * 100)

	const r = 45
	const circumference = 2 * Math.PI * r
	const visualPercent = Math.min(percent, 100)
	const offset = circumference - (visualPercent / 100) * circumference

	const isOverdrive = percent >= 150
	const hue = Math.min(percent * 1.2, 190)
	const mainColor = isOverdrive ? '#00A3FF' : `hsl(${hue}, 75%, 50%)`

	return (
		<div className='flex flex-col bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-[16px] m-3'>
			<div className='flex flex-col justify-center items-center'>
				<div className='space-y-2 mb-4 text-center'>
					<h3 className='text-white font-bold text-lg'>Average Progress</h3>
					<p className='text-gray-400 text-xs font-mono'>
						Total: {totalTimeInDb}m over {daysCount} days
					</p>
				</div>

				<div className='relative w-44 h-44'>
					<style>
						{`
                        @keyframes pulse-glow-${uniqueId} {
                            0%, 100% { filter: drop-shadow(0 0 3px ${mainColor}); }
                            50% { filter: drop-shadow(0 0 8px ${mainColor}); }
                        }
                        .glow-${uniqueId} { animation: pulse-glow-${uniqueId} 5s infinite ease-in-out; }
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
							className={`transition-all duration-1000 ease-out glow-${uniqueId}`}
						/>
					</svg>
					<div className='absolute inset-0 flex flex-col items-center justify-center'>
						<span className='text-3xl font-black' style={{ color: mainColor }}>
							{percent}%
						</span>
						<span className='text-[10px] text-gray-500 uppercase tracking-widest'>
							Avg/Day
						</span>
					</div>
				</div>
			</div>

			<div className='mt-4 pt-4 border-t border-white/5 text-center'>
				<p className='text-gray-500 text-sm'>
					Average:{' '}
					<span className='text-white font-mono'>{averageTimePerDay}m</span>
					<span className='text-gray-400 mx-1'>/ day</span>
				</p>
			</div>
		</div>
	)
}