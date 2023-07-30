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
import { HeaderStyle, MenuBurger, MyContain } from "../Styles/Header"

export const Header = ()=>{
    

    const [color,setColor]= useState<string>(Principal)
    const [scrollTop, setScrollTop] = useState<number>(0);
    const [scroll,setScroll]=useState<boolean>(false)
    const [showMenu,setShowMenu] = useState<boolean>(false)

    const {infoIdUser,idUser,logoutId} = useContext(UserContext) as any
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
    
    //Fonction pour changer de page et reset le menu burger

    const handleChangePage = (direction:string) =>{
        setShowMenu(false)
        navigate(`/${direction}`)
    }

    return(

        //le style du header change suivant si scroll est true ou false
        <HeaderStyle color={color} headerAppear={scroll} bright={scroll ? 0.5 : 3}>
            <img className="logo" src="/Images/LogoEtoileFlx.png" alt="Logo Félixcité" onClick={handleHomeClick}/>
            <img className="anime" src="/Images/éclat.png" alt="éclat"/>
            <nav>
                <MyContain className="menu">
                    <div className="dropdown">
                    <button className="dropbtn">Qui somme nous?</button>
                    <div className="dropdown-content">
                        <p onClick={()=>navigate("/")}>La Félixcité</p>
                        <p onClick={()=>navigate("/ACPB")}>L'ACPB</p>
                    </div>
                    </div> 
                </MyContain>
                <p className="menu" onClick={()=>navigate('/Connect')}>se connecter</p>
                <p className="menu" onClick={()=>navigate(`/Village/?Village=${location.pathname.split("/")[2].split("-")[2]}`)}>Les Villages</p>
                <p className="menu" onClick={()=>navigate(('/Evenements'))}>Agenda</p>
                { 
                idUser ? <> <ButtonStyle className="Commerce" color={color} onClick={logout}>Déconnection</ButtonStyle> </>
                 : 
                 location.pathname.split("/")[1]=== "Connect" ? <ButtonStyle className="Commerce" color={color} onClick={handleConnexionCommerçant}>Commerçant</ButtonStyle>
                 :
                 <ButtonStyle color={color}><a className="adhésion" href="https://www.helloasso.com/associations/la-felixcite" target="_blank" rel="noreferrer">Adhérer</a></ButtonStyle>
                }
                <MenuBurger headerAppear={scroll} >
                    <button className={showMenu? "show_bar" : "none"} onClick={()=>setShowMenu(!showMenu)}>
                        <span></span>
                    </button>
                </MenuBurger>
            </nav>
            <div className={`menusortie ${showMenu && "show"}`}>
                <div>
                    <p>Qui somme nous?</p>
                        <ul>
                            <li onClick={()=>handleChangePage("")}><p>La Félixcité</p></li>
                            <li onClick={()=>handleChangePage("ACPB")}><p>L'ACPB</p></li>
                        </ul>
                </div>
                <p onClick={()=>handleChangePage('Connect')}>se connecter</p>
                <p onClick={()=>handleChangePage('Village')}>Les Villages</p>
                <p onClick={()=>handleChangePage(('Evenements'))}>Agenda</p>
            </div>
        </HeaderStyle>
    )
}