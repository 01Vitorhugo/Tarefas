import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"

//Minhas conf do Firebase.
const firebaseConfig = {
    apiKey: "AIzaSyAgcNLXwwq6IrAY__Dekj-S83GLCm_9TgQ",
    authDomain: "curso-react-cebf9.firebaseapp.com",
    projectId: "curso-react-cebf9",
    storageBucket: "curso-react-cebf9.appspot.com",
    messagingSenderId: "447699125387",
    appId: "1:447699125387:web:90b5b5904cc222a522008e",
    measurementId: "G-J6TTL8QKQB"
  };

  //Estamos inicializando a nossa configuracao.
  const firebaseApp = initializeApp(firebaseConfig);

  //Passamos a conf para ser inicializada com o Firestore.
  const db = getFirestore(firebaseApp);
  const auth = getAuth(firebaseApp)

  //exportamos para usar.
  export { db , auth};