import {useState, useCallback, useEffect} from 'react'
import { useSelector } from 'react-redux'
import cookie from "js-cookie"

const cookieStorage = 'UserData'

export const useAuth = () =>{
    const globalState = useSelector(state => state)
    
    const [token, setToken] = useState(null)
    const [ready, setReady] = useState(false)
    const [userId, setUserId] = useState(null)

    const login = useCallback((JsonWebToken, id)=>{
        setToken(JsonWebToken)
        setUserId(id)
        globalState.auth.token = JsonWebToken
        globalState.auth.userId = id
        globalState.auth.isAuthenticated = true
        cookie.set(cookieStorage, JSON.stringify({userId:id , token:JsonWebToken}) )
        // localStorage.setItem(StorageName, JSON.stringify({userId:id, token:JsonWebToken}))
    },[])

    const logout = useCallback(()=>{
        //очищаем локальный state 
        setToken(null)
        setUserId(null)

        //очищаем cookie storage
        cookie.remove(cookieStorage)

        //очищаем глобальный стейт
        globalState.auth.token = null
        globalState.auth.userId = null
        globalState.auth.isAuthenticated = false
    },[])

    useEffect(() => {
        if(cookie.get(cookieStorage)){
            const data = JSON.parse(cookie.get(cookieStorage)) // JSON.parse приводит строку к объекту
            if(data && data.token){
                login(data.token, data.userId)
            }
            setReady(true)
        }
    },[login])

    return {login, logout, token, userId , ready}
}