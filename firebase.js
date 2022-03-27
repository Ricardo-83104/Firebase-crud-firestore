  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
  import { addDoc, getDocs, updateDoc, deleteDoc, onSnapshot, doc, getDoc, getFirestore, collection } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js"
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCqB8x_qSL0uN9EGyScYokiNQhY7YMRw-I",
    authDomain: "fir-javascript-crud-c8c7e.firebaseapp.com",
    projectId: "fir-javascript-crud-c8c7e",
    storageBucket: "fir-javascript-crud-c8c7e.appspot.com",
    messagingSenderId: "535109126109",
    appId: "1:535109126109:web:bfc72dc39fd56ee3271834"
  };

  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);

  export const db = getFirestore()

  export const saveTask = (title, description) => {
    addDoc(collection(db, 'tasks'), {title, description});
  }

  export const getTasks = () => getDocs(collection(db, 'tasks'))

  
  export const onGetTasks = (callback) => onSnapshot(collection(db, 'tasks'), callback)

  export const deleteTask = id => deleteDoc(doc(db, 'tasks', id))

  export const getTask = id => getDoc(doc(db, 'tasks', id))


  export const updateTask = (id, newFields) => updateDoc(doc(db, "tasks", id), newFields);