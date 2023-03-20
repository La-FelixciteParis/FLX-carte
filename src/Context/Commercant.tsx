/* eslint-disable react-hooks/exhaustive-deps */

import { createContext, useEffect, useState } from "react";
import { GetACT } from "../API/Supabase/User";
import { ChildrenPropsType } from "../Types/Children";

const CommerçantContext = createContext({})

const CommerçantContextProvider = ({children}:ChildrenPropsType) =>{
    const [user,setUser] = useState<any>(null)
    const [token,setToken] = useState<string>('')

    useEffect(()=>{
        const localToken = localStorage.getItem('TokenCommerçantFLX')
        if(localToken){
            setToken(localToken)
        }
    },[])

    useEffect(()=>{
        if(token){
            localStorage.setItem('TokenCommerçantFLX',token)
            ACT()
        }
    },[token])

    const ACT = async() =>{
            
            const data = await GetACT(token)
            if(data){
                setUser(data)
                
            }else{
                setUser("none")
            }
    }

    const logoutCommerçant = ()=>{
        setUser(null)
        setToken('')
        localStorage.removeItem('TokenCommerçantFLX')

    }

    const value ={
        user,
        setUser,
        token,
        setToken,
        logoutCommerçant
    }

    return <CommerçantContext.Provider value={value}>{children}</CommerçantContext.Provider>
}

export {CommerçantContext,CommerçantContextProvider}