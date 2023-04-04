import { useEffect, useState } from "react"
import { Input } from "../Components/Input"
import { Form, FormContain } from "../Styles/Connect"
import { AdminContain } from "../Styles/Admin"
import { GetIds } from "../API/Supabase-FLX/User"
import { QrCodeDl } from "../Components/DlQRCode"
import { QrpropsType } from "../Types/QR"

export const Admin= () =>{
    const [valid,setValid] = useState<boolean>(false)
    const [mdp,setMdp] = useState<string>("")
    const [ids,setIds] = useState<[]|QrpropsType[]>([])

    useEffect(()=>{
        Ids()
    },[])

    const Ids = async() =>{
        const data = await GetIds()
        if(data){
            setIds(data);
        }
    }

    const HandleValidSubmit = (e:any) =>{
        e.preventDefault()
        
        if(mdp===process.env.REACT_APP_ADMIN_PASSWORD){
            setValid(true)
        }
    }

    const HandleChange = (e:any)=>{
        setMdp(e.target.value)
    }

    return (
    <>
        {valid ? 
            <AdminContain>
                {ids.map((id)=>{
                    return <QrCodeDl id={id.id} COM_ACTnom={id.COM_ACTnom} key={id.id}/>
                })}
            </AdminContain>
            :
            <FormContain>
                <Form onSubmit={HandleValidSubmit}>
                    <Input text="Mot de passe" type="password" onChange={HandleChange} />
                    <button type="submit">Valider</button>
                </Form>
            </FormContain>
        }
    </>
)
}