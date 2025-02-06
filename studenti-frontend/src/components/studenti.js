import React, { useEffect, useState } from "react";
import { Box, TextField, Container, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid, Select, MenuItem, InputLabel, FormControl } from "@mui/material";

export default function Studenti() {
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [anni, setAnni] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [students, setStudents] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [studentCount, setStudentCount] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);

  const validate = () => {
    const newErrors = {};
    if (!nome) newErrors.nome = "Il nome è obbligatorio";
    if (!cognome) newErrors.cognome = "Il cognome è obbligatorio";
    if (!email) newErrors.email = "l'email è obbligatorio";
    if (!anni || isNaN(anni) || anni <= 0) newErrors.anni = "Inserisci un numero valido per l'età";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clickMe = (e) => {
    e.preventDefault();
    if (validate()) {
      const studente = { nome, cognome, anni,email };
      const url = editingId ? `http://localhost:8080/studenti/update/${editingId}` : "http://localhost:8080/studenti/add";
      const method = editingId ? "PUT" : "POST";

      fetch(url, {
        method: method,
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify(studente),
      })
        .then((response) => response.json())
        .then(() => {
          fetchStudents();
          setNome("");
          setCognome("");
          setAnni("");
          setEmail("");
          setEditingId(null);
        })
        .catch((error) => console.error("Errore durante l'operazione:", error));
    }
  };

  const handleEdit = (studente) => {
    setNome(studente.nome);
    setCognome(studente.cognome);
    setAnni(studente.anni);
    setEmail(studente.email);
    setEditingId(studente.id);
  };

  const handleDelete = (id, nome, cognome) => {
    if (window.confirm(`Sei sicuro di voler cancellare lo studente ${nome} ${cognome}?`)) {
      fetch(`http://localhost:8080/studenti/delete/${id}`, { method: "DELETE" })
        .then(() => {
          fetchStudents();
        })
        .catch((error) => console.error("Errore durante la cancellazione:", error));
    }
  };

  const fetchStudents = () => {
    fetch("http://localhost:8080/studenti/lista")
      .then((res) => res.json())
      .then((result) => setStudents(result));

    fetch("http://localhost:8080/studenti/count")
      .then((res) => res.json())
      .then((count) => setStudentCount(count));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleNextPage = () => {
    if ((currentPage + 1) * rowsPerPage < studentCount) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = currentPage * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const visibleStudents = students.slice(startIndex, endIndex);

  return (
    <Container>
      <Grid container spacing={2} alignItems="flex-start">
        <Grid item xs={4}>
          <Paper elevation={24} style={{ padding: "20px" }}>
            <Box component="form" sx={{ "& > :not(style)": { m: 1, width: "100%" } }} noValidate autoComplete="off">
              <h2>{editingId ? "Modifica Studente" : "Nuovo Studente"}</h2>
              <TextField
                id="nome"
                label="Nome"
                variant="outlined"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                error={!!errors.nome}
                helperText={errors.nome}
              /><br />
              <TextField
                id="cognome"
                label="Cognome"
                variant="outlined"
                value={cognome}
                onChange={(e) => setCognome(e.target.value)}
                error={!!errors.cognome}
                helperText={errors.cognome}
              /><br />
              <TextField
                id="anni"
                label="Anni"
                variant="outlined"
                value={anni}
                onChange={(e) => setAnni(e.target.value)}
                error={!!errors.anni}
                helperText={errors.anni}
              /><br />
                 <TextField
                id="email"
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
              /><br />
              <Button variant="contained" color="secondary" onClick={clickMe} fullWidth>
                {editingId ? "Modifica" : "Aggiungi"}
              </Button>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={8}>
          <Paper elevation={24} style={{ padding: "20px" }}>
            <h2>Lista Studenti ({studentCount})</h2>
            <FormControl style={{ marginBottom: "2px", minWidth: 140 }}>
              <InputLabel>Record per pagina</InputLabel>
              <Select value={rowsPerPage} onChange={(e) => setRowsPerPage(e.target.value)}>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
              </Select>
            </FormControl>

            <TableContainer component={Paper}>
              <Table aria-label="lista studenti">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Nome</TableCell>
                    <TableCell>Cognome</TableCell>
                    <TableCell>Anni</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Azione</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {visibleStudents.map((studente) => (
                    <TableRow key={studente.id}>
                      <TableCell>{studente.id}</TableCell>
                      <TableCell>{studente.nome}</TableCell>
                      <TableCell>{studente.cognome}</TableCell>
                      <TableCell>{studente.anni}</TableCell>
                      <TableCell>{studente.email}</TableCell>
                      <TableCell>
                        <Button variant="contained" color="primary" onClick={() => handleEdit(studente)}>
                          Modifica
                        </Button>
                        <Button
                          variant="contained"
                          color="error"
                          onClick={() => handleDelete(studente.id, studente.nome, studente.cognome)}
                          style={{ marginLeft: "10px" }}
                        >
                          Cancella
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box display="flex" justifyContent="space-between" marginTop={2}>
              <Button variant="outlined" onClick={handlePreviousPage} disabled={currentPage === 0}>
                Indietro
              </Button>
              <Button variant="outlined" onClick={handleNextPage} disabled={(currentPage + 1) * rowsPerPage >= studentCount}>
                Avanti
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
