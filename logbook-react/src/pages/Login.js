import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { loginPending, loginSuccess, loginFail } from '../features/loginSlice'
import { userLoading, userSuccess, userFail } from '../features/userSlice'

// Components
import { SubmitButton } from '../components/SubmitButton'
import { Input } from '../components/Input'
import { ErrorMessage } from '../components/ErrorMessage'

// API
import { getUserInfo, userLogin } from '../api/UserAPI'

export const Login = () => {
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [countFail, setCountFail] = useState(2)

    const [isHidePassword, setIsHidePassword] = useState(true)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const { isLoading, errors } = useSelector((state) => state.login)
    const { userInfo } = useSelector((state) => state.user)

    const onSubmitHandle = async (e) => {
        e.preventDefault()

        dispatch(loginPending())

        try {
            const res = await userLogin({ username, password })
            console.log(res)
            dispatch(loginSuccess())
            localStorage.setItem("accessToken", res.accessToken)
        } catch(e) {
            dispatch(loginFail(e.message))
            setCountFail(countFail - 1)

            if(countFail === 0) {
                setCountFail(2)
                window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
            }
        }

        dispatch(userLoading())

        try {
            const res = await getUserInfo()
            dispatch(userSuccess(res))
        } catch(e) {
            dispatch(userFail(e.message))
        }
    }

    if(userInfo) {
        navigate('/home')
    }
    
    return (
        <div>
            <div className="md:max-w-sm max-w-xs mx-auto my-10">
                <div className="shadow-lg p-6 bg-white">
                    <div className="flex flex-col justify-center space-y-6">
                        {/* Login Header */}
                        <div className="flex justify-center items-center space-x-1">
                            <div className="flex text-3xl">
                                👨🏼‍💻
                            </div>
                            <div className="font-bold text-2xl">
                                Login
                            </div>
                        </div>

                        {/* Login Form */}
                        <form onSubmit={onSubmitHandle} className="flex flex-col space-y-3">
                            <div>
                                <Input message={"Username"} type={"text"} onChangeHandle={(value) => setUsername(value)}/>
                                <Input message={"Password"} type={isHidePassword? "password":"text"} 
                                options={
                                    isHidePassword?
                                    <svg onClick={() => setIsHidePassword(!isHidePassword)} xmlns="http://www.w3.org/2000/svg" className="absolute h-6 w-6 mr-2 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                    </svg>:
                                    <svg onClick={() => setIsHidePassword(!isHidePassword)} xmlns="http://www.w3.org/2000/svg" className="absolute h-6 w-6 mr-2 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                } onChangeHandle={(value) => setPassword(value)}/>
                            </div>
                            <div>
                                {errors.length > 0 &&
                                    <div className="p-2 bg-red-300 border border-red-500">
                                        {errors.map((e, i) => {
                                            return (
                                                <ErrorMessage key={i} message={e}/>
                                            )
                                        })}
                                    </div>
                                }
                            </div>
                            <div className="pt-4">
                                {isLoading?
                                    <SubmitButton message={"Pending..."} beauty={"w-full bg-slate-600 rounded font-bold text-xl text-white p-1"} />
                                    :
                                    <SubmitButton message={"Login"} beauty={"w-full bg-slate-800 hover:bg-slate-600 rounded font-bold text-xl text-white p-1"} />
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
