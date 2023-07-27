//Context pour garder un utilisateur connecté

//Import

//Base
import { createContext, useEffect, useState } from "react";

//Type
import { ChildrenPropsType } from "../Types/Children";

const UserContext = createContext({})

const UserContextProvider = ({children}:ChildrenPropsType)=>{
    const [idUser,setIdUser] = useState<string|null>(null)
    const [infoIdUser,setInfoIdUser] = useState<string[]|null>(null)
    const [isCommerce,setIsCommerce]=useState<boolean>(false)

    useEffect(()=>{

        //Si déjà un id dans le storage on le récupère
        const idLocal= localStorage.getItem('IdFLX')
        if(idLocal){
            setIdUser(idLocal)
        }
    },[])

    useEffect(()=>{
        //Quand on à un id , on le met en storage et on le split pour récupérer les infos de village et d'assoc 
        if(idUser){
            localStorage.setItem('IdFLX',idUser)
            setInfoIdUser(idUser.split("-"))
        }
    },[idUser])

    const logoutId = ()=>{
        //Déconnexion total de l'utilisateur
        localStorage.removeItem('IdFLX')
        setInfoIdUser(null)
        setIdUser(null)
        
    }

    const value={
        idUser,
        setIdUser,
        infoIdUser,
        logoutId,
        isCommerce,
        setIsCommerce,
    }

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export{UserContext,UserContextProvider}