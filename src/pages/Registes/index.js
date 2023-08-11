import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../Connect-Firebase/index'
import { createUserWithEmailAndPassword } from 'firebase/auth';

function Register() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');


   async function Registro(e){
        //para nao atualizar a pagina
        e.preventDefault();
      
        //verificando se o email e senha esta diferente de vazio
        if(email !== '' && senha !== ''){
            await createUserWithEmailAndPassword(auth, email, senha)
            .then(()=>{
              navigate('/admin', {replace: true})

            })
            .catch(()=>{

            })
        }else{
            alert('Preencha todos os campos')
        }
        
    }
  return (
    <div className="container">
      <h1>Cadastro</h1>
      <span>Gerencie suas tarefas</span>

      <form className='form' onSubmit={Registro}>
        <input 
        type="text"
        placeholder='Digite seu email..' 
        value={email}
        onChange={(e)=> setEmail(e.target.value)}/>

        <input type="password"
        placeholder='Digite seu senha..' 
        value={senha}
        onChange={(e)=> setSenha(e.target.value)} />

        <button type='submit'>Cadastrar</button>
      </form>
      <p>Já possui uma conta? <Link to="/">Login</Link></p>
      
    
    </div>
  );
}



export default Register;

