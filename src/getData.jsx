import { getFirestore, collection, getDocs, addDoc, DocumentReference,  doc, deleteDoc} from 'firebase/firestore/lite';
import {app } from "./firebase";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

export const db = getFirestore(app);

// Get a list of cities from your database
//aqui
export async function getUsers() {
  const usersCol = collection(db, "users");
  const usersSnapshot = await getDocs(usersCol);
  const usersList = usersSnapshot.docs.map((doc) => {
    return{
      ...doc.data(),
      id:doc.id
    };
  });
  return usersList;
}

// --------------AGREGAR USUARIOS--------------
export async function addUsers (user){
  try {
    const docRef = await addDoc(collection(db, "users"), user);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    return null;
  }
}
// --------------ELIMINAR USUARIOS--------------
export async function deleteUsers(id) {
  try{
    await deleteDoc(doc(db, "users", id));
    return id;
  }catch(e){
    console.log("Enrror al borrar el item",e);
    return null;
  }
  
}