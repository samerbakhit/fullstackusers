import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export default function ViewUser() {
  const [user,setUser]=useState({
nome:"",
cognome:"",
email:""


  })
  const{id}=useParams()

  useEffect(() => {
    loadUser()
  },[]);


  const loadUser = async ()=>{
    const result = await axios.get(`https://samersoft-fkavgddvc9bmhycj.northeurope-01.azurewebsites.net/users/${id}`)
    setUser(result.data)

  }
  return (
    <div className="container">

        <div className='row'>
            <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                <h2 className='text-center m-4'>Utente Detagli</h2>
                
                <div className='card'>
<div className='card-header'>
Detagli del utente id : {user.id}
<ul className='list-group list-group-flush'>

  <li className='list-group-item'>
<b>Nome:</b>
{user.nome}

  </li>
  <li className='list-group-item'>
<b>Cognome:</b>
{user.cognome}


  </li>
  <li className='list-group-item'>
<b>Email:</b>
{user.email}

  </li>
</ul>


</div>

                </div>
               <Link className='btn btn-primary my-2' to={"/"}>Back</Link>
                
                
                
                </div></div></div>
  )
}
