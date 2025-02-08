import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DeleteUser from '../users/DeleteUser'; // Importa il componente DeleteUser

export default function Home() {
  const [users, setUsers] = useState([]);

  // Funzione per caricare gli utenti
  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/users/all");
    setUsers(result.data);
  };

  useEffect(() => {
    loadUsers(); // Carica gli utenti all'inizio
  }, []);

  // Funzione per ricaricare gli utenti dopo una cancellazione
  const reloadUsers = () => {
    loadUsers(); // Ricarica la lista degli utenti
  };

  return (
    <div className="container">
      <div className="py4">
        <table className="table border shadow">
          <thead>
            <tr><th colSpan={5}><h3>utenti</h3></th></tr>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Nome</th>
              <th scope="col">Cognome</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <th scope="row">{user.id}</th>
                <td>{user.nome}</td>
                <td>{user.cognome}</td>
                <td>{user.email}</td>
                <td>
                  <button type="button" className="btn btn-primary mx-2">
                    View
                  </button>
                  <Link
                    type="button"
                    className="btn btn-secondary mx-2"
                    to={`/edituser/${user.id}`}
                  >
                    Edit
                  </Link>
           
                  <DeleteUser id={user.id} nome={user.nome} cognome={user.cognome} reloadUsers={reloadUsers} /> {/* Usa il componente DeleteUser */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
