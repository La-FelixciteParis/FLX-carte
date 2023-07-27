//Renvoie un loader


//Import

//Base
import { useEffect, useState } from "react"

//Style
import { Load } from "../Styles/Loader"

export const Loader = () =>{

        const [chargementLong,setChargementLong] = useState<string|null>(null)

        useEffect(()=>{
            //Si le loader apparaît trop longtemps, met un petit message
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