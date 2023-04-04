import { QRCodeCanvas } from "qrcode.react";
import styled from "styled-components";
import { QrpropsType } from "../Types/QR";
import { ValidDl } from "../API/Supabase-FLX/User";

const Dl = styled.p`
  :hover{
    cursor: pointer;
    color:red;
  };
`

export const QrCodeDl = ({id,COM_ACTnom}:QrpropsType)=>{
  
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
  };

  return(
        <div>
          <QRCodeCanvas value={`${process.env.REACT_APP_URL}${id}`} id="QR"/> 
          <p>{COM_ACTnom}</p>
          <Dl onClick={downloadQR}> Download QR </Dl>
        </div>
    )
}