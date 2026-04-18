import image3 from '../public/pic5.png'
import { RedirectButton } from '../ui/redirectButton'
import { Check, X} from 'lucide-react'
import { useState, useEffect} from 'react'
import { z } from 'zod'
import authService from '../api/login.service'
import { useAuthStore } from '../store/useAuthStore'
import { useNavigate } from 'react-router-dom'


const usernameSchema = z.object({
	len: z.string().min(3).max(16),
	letters: z.string().regex(/[a-zA-Z]/),
	noSymb: z.string().regex(/^[a-zA-Z0-9]*$/),
	firstLetter: z.string().regex(/^[a-zA-Z]/),
})

const emailSchema = z.object({
	email: z.email()
})

const passwordSchema = z.object({
	len: z.string().min(6).max(16),
})

interface userDataState {
	len: boolean
	letters: boolean
	noSymb: boolean
	firstLetter: boolean
}

interface emailDataState{
	email: boolean
}

interface passwordDataState {
	len: boolean
}

interface formDataType {
	username: string,
	email: string,
	password: string
}


export const RegisterForm = () => {

	const redirect = useNavigate()

	const setUser = useAuthStore(state => state.setUser)

	const [userData, setUserData] = useState<userDataState>({
		len: false,
		letters: false,
		noSymb: false,
		firstLetter: false,
	})

	const [emailData, setEmailData] = useState < emailDataState>({
		email: false
	})

	const [passwordData, setPasswordData] = useState<passwordDataState>({
		len: false
	})

	const [ canSend, setCanSend ] = useState<boolean>(false)

	const [data, setData] = useState<formDataType>({username:'', email:'', password:''})

	const [alreadyUsername, setAlreadyUsername] = useState<boolean>(false)
	const [alreadyEmail, setAlreadyEmail] = useState<boolean>(false)

	const [loading, setLoading] = useState<boolean>(false)

	const checkData = <T extends z.ZodRawShape>(
		e: React.ChangeEvent<HTMLInputElement>,
		shape: T
	) => {
		// Инициализируем объект с правильным типом ключей
		const value = e.target.value
		const results = {} as Record<keyof T, boolean>

		// Проходимся по всем правилам в схеме
		for (const key in shape) {
			// 1. Достаем конкретную схему (правило) по ключу
			const rule = shape[key] as any

			// 2. Валидируем строку этим правилом и сохраняем true/false
			results[key] = rule.safeParse(value).success
		}
		return results
	}

	const changeData = (e: React.ChangeEvent<HTMLInputElement>) => {
		const input = e.target.name
		if( input == 'username') setAlreadyUsername(false)
		if (input == 'email') setAlreadyEmail(false)
		setData({...data, [e.target.name]: e.target.value})
	}

	useEffect(() => {
		const isUserValid = Object.values(userData).every(v => v === true)
		const isEmailValid = Object.values(emailData).every(v => v === true)
		const isPassValid = Object.values(passwordData).every(v => v === true)

		setCanSend(
			isUserValid &&
				isEmailValid &&
				isPassValid &&
				!alreadyUsername &&
				!alreadyEmail,
		)
	}, [userData, emailData, passwordData, alreadyUsername, alreadyEmail])
	
	const checkDataAll = (
		e: React.ChangeEvent<HTMLInputElement>,
		setFunc: React.Dispatch<React.SetStateAction<any>>,
		schema: any,
	) => {
		const data = checkData(e, schema.shape)
		setFunc(data)
	}

	const registerForm = async (e: any) => {
		e.preventDefault()
		setLoading(true)
		try {
			const res = await authService.register(data)
			console.log('Успех!', res)
			console.log(res.data.username, res.data.email, res.data.id)
			console.log(res.data)
			setUser(res.data)
			setLoading(false)
			redirect('/')
			
		} catch (err: any) {
			const message = err.response?.data?.message
			if( message == 'Username занят'){
				setAlreadyUsername(true)
				setLoading(false)
			}
			if (message == 'Email занят') {
				setAlreadyEmail(true)
				setLoading(false)
			}
			if( message ) console.log(message)
		}
	}

    return (
			<div
				className=' h-screen w-full bg-cover bg-center flex flex-grow items-center justify-center'
				style={{ backgroundImage: `url(${image3})` }}
			>
				<div className='absolute inset-0 bg-gradient-to-br from-purple-900/50 to-black/70'></div>
				<div className='absolute inset-0 bg-gradient-to-br from-purple-900/50 to-black/70'></div>
				<div className='w-100 rounded-xl border-2 bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl '>
					<div className='text-3xl text-white justify-self-center p-4 pb-0'>
						<strong>Register</strong>
					</div>

					<form
						className='flex flex-col p-10 pt-5 text-white/80 text-sm ml-1'
						onSubmit={e => registerForm(e)}
					>
						<div className='pb-0'>
							<input
								placeholder='Username'
								id='username'
								type='text'
								autoComplete='username'
								name='username'
								value={data.username}
								className={`min-h-[50px] w-full border-2 rounded-full bg-white/10 p-2 pl-4 text-xl text-white outline-none
									${alreadyUsername ? 'border-red-600/70 shadow-[0_0_10px_rgba(251,113,133,0.3)]' : 'border-white/30 focus:border-purple-200'}`}
								onChange={e => {
									checkDataAll(e, setUserData, usernameSchema)
									changeData(e)
								}}
							></input>
							<div>
								{alreadyUsername ? (
									<div className='text-red-700 flex w-[100%] pl-2 pt-1 pb-0'>
										Username is already taken
									</div>
								) : (
									<></>
								)}
							</div>
							<div className='p-1 pb-0 pl-0 flex flex-row'>
								{userData.len ? (
									<Check className='text-white w-5 h-5' color='#00FFFF' />
								) : (
									<X className='text-white w-5 h-5' color='#FF3131' />
								)}
								<div className='pl-2'>3 to 16 characters long</div>
							</div>
							<div className='p-1 pb-0 pl-0 flex flex-row'>
								{userData.letters ? (
									<Check className='text-white w-5 h-5' color='#00FFFF' />
								) : (
									<X className='text-white w-5 h-5' color='#FF3131' />
								)}
								<div className='pl-2'>Letters and numbers only</div>
							</div>
							<div className='p-1 pb-0 pl-0 flex flex-row'>
								{userData.noSymb ? (
									<Check className='text-white w-5 h-5' color='#00FFFF' />
								) : (
									<X className='text-white w-5 h-5' color='#FF3131' />
								)}
								<div className='pl-2'>No special characters or spaces</div>
							</div>
							<div className='p-1 pl-0 pb-3 flex flex-row'>
								{userData.firstLetter ? (
									<Check className='text-white w-5 h-5' color='#00FFFF' />
								) : (
									<X className='text-white w-5 h-5' color='#FF3131' />
								)}
								<div className='pl-2'>Must start with a letter</div>
							</div>
						</div>
						<div className='pb-0'>
							<input
								placeholder='Email'
								id='email'
								type='text'
								autoComplete='email'
								name='email'
								value={data.email}
								onChange={e => {
									checkDataAll(e, setEmailData, emailSchema)
									changeData(e)
								}}
								className={`min-h-[50px] w-full border-2 rounded-full bg-white/10 p-2 pl-4 text-xl text-white outline-none transition-all duration-300
									${alreadyEmail ? 'border-red-600/70 shadow-[0_0_10px_rgba(251,113,133,0.3)]' : 'border-white/30 focus:border-purple-200'}`}
							></input>
							<div>
								{alreadyEmail ? (
									<div className='text-red-500 flex w-[100%] pl-2 pt-1 pb-0'>
										Email is already registered
									</div>
								) : (
									<></>
								)}
							</div>
							<div className='p-1 pl-0 pb-3 flex flex-row'>
								{emailData.email ? (
									<Check className='text-white w-5 h-5' color='#00FFFF' />
								) : (
									<X className='text-white w-5 h-5' color='#FF3131' />
								)}
								<div className='pl-2'>Must be email</div>
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
								onChange={e => {
									checkDataAll(e, setPasswordData, passwordSchema)
									changeData(e)
								}}
								className='min-h-[50px] w-[100%] border-2 border-white/30 rounded-full bg-white/10 p-2 pl-4 text-xl text-white outline-none focus:border-purple-200 transition-all duration-300'
							></input>
							<div className='p-1 pb-0 pl-0 flex flex-row'>
								{passwordData.len ? (
									<Check className='text-white w-5 h-5' color='#00FFFF' />
								) : (
									<X className='text-white w-5 h-5' color='#FF3131' />
								)}
								<div className='pl-2'>6 to 16 characters long</div>
							</div>
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
						</div>
						<button
							className={`w-[100%] h-10 bg-white text-black rounded-4xl font-medium text-lg mt-4 hover:bg-purple-200 transition-all duration-400 ${!canSend || loading? 'opacity-50 cursor-not-allowed' : ''}`}
							disabled={!canSend || loading}
						>
							Register
						</button>
						<div className='flex items-center justify-center mt-4'>
							<a>Already have an account?</a>
							<RedirectButton
								text='Login'
								className='font-medium hover:text-white transition-all duration-400 ml-1'
								url='/login'
							/>
						</div>
					</form>
				</div>
			</div>
		)
}