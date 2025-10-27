// Importe as funções do Firebase que você precisa
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

// TODO: Adicione a configuração do seu projeto Firebase aqui
// Sua configuração do Firebase, agora preenchida.
const firebaseConfig = {
  apiKey: "AIzaSyCPXO1VF-BX8JTVTatK10eFa7hPBiYV0lQ",
  authDomain: "banco-de-dados-hr-4b2bf.firebaseapp.com",
  projectId: "banco-de-dados-hr-4b2bf",
  storageBucket: "banco-de-dados-hr-4b2bf.appspot.com",
  messagingSenderId: "513640375419",
  appId: "1:513640375419:web:c4289f7417020011256ede",
  measurementId: "G-1ZX3KRK365"
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);
// Exporte a instância do Firestore para ser usada em outros scripts
export const db = getFirestore(app);
