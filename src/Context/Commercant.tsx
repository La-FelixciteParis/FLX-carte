/* eslint-disable react-hooks/exhaustive-deps */

//Context pour garder un commerçant connecté (l'idée étant qu'il puisse lire des cartes perso pour possiblement de futur actions.
//Donc on garde le commerçant et au lieu d'une connection perso on à les actions voulue (genre fidélité))

//Import

//Base
import { createContext, useEffect, useState } from "react";

//API
import { GetACT } from "../API/Supabase/User";

//Type
import { ChildrenPropsType } from "../Types/Children";

const CommerçantContext = createContext({})

const CommerçantContextProvider = ({children}:ChildrenPropsType) =>{
    const [user,setUser] = useState<any>(null)
    const [token,setToken] = useState<string>('')

    useEffect(()=>{
        //Si il y à déjà un token dans le storage local on le prend
        const localToken = localStorage.getItem('TokenCommerçantFLX')
        if(localToken){
            setToken(localToken)
        }
    },[])

    useEffect(()=>{

        //Quand il y à un token on le met en storage et on récupère les données
        if(token){
            localStorage.setItem('TokenCommerçantFLX',token)
            ACT()
        }
    },[token])

    const ACT = async() =>{
            //récupération des données
            const data = await GetACT(token)
            if(data){
                setUser(data)
                
            }else{
                setUser("none")
            }
    }

    const logoutCommerçant = ()=>{

        //déco du commerçant en supprimant tout
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