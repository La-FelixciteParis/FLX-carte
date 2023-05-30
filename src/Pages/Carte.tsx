/* eslint-disable react-hooks/exhaustive-deps */

import { useLocation, useParams } from "react-router-dom"
import { BackgroundCanvas, CanvasContainer, Dl, QRCanvas,MainContainer, Text } from "../Styles/Carte"
import React, { useEffect, useRef, useState } from "react";
import { GetVillage } from "../API/Supabase/Village";

export const Carte = () =>{
    const {id} = useParams() as any

    const [village,setVillage] = useState<string>('')

    useEffect(()=>{
        ChercheVillage()
    },[])

    const ChercheVillage = async() =>{
        const Village = await GetVillage(id.split("-")[2]) as any
        setVillage(Village[0].nomVillage);
        
    }

    const useQuery = () => {
        const { search } = useLocation();
      
        return React.useMemo(() => new URLSearchParams(search), [search]);
      }
    const backgroundCanvasRef = useRef(null);
    const ArrièreRef= useRef(null)

    const query=useQuery()


    const downloadQR = () => {
        const backgroundCanvas = backgroundCanvasRef.current as any;
        if(backgroundCanvas){
            const qrCanvas = document.getElementById("qr-canvas");
            const downloadCanvas = document.createElement("canvas");
            downloadCanvas.width = backgroundCanvas.width;
            downloadCanvas.height = backgroundCanvas.height;


            
            const ctx = downloadCanvas.getContext("2d") as any; 
            // Dessine l'image de fond
            const backgroundImage = new Image();
            backgroundImage.src = `/Images/base-carte.png`;
            backgroundImage.onload = () => {
              ctx.drawImage(backgroundImage, 0, 0, downloadCanvas.width, downloadCanvas.height);
              // Dessine le code QR
              ctx.drawImage(qrCanvas, 330, 35);

              //Dessine l'id
            const identifiant = id
            const x =161
            const y=140
            const police = '13px Arial'
            ctx.font = police;
            ctx.fillText(identifiant, x, y);

            //Dessine Nom

            const name=query.get('Nom')
            const x1=106
            const y1=70
            const police1 = '18px Arial'
            ctx.font = police1;
            ctx.fillText(name, x1, y1);

            //Dessine Village

            const nomVillage=village
            const x2=110
            const y2=105
            ctx.font = police1;
            ctx.fillText(nomVillage, x2, y2);

            
              const dataUrl = downloadCanvas.toDataURL("image/png");
              const downloadLink = document.createElement("a");
              downloadLink.href = dataUrl;
              downloadLink.download = `Carte-${id}.png`;
              downloadLink.click();
            };
        }
        const Arrière = ArrièreRef.current as any;
        if(Arrière){
            const downloadCanvas = document.createElement("canvas");
            downloadCanvas.width = Arrière.width;
            downloadCanvas.height = Arrière.height;
            const ctx = downloadCanvas.getContext("2d") as any; 
            // Dessine l'arrière
            const backgroundImage = new Image();
            backgroundImage.src = `/Images/Carte${id.split("-")[1]}.png`;
            backgroundImage.onload = () => {
              ctx.drawImage(backgroundImage, 0, 0, downloadCanvas.width, downloadCanvas.height);
              ctx.save()
              const text=village
             const x=-290
            const y=465
            const police = '20px Arial'
            ctx.font = police;
            ctx.rotate( Math.PI / -2 );
            ctx.fillText(text, x, y,140);
            ctx.restore()

              const dataUrl = downloadCanvas.toDataURL("image/png");
              const downloadLink = document.createElement("a");
              downloadLink.href = dataUrl;
              downloadLink.download = `ArrièreCarte-${id}.png`;
              downloadLink.click();
            }
        }

      };

    return(
        <MainContainer>
          <CanvasContainer>
            <BackgroundCanvas
              width="500"
              height="300"
              image="base-carte"
              x={0}
              y={0}
              ref={backgroundCanvasRef}
            />
            <QRCanvas id="qr-canvas" value={`${process.env.REACT_APP_URL}User/${id}`} x={330} y={35}/>
            <Text x={161} y={114} size={13}>{id}</Text>
            <Text x={106} y={28} size={18}>{query.get('Nom')}</Text>
            <Text x={110} y={63} size={18}>{village}</Text>

            <BackgroundCanvas
            width="500"
            height="300"
            image={`Carte${id.split("-")[1]}`}
            x={0}
            y={400}
            ref={ArrièreRef}
            />
            <Text x={429} y={630} size={20} rotate={-90}>{village}</Text>

          </CanvasContainer>
          <Dl onClick={downloadQR}>Télécharger QR</Dl>
        </MainContainer>
    )

} 