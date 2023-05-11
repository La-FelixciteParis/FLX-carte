import { useParams } from "react-router-dom"

export const Evenement = () =>{
    const {id} = useParams()
    return <h1>Evenement {id}</h1>
}