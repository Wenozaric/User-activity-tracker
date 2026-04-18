import loginService from "../api/login.service"

export const PromiseButton = () => {

    const fetchLogin = () => {
        loginService
            .login({username: 'John11211', password:'123'})
            .then((data) => {
                console.log(data)
            })
            .catch((error: unknown) => {
                console.error(error)
            })
            .finally(() => {
                console.log('конец')
            })
    }
    return(
        <button className='w-[100px] h-[50px] bg-red-200 m-10' onClick={fetchLogin}>Кинуть промис</button>
    )
}