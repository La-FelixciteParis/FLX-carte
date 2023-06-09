import { useEffect, useState } from "react"
import { Input } from "../Components/Input"
import { Form, FormContain } from "../Styles/Connect"
import { AdminContain } from "../Styles/Admin"
import { GetIds, LoginAdmin, UserCreate } from "../API/Supabase/User"
import { QrCodeDl } from "../Components/DlQRCode"
import { QrpropsType } from "../Types/QR"
import { ValidAdmin } from "../API/Supabase/Admin"
import { GetACT } from "../API/Supabase/User"

export const Admin= () =>{

    //sécurité

    const [valid,setValid] = useState<boolean>(false)
    const [mdp,setMdp] = useState<string>("")
    const [email,setEmail] = useState<string>("")
    const [error,setError]= useState<string|null>(null)

    //données qr
    const [ids,setIds] = useState<[]|QrpropsType[]>([])

    //création nouvel id
        //id
    const [carte,setCarte]=useState<string>("")
    const [village,setVillage]=useState<string>("")
    const [assoc,setAssoc]=useState<string>("")
    const [numéro,setNuméro]=useState<string>("")
        //Gérant
    const [nom,setNom] = useState<string>("")
    const [prénom,setPrénom] = useState<string>("")
        //Info com
    const [métier,setMétier] = useState<string>("")
    const [nomCommerce,setNomCommerce] = useState<string>("")


    useEffect(()=>{
        Ids()       
    },[])

    const Ids = async() =>{
        const data = await GetIds()
        if(data){
            setIds(data);
        }
        const LocalAdmin = localStorage.getItem('AdminPerm')
        if(LocalAdmin){
            const Admin= await GetACT(LocalAdmin)
            if(Admin){
                setValid(true)
            }else{
                setValid(false)
            }
        }else{
            setValid(false)
        }
    }

    const HandleValidSubmit = async(e:any) =>{
        e.preventDefault()
        setError(null)
        const body={
            email,
            password:mdp
        }
        const data= await LoginAdmin(body)
        if(typeof data === "object"){
            
            const validation=await ValidAdmin(data.user?.id);
            if(validation && validation.length>0){
                setValid(true)
                localStorage.setItem('AdminPerm', `${data.session?.access_token}`)
            }else{
                setError("non autorisé");
                setValid(false)
            }
        }else{
            setError("Utilisateur non existant")
            setValid(false)
        }
     
    }

    const RemiseAZero = ()=>{
        setCarte("")
        setVillage("")
        setAssoc("")
        setNuméro("")
        setPrénom("")
        setNom("")
        setMétier("")
        setNomCommerce("")
        Ids()
    }

    const NewId = async(e:any)=>{
        e.preventDefault()
        const body = {
            id: `FLX-${carte}-${village}-${assoc}-${numéro}`,
            Prénom:prénom,
            Nom:nom,
            métier,
            COM_ACTnom:nomCommerce
        }
        await UserCreate(body)

        RemiseAZero()
        
    }

    return (
    <>
        {valid ? 
            <AdminContain>
                <h2>Pas encore DL</h2>
                <section>
                    {ids.map((id)=>{
                            return(!id.QrDl && <QrCodeDl id={id.id} route="User/" COM_ACTnom={id.COM_ACTnom} QrDl={id.QrDl} key={`UserPasDl${id.COM_ACTnom}`} onReload={Ids} user/>)              
                    })}
                </section>
                <h2>Déjà DL</h2>
                <section>
                    {ids.map((id)=>{
                            return (id.QrDl && <QrCodeDl id={id.id} route="USer/" COM_ACTnom={id.COM_ACTnom} QrDl={id.QrDl} key={`UserDl${id.COM_ACTnom}`} user/>)
                    })}
                </section>
                <h2>CommercePasDl</h2>
                <section>
                {ids.map((id)=>{
                        if(id.id.split("-")[1] === "COM" ||id.id.split("-")[1] === "ACT"){
                            return(!id.QrDlCom && <QrCodeDl id={id.id} route="Commerce/" COM_ACTnom={id.COM_ACTnom} QrDlCom={false} key={`comPasDl-${id.COM_ACTnom}`} onReload={Ids}/>) 
                        }else{
                            return <div className="none" key={`NoneAfficPasDL-${id.COM_ACTnom}`}  />
                        }
                                         
                    })}
                </section>
                <h2>CommerceDL</h2>
                <section>
                {ids.map((id)=>{
                        if(id.id.split("-")[1] === "COM" ||id.id.split("-")[1] === "ACT"){
                            return(id.QrDlCom && <QrCodeDl id={id.id} route="Commerce/" COM_ACTnom={id.COM_ACTnom} QrDlCom={true}  key={`comDl-${id.COM_ACTnom}`}/>) 
                        }else{
                            return <div className="none" key={`NoneAfficDL-${id.COM_ACTnom}`}  />
                        }                 
                    })}
                </section>
                <FormContain>
                    <Form onSubmit={NewId}>
                        <p>ID</p>
                        <div>
                        <label htmlFor="Carte">Carte</label>
                        <select value={carte} name="Carte" onChange={(e:any)=>{setCarte(e.target.value)}}>
                            <option value="">Choisir</option>
                            <option value="COM">Commerçant</option>
                            <option value="ACT">Activité</option>
                            <option value="HBT">Habitant</option>
                            <option value="SJR">Séjour</option>
                        </select>
                        <label htmlFor="Village">Village</label>
                        <select value={village} name="Village" onChange={(e:any)=>{setVillage(e.target.value)}}>
                            <option value="">Choisir</option>
                            <option value="000">Karen</option>
                            <option value="001">Marche Daumesnil</option>
                            <option value="002">Dugommier Charenton</option>
                            <option value="003">Daumesnil Bel Air</option>
                            <option value="004">Gare de Reuilly</option>
                        </select>
                        <label htmlFor="Assoc">Association</label>
                        <select value={assoc} name="Assoc" onChange={(e:any)=>{setAssoc(e.target.value)}}>
                            <option value="">Choisir</option>
                            <option value="ACPB">ACPB</option>
                            <option value="ADCFSA">ADCFSA</option>
                            <option value="HAPCO">HAPCO</option>
                            <option value="VILFAI">VILFAI</option>
                            <option value="FLX">FLX</option>
                        </select>
                        <Input value={numéro} text="numéro" type="text" onChange={(e:any)=>{setNuméro(e.target.value)}}/>
                        </div>
                        <p>Gérant(e)</p>
                        <div>
                            <Input value={prénom} text="Prénom" type="text" onChange={(e:any)=>{setPrénom(e.target.value)}}/>
                            <Input value={nom} text="Nom" type="text" onChange={(e:any)=>{setNom(e.target.value)}}/>
                        </div>
                        <p>Info com</p>
                        <div>
                        <Input value={métier} text="Métier" type="text" onChange={(e:any)=>{setMétier(e.target.value)}}/>
                        <Input value={nomCommerce} text="NomCommerce" type="text" onChange={(e:any)=>{setNomCommerce(e.target.value)}}/>
                        </div>
                        <button type="submit">Créer</button>
                    </Form>
                </FormContain>
            </AdminContain>
            :
            <FormContain>
                <Form onSubmit={HandleValidSubmit}>
                    <Input text="Email" type="mail" onChange={(e:any)=>{setEmail(e.target.value)}}/>
                    <Input text="Mot de passe" type="password" onChange={(e:any)=>{setMdp(e.target.value)}} />
                    <button type="submit">Valider</button>
                    {error && <small>{error}</small>}
                </Form>
            </FormContain>
        }
    </>
)
}