import { useState, useEffect } from "react";
import { auth } from "../Connect-Firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Navigate } from "react-router-dom";

function Private({ children }){
    const [loading, setLoading] = useState(true);
    const [veri, setVeri] = useState(false);
    
    useEffect(()=> {
        async function Verificar(){
        const login =  onAuthStateChanged(auth, (user) => {
            // se estiver User logado
            if(user){
                const userData = {
                    uid: user.uid,
                    email: user.email,
                }
                localStorage.setItem("@Detalhes", JSON.stringify(userData))

                setLoading(false);
                setVeri(true);
            }else{
                setLoading(false);
                setVeri(false);
            }
        })
        } 
        Verificar();
    }, [])

    if(loading){
        return(
            <div></div>
        )
    }

    if(!veri){
        return(
            <Navigate to="/"/>
        )
    }
    return children;
}
export default Private;