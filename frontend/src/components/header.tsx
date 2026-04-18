import { ChartNoAxesColumnIncreasing, Bell, User } from 'lucide-react'
import { RedirectButton } from '../ui/redirectButton'
import { useAuthStore } from '../store/useAuthStore'
import { useLocation } from 'react-router-dom'
import { useTaskStore } from '../store/useTasksStore'

export const Header = () => {
    const auth = useAuthStore(state => state.isAuth)
    const location = useLocation()
	const loading = useAuthStore(state => state.isLoading)
	const openMenu = useTaskStore(state => state.isOpen)

    return (
			<header
				className={`
				w-full h-20 flex items-center sticky top-0 px-[5%] z-40 transition-all duration-500
				/* ВОЗВРАЩАЕМ ГРАДИЕНТ */
				bg-gradient-to-b from-[#1a0b1c] to-[#0f0a1e]
				border-b border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.5)]
				
				/* ХАК: Выключаем только блюр, если меню открыто, чтобы не было вспышки */
				${openMenu ? 'backdrop-blur-none' : 'backdrop-blur-xl'}
			`}
			>
				<div className='flex items-center gap-12 grow'>
					<div className='relative group cursor-pointer'>
						<div className='absolute inset-0 bg-pink-500/20 blur-xl group-hover:bg-pink-500/40 transition-all rounded-full' />
						<RedirectButton
							className='relative'
							child={
								<ChartNoAxesColumnIncreasing
									size='42px'
									className='text-pink-500 drop-shadow-[0_0_8px_rgba(236,72,153,0.5)] transition-transform group-hover:scale-105'
								/>
							}
							url='/'
							text=''
						/>
					</div>
					<nav className='flex items-center gap-10'>
						{['Features', 'Pricing', 'Integrations', 'Learn'].map(item => (
							<div
								key={item}
								className='text-base font-semibold text-gray-300 hover:text-pink-400 cursor-pointer transition-all tracking-wide uppercase text-[13px]'
							>
								{item}
							</div>
						))}
					</nav>
				</div>
				{!loading ? (
					<>
						<div className='flex items-center gap-6'>
							{auth ? (
								<div className='flex items-center gap-6'>
									<div className='text-gray-400 hover:text-white cursor-pointer transition-colors p-2 bg-white/5 rounded-full border border-white/10'>
										<Bell size={22} />
									</div>

									<div className='flex items-center gap-3 bg-white/5 border border-white/10 p-1.5 pr-6 rounded-full hover:bg-white/10 transition-all cursor-pointer'>
										<RedirectButton
											className='text-base font-bold text-white whitespace-nowrap flex flex-row-reverse flex-end items-center'
											text={
												location.pathname === '/profile' ||
												location.pathname === '/tasks'
													? 'Home menu'
													: 'My profile'
											}
											url={
												location.pathname === '/profile' ||
												location.pathname === '/tasks'
													? '/'
													: '/profile'
											}
											child={
												<div className='w-10 h-10 rounded-full bg-gradient-to-tr from-pink-600 to-purple-600 flex items-center justify-center shadow-lg mr-3 ml-2'>
													<User size={20} className='text-white' />
												</div>
											}
										/>
									</div>
								</div>
							) : (
								<div className='flex items-center gap-4'>
									<RedirectButton
										className='text-lg font-medium text-gray-300 hover:text-white px-6'
										text='Sign in'
										url='/login'
									/>
									<div className='bg-white text-black rounded-full hover:bg-pink-500 hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.1)]'>
										<RedirectButton
											className='text-lg font-bold px-8 py-2.5 block'
											text='Sign up'
											url='/register'
										/>
									</div>
								</div>
							)}
						</div>
					</>
				) : (
					<></>
				)}
			</header>
		)
}
