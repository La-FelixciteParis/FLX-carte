
import { useEffect, useState } from "react"
import { Evenement } from "../Types/Evenement"
import { donwload } from "../API/Supabase/Images"
import { EvenementContain } from "../Styles/Evenement"
import { useNavigate } from "react-router-dom"


export const EvenementList = ({evenement}:Evenement) =>{

    const [image,setImage] = useState<string>('')

    const navigate= useNavigate()

    useEffect(()=>{
        if(evenement.Image){
            const data =  donwload(evenement.Image)
            setImage(data.publicUrl)
        }
    },[evenement])

    const handleEvenementClick= ()=>{
        navigate(`/Evenement/${evenement.id}`)
    }
    

    return <EvenementContain backgroundUrl={image} Foncé={evenement.noAffiche} onClick={handleEvenementClick}>
        {evenement.noAffiche && <><h3>{evenement.nom}</h3>
        <div className="Description">
            {evenement.description.split('\n').map((line,id)=>{if(line===""){return <br key={id}/>}else{return <p key={id}>{line}</p>}})}
        </div>
        <div>
            <small> du {evenement.dateDébut}</small>
            <small>au {evenement.dateFin}</small>
        </div></>}
    </EvenementContain>
}