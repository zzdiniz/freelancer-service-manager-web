import customStyles from './index.module.css'
interface TextInputProps {
    placeholder: string;
    type: 'email' | 'password' | 'text';
}
const TextInput = ({placeholder}:TextInputProps)=>{
    return <input className={customStyles.textInput} type="text" placeholder={placeholder} />
}
export default TextInput;