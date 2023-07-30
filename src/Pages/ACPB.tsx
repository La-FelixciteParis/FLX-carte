//Présentation de l'ACPB

//Import

//Base
import { useRef, useState } from "react"

//Emailjs
import emailjs from '@emailjs/browser';

//Styles
import { Form } from "../Styles/Email"
import { ACPBcontain } from "../Styles/ACPB";

export const ACPB = () =>{

  const [name,setName] = useState<string>('')
  const [email,setEmail] = useState<string>('')
  const [message,setMessage] = useState<string>('')
  const [confirm,setConfirm] = useState<boolean>(false)
  const [error,setError] = useState<string | null>(null)


  const form = useRef();
  
  const sendEmail = (template:any) => {
    emailjs.sendForm(process.env.REACT_APP_YOUR_SERVICE_ID as any, template , form.current as any, process.env.REACT_APP_YOUR_PUBLIC_KEY)
      .then((result) => {
        console.log(result.text);
          setConfirm(true)
      }, (error) => {
          console.log(error.text);
          setError('Une erreur est survenue');
      });

      setName('')
      setEmail('')
      setMessage('')
  }

  const send = (e:any) => {
    e.preventDefault();

    setConfirm(false)
    setError(null);
    sendEmail(process.env.REACT_APP_YOUR_TEMPLATE_ID_THOMAS)
  };

    return(
        <ACPBcontain>
            <img src="/Images/BANNIEREweb.jpg" alt="Bannière ACPB"/>
            <h1>Association Artisanal et Commerciale Paris-Bercy</h1>
            <p>Membre de la Confédération des Commerçants De France</p>
            <h2>Des actions fortes</h2>
            <ul>
                <li>ANIMATIONS FESTIVES : pour illuminer la vie du quartier toute l’année</li>
                <li>DES RENCONTRES PROFESSIONNELLES : pour étudier des actions de fond ensemble</li>
                <li>UN JOURNAL DE QUARTIER : pour une information de proximité</li>
                <li>UN QUARTIER CONNECTÉ : pour une meilleure synergie locale</li>
                <li>UN PROJET D’ECONOMIE CIRCULAIRE</li>
            </ul>
            <Form>
                <form ref={form as any} onSubmit={send}>
                    <h2>Contact</h2>
                    <label>Name</label>
                    <input type="text" name="user_name" onChange={(e)=>setName(e.target.value)} value={name} />
                    <label>Email</label>
                    <input type="email" name="user_email" onChange={(e)=>setEmail(e.target.value)} value={email} />
                    <label>Message</label>
                <textarea name="message" onChange={(e)=>setMessage(e.target.value)} value={message} />
                <input type="submit" value="Envoyé" />
                </form>
                {confirm && <p className='valider'>Votre message c'est bien envoyé</p>}
                {error && <p className='error'>{error}</p>}
            </Form>
        </ACPBcontain>
    )
}