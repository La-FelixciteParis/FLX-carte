import { QRCodeCanvas } from "qrcode.react"
import { ListType } from "../Types/Audio"

export const QRAudio = ({list}:ListType)=>{

    const downloadQR = async() =>{
            const qrCanvas = document.getElementById("qr-canvas") as any;
              const dataUrl = qrCanvas.toDataURL("image/png");
              const downloadLink = document.createElement("a");
              downloadLink.href = dataUrl;
              downloadLink.download = `${list.AudioUrl.split('.')[0]}.png`;
              downloadLink.click();
        }

    return(
        <div>
            <QRCodeCanvas value={`${process.env.REACT_APP_URL}Audio/${list.AudioId}`}/>
            <p>{list.AudioUrl.split('.')[0]}</p>
            <button onClick={downloadQR}>télécharger</button>
        </div>
    )
}