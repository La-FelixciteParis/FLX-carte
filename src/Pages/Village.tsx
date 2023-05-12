import { useEffect, useState } from "react";


export const Village = () => {

    const [idVillage,setIdVillage] = useState<string>('')

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const village = params.get('Village') as string;
        setIdVillage(village);
      }, []);

    return <h1 style={{marginTop: "500px"}}>{idVillage}</h1>
}