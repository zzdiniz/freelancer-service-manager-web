import { ReactNode } from 'react';
import customStyles from './index.module.css'

interface ButtonProps{
    children: ReactNode;
    type?: "button" | "submit";
    onClick?: () => void
}
const Button = ({children,type="submit",onClick}:ButtonProps) =>{
    return (
        <button type={type} className={customStyles.button} onClick={onClick}>{children}</button>
    )
}

export default Button;