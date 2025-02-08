import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link,useNavigate } from 'react-router-dom';
export default function Home() {
  let navigate=useNavigate()
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/users/delete/${id}`);
      navigate("/"); // Naviga alla home o aggiorna la lista degli utenti
      loadUsers();
    } catch (error) {
      console.error("Errore durante la cancellazione dell'utente:", error);
    }
  };
    const[users,setUsers]=useState([])

    useEffect(()=>{

    loadUsers();

    },[])

    const loadUsers= async()=>{
    const result =await axios.get("http://localhost:8080/users/all")
    setUsers(result.data);
    }
  return (
    <div className='container'>
        
<div className='py4'>

<table className="table border shadow">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Nome</th>
      <th scope="col">Cognome</th>
      <th scope="col">Email</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
{
users.map((user)=>(
    <tr key={user.id}>
    <th scope="row">{user.id}</th>
    <td>{user.nome}</td>
    <td>{user.cognome}</td>
    <td>{user.email}</td>
    <td>
    <button type="button" class="btn btn-primary mx-2">View</button>
    <Link type="button" class="btn btn-secondary mx-2" to={`/edituser/${user.id}`}>Edit</Link>
    <Link 
  type="button" 
  className="btn btn-danger mx-2" 
  onClick={() => {
    if (window.confirm("Sei sicuro di voler eliminare questo utente con id? "+user.id+" : "+user.nome+" "+user.cognome)) {
      deleteUser(user.id);
    }
  }}
>
  Delete
</Link>

        
    </td>
  </tr>

))

}


  
    
  </tbody>
</table>

</div>


    </div>
  )
}
