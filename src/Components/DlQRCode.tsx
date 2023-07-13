//Retourne Un Qrcode qui peut mené à une carte si qr perso ou une vitrophanie si qr com


//Import ce qui créer le qrcode
import { QRCodeCanvas } from "qrcode.react";

//Import type
import { QrpropsType } from "../Types/QR";

//Import styles
import { QR } from "../Styles/Admin";

//Import la navigation
import { useNavigate } from "react-router-dom";

export const QrCodeDl = ({id,COM_ACTnom,route}:QrpropsType)=>{

  const navigate = useNavigate()

  return(
        <QR>
          <QRCodeCanvas value={`${process.env.REACT_APP_URL}${route}${id}`} id="QR"/>  {/*Génère le qrcode , value = chemin auquel il renvoie */}
          <small>{COM_ACTnom}</small>
          {route === 'Commerce/' ? <p onClick={()=>navigate(`/Admin/Vitrophanie/${id}?Nom=${COM_ACTnom}`)}>Voire vitrophanies</p>:<p onClick={()=>navigate(`/Admin/Carte/${id}?Nom=${COM_ACTnom}`)}>Voire carte</p>}
        </QR>
    )
}