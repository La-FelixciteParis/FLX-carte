/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
// import { CreateToken } from "../API/HelloAsso/Tokens"
import { UserParIdentifiant } from "../API/Supabase/User"
import { Input } from "../Components/Input"
import { UserContext } from "../Context/IdUser"
import { ErrorContain, Form, FormContain } from "../Styles/Connect"
import { Principal } from "../Styles/Couleur"
import { ButtonStyle } from "../Styles/Général"

export const Connect = () =>{

    const [id,setId]= useState<string>("")
    const [email,setEmail]= useState<string>("")
    const [error,setError]=useState<string | null>(null)
    const [errorNumber, setErrorNumber]= useState<number>(0)

    const {setIdUser,infoIdUser,idUser,setIsCommerce} = useContext(UserContext) as any

    const navigate = useNavigate()

    useEffect(()=>{
        setIsCommerce(false)
    },[])

    // const testAPI = async()=>{
    //     await CreateToken()
    // }

    useEffect(()=>{
        if(errorNumber>=3){
            setError("Ce n'est pas un identifiant valide: Veuillez contacter le support")
        }
        
    },[errorNumber])

    useEffect(()=>{
        if(infoIdUser){
            navigate(`/User/${idUser}`)
        }
    },[infoIdUser])

    const regex = /FLX-(COM|ACT|HBT|SJR)-\d{3}-(ACPB|ADCFSA|HAPCO|VILFAI|FLX)-\d{4}/

    const handleSubmit = async(e:any)=> {
        e.preventDefault()
        setError(null)
        if(regex.test(id)){
            const verifmail= await UserParIdentifiant(id) as any
            if(verifmail.length>0){
                
                if(verifmail[0].email===email){
                    setIdUser(id);
                }else{
                    setError("Le mail ne correspond pas à l'identifiant")
                }
            }else{
                setError("L'identifiant n'est pas encore enregistré ou non valide")
            }
        }else{
            setError("Ce n'est pas un identifiant valide");
            setErrorNumber(errorNumber+1)
        }
    }
    
    return(
        <FormContain>
            <Form onSubmit={handleSubmit}>
                <Input text="Email" type="text" onChange={(e:any)=>setEmail(e.target.value)}/>
                <Input text="Identifiant" type="text" onChange={(e:any)=>setId(e.target.value)}/>
                <ButtonStyle color={Principal}>Valider</ButtonStyle>
            </Form>
            <div>
                {error &&
                    <ErrorContain>
                        <small>{error}</small>
                    </ErrorContain>
                }
            </div>
        </FormContain>

    )
}