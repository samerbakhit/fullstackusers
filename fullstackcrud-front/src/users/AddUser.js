import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function AddUser() {
    let navigate=useNavigate()

const[user,setUser]=useState({
    nome:"",
    cognome:"",
    email:""

    })
    const{nome,cognome,email}=user

const onInputChange = (e)=>{
setUser({...user,[e.target.name]:e.target.value})
}
const onSubmit=async(e)=>{
    e.preventDefault();
   await axios.post("http://localhost:8080/users/add",user)
   navigate("/")
   
   }
  return (
    <div className="container">

        <div className='row'>
            <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                <h2 className='text-center m-4'>Nuovo Utente</h2>
                <form onSubmit={(e)=>onSubmit(e)}>
<div className='mb-3'>

    <label htmlFor='nome' className='form-label'>Nome</label>
    <input 
    type={'text'}
    className='form-control'
     placeholder='Inserire il tuo Nome'
     name="nome"
     value={nome}
     onChange={(e)=>onInputChange(e)}
     required
     />
</div>
<div className='mb-3'>

    <label htmlFor='cognome' className='form-label'>Cognome</label>
    <input 
    type={'text'}
    className='form-control'
     placeholder='Inserire il tuo Cognome'
     name="cognome"
     value={cognome}
     onChange={(e)=>onInputChange(e)}
     required
     />
</div>
<div className='mb-3'>

    <label htmlFor='email' className='form-label'>E-mail</label>
    <input 
    type={'text'}
    className='form-control'
     placeholder='Inserire il tuo Email'
     name="email"
     value={email}
     onChange={(e)=>onInputChange(e)}
     required
     />
</div>
<button type='submit' className='btn btn-outline-primary' >Submit</button>
<Link type='submit' className='btn btn-outline-danger mx-2' to="/">Cancel</Link></form>
            </div>
        </div>
    </div>
  )
}
