// src/users/DeleteUser.js
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function DeleteUser({ id,nome,cognome, reloadUsers }) {
  let navigate = useNavigate();

  const deleteUser = async () => {
    try {
      await axios.delete(`https://samersoft-fkavgddvc9bmhycj.northeurope-01.azurewebsites.net/users/delete/${id}`);
      reloadUsers(); // Ricarica gli utenti dopo la cancellazione
      navigate("/"); // Naviga alla home o aggiorna la lista degli utenti
    } catch (error) {
      console.error("Errore durante la cancellazione dell'utente:", error);
    }
  };

  const confirmDelete = () => {
    if (window.confirm("Sei sicuro di voler eliminare questo utente con Id: "+ id+" "+nome+" "+cognome)) {
      deleteUser(); // Chiama la funzione per eliminare l'utente
    }
  };

  return (
    <button
      type="button"
      className="btn btn-danger mx-2"
      onClick={confirmDelete} // Quando cliccato, chiede conferma e poi cancella
    >
      Delete 
    </button>
  );
}
