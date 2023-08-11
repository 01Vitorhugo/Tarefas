import { useState } from 'react';
import './home.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../Connect-Firebase/index'
import { signInWithEmailAndPassword } from 'firebase/auth';

function Home() {
  const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');


   async function Login(e){
        //para nao atualizar a pagina
        e.preventDefault();
        
        //verificando se o email e senha esta diferente de vazio
        if(email !== '' && senha !== ''){
          await signInWithEmailAndPassword(auth, email, senha)
          .then(()=>{
            navigate('/admin', {replace: true});

          })
          .catch((error)=>{
            alert('Erro ao navegar')
          })
            
        }else{
            alert('Preencha todos os campos')
        }
        
    }
  return (
    <div className="container">
      <h1>Tarefas</h1>
      <span>Gerencie suas tarefas</span>

      <form className='form' onSubmit={Login}>
        <input 
        type="text"
        placeholder='Digite seu email..' 
        value={email}
        onChange={(e)=> setEmail(e.target.value)}/>

        <input type="password"
        placeholder='Digite seu senha..' 
        value={senha}
        onChange={(e)=> setSenha(e.target.value)} />

        <button type='submit'>Entrar</button>
      </form>
      <p>Não tem conta? <Link to="/registro">Cadastre-se</Link></p>
      
    
    </div>
  );
}

export default Home;
