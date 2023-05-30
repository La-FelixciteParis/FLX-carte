/* eslint-disable react-hooks/exhaustive-deps */

import { useParams } from "react-router-dom"
import { MainContainer } from "../Styles/EvenementPage"
import { useEffect, useState } from "react"
import { GetEvenement, GetLink } from "../API/Supabase/Evenement"
import { EvenementInfo } from "../Types/Evenement"
import { GetVillage } from "../API/Supabase/Village"
import { UserParIdentifiant } from "../API/Supabase/User"
import { UserType } from "../Types/User"

export const Evenement = () =>{
    const {id} = useParams() as any

    const [evenement,setEvenement] = useState<EvenementInfo | null>(null)
    const [villages,setVillages] = useState<string[] | null>(null)
    const [commerces,setCommerces] = useState<UserType[] | null>(null)


    useEffect(()=>{
        FetchEvenement()
    },[])

    useEffect(()=>{
        FetchVillage()
        FetchCommercant()
    },[evenement])

    const FetchEvenement = async()=>{
        const data = await GetEvenement(id) as any
       setEvenement(data[0]);
        
    }

    const FetchVillage = async () => {
        if (evenement) {
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
        }
      };

      const FetchCommercant = async () =>{
        if (evenement){
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
      }

    return <MainContainer>
        {evenement && <> 
            <h1>{evenement.nom}</h1>
            <p>ce trouve: {evenement.Lieu}</p>
            <p>Villages participants:</p>
            <ul>
            {villages?.map(village=>{
                
                return(<li key={village}>{village}</li>)
            })}
            </ul>
            <p>commerçants Partipants:</p>
            <ul>
                {commerces?.map(commerce=>{
                    return(<li key={commerce.id}>{commerce.Artisant && 'Artisant'} {commerce.métier} {commerce.COM_ACTnom}</li>)
                })}
            </ul>
        </>}
    </MainContainer>
}