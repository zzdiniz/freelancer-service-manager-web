import { ChangeEvent, FormEvent, useContext, useState } from 'react'
import Button from '../../components/Button'
import LinkCustom from '../../components/LinkCustom'
import TextInput from '../../components/TextInput'
import customStyles from './index.module.css'
import { UserContext } from '../../context/UserContext'
const Register = () =>{

    const [user, setUser] = useState({});
    const useAuth = useContext(UserContext);
    const { registerUser } = useAuth();
  
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setUser({ ...user, [name]: value });
    };
    const handleSubimit = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      registerUser(user);
    };
    
    return (
        <div className={customStyles.registerWrapper}>
            <form className={customStyles.registerContainer} onSubmit={handleSubimit}>
                <TextInput handleChange={handleInputChange} name ="name" placeholder="Digite seu nome" type='text'/>
                <TextInput handleChange={handleInputChange} name ="email" placeholder="Digite seu email" type='email'/>
                <TextInput handleChange={handleInputChange} name ="password" placeholder="Digite sua senha" type='password'/>
                <TextInput handleChange={handleInputChange} name ="confirmedPassword" placeholder="Confirme sua senha" type='password'/>
                <Button>Cadastrar</Button>
                <LinkCustom to="/login">Já possui uma conta? Entre</LinkCustom>
            </form>
        </div>
    )
}
export default Register