import { QRCodeCanvas } from "qrcode.react";
import { QrpropsType } from "../Types/QR";
import { QR } from "../Styles/Admin";
import { useNavigate } from "react-router-dom";

export const QrCodeDl = ({id,COM_ACTnom,QrDlCom,onReload,route,user}:QrpropsType)=>{

  const navigate = useNavigate()

  return(
        <QR>
          <QRCodeCanvas value={`${process.env.REACT_APP_URL}${route}${id}`} id="QR"/> 
          <small>{COM_ACTnom}</small>
          {route === 'Commerce/' ? <p onClick={()=>navigate(`/Admin/Vitrophanie/${id}?Nom=${COM_ACTnom}`)}>Voire vitrophanies</p>:<p onClick={()=>navigate(`/Admin/Carte/${id}?Nom=${COM_ACTnom}`)}>Voire carte</p>}
        </QR>
    )
}