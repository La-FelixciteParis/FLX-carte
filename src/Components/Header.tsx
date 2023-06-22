/* eslint-disable react-hooks/exhaustive-deps */

import { useContext, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { CommerçantContext } from "../Context/Commercant"
import { UserContext } from "../Context/IdUser"
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
        logoutCommerçant()
        logoutId()
        navigate("/")
    }

    const handleConnexionCommerçant = ()=>{
        navigate("/Login")
    }

    const handleHomeClick = () =>{
        navigate("/")
    } 

    const location= useLocation()

    useEffect(()=>{
        
        if(location.pathname.split("/")[1]=== "Commerce"){
            const handleScroll = () => {
                setScrollTop(window.scrollY);
              };
          
          window.addEventListener("scroll", handleScroll);
        };
    
        if(location.pathname.split("/")[1]!=='Admin'){
            localStorage.removeItem('AdminPerm')
        }
    
    },[])

    

    useEffect(()=>{
        
        const height = window.innerHeight
        
        
        if(scrollTop>=height-70 || location.pathname.split("/")[1]!== "Commerce"){
            setScroll(true);   
        }else{
            setScroll(false)
        }
        
    },[scrollTop])

    return(
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