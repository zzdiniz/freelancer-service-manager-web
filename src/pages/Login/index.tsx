import TextInput from '../../components/TextInput'
import customStyles from './index.module.css'
const Login = () =>{
    return (
        <div className={customStyles.loginWrapper}>
            <div className={customStyles.loginContainer}>
                <TextInput placeholder="Digite seu email" />
            </div>
        </div>
    )
}
export default Login