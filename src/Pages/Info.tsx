/* eslint-disable react-hooks/exhaustive-deps */

import { QRCodeCanvas } from "qrcode.react"
import { useContext, useEffect,useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ChangeColorUser, UpdateImageUser, UpdateReseaux, UserParIdentifiant } from "../API/Supabase/User"
import { Loader } from "../Components/Loader"
import { CommerçantContext } from "../Context/Commercant"
import { UserContext } from "../Context/IdUser"
import { InfoContain } from "../Styles/Infos"
import { UserType } from "../Types/User"
import { Ul } from "../Styles/Commerce"
import { ListEvenements } from "../Components/Evenements"
import { Upload, donwload } from "../API/Supabase/Images"
import { UploadLoad } from "../Components/UploadLoad"
import { Input } from "../Components/Input"

export const Info = ()=>{

    const {id} = useParams()

    const [client,setClient]=useState<UserType|null>(null)
    const [commerce,setCommerce]=useState<boolean>(true)
    const [primaire,setPrimaire]=useState<string>("#000000")
    const [secondaire,setSecondaire]=useState<string>("#000000")
    const [textColor,setTextColor]=useState<string>("#000000")
    const [image,setImage]= useState<File>()
    const [imageUrl,setImageUrl]=useState<string>('')
    const [loadImage,setLoadImage]=useState<boolean>(false)
    const [plus,setPlus]=useState<boolean>(false)
    const [addReseaux,setAddReseaux]=useState<string>('')
    const [plusReseaux,setPlusReseaux]=useState<boolean>(false)
    const [lien,setLien]=useState<string>('')

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
        
        if(client?.Image){
            const data =  donwload(client.Image)
            setImageUrl(data.publicUrl);  
        }
    },[client])

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
        setLoadImage(false)
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

    const handleUploadImage = async() =>{
        
        if(image && id){
            setLoadImage(true)
            const Data = await Upload(image)
            const path=Data?.path
            
            path && await UpdateImageUser(id,path)
            ClientFetch()
        }
    }

    const handleFileChange = (e:any)=>{
        const file = e.target.files[0];
  const fileWithPath = new File([file], `public/${file.name}`, {
    type: file.type,
  });
  setImage(fileWithPath);
        
    }

    const handlePlusClick = () =>{
        setPlus(true)
    }

    const handleValidReseaux = () =>{
        setPlusReseaux(true)
        
    }

    const handleValidLien = async()=>{
        await UpdateReseaux(idUser,addReseaux,lien)
        setPlusReseaux(false)
        setPlus(false)
        ClientFetch()
        
    }

    const handleAnnuleClick = ()=>{
        setPlusReseaux(false)
        setPlus(false)
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
                            {!commerce && 
                                plusReseaux ? 
                                    <div className="Lien">
                                        <Input type="Text" text="Lien" onChange={(e:any)=>setLien(e.target.value)} />
                                        <button onClick={handleValidLien}>Valider</button>
                                        <button onClick={handleAnnuleClick}>annuler</button>
                                    </div>
                                :
                                    plus ? 
                                        <div>
                                            <select onChange={(e:any)=>{setAddReseaux(e.target.value)}}>
                                                <option value=''>Choisir</option>
                                                <option value="Linkedin">Linkedin</option>
                                                <option value="Twitter">Twitter</option>
                                                <option value="Facebook">Facebook</option>
                                                <option value="Instagram">Instagram</option>
                                                <option value="TikTok">TikTok</option>
                                                <option value="GoogleBusiness">GoogleBusiness</option>
                                            </select>
                                            <button onClick={handleValidReseaux}>Valider</button>
                                            <button onClick={handleAnnuleClick}>annuler</button>
                                        </div> 
                                    :
                                        <button className="Plus" onClick={handlePlusClick}> <span className="ajout"></span><span className="ajout vertical"></span> </button> 
                                
                            }
                        </Ul>
                    </article>

                    <article>
                        <h2>Votre Imagerie</h2>

                        <p>image par défaut:</p>
                        {loadImage? <><UploadLoad/> <p>Chargement (celà peut durer quelque minutes)</p></>: <>{client.Image ? <img src={imageUrl} alt="Vous" className="Img"/>: <img src="/Images/defaultCommerce.png" alt="defaut" className="Img"/> }
                        {!commerce && <><input type="file" onChange={handleFileChange} className="ImageSelect" />
                        <button className="UploadButton" type="button" onClick={handleUploadImage}>valider</button></>}</>}
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
                    <h2 onClick={()=>{navigate(`/Village?Village:${infoIdUser[2]}`)}}>Actualité de votre village:</h2>
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