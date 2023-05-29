import { QRCodeCanvas } from "qrcode.react";
import { QrpropsType } from "../Types/QR";
import { ValidDl, ValidDlCom } from "../API/Supabase/User";
import { QR } from "../Styles/Admin";
import { useNavigate } from "react-router-dom";

export const QrCodeDl = ({id,COM_ACTnom,QrDl,QrDlCom,onReload,route}:QrpropsType)=>{

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
          {!QrDl && <p onClick={downloadQR}> Download QR </p>}
          {!QrDlCom && <p onClick={downloadQRCOM}> Download QR </p>}
          <p onClick={()=>navigate(`/Admin/${id}?route=${route}&Nom=${COM_ACTnom}`)}>Voire carte</p>
        </QR>
    )
}