//Renvoie un textArea avec son label


//Import type
import { InputType } from "../Types/Input_TextArea"

export const TextArea = ({text,onChange,value,}:InputType)=>{
    return(
        <>
        <label htmlFor={text}>{text}</label>
        <textarea name={text} onChange={onChange} value={value} placeholder={text}/>
        </>

    )
}