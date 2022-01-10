import { useEffect, useState } from "react";
import { getUsers, addUsers,deleteUsers } from "./getData";

const INITIAL_FORM_DATA ={
  Nombre:"",
  Correo:""
}

function App() {
  {/* ------------------ESTADOS------------------ */}
  const [usersData, setUsersData]=useState([]);
  const [dataForm,setDataForm]=useState(INITIAL_FORM_DATA);
  
  useEffect(()=>{
    getUsers()
    .then((data) => {
      console.log(data);
      setUsersData(data);
    })
    .catch((error) => console.log("error"));
  },[])
  {/* ------------------EVENTOS----------------- */}
  const manejarSubmit =(e)=>{
    e.preventDefault();
    addUsers(dataForm).then((id)=>{
      console.log(id);
      setUsersData((prev)=>{
        return[...prev,dataForm]
      })
      setDataForm(INITIAL_FORM_DATA)
    });
  };

  const cambiarNombre=(e)=>{
    setDataForm((prev)=>{
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const manejarDelete=(e)=>{
    console.log(e.target.id);
    deleteUsers(e.target.id).then((id)=>{
      const newUsers = usersData.filter((user)=>{
        return user.id !== id;
      })
      setUsersData(newUsers);
    }) ;
  }
  // console.log(dataForm);
  
  return (
    <div className="App">
      <h1>Firebase tema 2</h1>
      {usersData.map((u)=>{
        return(
          <div key={u.id}>
            <span>{u.Correo}</span>
            <span>{u.Nombre}</span>
            <button 
            className="delete"
            id={u.id}
            onClick={manejarDelete}
            >x</button>
          </div>
        );
      })}
      {/* ------------------formulario------------------ */}

      <form onSubmit={manejarSubmit} >
        <div>
          <span>Nombre</span>
          <input name="Nombre" 
                value={dataForm.Nombre} 
                onChange={cambiarNombre}></input>
        </div>
        <div>
          <span>Email</span>
          <input  name="Correo" 
                  type="email"
                  value={dataForm.Correo} 
                   onChange={cambiarNombre} 
          ></input>
        </div>
        <button>Enviar</button>
      </form>

    </div>
  );
}

export default App;
