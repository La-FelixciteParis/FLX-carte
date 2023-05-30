import { useEffect, useState } from "react"
import { CommerceDiv } from "../Styles/EvenementPage"
import { donwload } from "../API/Supabase/Images"
import { CommercePropsType } from "../Types/Evenement"


export const Commerce = ({commerce}:CommercePropsType) =>{
    const [image,setImage] = useState<string>('')

    useEffect(()=>{
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