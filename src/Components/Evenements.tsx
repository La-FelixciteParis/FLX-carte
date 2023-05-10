/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState } from "react"
import { GetEvenement } from "../API/Supabase/Evenement"
import { EvenementInfo, EvenementProps } from "../Types/Evenement"

export const ListEvenements = ({Villageid}:EvenementProps)=>{

    const [evenements,setEvenement] = useState<[] | EvenementInfo []>([])

    useEffect(()=>{
        Evenements()
    },[])

    const Evenements = async() =>{
        const Data = await GetEvenement(Villageid) as any
        setEvenement(Data);
    }

    return <div>
            {evenements.map(evenement=>{
                return <p key={evenement.description}>{evenement.description}</p>
            })}
        </div>
}