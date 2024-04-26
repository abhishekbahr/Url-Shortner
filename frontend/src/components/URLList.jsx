import  { useEffect } from 'react'
import { useGlobalContext } from '../context/globalContext.jsx'

const URLList = () => {

    const {urlList,fetchUrlData} = useGlobalContext()

    useEffect(() => {
        fetchUrlData()
    },[])

    return (
        <div className='p-6 shadow-lg max-sm:w-72  overflow-auto shadow-gray-400 rounded-lg '>
            <table>
                <thead >
                    <tr>
                        <th className='pr-4 '>S.no</th>
                        <th className='pr-6'>ShortID</th>
                        <th>Redirect</th>
                        <th >Clicks</th>
                    </tr>
                </thead>
                <tbody>
                    {urlList.map((url,index) => {
                        return (
                            <tr key={index}>
                                <td className='text-sm pr-4 text-gray-600 '>
                                    {index+1}
                                </td>
                                <td className='text-sm pr-6 text-gray-600'>
                                    {url.shortId}
                                </td>
                                <td className='text-sm text-gray-600 '>
                                    {url.redirectUrl}
                                </td>
                                <td className='text-sm text-gray-600 '>
                                    {url.visitHistory.length}
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div> 
    )
}

export default URLList


