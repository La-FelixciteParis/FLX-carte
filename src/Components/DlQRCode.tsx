import { QRCodeCanvas } from "qrcode.react";
import { QrpropsType } from "../Types/QR";
import { ValidDl } from "../API/Supabase/User";
import { QR } from "../Styles/Admin";

export const QrCodeDl = ({id,COM_ACTnom,QrDl,onReload}:QrpropsType)=>{
  
  const downloadQR = async() => {
    const canvas = document.getElementById("QR") as any;
    const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `QR_${COM_ACTnom}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    await ValidDl(id)
    onReload()
  };

  return(
        <QR>
          <QRCodeCanvas value={`${process.env.REACT_APP_URL}${id}`} id="QR"/> 
          <small>{COM_ACTnom}</small>
          {!QrDl && <p onClick={downloadQR}> Download QR </p>}
        </QR>
    )
}