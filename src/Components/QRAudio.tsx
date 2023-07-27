//Renvoie un QrCode lié à un un audio et un button pour le télécharger


//import

//Base
import { QRCodeCanvas } from "qrcode.react"

//Type
import { ListType } from "../Types/Audio"

export const QRAudio = ({list}:ListType)=>{

    const downloadQR = async() =>{

        //Fonction pour télécharger le qr
            const qrCanvas = document.getElementById(`qr-canvas${list.AudioId}`) as any;
              const dataUrl = qrCanvas.toDataURL("image/png");
              const downloadLink = document.createElement("a");
              downloadLink.href = dataUrl;
              downloadLink.download = `${list.AudioUrl.split('.')[0]}.png`;
              downloadLink.click();
        }

    return(
        <div>
            <QRCodeCanvas value={`${process.env.REACT_APP_URL}Audio/${list.AudioId}`} id={`qr-canvas${list.AudioId}`}/>
            <p>{list.AudioUrl.split('.')[0]}</p>
            <button onClick={downloadQR}>télécharger</button>
        </div>
    )
}