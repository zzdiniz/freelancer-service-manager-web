import { ReactNode } from "react";
import { Link } from "react-router-dom";
import customStyles from './index.module.css'

interface LinkCustomProps{
    children: ReactNode,
    to: string
}
const LinkCustom = ({children,to}:LinkCustomProps) =>{
    return (
        <Link className={customStyles.link} to={to}>{children}</Link>
    )
}

export default LinkCustom;