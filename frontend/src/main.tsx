import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Root } from './components/Root.tsx'
import ProtectAuth from './components/ProtectAuth.tsx'

import App from './pages/App.tsx'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import Profile from './pages/Profile.tsx'
import Tasks from './pages/Tasks.tsx'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BrowserRouter>
			<ProtectAuth>
				<Routes>
					<Route path='/' element={<Root />}>
						<Route path='/' element={<App />}></Route>
						<Route path='/login' element={<Login />}></Route>
						<Route path='/register' element={<Register />}></Route>

						<Route path='/profile' element={<Profile />}></Route>
						<Route path='/tasks' element={<Tasks />}></Route>
					</Route>
				</Routes>
			</ProtectAuth>
		</BrowserRouter>
	</StrictMode>,
)
