import { useEffect, useState } from 'react';
import './admin.css'
import { auth } from '../../Connect-Firebase/index';
import { db } from '../../Connect-Firebase/index';
import { signOut } from 'firebase/auth';
import {
    addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
    where, 
    doc,
    deleteDoc,
    updateDoc

} from "firebase/firestore"

function Admin() {
    const [tarefa, setTarefa] = useState('');
    const [listas, setListas] = useState([]);
    const [user, setUser] = useState({})

    const [edite, setEdite] = useState({});

    useEffect(() => {
        async function LoadTarefas() {
            const userCli = localStorage.getItem("@Detalhes")
            setUser(JSON.parse(userCli));

            if (userCli) {
                const data = JSON.parse(userCli);

                const ref = collection(db, "tarefas")
                const q = query(ref, orderBy("create", "desc"), where("userUid", "==", data?.uid))
                const unsub = onSnapshot(q, (snapshot) => {

                    let lista = [];

                    snapshot.forEach((doc) => {
                        lista.push({
                            id: doc.id,
                            tarefa: doc.data().tarefa,
                            userUid: doc.data().userUid
                        })
                    })
                    setListas(lista);

                })


            }
        }
        LoadTarefas();
    }, [])

    async function AddTarefa(e) {
        e.preventDefault();

        if (tarefa === '') {
            alert('Escreva uma tarefa..')
            return;
        }

        // verificando se tem um id no imput quando ele é chamado para editar uma tarefa, se tiver ele chama a funcao UpdateRegistro.
        if(edite?.id){
            UpdateRegistro();
            return;
        }
        await addDoc(collection(db, "tarefas"), {
            tarefa: tarefa,
            create: new Date(),
            userUid: user?.uid
        })
            .then(() => {
                setTarefa('');
            })
            .catch(() => {
                console.log('error')
            })


    }
    async function Sair() {
        await signOut(auth)

    }

    async function Delete(id){
        const docRef = doc(db, "tarefas", id)
        await deleteDoc(docRef);
    }

    async function Edite(item){
       setTarefa(item.tarefa)
       setEdite(item);
    }
    async function UpdateRegistro(){
        const docRef = doc(db, "tarefas", edite?.id)
        await updateDoc(docRef, {
            tarefa: tarefa
        })
        .then(()=>{
            setTarefa('');
            setEdite('');
        })
        .catch(()=>{
            alert('Erro ao atualizar');
        })


    }
    
    return (
        <div className='container-tarefas'>
            <h1>Minhas tarefas</h1>

            <form className="form" onSubmit={AddTarefa}>
                <textarea
                    placeholder='Digite sua tarefa...'
                    value={tarefa}
                    onChange={(e) => setTarefa(e.target.value)}
                />

                {/* Estamos verificando se  o objeto(edite) é maio que 0 para trocar o que tem escrito no Btn */}
                {Object.keys(edite).length > 0 ?(
                    <button type='submit'>Atualizar tarefa</button>    
                ) : (
                    <button type='submit'>Registrar tarefa</button>
                )}
                
            </form>

            {listas.map((item) => (
                <article key={item.id}>
                    <p>{item.tarefa}</p>
                    <div>
                        <button className='btn-editar' onClick={ ()=> Edite(item)} >Editar</button>
                        <button className='btn-concluir' onClick={ ()=> Delete(item.id)}>Concluir</button>
                    </div>
                </article>
            ))}

            <button className='btn-sair' onClick={Sair}>Sair</button>

        </div>
    )
}
export default Admin;