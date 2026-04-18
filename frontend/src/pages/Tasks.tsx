import '../style.css'

import { Header } from '../components/header'
import { BodyTasks } from '../components/bodyTasks'

const Tasks = () => {
  
  return (
		<div className='flex flex-col min-h-screen'>
			<Header />
			<BodyTasks />
		</div>
	)
}

export default Tasks