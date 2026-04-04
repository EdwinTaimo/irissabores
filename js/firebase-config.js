import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAWOjopJgrTxH_4-eNRhZKzJGFyUZ4nRYY",
    authDomain: "irissabores-80c7d.firebaseapp.com",
    databaseURL: "https://irissabores-80c7d-default-rtdb.firebaseio.com",
    projectId: "irissabores-80c7d",
    storageBucket: "irissabores-80c7d.appspot.com",
    messagingSenderId: "109315579624",
    appId: "1:109315579624:web:654388e404b9804e769e6b"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export { ref, set, push, onValue };
