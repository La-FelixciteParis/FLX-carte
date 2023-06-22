/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router-dom"
import { CommerceContain, MenuBurger, Ul, Village, Visuel } from "../Styles/Commerce"
import { CommerceParVillage, UserParIdentifiant } from "../API/Supabase/User"
import { useContext, useEffect, useState } from "react"
import { Loader } from "../Components/Loader"
import { UserType } from "../Types/User"
import { UserContext } from "../Context/IdUser"
import { MapContainer,TileLayer,Marker,Popup } from "react-leaflet"
import { Icon } from "leaflet"
import { GetVillage } from "../API/Supabase/Village"
import { ListEvenements } from "../Components/Evenements"
import { donwload } from "../API/Supabase/Images"


export const Commerce = () =>{

    const {id} = useParams() as any

    const [commerce,setCommerce] = useState<null|UserType> (null)
    const [showMenu,setShowMenu] = useState<boolean>(false)
    const [commerces,setCommerces] = useState<[]|UserType[]>([])
    const [monVillage,setMonVillage] = useState<string>("")
    const [position,setPosition] = useState<any>(null)
    const [markers,setMarkers]=useState<any>([])
    const [active,setActive] = useState<string>(id)
    const [image,setImage] = useState<string>('/Images/defaultCommerce.png')
    const [scrollTop, setScrollTop] = useState<number>(0);
    const [scroll,setScroll]=useState<boolean>(false)

    const arrayMarker=[] as any

    const {setIsCommerce}= useContext(UserContext) as any

    const navigate=useNavigate()

    const BaseUrl= "https://api.mapbox.com/geocoding/v5/mapbox.places/"

    const markerIcon = new Icon({
        iconUrl: '/Images/MarkerTest.png',
        iconSize: [50, 50]
      })

      const markerIcon2= new Icon({
        iconUrl:'/Images/marker2.png',
        iconSize:[15,30]
      })

      useEffect(()=>{
            const handleScroll = () => {
                setScrollTop(window.scrollY);
              };
          
              window.addEventListener("scroll", handleScroll);
        
        },[])

        useEffect(()=>{
        
            const height = window.innerHeight
            
            
            if(scrollTop>=height-20){
                setScroll(true);   
            }else{
                setScroll(false)
            }
            
        },[scrollTop])

    useEffect(()=>{
        GetCommerce()
        setIsCommerce(true)
        CommerceVillage()
        getVillage()
    },[id])

    

    useEffect(()=>{
            if(commerce){
                ComMarker(commerce)
                
                if(commerce.Image){
                    const image = donwload(commerce.Image)
                    setImage(image.publicUrl)
                }
            }
    },[commerce])

    useEffect(()=>{
        if(commerces){
            commerces.forEach(commerce=>{
                MarkersVillage(commerce)
            })
        }
    },[commerces])

    const GetCommerce = async()=>{
        const data = await UserParIdentifiant(id) as any
        setCommerce(data[0]);
        
    }

    const HandleBurgerClick = () =>{
        setShowMenu(!showMenu)
    }

    const CommerceVillage= async()=>{
        const VillageId= id.split("-")[2]
        const IdsCommerces = new RegExp(`FLX-(ACT|COM)-${VillageId}-(ACPB|ADCFSA|HAPCO|VILFAI|FLX)-\\d{4}`);
        const data = await CommerceParVillage(IdsCommerces) as any
        setCommerces(data)
        
    }

    const getVillage = async()=>{
        const VillageId= id.split("-")[2]
        const data = await GetVillage(VillageId) as any
        setMonVillage(data[0].nomVillage)   
    }

    const GetMarkers= async(commerce:UserType)=>{
        
        const address = commerce.adresse
        const data= await fetch(`${BaseUrl}${address}.json?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`)
        const response = await data.json()
        return(response.features[0].center);
        
        
    }

    const ComMarker= async(commerce:UserType)=>{
        if(commerce){
            const Position= await GetMarkers(commerce)
            setPosition(Position)
        }

    }

    const MarkersVillage= async(commerce:UserType)=>{
        if(commerce.adresse){
            const posMarker = await GetMarkers(commerce)
            arrayMarker.push([posMarker[0],posMarker[1],commerce.COM_ACTnom,commerce.adresse,commerce.id])
            setMarkers(arrayMarker)
        }
    }

    const handleAllezClick = (marker:string)=>{
    navigate(`/Commerce/${marker}`)
    setShowMenu(false)
    }
    
    if(!commerce){
        return <Loader/>
    }


    return (
        <>
        <MenuBurger headerAppear={scroll} bright={1}><button className={`${showMenu && "show_bar"}`} onClick={HandleBurgerClick}><span/></button></MenuBurger>
        <Visuel backgroundUrl={image} color={commerce.TextColor} colorSec={commerce.Couleur}>
            <h1>{commerce.COM_ACTnom}</h1>
        </Visuel>
        <CommerceContain Primaire={commerce.Couleur} Secondaire={commerce.CouleurSec} TextColor={commerce.TextColor}>
            <section className={`${showMenu ? "hidden": "none"}`}>

                <h2>{commerce.Artisant && "Artisant"} {commerce.métier}</h2>

                <article className="infos">
                    
                    <div className="InfoCom">
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
            <Village className={`${showMenu && "show" }`}>
                <article>
                    <aside>
                        <h2>Village: {monVillage}</h2>
                        <div>
                        {commerces.map(commerce=>{
                            return <div key={commerce.id} className={`${commerce.id===active ? "active":"none"}`} onClick={()=>{
                                ComMarker(commerce)
                                setActive(commerce.id)
                                }}>
                                        <p>{commerce.métier}</p>
                                        <small>
                                            {commerce.COM_ACTnom}
                                            <button onClick={()=>handleAllezClick(commerce.id)}>Voir la page</button>
                                        </small>
                                    </div>
                        })}
                        </div>
                    </aside>
                    <div>
                        {position && 
                        <MapContainer center={[position[1],position[0]]} zoom={20} scrollWheelZoom={false} style={{height:"80vh"}}>
                             <TileLayer
                               url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                             />

                            {markers.map((marker:any,id:string)=>{
                                if(marker[1]===position[1] && marker[0]===position[0]){
                                    return(
                                        <Marker key={id} position={[position[1],position[0]]} icon={markerIcon}>
                                           <Popup>
                                             {marker[2]}<br/>
                                             address:{marker[3]}
                                            </Popup>
                                         </Marker>
                                    )
                                }
                                return(<Marker key={id} position={[marker[1],marker[0]]} icon={markerIcon2}>
                                    <Popup>
                                     {marker[2]}<br/>
                                     address:{marker[3]}
                                    </Popup>
                                  </Marker>)
                            })}

                        </MapContainer>
                        }
                    </div>
                </article>
            </Village>
            
        </CommerceContain>
        </>
    )
}