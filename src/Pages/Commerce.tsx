/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router-dom"
import { CommerceContain, Ul, Visuel } from "../Styles/Commerce"
import { UserParIdentifiant } from "../API/Supabase/User"
import { useContext, useEffect, useState } from "react"
import { Loader } from "../Components/Loader"
import { UserType } from "../Types/User"
import { UserContext } from "../Context/IdUser"
import { GetVillage } from "../API/Supabase/Village"
import { ListEvenements } from "../Components/Evenements"
import { donwload } from "../API/Supabase/Images"


export const Commerce = () =>{

    const {id} = useParams() as any

    const [commerce,setCommerce] = useState<null|UserType> (null)
    const [monVillage,setMonVillage] = useState<string>("")
    const [image,setImage] = useState<string>('/Images/defaultCommerce.png')

    const {setIsCommerce}= useContext(UserContext) as any

    const navigate=useNavigate()


    useEffect(()=>{
        GetCommerce()
        setIsCommerce(true)
        getVillage()
    },[id])

    

    useEffect(()=>{
            if(commerce){
                if(commerce.Image){
                    const image = donwload(commerce.Image)
                    setImage(image.publicUrl)
                }
            }
    },[commerce])

    const GetCommerce = async()=>{
        const data = await UserParIdentifiant(id) as any
        setCommerce(data[0]);
        
    }

    const getVillage = async()=>{
        const VillageId= id.split("-")[2]
        const data = await GetVillage(VillageId) as any
        setMonVillage(data[0].nomVillage)   
    }
    
    if(!commerce){
        return <Loader/>
    }


    return (
        <>
        <Visuel backgroundUrl={image} color={commerce.TextColor} colorSec={commerce.Couleur}/>
        <CommerceContain Primaire={commerce.Couleur} Secondaire={commerce.CouleurSec} TextColor={commerce.TextColor}>
            <section>

                <h1>{commerce.Artisant && "Artisant"} {commerce.métier}</h1>

                <article className="infos">
                    
                    <div className="InfoCom">
                        <p>{commerce.COM_ACTnom}</p>
                        {commerce.adresse && <p>{commerce.adresse}</p>}
                        <p className="Village" onClick={()=>{navigate(`/Village?Village=${commerce.id.split("-")[2]}`)}}>village: {monVillage}</p>
                        
                        <ul>
                            <li>Gérant: {commerce.Prénom} {commerce.Nom}</li> <br/>
                            {commerce.email && <><li><a href={`mailto:${commerce.email}`}>{commerce.email}</a></li><br/></>}
                            {commerce.Tel && <><li>{commerce.Tel}</li><br/></>}
                        </ul>

                        <Ul>
                            {commerce.Linkedin && <a target="_blank" rel="noreferrer" href={commerce.Linkedin}><img src="/Images/LinkedIn_icon_circle.svg.png" alt="Linkedin"/></a>}
                            {commerce.Twitter && <a target="_blank" rel="noreferrer" href={commerce.Twitter}><img src="/Images/twitter.png" alt="Twitter" /></a>}
                            {commerce.Facebook && <a target="_blank" rel="noreferrer" href={commerce.Facebook}><img src="/Images/Facebook_icon.svg.png" alt="Facebook" /></a>}
                            {commerce.Instagram && <a target="_blank" rel="noreferrer" href={commerce.Instagram}><img src="/Images/insta.png" alt="Instagram"/></a>}   
                            {commerce.TikTok && <a target="_blank" rel="noreferrer" href={commerce.TikTok}><img src="/Images/tiktok.png" alt="TikTok"/></a>}  
                            {commerce.GoogleBusiness && <a target="_blank" rel="noreferrer" href={commerce.GoogleBusiness}><img src="/Images/GoogleBusiness.png" alt="GoogleBusiness"/></a>}   
                        </Ul>

                        <ul>
                            <li>{commerce.SiteWeb && <a target="_blank" rel="noreferrer" href={commerce.SiteWeb}>Plus d'infos</a>}</li>
                        </ul>
                        
                    </div>
                    <div>
                        {commerce.Description && commerce.Description.split('\n').map((line,id)=>{if(line===""){return <br key={id}/>}else{return <p key={id}>{line}</p>}})}
                    </div>
                </article>
                <hr/>
                <article>
                    <ListEvenements Villageid={commerce.id.split("-")[2]}/> 
                </article>
            </section>
            
            
        </CommerceContain>
        </>
    )
}