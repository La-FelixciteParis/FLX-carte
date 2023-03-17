import { useContext, useEffect, useState } from "react"
import { UserContext } from "../Context/IdUser"
import { bleu, jaune, Klein, vert } from "../Styles/Couleur"
import { FooterStyle } from "../Styles/Footer"

export const Footer = ()=>{

    const target = "_blank"

    const [color,setColor]= useState<string>(Klein)

    const {infoIdUser} = useContext(UserContext) as any

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
            setColor(Klein)
        }
    },[infoIdUser])

    return(
        <FooterStyle color={color}>
            <section>
                <img src="/images/Felixcite-Logo-blanc.png" alt="Logo Félixcité"/>
            </section>
            <section>
                <h3>Réseaux</h3>
                <article>
                    <div>
                        <a target={target} href="https://lafelixcite.paris">Félixcité</a>
                        <a target={target} href="https://www.facebook.com/LaFelixCite">Facebook</a>
                        <a target={target} href="https://www.linkedin.com/company/la-felixcite">Linkedin</a>
                    </div>
                    <div>                       
                        <a target={target} href="https://www.instagram.com/la_felixcite">instagram</a>
                        <a target={target} href="https://twitter.com/LFelixcite">Twitter</a>
                    </div>
                </article>
            </section>
            <section>
                <h3>Autre</h3>
                <a target={target} href="https://lafelixcite.paris/contact/">Contacts</a>
                <a target={target} href="https://lafelixcite.paris/mentions-legales/">Mention légale</a>
                <a href="/">Règlement</a>
            </section>
        </FooterStyle>
    )
}