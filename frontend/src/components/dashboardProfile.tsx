import { useLocation, useNavigate } from 'react-router-dom'
import { useStateStore } from '../store/useStatsStore'
import { useEffect } from 'react'
//import { useStateStore } from '../store/useStatsStore'
import {
	LayoutDashboard,
	CheckSquare,
	HelpCircle,
} from 'lucide-react'

export const DashboardProfile = (): React.ReactNode => {

	const dataToday = useStateStore(state => state.getInformationTodayStore)
	const dataAllTime = useStateStore(state => state.getInformationStore)

	useEffect(() => {
		dataToday(), dataAllTime()
	}, [ dataToday, dataAllTime])
	
    const location = useLocation()
	const navigate = useNavigate()

	const menuItems = [
		{ name: 'My statistic', path: '/profile', icon: LayoutDashboard },
		{ name: 'Check tasks', path: '/tasks', icon: CheckSquare },
		{ name: '?', path: '/?', icon: HelpCircle },
	]

	return (
		<div className='flex flex-col p-5 w-[20vw] items-left'>
			{menuItems.map((item) => {
				const isActive = location.pathname === item.path
                const Icon = item.icon
				return (
                    <div
                        key={item.path}
                        onClick={() => navigate(item.path)}
                        className={`
                            flex flex-row items-center px-4 py-3 cursor-pointer rounded-xl
                            transition-all duration-200 group
                            ${isActive 
                                ? 'bg-red-400/10 text-red-400' 
                                : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'}
                        `}
                    >
                        <div className={`mr-3 transition-transform duration-200 group-hover:scale-110`}>
                            <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                        </div>
                        <span className={`text-[15px] font-medium`}>
                            {item.name}
                        </span>
                        {isActive && (
                            <div className='ml-auto w-1.5 h-1.5 rounded-full bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.8)]' />
                        )}
                    </div>
				)}
			)}
		</div>
	)
}
