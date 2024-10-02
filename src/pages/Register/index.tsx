import Button from '../../components/Button'
import LinkCustom from '../../components/LinkCustom'
import TextInput from '../../components/TextInput'
import customStyles from './index.module.css'
const Register = () =>{
    return (
        <div className={customStyles.registerWrapper}>
            <div className={customStyles.registerContainer}>
                <TextInput placeholder="Digite seu nome" type='email'/>
                <TextInput placeholder="Digite seu email" type='email'/>
                <TextInput placeholder="Digite sua senha" type='password'/>
                <TextInput placeholder="Confirme sua senha" type='password'/>
                <Button>Cadastrar</Button>
                <LinkCustom to="/login">Já possui uma conta? Entre</LinkCustom>
            </div>
        </div>
    )
}
export default Register