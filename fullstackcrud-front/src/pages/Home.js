import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DeleteUser from '../users/DeleteUser'; // Importa il componente DeleteUser

export default function Home() {
  const [users, setUsers] = useState([]); // Lista di utenti
  const [filteredUsers, setFilteredUsers] = useState([]); // Lista di utenti filtrata
  const [currentPage, setCurrentPage] = useState(1); // Pagina corrente
  const [recordsPerPage, setRecordsPerPage] = useState(5); // Record per pagina
  const [totalUsers, setTotalUsers] = useState(0); // Totale utenti
  const [searchQuery, setSearchQuery] = useState(''); // Stato per la ricerca

  // Funzione per caricare gli utenti
  const loadUsers = async () => {
    try {
      const result = await axios.get("http://localhost:8080/users/all");
      setUsers(result.data);
      setTotalUsers(result.data.length); // Impostiamo il totale degli utenti
      setFilteredUsers(result.data); // Imposta la lista degli utenti filtrata
    } catch (error) {
      console.error("Errore nel caricamento degli utenti", error);
    }
  };

  useEffect(() => {
    loadUsers(); // Carica gli utenti all'inizio
  }, []);

  // Funzione per ricaricare gli utenti dopo una cancellazione
  const reloadUsers = () => {
    loadUsers(); // Ricarica la lista degli utenti
  };

  // Funzione per calcolare gli utenti da mostrare in base alla pagina
  const indexOfLastUser = currentPage * recordsPerPage;
  const indexOfFirstUser = indexOfLastUser - recordsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Funzione per navigare tra le pagine
  const nextPage = () => {
    if (currentPage * recordsPerPage < totalUsers) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Funzione per cambiare il numero di record per pagina
  const handleRecordsPerPageChange = (e) => {
    setRecordsPerPage(Number(e.target.value)); // Imposta il numero di record per pagina
    setCurrentPage(1); // Resetta alla prima pagina quando si cambia il numero di record per pagina
  };

  // Funzione per gestire la ricerca
  const handleSearch = (e) => {
    setSearchQuery(e.target.value); // Aggiorna il termine di ricerca
    const filtered = users.filter(user => 
      user.nome.toLowerCase().includes(e.target.value.toLowerCase()) || 
      user.cognome.toLowerCase().includes(e.target.value.toLowerCase()) || 
      user.email.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredUsers(filtered); // Filtra gli utenti in base al termine di ricerca
    setCurrentPage(1); // Resetta alla prima pagina quando si effettua una ricerca
  };

  return (
    <div className="container">
      <div className="py4">
        <div className="d-flex justify-content-between mb-3">
          <h3>Utenti</h3>

          {/* Selettore per i record per pagina */}
          <select 
            className="form-select w-auto"
            value={recordsPerPage} 
            onChange={handleRecordsPerPageChange}
          >
            <option value={5}>5 per pagina</option>
            <option value={10}>10 per pagina</option>
            <option value={15}>15 per pagina</option>
          </select>

          {/* Campo di ricerca */}
          <input
            type="text"
            className="form-control w-auto"
            placeholder="Cerca per nome, cognome o email"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

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
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <th scope="row">{user.id}</th>
                <td>{user.nome}</td>
                <td>{user.cognome}</td>
                <td>{user.email}</td>
                <td>
                  <Link type="button" className="btn btn-primary mx-2" to={`/userdetail/${user.id}`}>
                    View
                  </Link>
                  <Link
                    type="button"
                    className="btn btn-secondary mx-2"
                    to={`/edituser/${user.id}`}
                  >
                    Edit
                  </Link>

                  <DeleteUser
                    id={user.id}
                    nome={user.nome}
                    cognome={user.cognome}
                    reloadUsers={reloadUsers}
                  /> {/* Usa il componente DeleteUser */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Paginazione */}
        <div className="pagination">
          <button onClick={prevPage} className="btn btn-outline-secondary" disabled={currentPage === 1}>
            Indietro
          </button>
          <span>{`Pagina ${currentPage}`}</span>
          <button onClick={nextPage} className="btn btn-outline-secondary" disabled={currentPage * recordsPerPage >= filteredUsers.length}>
            Avanti
          </button>
        </div>
      </div>
    </div>
  );
}
