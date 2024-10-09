import { ChangeEvent } from 'react';
import customStyles from './index.module.css'
interface TextInputProps {
    name: string;
    placeholder: string;
    type: 'email' | 'password' | 'text';
    handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
const TextInput = ({name,placeholder,type,handleChange}:TextInputProps)=>{
    return <input className={customStyles.textInput} name={name} type={type} placeholder={placeholder} onChange={handleChange}/>
}
export default TextInput;