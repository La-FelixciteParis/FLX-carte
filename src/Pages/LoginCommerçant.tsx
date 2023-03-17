/* eslint-disable react-hooks/exhaustive-deps */

import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { LoginACT, UserIdParLogin } from "../API/Supabase/User"
import { Input } from "../Components/Input"
import { CommerçantContext } from "../Context/Commercant"
import { Form, FormContain } from "../Styles/Connect"
import { jaune } from "../Styles/Couleur"
import { ButtonStyle } from "../Styles/Général"

export const LoginCommerçant = () =>{
    const [email,setEmail]= useState<string>('')
    const [password,setPassword]= useState<string>('')

    const {setToken} = useContext(CommerçantContext) as any

    const navigate=useNavigate()

    const handleLogSubmit = async(e:any)=>{
        e.preventDefault()
        const body={
            email,
            password
        }
        const login = await LoginACT(body)
        setToken(login?.session?.access_token)
        if(login?.user?.email){
            const idComerçant = await UserIdParLogin(login.user.email) as any
            navigate(`/User/${idComerçant[0].id}`);
        }        
    }

    return(
        <FormContain>
            <Form onSubmit={handleLogSubmit}>
                <Input text="Email" type="text" onChange={(e:any)=>setEmail(e.target.value)}/>
                <Input text="Mot de passe" type="password" onChange={(e:any)=>setPassword(e.target.value)}/>
                <ButtonStyle color={jaune} >Ce connecter</ButtonStyle>
            </Form>
        </FormContain>
    )
}