import TextInput from '../../components/common/TextInput';
import customStyles from './index.module.css'
import Button from '../../components/common/Button';
import { ChangeEvent, FormEvent, useState } from 'react';
import botService from '../../services/botService';
import Loader from '../../components/ui/Loader';

const RegisterBot = () => {
  const [name, setName] = useState("")
  const [qrcode, setQrcode] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setName(value)
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) =>{
    event.preventDefault()
    setIsLoading(true)
    const response = await botService.create(name)
    setIsLoading(false)
    setQrcode(response.image)
  }
  return (
    <div className={customStyles.registerBotWrapper}>
      <div className={customStyles.registerBotContainer}>
        <form className={customStyles.formContainer} onSubmit={handleSubmit}>
          <TextInput name='name' placeholder='Insira o nome do seu bot' type='text' handleChange={handleInputChange}/>
          <Button>Enviar</Button>
        </form>
        <div className={customStyles.imageWrapper}>
          {isLoading?<Loader width={50}/>:<img src={qrcode} alt="qrcode" />}
        </div>
      </div>
    </div>
  );
}

export default RegisterBot;