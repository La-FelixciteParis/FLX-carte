import { QRCodeCanvas } from "qrcode.react"
import { Audio } from "../Components/Audio"

export const AudioPage = () =>{



    return(
        <div style={{margin: "100px 20px"}}>
            <Audio audioUrl='/Audio/Voix002.m4a'/>
            <QRCodeCanvas value={`${process.env.REACT_APP_URL}Audio/1`}/>
        </div>
    )
}