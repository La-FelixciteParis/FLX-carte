/* eslint-disable react-hooks/exhaustive-deps */

//Return une liste de card d'évènement


//Import de base
import { useEffect, useState } from "react"

//Import API
import { GetEvenements } from "../API/Supabase/Evenement"

//Import types
import { EvenementInfo, EvenementProps } from "../Types/Evenement"

//Import style
import { EvenementsContain } from "../Styles/Evenement"

//Import component
import { EvenementList } from "./Evenement"

export const ListEvenements = ({Villageid}:EvenementProps)=>{

    const [evenements,setEvenement] = useState<[] | EvenementInfo []>([])

    useEffect(()=>{
        Evenements()
    },[])

    const Evenements = async() =>{
        //Va chercher les evenement lié au village
        const Data = await GetEvenements(Villageid) as any
        setEvenement(Data);
    }

    return <EvenementsContain>
            <div className="Evenements">
            {evenements.map(evenement=>{
                return <EvenementList evenement={evenement} key={evenement.id}/>
            })}
            </div>
        </EvenementsContain>
}