import { useEffect, useState } from "react"
import { Evenement } from "../Types/Evenement"
import { donwload } from "../API/Supabase/Images"
import { EvenementContain } from "../Styles/Evenement"
import { GetVillage } from "../API/Supabase/Village"


export const EvenementList = ({evenement}:Evenement) =>{

    const [image,setImage] = useState<string>('')
    const [village,setVillage]=useState<string>('')

    useEffect(()=>{
        if(evenement.Image){
            const data =  donwload(evenement.Image)
            setImage(data.publicUrl)
        }
            FetchVillage()
    },[evenement])
    

    const FetchVillage = async()=>{
        if(evenement.villageId){
            const Village = await GetVillage(evenement.villageId) as any
            setVillage(Village[0].nomVillage)
        }
    }

    return <EvenementContain backgroundUrl={image} Foncé={evenement.nom!== null}>
        {evenement.nom && <h3>{evenement.nom}</h3>}
        <div className="Description">
            {evenement.description && evenement.description.split('\n').map((line,id)=>{if(line===""){return <br key={id}/>}else{return <p key={id}>{line}</p>}})}
        </div>
        <div>
            {evenement.dateDébut && <small> du {evenement.dateDébut}</small>}
            {evenement.dateFin && <small>au {evenement.dateFin}</small>}
        </div>
    </EvenementContain>
}