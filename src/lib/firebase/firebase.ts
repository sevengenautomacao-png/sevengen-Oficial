// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  projectId: "demoproject-1234",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Em modo de desenvolvimento, poderíamos conectar ao emulador do Firestore se ele estiver rodando.
// Para este ambiente, vamos conectar diretamente a uma instância de demonstração se não estivermos em produção.
if (process.env.NODE_ENV !== 'production') {
    try {
        connectFirestoreEmulator(db, 'localhost', 8080);
    } catch (error) {
        console.log("Firestore Emulator not running, using cloud instance for demo.");
    }
}
