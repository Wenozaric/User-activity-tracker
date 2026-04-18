import { DashboardProfile } from "./dashboardProfile"
import { ProgressBar } from './progressBar'
import { SecondProgressBar } from "./secondProgressBar"
import { Calendar } from "./calendar"
import { Streak } from "./streak"

export const BodyProfile = (): React.ReactNode => {
    return (
			<div className='bg-[#0f0a1e] text-white font-sans min-h-screen flex flex-row'>
				<DashboardProfile />
				<div className='flex flex-col p-5 grow items-start'>
					<div className='text-xl mt-2 font-bold tracking-widest'>
						DASHBOARD
					</div>
					<div className='flex flex-row w-[100%]'>
						<ProgressBar />
						<SecondProgressBar />
						<Streak />
					</div>
					<div className='flex flex w-[100%]'>
						<Calendar />
					</div>
				</div>
			</div>
		)
}