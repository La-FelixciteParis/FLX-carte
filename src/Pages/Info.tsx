/* eslint-disable react-hooks/exhaustive-deps */

import moment from "moment"
import { QRCodeCanvas } from "qrcode.react"
import { useContext, useEffect,useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ChangeColorUser, UserParIdentifiant } from "../API/Supabase/User"
import { GetVillage } from "../API/Supabase/Village"
import { Loader } from "../Components/Loader"
import { CommerçantContext } from "../Context/Commercant"
import { UserContext } from "../Context/IdUser"
import { InfoContain } from "../Styles/Infos"
import { UserType } from "../Types/User"

export const Info = ()=>{

    const {id} = useParams()

    const [client,setClient]=useState<UserType|null>(null)
    const [village,setVillage]=useState<string|null>(null)
    const [commerce,setCommerce]=useState<boolean>(true)
    const [color,setColor]=useState<string>("#000000")

    const {idUser,setIdUser,infoIdUser,logoutId} = useContext(UserContext) as any
    const {user,logoutCommerçant} = useContext(CommerçantContext) as any

    const navigate=useNavigate()

    useEffect(()=>{
        const localToken = localStorage.getItem('TokenCommerçantFLX')
            if(!localToken){
                setIdUser(id)
            }
    },[])

    useEffect(()=>{
        if(user==="none"){
            logoutId()
            logoutCommerçant()
            navigate("/")
        }else if (user){
            VerifClientFetch()
        }else{
            setCommerce(false)
            setIdUser(id)
        }
    },[user])

    useEffect(()=>{
        if(idUser){
            ClientFetch()
        }
    },[idUser])


    useEffect(()=>{
        Village()
    },[infoIdUser])

    const VerifClientFetch = async()=>{
        if(id){
            const clientApi = await UserParIdentifiant(id) as any
            if(clientApi[0].email===user.email){
                setCommerce(false)
            }else{
                setCommerce(true)
            }
             setIdUser(id)
        }
    }

    const ClientFetch = async()=>{
        if(idUser){
            
            const clientApi = await UserParIdentifiant(idUser) as any
            setClient(clientApi[0]);
            setColor(clientApi[0].Couleur)
        }
    }

    const Village=async ()=>{
        if(infoIdUser){

            const villageid = await GetVillage(infoIdUser[2]) as any
            setVillage(villageid[0].Nom_Village)
        }
    }

    const handleColorChange = (e:any)=>{
        setColor(e.target.value);  
    }

    const handleCouleurSave =async()=>{
        if(client){
            await ChangeColorUser(color,client.id)
            ClientFetch()
        }
    }


    if (client){
        return (
            <InfoContain color={color}>
                <h1>{client.Prénom} {client.Nom}</h1>
                <section>
                    <article>
                        <p>{client.email}</p>
                        {infoIdUser && <p>Association: {infoIdUser[3]}</p>}
                        {village && <p>Village: {village}</p>}
                        <p>Créer le {moment(client.created_at).format("DD/MM/YYYY")}</p>
                        {!commerce && <div>
                            <label htmlFor="Couleur">Choisir votre couleur</label>
                            <input type='color' name="Couleur" value={color} onChange={handleColorChange}/>
                            <button onClick={handleCouleurSave} disabled={client.Couleur===color} style={{borderColor: color}}>Sauvegarder</button>
                        </div>}
                    </article>
                    {client && <QRCodeCanvas value={`${process.env.REACT_APP_URL}${client.id}/${client.email}`}/>}
                </section>
                 {commerce && <p>Ce qu'on veut faire avec la carte</p>}
            </InfoContain>
        )
    }else{
        return <InfoContain>
            <Loader/>
        </InfoContain>
    }
}