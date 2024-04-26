import  { useEffect, useState } from 'react'
import URLList from './URLList'
import { useGlobalContext } from '../context/globalContext'

const Home = () => {
    const {fetchUrlData,userInfo} = useGlobalContext()
    const [redirectUrl,setRedirectUrl] = useState({
        url: ''
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        await fetch('http://localhost:3000/url', {
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(redirectUrl)
        });
        fetchUrlData()
    } 
    return (
        <div className='flex flex-col gap-8'>
            <div className='text-3xl text-blue-500 font-extrabold'>
                URL shortner
            </div>
            <div >
                <h1 className=' pb-4 font-bold text-2xl'>Enter your Original URL</h1>
                <form onSubmit={handleSubmit}>
                <input onChange={(e) => setRedirectUrl({url : e.target.value})} type='text' name='redirectURl' placeholder='https://example.com' className='border-2 w-96 max-sm:w-52  font-bol rounded-lg border-black px-2 mr-4'/>
                <button type='submit' className='border-2 p-1 rounded-lg bg-black text-white font-bold hover:bg-gray-700 hover:scale-105 mt-2'>Generate</button>
                </form>
            </div>
            <div className='flex flex-col justify-center items-center '>
                <URLList/>
            </div>
        </div>
    )
}

export default Home