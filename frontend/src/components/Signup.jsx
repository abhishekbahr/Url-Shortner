import  { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { useGlobalContext } from '../context/globalContext'

const Signup = () => {
    const navigate = useNavigate()
    const {SignupUser} = useGlobalContext()
    const [userData,setUserData] = useState({
        name:'',
        email:'',
        password:''
    })

    //signup function
    const handleSubmit = async (e) => {
        e.preventDefault()
        SignupUser(userData)
        //Todo redirect to home page 
        navigate('/login')

    }
    
    return (
        <div className="w-full bg-white  flex items-center justify-center">
                <div className="max-w-md w-full p-6">
                <h1 style={{fontWeight:"800"}} className="text-3xl font-semibold mb-6 text-gray-900 text-center">
                    Sign Up to Dribble
                </h1>
                
                <form onSubmit={handleSubmit}  className="space-y-4">
                    <div className="flex flex-row gap-4 max-sm:flex-col">
                        <div>
                            <label
                                htmlFor="name"
                                className="block text-sm font-bold text-gray-700"
                            >
                                Username
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                onChange={(e) => setUserData({...userData,name:e.target.value})}
                                className="mt-1 p-2 w-full bg-gray-200 border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-bold text-gray-700"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                onChange={(e) => setUserData({...userData,email:e.target.value})}
                                className="mt-1 p-2 w-full bg-gray-200 border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
                            />
                        </div>
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
                    <div className="flex">
                        <input type="checkbox" required className="flex items-start"/>
                        <p className="p-3 font-extralight text-gray-500">Creating an account means you're okay with our <span className="text-blue-500 font-semibold">Terms of Service, Privacy Policy,</span> and our default <span className="text-blue-500 font-semibold">Notification Settings.</span></p>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full font-bold text-white bg-pink-600 p-2 rounded-md hover:bg-pink-500 focus:outline-none focus:bg-pink-400  focus:ring-2 focus:ring-offset-2 focus:ring-pink-600 transition-colors duration-300"
                        >
                            Create Account
                        </button>
                    </div>
                    <div className=" text-sm text-gray-600 text-start  ">
                        <p className="font-bold">
                        Already have an account ?{" "}
                            <Link to='/login' className="text-blue-600 hover:underline">
                                Login here
                            </Link>
                        </p>
                </div>
                </form>
                <p className="p-3 text-gray-400 font-extralight ">This site is protected by reCAPTCHA and the Google <span className="text-blue-400 font-semibold">Privacy Policy</span> and <span className="text-blue-400 font-semibold">Terms of Service </span> apply.</p>
                </div>
            </div>
    )
}

export default Signup