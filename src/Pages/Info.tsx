/* eslint-disable react-hooks/exhaustive-deps */

import { QRCodeCanvas } from "qrcode.react"
import { useContext, useEffect,useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ChangeColorUser, UserParIdentifiant } from "../API/Supabase/User"
import { Loader } from "../Components/Loader"
import { CommerçantContext } from "../Context/Commercant"
import { UserContext } from "../Context/IdUser"
import { InfoContain } from "../Styles/Infos"
import { UserType } from "../Types/User"
import { Ul } from "../Styles/Commerce"
import { ListEvenements } from "../Components/Evenements"

export const Info = ()=>{

    const {id} = useParams()

    const [client,setClient]=useState<UserType|null>(null)
    const [commerce,setCommerce]=useState<boolean>(true)
    const [primaire,setPrimaire]=useState<string>("#000000")
    const [secondaire,setSecondaire]=useState<string>("#000000")
    const [textColor,setTextColor]=useState<string>("#000000")



    const {idUser,setIdUser,infoIdUser,logoutId,setIsCommerce} = useContext(UserContext) as any
    const {user,logoutCommerçant} = useContext(CommerçantContext) as any

    const navigate=useNavigate()

    useEffect(()=>{
        setIsCommerce(false)
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
            setPrimaire(clientApi[0].Couleur)
            setSecondaire(clientApi[0].CouleurSec)
            setTextColor(clientApi[0].TextColor)
            
        }
    }

    const handlePrimaireChange = (e:any)=>{
        setPrimaire(e.target.value);  
    }

    const handleSecondaireChange = (e:any)=>{
        setSecondaire(e.target.value)
    }

    const handleTextChange = (e:any)=>{
        setTextColor(e.target.value)
    }

    const handleCouleurSave =async()=>{
        if(client){
            await ChangeColorUser(primaire,secondaire,textColor,client.id)
            ClientFetch()
        }
    }

    if (client){
        return (
            <InfoContain Primaire={primaire} Secondaire={secondaire} TextColor={textColor}>
                <div className="Title">
                <h1>{infoIdUser[1] === "HBT" ? `${client.Prénom} ${client.Nom}` : `${client.COM_ACTnom}`}</h1>
                </div>
                <section>
                    <article>
                        <h2>Vos informations personnelles</h2>
                        {infoIdUser[1] !== "HBT" && <p>Gérant: {client.Prénom} {client.Nom}</p>}
                        <p>Besoins: {client.besoin}</p>
                        <p>Adresse: {client.adresse}</p>
                        <p>Tel: {client.Tel}</p>
                        <p>Email: {client.email}</p>
                        <p>Liste des réseaux sociaux:</p>
                        <Ul>
                            {client.Linkedin && <a target="_blank" rel="noreferrer" href={client.Linkedin}><img src="/Images/LinkedIn_icon_circle.svg.png" alt="Linkedin"/></a>}
                            {client.Twitter && <a target="_blank" rel="noreferrer" href={client.Twitter}><img src="/Images/twitter.png" alt="Twitter" /></a>}
                            {client.Facebook && <a target="_blank" rel="noreferrer" href={client.Facebook}><img src="/Images/Facebook_icon.svg.png" alt="Facebook" /></a>}
                            {client.Instagram && <a target="_blank" rel="noreferrer" href={client.Instagram}><img src="/Images/insta.png" alt="Instagram"/></a>}   
                            {client.TikTok && <a target="_blank" rel="noreferrer" href={client.TikTok}><img src="/Images/tiktok.png" alt="TikTok"/></a>}  
                            {client.GoogleBusiness && <a target="_blank" rel="noreferrer" href={client.GoogleBusiness}><img src="/Images/GoogleBusiness.png" alt="GoogleBusiness"/></a>}
                            {!commerce && <button className="Plus"> <span className="ajout"></span><span className="ajout vertical"></span> </button> }
                        </Ul>
                    </article>

                    <article>
                        <h2>Votre Imagerie</h2>

                        <p>image par défaut:</p>
                        {client.Image ? <img src={client.Image} alt="Vous" className="Img"/>: <img src="/Images/defaultCommerce.png" alt="defaut" className="Img"/> }
                        <p>Vos couleur:</p>
                        <div className="Couleurs">
                            <div className="Couleur">
                                <label htmlFor="Primaire">-Primaire:</label>
                                <input type='color' disabled={commerce} name="Primaire" value={primaire} onChange={handlePrimaireChange}/>
                            </div>
                            <div className="Couleur">
                                <label htmlFor="Secondaire">-Secondaire:</label>
                                <input type='color' disabled={commerce} name="Secondaire" value={secondaire} onChange={handleSecondaireChange}/>
                            </div>
                            <div className="Couleur">
                                <label htmlFor="Text">-Texte sur aplat:</label>
                                <input type='color' disabled={commerce} name="Text" value={textColor} onChange={handleTextChange}/>
                            </div>
                            {!commerce && <button onClick={handleCouleurSave} disabled={client.Couleur===primaire && client.CouleurSec===secondaire && client.TextColor===textColor } style={{borderColor: primaire}}>Sauvegarder</button>}
                        </div>
                    </article>

                    <article>
                        <h2>{infoIdUser[1]!=="COM" ? 'Votre QRCode':'Vos QRCodes'}</h2>

                        {infoIdUser[1]==='COM' && <>
                        <p>QRCode Commerce:</p>
                        <QRCodeCanvas value={`${process.env.REACT_APP_URL}Commerce/${client.id}`}/>
                        <p>QRCode Activité</p>
                        </>}
                        <QRCodeCanvas value={`${process.env.REACT_APP_URL}User/${client.id}`}/>

                    </article>
                </section>
                <div className="Gerance">
                    <h3>Gérer ma page commerce</h3>
                    <div>
                        <button>Moi même</button>
                        <button>Par l'Admin</button>
                    </div>
                </div>

                <section className="Village">
                    <h2>Actualité de votre village:</h2>
                    <ListEvenements Villageid={infoIdUser[2]}/>
                </section>
            </InfoContain>
        )
    }else{
        return <InfoContain>
            <Loader/>
        </InfoContain>
    }
}