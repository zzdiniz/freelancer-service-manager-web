import Button from '../../components/Button'
import LinkCustom from '../../components/LinkCustom'
import TextInput from '../../components/TextInput'
import customStyles from './index.module.css'
const Login = () =>{
    return (
        <div className={customStyles.loginWrapper}>
            <div className={customStyles.loginContainer}>
                <TextInput placeholder="Digite seu email" type='email'/>
                <TextInput placeholder="Digite sua senha" type='password'/>
                <Button>Login</Button>
                <LinkCustom to="/register">Não tem uma conta? Registre-se</LinkCustom>
            </div>
        </div>
    )
}
export default Login