import { useEffect, useRef } from "react"

export const Audio = ({audioUrl}:any) =>{

    const musicRef= useRef(null) as any

    useEffect(()=>{
        play()
    },[])

    const play = () =>{
        musicRef.current.play()
    }
    
    return(
        <audio ref={musicRef} controls src={audioUrl}/>
    )
}