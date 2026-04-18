import { useState } from 'react'
import image3 from '../public/pic5.png'
import { RedirectButton } from '../ui/redirectButton'
import authService from '../api/login.service'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

interface formData{
	username: string,
	password: string
}

export const LoginForm = () => {
	const navigation = useNavigate()

	const [data, setData] = useState<formData>({username: '', password: ''})
	const [actualData, setActualData] = useState<boolean>(true)

	const changeData = (e: React.ChangeEvent<HTMLInputElement>) => {
		setActualData(true)
		setData({...data, [e.target.name]: e.target.value})
	}
	const loginFunc = async(e: any) => {
		e.preventDefault()
		try{
			const res = await authService.login(data)
			if ( res.message == 'Успешная авторизация'){
				navigation('/')
			}	
		} catch ( e ){
			if( axios.isAxiosError(e)){
				console.log(e.response?.data.message)
				setActualData(false)
			}
		}
	}
    return (
			<div
				className=' h-screen w-full bg-cover bg-center flex flex-grow items-center justify-center'
				style={{ backgroundImage: `url(${image3})` }}
			>
				<div className='absolute inset-0 bg-gradient-to-br from-purple-900/50 to-black/70'></div>
				<div className='absolute inset-0 bg-gradient-to-br from-purple-900/50 to-black/70'></div>
				<div className='w-100 rounded-xl border-2 border-white bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl'>
					<div className='text-3xl text-white justify-self-center p-4 pb-0'>
						<strong>Login</strong>
					</div>
					<form
						className='flex flex-col p-10 pt-5 text-white/80 text-sm ml-1'
						onSubmit={e => loginFunc(e)}
					>
						<div className='pb-3'>
							<input
								placeholder='Username'
								id='username'
								type='text'
								autoComplete='username'
								name='username'
								value={data.username}
								onChange={changeData}
								className={`min-h-[50px] w-full border-2 rounded-full bg-white/10 p-2 pl-4 text-xl text-white outline-none transition-all duration-300
									${!actualData ? 'border-red-600/70 shadow-[0_0_10px_rgba(251,113,133,0.3)]' : 'border-white/30 focus:border-purple-200'}`}
							></input>
							<div>
								{!actualData ? (
									<div className='text-red-500 flex w-[100%] pl-2 pt-1 pb-0'>
										Invalid username or password
									</div>
								) : (
									<></>
								)}
							</div>
						</div>
						<div className='pb-5'>
							<input
								placeholder='Password'
								id='password'
								type='password'
								autoComplete='current-password'
								name='password'
								value={data.password}
								onChange={changeData}
								className={`min-h-[50px] w-full border-2 rounded-full bg-white/10 p-2 pl-4 text-xl text-white outline-none transition-all duration-300
									${!actualData ? 'border-red-600/70 shadow-[0_0_10px_rgba(251,113,133,0.3)]' : 'border-white/30 focus:border-purple-200'}`}
							></input>
						</div>
						<div className='flex items-center gap-3 justify-between'>
							<div className='flex items-center'>
								<input
									type='checkbox'
									id='remember'
									className='appearance-none w-5 h-5 rounded-md border-2 border-white/30 bg-white/10 cursor-pointer transition-all duration-300 checked:bg-purple-400  hover:border-white/60 outline-none'
								/>
								<label
									htmlFor='remember'
									className='text-white/70 text-sm cursor-pointer select-none hover:text-white transition-colors ml-3'
								>
									Remember me
								</label>
							</div>
							<RedirectButton
								url='/login'
								className='cursor-pointer hover:text-white transition-all duration-300'
								text='Forget Password?'
							/>
						</div>
						<button
							className={`w-[100%] h-10 bg-white text-black rounded-4xl font-medium text-lg mt-4 hover:bg-purple-200 transition-all duration-400 ${!actualData ? 'opacity-50 cursor-not-allowed' : ''}`}
							disabled={!actualData}
						>
							Login
						</button>
						<div className='flex items-center justify-center mt-4'>
							<a>Don`t have a account?</a>
							<RedirectButton
								text='Register'
								className='font-medium hover:text-white transition-all duration-400 ml-1'
								url='/register'
							/>
						</div>
					</form>
				</div>
			</div>
		)
}