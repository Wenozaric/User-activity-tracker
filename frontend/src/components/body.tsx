import { useState } from 'react'
import image1 from '../public/pic7.webp'
import image2 from '../public/pic9.webp'
import { RedirectButton } from '../ui/redirectButton'
import { useAuthStore } from '../store/useAuthStore'
import { ChevronDown } from 'lucide-react'

export const Body = (): React.ReactNode => {
	const auth = useAuthStore(state => state.isAuth)
	const [activeListItem, setActiveListItem] = useState<number | null>(null)

	const features = [
		{
			title: 'Anti-loss technology',
			desc: 'Your data is mirrored across secure nodes. Even if one fails, your progress remains intact.',
		},
		{
			title: 'Move your data where you need it',
			desc: 'Seamlessly export your stats to JSON, CSV or sync with your favorite productivity tools.',
		},
		{
			title: 'Fully encrypted',
			desc: 'End-to-end encryption ensures that only you have access to your personal data.',
		},
		{
			title: 'Plenty of options',
			desc: 'Customize every aspect of your dashboard to fit your unique workflow.',
		},
	]

	return (
		<div className='bg-[#0d0d12] text-white min-h-screen font-sans overflow-x-hidden relative'>
			<div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-purple-600/10 to-transparent blur-[120px] pointer-events-none' />
			<div className='relative flex min-h-[800px] flex-row items-center px-[5%] z-10'>
				<div className='flex max-w-[50%] flex-col grow'>
					<div className='text-8xl font-bold tracking-tighter leading-[0.85] mb-10'>
						Focus. Action.
						<br />
						<span className='text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-400'>
							Data. Success.
						</span>
					</div>
					<div className='text-2xl mb-12 leading-relaxed text-gray-400 max-w-[85%]'>
						Transform your daily routine into measurable growth. Our smart TODO
						system tracks every task, providing deep insights.
					</div>

					<div className='flex gap-6 items-center'>
						{!auth ? (
							<>
								<div className='rounded-full bg-white text-black hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]'>
									<RedirectButton
										className='min-h-[60px] px-12 text-xl font-bold flex items-center'
										text='Sign up'
										url='/register'
									/>
								</div>
								<div className='rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-all'>
									<RedirectButton
										className='min-h-[60px] px-12 text-xl font-semibold text-white flex items-center'
										text='Sign in'
										url='/login'
									/>
								</div>
							</>
						) : (
							<div className='rounded-full bg-gradient-to-r from-pink-500 to-purple-600 shadow-[0_0_30px_rgba(236,72,153,0.3)] hover:scale-105 transition-all duration-300'>
								<RedirectButton
									className='min-h-[60px] px-12 text-xl font-bold text-white flex items-center'
									text='Check your statistics'
									url='/profile'
								/>
							</div>
						)}
					</div>
				</div>

				<div className='flex grow justify-end relative'>
					<div className='absolute inset-0 bg-purple-500/10 blur-[120px] rounded-full scale-75' />
					<img
						src={image1}
						className='w-[600px] h-auto object-contain mix-blend-screen brightness-110'
						style={{
							maskImage: 'radial-gradient(circle, black 40%, transparent 90%)',
							WebkitMaskImage:
								'radial-gradient(circle, black 40%, transparent 90%)',
						}}
					/>
				</div>
			</div>
			<div className='px-[5%] py-32 flex flex-row gap-8 justify-center relative z-10'>
				{[
					{
						title: 'Smart Task Management',
						desc: 'Organize your daily goals effortlessly. Use our intuitive interface to create and manage lists.',
					},
					{
						title: 'Deep Progress Analytics',
						desc: 'Gain clarity through data. Every completed task builds a detailed picture of your productivity.',
					},
					{
						title: 'Achievement & Growth',
						desc: 'Turn consistency into results. Monitor your long-term progress and unlock new milestones.',
					},
				].map((item, i) => (
					<div
						key={i}
						className='flex-1 bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-10 flex-col rounded-[40px] hover:bg-white/[0.06] hover:-translate-y-3 transition-all duration-500 group'
					>
						<div className='pb-4 text-2xl font-bold text-white group-hover:text-pink-400 transition-colors'>
							{item.title}
						</div>
						<div className='text-gray-400 leading-relaxed text-sm'>
							{item.desc}
						</div>
					</div>
				))}
			</div>

			<div className='w-full py-40 flex flex-col items-center relative'>
				<div className='absolute right-[-10%] top-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-600/10 blur-[200px] rounded-full pointer-events-none' />

				<div className='text-6xl font-black text-center mb-24 text-white tracking-tighter leading-tight relative z-10'>
					We will take care of{' '}
					<span className='text-pink-500 drop-shadow-[0_0_15px_rgba(236,72,153,0.3)]'>
						everything
					</span>
					,<br />
					so you can{' '}
					<span className='text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]'>
						relax
					</span>
				</div>

				<div className='flex w-full px-[10%] items-start justify-between gap-24 relative z-10'>
					<div className='flex-1 flex flex-col'>
						{features.map((feature, i) => {
							const isActive = activeListItem === i
							return (
								<div
									key={i}
									className={`border-b border-white/5 transition-all duration-500 ${isActive ? 'bg-white/[0.02]' : ''}`}
								>
									<button
										onClick={() => setActiveListItem(isActive ? null : i)}
										className='flex items-center justify-between w-full py-8 px-4 outline-none group text-left'
									>
										<div className='flex items-center gap-6'>
											<div
												className={`w-2 h-2 rounded-full transition-all duration-500 ${isActive ? 'bg-pink-500 shadow-[0_0_15px_#ec4899]' : 'bg-gray-700'}`}
											/>
											<span
												className={`text-2xl font-bold transition-colors ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}
											>
												{feature.title}
											</span>
										</div>
										<ChevronDown
											size={24}
											className={`transition-transform duration-500 ${isActive ? 'rotate-180 text-pink-500' : 'text-gray-600'}`}
										/>
									</button>
									<div
										className={`grid transition-all duration-500 ease-in-out ${isActive ? 'grid-rows-[1fr] opacity-100 mb-8' : 'grid-rows-[0fr] opacity-0'}`}
									>
										<div className='overflow-hidden'>
											<p className='text-xl text-gray-400 leading-relaxed pl-12 pr-10 border-l-2 border-pink-500/20 ml-5 py-2'>
												{feature.desc}
											</p>
										</div>
									</div>
								</div>
							)
						})}
					</div>
					<div className='flex-1 flex justify-end relative pt-10'>
						<img
							src={image2}
							className='w-[550px] h-auto object-contain mix-blend-screen brightness-110 contrast-110'
							style={{
								maskImage:
									'radial-gradient(circle, black 50%, transparent 75%)',
								WebkitMaskImage:
									'radial-gradient(circle, black 50%, transparent 75%)',
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}