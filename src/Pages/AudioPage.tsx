/* eslint-disable react-hooks/exhaustive-deps */

import { QRCodeCanvas } from "qrcode.react"
import { Audio } from "../Components/Audio"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { AudioList } from "../Liste audio/Audio"

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
        <div style={{margin: "100px 20px"}}>
            <Audio audioUrl={`/Audio/${audio}`}/>
            <QRCodeCanvas value={`${process.env.REACT_APP_URL}Audio/${id}`}/>
        </div>
    )
}