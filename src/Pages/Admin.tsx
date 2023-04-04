import { useEffect, useState } from "react"
import { Input } from "../Components/Input"
import { Form, FormContain } from "../Styles/Connect"
import { AdminContain } from "../Styles/Admin"
import { GetIds, LoginAdmin } from "../API/Supabase/User"
import { QrCodeDl } from "../Components/DlQRCode"
import { QrpropsType } from "../Types/QR"
import { ValidAdmin } from "../API/Supabase/Admin"

export const Admin= () =>{
    const [valid,setValid] = useState<boolean>(false)
    const [mdp,setMdp] = useState<string>("")
    const [email,setEmail] = useState<string>("")
    const [ids,setIds] = useState<[]|QrpropsType[]>([])
    const [error,setError]= useState<string|null>(null)

    useEffect(()=>{
        Ids()
    },[])

    const Ids = async() =>{
        const data = await GetIds()
        if(data){
            setIds(data);
        }
    }

    const HandleValidSubmit = async(e:any) =>{
        e.preventDefault()
        setError(null)
        const body={
            email,
            password:mdp
        }
        const data= await LoginAdmin(body)
        if(typeof data === "object"){
            
            const validation=await ValidAdmin(data.user?.id);
            if(validation && validation.length>0){
                setValid(true)
            }else{
                setError("non autorisé");
                setValid(false)
            }
        }else{
            setError("Utilisateur non existant")
            setValid(false)
        }

        
          
    }

    return (
    <>
        {valid ? 
            <AdminContain>
                <h2>Pas encore DL</h2>
                <section>
                    {ids.map((id)=>{
                            return(!id.QrDl && <QrCodeDl id={id.id} COM_ACTnom={id.COM_ACTnom} QrDl={id.QrDl} key={id.id} onReload={Ids}/>)              
                    })}
                </section>
                <h2>Déjà DL</h2>
                <section>
                    {ids.map((id)=>{
                            return (id.QrDl && <QrCodeDl id={id.id} COM_ACTnom={id.COM_ACTnom} QrDl={id.QrDl} key={id.id}/>)
                    })}
                </section>
            </AdminContain>
            :
            <FormContain>
                <Form onSubmit={HandleValidSubmit}>
                    <Input text="Email" type="mail" onChange={(e:any)=>{setEmail(e.target.value)}}/>
                    <Input text="Mot de passe" type="password" onChange={(e:any)=>{setMdp(e.target.value)}} />
                    <button type="submit">Valider</button>
                    {error && <small>{error}</small>}
                </Form>
            </FormContain>
        }
    </>
)
}