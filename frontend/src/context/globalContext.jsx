import {createContext,useContext,useEffect,useState} from "react"

const GlobalContext = createContext()

export const GlobalProvider = ({children}) => {

    const [urlList,setUrlList] = useState([])
    const [userInfo,setUserInfo] = useState(null)

    
    

    const SignupUser = async (data) => {
        const response = await fetch("http://localhost:3000/user/signup",{
            method:"POST",
            body:JSON.stringify(data),
            headers:{'content-type':"application/json"}
        })
        const result = await response.json()
        setUserInfo(result)
        console.log(userInfo)
    }

    const LoginUser = async (data) => {
        try {
            const response = await fetch("http://localhost:3000/user/login",{
                method:"POST",
                body:JSON.stringify(data),
                headers:{'content-type':"application/json"},  
            })
            const result = await response.json()
            
            setUserInfo(result)
            //Todo: Not getting the user inforamtaion in the state
        } catch (error) {
            console.log("Error",error)
        }
    }
    const fetchUrlData = async () => {
        const response = await fetch('http://localhost:3000/url/list')
        const urls = await response.json()
        setUrlList(urls)
    }
    
    useEffect(() => {
        console.log(userInfo)
    },[userInfo,setUserInfo])


    return (
        <GlobalContext.Provider value={{
            fetchUrlData,
            urlList,
            userInfo,
            SignupUser,
            LoginUser
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}
