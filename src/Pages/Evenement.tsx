/* eslint-disable react-hooks/exhaustive-deps */

import { useParams } from "react-router-dom"
import { MainContainer } from "../Styles/EvenementPage"
import { useEffect, useState } from "react"
import { GetEvenement, GetLink } from "../API/Supabase/Evenement"
import { EvenementInfo } from "../Types/Evenement"
import { GetVillage } from "../API/Supabase/Village"
import { UserParIdentifiant } from "../API/Supabase/User"
import { UserType } from "../Types/User"
import { donwload } from "../API/Supabase/Images"
import { Commerce } from "../Components/Commerce"

export const Evenement = () =>{
    const {id} = useParams() as any

    const [evenement,setEvenement] = useState<EvenementInfo | null>(null)
    const [villages,setVillages] = useState<string[] | null>(null)
    const [commerces,setCommerces] = useState<UserType[] | null>(null)
    const [image,setImage] = useState<string>('')


    useEffect(()=>{
        FetchEvenement()
    },[])

    useEffect(()=>{
        
        if(evenement){
            FetchVillage()
            FetchCommercant()
            const img =  donwload(evenement.Image) as any
            setImage(img.publicUrl)
        }
    },[evenement])

    const FetchEvenement = async()=>{
        const data = await GetEvenement(id) as any
       setEvenement(data[0]);
        
    }

    const FetchVillage = async () => {
          const data = await GetLink('Link_Evenement_Village', id);
          if (data) {
            const villageIds = data.map(dat => dat.idVillage);
            const villagePromises = villageIds.map(async (arr) => {
              const village = await GetVillage(arr);
              if (village){
                return village[0].nomVillage;
              }
            });
      
            const villageNames = await Promise.all(villagePromises)
      
            setVillages(villageNames);
          }
        
      };

      const FetchCommercant = async () =>{
            const data = await GetLink('Link_Evenement_Commercants',id)
            if (data){
                const ComIds=data.map(dat=>dat.id_Com)
                const ComPromises=ComIds.map(async(arr)=>{
                    const Commercant= await UserParIdentifiant(arr)
                    if(Commercant){
                        return Commercant[0]
                    }
                })

                const Commerçants = await Promise.all(ComPromises) as any
                setCommerces(Commerçants)
                
            }
        
      }

    return <MainContainer backgroundUrl={image}>
        {evenement && <> 
            <article className="Image">
                <h1>{evenement.nom}</h1>
            </article>
            <article>
                <div>
                    <p>{evenement.Type}</p>
                    <p>{evenement.Lieu}</p>
                    <p>Villages participants:</p>
                    <ul>
                    {villages?.map(village=>{

                        return(<li key={village}>{village}</li>)
                    })}
                    </ul>
                    
                </div>
            </article>
            <h2>Participation de:</h2>
            <article className="Commerces">
            {commerces?.map(commerce=>{
                return(<Commerce commerce={commerce}/>)
            })}
            </article>
        </>}
    </MainContainer>
}