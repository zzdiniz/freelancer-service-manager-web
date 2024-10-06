import customStyles from "./index.module.css"

interface LoaderProps {
    width: number
}

const Loader = ({width}:LoaderProps) =>{
    return <div className={customStyles.loader} style={{width:`${width}px`}}></div>
}

export default Loader