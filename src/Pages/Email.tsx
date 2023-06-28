import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Form } from '../Styles/Email';

export const Email = () => {

  const [toName,setToName] = useState<string>('')
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

      setToName('')
      setName('')
      setEmail('')
      setMessage('')
  }

  const send = (e:any) => {
    e.preventDefault();

    setConfirm(false)
    setError(null);
    if(toName==='Thomas-Dev'){
       sendEmail(process.env.REACT_APP_YOUR_TEMPLATE_ID_THOMAS)

    }else if(toName==='Katen'){
      sendEmail(process.env.REACT_APP_YOUR_TEMPLATE_ID_KAREN)
    }else{
      setError("vous n'avez pas choisie de destinataire valide")
      return
    }
  };

  return (
      <Form>
        <form ref={form as any} onSubmit={send}>
        <label>Pour</label>
        <select name='to_name' required onChange={(e)=>setToName(e.target.value)} value={toName}>
          <option value=''>Choisir</option>
          <option value="Thomas-Dev">Dev</option>
          <option value="Karen">Karen</option>
          <option value='erreur'>ERREUR</option>
        </select>
            <label>Name</label>
            <input type="text" name="user_name" onChange={(e)=>setName(e.target.value)} value={name} />
            <label>Email</label>
            <input type="email" name="user_email" onChange={(e)=>setEmail(e.target.value)} value={email} />
            <label>Message</label>
        <textarea name="message" onChange={(e)=>setMessage(e.target.value)} value={message} />
        <input type="submit" value="Send" />
        </form>
        {confirm && <p className='valider'>Votre message c'est bien envoyé</p>}
        {error && <p className='error'>{error}</p>}
      </Form>
  );
};
