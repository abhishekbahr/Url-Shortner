import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useGlobalContext } from '../context/globalContext'

const Login = () => {
    const {LoginUser,userInfo} = useGlobalContext()
    const navigate = useNavigate()
    const [userData,setUserData] = useState({
        email:'',
        password:''
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        LoginUser(userData)
            // navigate('/home')
    }
    return (
        <div className=" bg-white" >
            <div className="w-full bg-white bg-transparent lg:w-full flex items-center justify-center">
                <div className="max-w-md w-full p-6" style={{backgroundImage:"background-image: linear-gradient(to left top, #989ea7, #b2b5bc, #cccdd2, #e6e6e8, #ffffff)"}} >
                    <h1 className="text-3xl font-extrabold mb-6 text-gray-500 text-center">
                        Login to URL Shortner
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-bold text-gray-700"
                            >
                                Email
                            </label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                required
                                onChange={(e) => setUserData({...userData,email:e.target.value})}
                                className="mt-1 p-2 w-full bg-gray-200 border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                            />
                        </div>

                        <div className="relative">
                            <label
                                htmlFor="password"
                                className="block text-sm font-bold text-gray-700"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="6+ characters"
                                required
                                onChange={(e) => setUserData({...userData,password:e.target.value})}
                                className="mt-1 p-2 w-full bg-gray-200 border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                            />
                        </div>
                        <p className="font-semibold underline text-sm   text-blue-400">
                            <Link to='/forgot-password' className="cursor-pointer">
                                Forgot Password?
                            </Link>
                        </p>
                        
                        <div>
                            <button
                                type="submit"
                                className="w-full font-bold text-white bg-pink-600 p-2 rounded-md hover:bg-pink-500 focus:outline-none focus:bg-pink-400  focus:ring-2 focus:ring-offset-2 focus:ring-pink-600 transition-colors duration-300"
                            >
                                Login    
                            </button>
                        </div>
                        <div className=" text-sm text-gray-600 text-end  ">
                            <p className="font-bold">
                            Are you new ?{" "}
                                <Link to='/' className="text-blue-600 hover:underline">
                                    Create a account
                                </Link>
                            </p>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login