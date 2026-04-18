import { type MouseEventHandler } from 'react'
import type { Items } from './animList'

interface Schema {
	onClick: MouseEventHandler<HTMLButtonElement>
	description: string
	content: string
	isOpen: Items
	id: string
}
export const AnimListItem = ({
	onClick,
	content,
	description,
	isOpen,
	id,
}: Schema) => {
	const isActuallyOpen = isOpen.bool && isOpen.id === id

	return (
		<div className='w-fit mb-1 overflow-hidden border-b-2 border-t-2 border-gray-300 max-w-[700px]'>
			<button
				onClick={onClick}
				data-id={id}
				className='block w-full p-4 text-left focus:outline-none cursor-pointer'
			>
				<span className='block whitespace-nowrap font-bold text-slate-800 text-lg text-white'>
					{description}
				</span>

				<span
					className={`grid transition-all duration-500 ease-in-out ${
						isActuallyOpen
							? 'grid-rows-[1fr] opacity-100 mt-3'
							: 'grid-rows-[0fr] opacity-0'
					}`}
				>
					<span className='overflow-hidden block w-full '>
						<span className='block w-full whitespace-normal break-words text-sm leading-relaxed text-slate-700 text-white/50'>
							{content}
						</span>
					</span>
				</span>
			</button>
		</div>
	)
}