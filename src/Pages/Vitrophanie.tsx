import React, { useRef } from "react";
import { BackgroundCanvas, Dl, QRCanvas, Text } from "../Styles/Carte"
import { CanvasContainer } from "../Styles/Carte"
import { MainContainer } from "../Styles/Carte"
import { useLocation, useParams } from "react-router-dom";
import { ValidDlCom } from "../API/Supabase/User";

export const Vitrophanie = () =>{

    const {id} = useParams() as any

    const useQuery = () => {
        const { search } = useLocation();
      
        return React.useMemo(() => new URLSearchParams(search), [search]);
      }

      const query=useQuery()

    const backgroundCanvasRef = useRef(null);

    const downloadQR = async() =>{
        const backgroundCanvas = backgroundCanvasRef.current as any;
        if(backgroundCanvas){
            const qrCanvas = document.getElementById("qr-canvas");
            const downloadCanvas = document.createElement("canvas");
            downloadCanvas.width = backgroundCanvas.width;
            downloadCanvas.height = backgroundCanvas.height;
            
            const ctx = downloadCanvas.getContext("2d") as any; 
            // Dessine l'image de fond
            const backgroundImage = new Image();
            backgroundImage.src = `/Images/base-vitrophanie.png`;
            backgroundImage.onload = () => {
              ctx.drawImage(backgroundImage, 0, 0, downloadCanvas.width, downloadCanvas.height);
              // Dessine le code QR
              ctx.drawImage(qrCanvas, 28, 285);
              // Dessine le texte
              const name=query.get('Nom')
                const x=82
                const y=255
                const police1 = '16px Arial'
                ctx.font = police1;
                ctx.fillText(name, x, y,120);

              const dataUrl = downloadCanvas.toDataURL("image/png");
              const downloadLink = document.createElement("a");
              downloadLink.href = dataUrl;
              downloadLink.download = `Vitrophanie-${id}.png`;
              downloadLink.click();
            };
        }

        await ValidDlCom(id)
    }

    return(
        <MainContainer>
            <CanvasContainer>
            <BackgroundCanvas
              width={`${2031/2}`}
              height={`${1181/2}`}
              image="base-vitrophanie"
              x={0}
              y={0}
              ref={backgroundCanvasRef}
            />
            <QRCanvas id="qr-canvas" value={`${process.env.REACT_APP_URL}Commerce/${id}`} x={28} y={285} size={174}/>
            <Text x={82} y={213} size={20}>{query.get('Nom')}</Text>
            </CanvasContainer>
          <Dl onClick={downloadQR}>Télécharger QR</Dl>

        </MainContainer>
    )
}