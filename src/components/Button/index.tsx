import { ReactNode } from 'react';
import customStyles from './index.module.css'

interface ButtonProps{
    children: ReactNode
}
const Button = ({children}:ButtonProps) =>{
    return (
        <button className={customStyles.button}>{children}</button>
    )
}

export default Button;