/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react"
import { GetEvenement } from "../API/Supabase/Evenement"
import { EvenementInfo, EvenementProps } from "../Types/Evenement"
import { EvenementList } from "./Evenement"
import { EvenementsContain } from "../Styles/Evenement"

export const ListEvenements = ({Villageid}:EvenementProps)=>{

    const [evenements,setEvenement] = useState<[] | EvenementInfo []>([])

    useEffect(()=>{
        Evenements()
    },[])

    const Evenements = async() =>{
        const Data = await GetEvenement(Villageid) as any
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