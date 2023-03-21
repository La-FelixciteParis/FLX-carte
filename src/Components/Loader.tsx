import { useEffect, useState } from "react"
import { Load } from "../Styles/Loader"

export const Loader = () =>{

        const [chargementLong,setChargementLong] = useState<string|null>(null)

        useEffect(()=>{
            setTimeout(()=>{
                setChargementLong("Chargement long, vérifier votre connexion ou votre identifiant")
            },10000)
        },[])

    return (
        <Load>
            <img src="/images/Felixcite-Logo.png" alt="Loader"/>
            {chargementLong && <p>{chargementLong}</p>}
        </Load>
    )
}