/* eslint-disable react-hooks/exhaustive-deps */

import { Audio } from "../Components/Audio"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { AudioList } from "../Liste audio/Audio"
import { AudioContain } from "../Styles/Audio"

export const AudioPage = () =>{

    const {id} = useParams() as any
    const [audio,setAudio] = useState<string>('')

    useEffect(()=>{
        
        const myaudio = AudioList.find(list=>{
            
           return list.AudioId===id
        })
        if(myaudio){
            setAudio(myaudio.AudioUrl)
        }
        
    },[])

    return(
        <AudioContain>
            <Audio audioUrl={`/Audio/${audio}`}/>
        </AudioContain>
    )
}