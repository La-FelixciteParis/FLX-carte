//Renvoie un input avec un label

//Import du type
import { InputType } from "../Types/Input_TextArea"


export const Input = ({text,type,onChange,value}:InputType)=>{
    return(
        <>
            <label htmlFor={text}>{text}</label>
            <input type={type} placeholder={`${text}...`} value={value} onChange={onChange}/>
        </>
    )
}