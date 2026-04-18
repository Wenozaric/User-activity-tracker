import { DashboardProfile } from './dashboardProfile'
import image1 from '../public/pic1_1.png'
import { useTaskStore } from '../store/useTasksStore'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { type Task } from '../api/tasks.service'

interface stateData {
	title: string
	description: string
}

export const BodyTasks = (): React.ReactNode => {
	const {
		tasks,
		getTasks,
		addTask,
		deleteTask,
		editTask,
		isOpen,
		setIsOpen,
	} = useTaskStore()
	const [data, setData] = useState<stateData>({ title: '', description: '' })
	const [selectedTask, setSelectedTask] = useState<Task | null>(null)

	useEffect(() => {
		getTasks()
	}, [getTasks])

	const handleOpenCreate = () => {
		setData({ title: '', description: '' })
		setSelectedTask(null)
		setIsOpen(true)
	}

	const handleOpenEdit = (task: Task) => {
		setData({ title: task.title, description: task.description })
		setSelectedTask(task)
		setIsOpen(true)
	}

	const handleSave = async () => {
		if (selectedTask) await editTask({ ...selectedTask, ...data })
		else await addTask(data)
		setIsOpen(false)
	}

	return (
		<div className='bg-[#0f0a1e] text-white font-sans flex-1 flex flex-col relative'>
			<div className='flex flex-row flex-1'>
				{/* Левая панель остается на месте */}
				<DashboardProfile />

				{/* Правая часть с контентом */}
				<div className='flex flex-col p-5 grow relative'>
					<div className='text-xl mt-2 font-bold tracking-widest uppercase mb-8'>
						Tasks
					</div>

					{/* Если задач нет - показываем пустой экран */}
					{tasks.length === 0 ? (
						<div className='flex-1 flex flex-col items-center justify-center gap-8'>
							<div className='relative w-full max-w-[450px] animate-show-content'>
								<img
									src={image1}
									alt='Empty'
									className='w-full h-auto object-contain'
									style={{
										maskImage:
											'radial-gradient(circle, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 70%)',
										WebkitMaskImage:
											'radial-gradient(circle, rgba(0,0,0,1) 20%, rgba(0,0,0,0) 70%)',
									}}
								/>
							</div>
							<h3 className='text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'>
								Your list is empty
							</h3>
							<div className='rounded-full bg-gradient-to-r from-pink-500 to-purple-600 shadow-[0_0_30px_rgba(236,72,153,0.3)]'>
								<button
									className='min-h-[50px] px-8 text-xl font-bold text-white'
									onClick={handleOpenCreate}
								>
									Start working
								</button>
							</div>
						</div>
					) : (
						/* Если задачи есть - показываем сетку */
						<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-show-content'>
							{tasks.map(task => (
								<div
									key={task.id?.toString()}
									onClick={() => handleOpenEdit(task)}
									className='p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 cursor-pointer transition-all hover:bg-white/10'
								>
									<h4 className='text-lg font-bold mb-2'>{task.title}</h4>
									<p className='text-gray-400 text-sm line-clamp-3'>
										{task.description}
									</p>
								</div>
							))}
							{/* Кнопка "Добавить еще" в конце списка */}
							<div
								onClick={handleOpenCreate}
								className='p-6 rounded-2xl border-2 border-dashed border-white/10 flex items-center justify-center cursor-pointer hover:border-purple-500/50 text-gray-500 hover:text-white transition-all'
							>
								+ Add New Task
							</div>
						</div>
					)}
				</div>
			</div>

			{/* ПОРТАЛ МЕНЮ */}
			{createPortal(
				<>
					<div
						className={`fixed inset-0 bg-black/60 transition-opacity duration-500 ${isOpen ? 'opacity-100 z-[998] backdrop-blur-sm' : 'opacity-0 pointer-events-none'}`}
						onClick={() => setIsOpen(false)}
					/>
					<div
						className={`fixed right-0 top-0 h-full w-[450px] z-[999] bg-[#0f0a1e] border-l border-white/10 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] transform-gpu ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
					>
						<div className='w-full h-full p-12 flex flex-col gap-10'>
							<div className='flex justify-between items-center'>
								<h2 className='text-4xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent'>
									{selectedTask ? 'Edit Task' : 'Create Task'}
								</h2>
								<button
									onClick={() => setIsOpen(false)}
									className='text-white/20 hover:text-white text-2xl'
								>
									✕
								</button>
							</div>

							<div className='flex flex-col gap-8'>
								<div className='flex flex-col gap-3'>
									<label className='text-gray-400 text-xs uppercase font-bold'>
										Task Name
									</label>
									<input
										type='text'
										className='bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-pink-500/50'
										value={data.title}
										onChange={e => setData({ ...data, title: e.target.value })}
									/>
								</div>
								<div className='flex flex-col gap-3'>
									<label className='text-gray-400 text-xs uppercase font-bold'>
										Description
									</label>
									<textarea
										rows={5}
										className='bg-white/5 border border-white/10 rounded-2xl p-5 text-white outline-none focus:border-pink-500/50 resize-none'
										value={data.description}
										onChange={e =>
											setData({ ...data, description: e.target.value })
										}
									/>
								</div>
								<button
									className='mt-6 w-full py-5 rounded-2xl bg-gradient-to-r from-pink-500 to-indigo-600 text-white font-black text-xl shadow-lg'
									onClick={handleSave}
								>
									{selectedTask ? 'Save Changes' : 'Launch Task'}
								</button>
								{selectedTask && (
									<button
										className='text-red-500/60 hover:text-red-500 font-bold transition-colors'
										onClick={async () => {
											await deleteTask(selectedTask)
											setIsOpen(false)
										}}
									>
										Delete Task
									</button>
								)}
							</div>
						</div>
					</div>
				</>,
				document.body,
			)}
		</div>
	)
}