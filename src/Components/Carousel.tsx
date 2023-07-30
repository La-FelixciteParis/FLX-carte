import { useState } from "react"
import { CarouselContain } from "../Styles/Carousel"

export const Carousel = () =>{

    const [image,setImage]=useState<number>(1)

    const précédent = () =>{
        if(image===1){
            setImage(4)
        }else{
            setImage(image-1)
        }
    }

    const suivant = () =>{
        if(image===4){
            setImage(1)
        }else{
            setImage(image+1)
        }
    }

    return(
        <CarouselContain image={image}>
            <button className="precedent" onClick={précédent}>{'<'}</button>
            <div/>
            <button className="suivant" onClick={suivant}>{'>'}</button>

        </CarouselContain>
    )   
}