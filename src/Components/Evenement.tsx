//Renvoie une card Evenement  , Toujours en travaux , possible à modifier

//Import de base
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

//Import Type
import { Evenement } from "../Types/Evenement"

//Import API
import { donwload } from "../API/Supabase/Images"

//Import styles
import { EvenementContain } from "../Styles/Evenement"

export const EvenementList = ({evenement}:Evenement) =>{

    const [image,setImage] = useState<string>('')

    const navigate= useNavigate()

    useEffect(()=>{
        //Récupère l'image dans le storage de l'évènement
        if(evenement.Image){
            const data =  donwload(evenement.Image)
            setImage(data.publicUrl)
        }
    },[evenement])

    const handleEvenementClick= ()=>{
        //Renvoie vers la page de l'evenement
        navigate(`/Evenement/${evenement.id}`)
    }
    

    return <EvenementContain backgroundUrl={image} Foncé={evenement.noAffiche} onClick={handleEvenementClick}>
        {evenement.noAffiche && <><h3>{evenement.nom}</h3>
        <div className="Description">
            {evenement.description.split('\n').map((line,id)=>{if(line===""){return <br key={id}/>}else{return <p className="InfoEvenement" key={id}>{line}</p>}})}
            {/*Permet de retranscire la description en prenant en comptre les saut de ligne  le \n correspond à ce dernier*/}
        </div>
        <div>
            <small> du {evenement.dateDébut}</small>
            <small>au {evenement.dateFin}</small>
        </div></>}
    </EvenementContain>
}