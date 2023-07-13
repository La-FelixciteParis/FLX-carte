/* eslint-disable react-hooks/exhaustive-deps */
//Renvoie une card avec les infos du commerce

//Import de base
import { useEffect, useState } from "react"

//Import Style
import { CommerceDiv } from "../Styles/EvenementPage"

//Import API
import { donwload } from "../API/Supabase/Images"

//Import Type
import { CommercePropsType } from "../Types/Evenement"


export const Commerce = ({commerce}:CommercePropsType) =>{

    const [image,setImage] = useState<string>('')

    useEffect(()=>{
        //Si il y à une donnée d'image la récupère dans les storage, sinon met l'image par defaut
        if(commerce.Image){
            const img = donwload(commerce.Image) as any
            setImage(img.publicUrl)
        }else{
            setImage('/Images/defaultCommerce.png')
        }
    },[])

    return  (<CommerceDiv  key={commerce.id} backgroundUrl={image}>
        <h3>{commerce.COM_ACTnom}</h3>
        <p>{commerce.Artisant && 'Artisant'} {commerce.métier} </p>
        </CommerceDiv>)
}