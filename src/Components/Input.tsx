import { InputType } from "../Types/Input"

export const Input = ({text,type,onChange}:InputType)=>{
    return(
        <>
            <label htmlFor={text}>{text}</label>
            <input type={type} placeholder={`${text}...`} onChange={onChange}/>
        </>
    )
}