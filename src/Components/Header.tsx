/* eslint-disable react-hooks/exhaustive-deps */

//Header à refaire pour avoir une nav complête


//Import

//Base
import { useContext, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

//Context
import { CommerçantContext } from "../Context/Commercant"
import { UserContext } from "../Context/IdUser"

//Style
import { bleu, jaune, Principal, vert } from "../Styles/Couleur"
import { ButtonStyle } from "../Styles/Général"
import { HeaderStyle } from "../Styles/Header"

export const Header = ()=>{
    

    const [color,setColor]= useState<string>(Principal)
    const [scrollTop, setScrollTop] = useState<number>(0);
    const [scroll,setScroll]=useState<boolean>(false)


    const {infoIdUser,idUser,isCommerce,logoutId} = useContext(UserContext) as any
    const {logoutCommerçant} = useContext(CommerçantContext) as any



    const navigate = useNavigate()


    useEffect(()=>{

        //Choix d'une couleur en fonction du type d'utilisateur
        if(infoIdUser){
            const carte = infoIdUser[1]
            if (carte==="ACT") {
                setColor(jaune)
            }else if (carte==="HBT"){
                setColor(bleu)
            }else if (carte==="SJR"){
                setColor(vert)
            }
        }else{
            setColor(Principal)
        }
    },[infoIdUser])

    const logout = () =>{

        //Déconection en remettant sur la homepage
        logoutCommerçant()
        logoutId()
        navigate("/")
    }

    const handleConnexionCommerçant = ()=>{

        //Renvoie vers la page de log d'un commerçant
        navigate("/Login")
    }

    const handleHomeClick = () =>{
        //renvoie à la homepage
        navigate("/")
    } 

    //Récupération du chemin de la page
    const location= useLocation()

    useEffect(()=>{
        //Si le chemin est un /Commerce (donc on est sur la page commerce)...
        if(location.pathname.split("/")[1]=== "Commerce"){
            const handleScroll = () => {
                setScrollTop(window.scrollY);
              };
          
            //... on regarde le scroll de la page et on le garde en scrollTop
          window.addEventListener("scroll", handleScroll);
        };

        //Si le chemin est différent de Admin on efface les acces Admin du storage local
        if(location.pathname.split("/")[1]!=='Admin'){
            localStorage.removeItem('AdminPerm')
        }
    
    },[])

    

    useEffect(()=>{
        //Quand le scrollTop change
        //on récupère la hauteur de la page
        const height = window.innerHeight
        
        //On compare le scrollTop garder avec la hauteur si on est sur la page commerce et on met le scroll à true ou false en fonction de cette valeur
        if(scrollTop>=height-70 || location.pathname.split("/")[1]!== "Commerce"){
            setScroll(true);   
        }else{
            setScroll(false)
        }
        
    },[scrollTop])

    return(

        //le style du header change suivant si scroll est true ou false
        <HeaderStyle color={color} headerAppear={scroll} bright={scroll ? 0.5 : 3}>
            <img className="logo" src="/Images/LogoEtoileFlx.png" alt="Logo Félixcité" onClick={handleHomeClick}/>
            <img className="anime" src="/Images/éclat.png" alt="éclat"/>
            {isCommerce ? <ButtonStyle color={color}><a href="https://www.helloasso.com/associations/la-felixcite" target="_blank" rel="noreferrer">Rejoindre</a></ButtonStyle>
             : 
            idUser ? <> <ButtonStyle color={color} onClick={logout}>Déconnection</ButtonStyle> </>
             : 
            <ButtonStyle color={color} onClick={handleConnexionCommerçant}>Commerçant</ButtonStyle>}
        </HeaderStyle>
    )
}