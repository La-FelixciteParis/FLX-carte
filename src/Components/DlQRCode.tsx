import { QRCodeCanvas } from "qrcode.react";
import { QrpropsType } from "../Types/QR";
import { ValidDl, ValidDlCom } from "../API/Supabase/User";
import { QR } from "../Styles/Admin";
import { useNavigate } from "react-router-dom";

export const QrCodeDl = ({id,COM_ACTnom,QrDl,QrDlCom,onReload,route,user}:QrpropsType)=>{

  const navigate = useNavigate()
  
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

  const downloadQRCOM=async() => {
    const canvas = document.getElementById("QR") as any;
    const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `QR_${COM_ACTnom}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    await ValidDlCom(id)
    onReload()
  };

  return(
        <QR>
          <QRCodeCanvas value={`${process.env.REACT_APP_URL}${route}${id}`} id="QR"/> 
          <small>{COM_ACTnom}</small>
          {!QrDl &&  user && <p onClick={downloadQR}> Download QR </p>}
          {!QrDlCom && !user && <p onClick={downloadQRCOM}> Download QR COM </p>}
          {route !== 'Commerce/' && <p onClick={()=>navigate(`/Admin/${id}?Nom=${COM_ACTnom}`)}>Voire carte</p>}
        </QR>
    )
}