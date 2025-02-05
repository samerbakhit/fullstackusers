
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Container, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export default function Studenti() {
  const [nome, setNome] = React.useState("");
  const [cognome, setCognome] = React.useState("");
  const [anni, setAnni] = React.useState("");
  const [errors, setErrors] = React.useState({});
  const [students, setStudents] = React.useState([]);

  const paperStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };

  const validate = () => {
    const newErrors = {};
    if (!nome) newErrors.nome = "Il nome è obbligatorio";
    if (!cognome) newErrors.cognome = "Il cognome è obbligatorio";
    if (!anni) {
      newErrors.anni = "L'età è obbligatoria";
    } else if (isNaN(anni) || anni <= 0) {
      newErrors.anni = "Inserisci un numero valido per l'età";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clickMe = (e) => {
    e.preventDefault();
    if (validate()) {
      const studente = { nome, cognome, anni };
      console.log(studente);
      fetch("http://localhost:8080/studenti/add", {
        method: "POST",
        headers: { "Content-Type": "Application/json" },
        body: JSON.stringify(studente),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Nuovo Studente Aggiunto");
          setStudents([data, ...students]);
          setNome('');
          setCognome('');
          setAnni('');
        })
        .catch((error) => {
          console.error("Errore durante l'aggiunta dello studente:", error);
        });
    }
  };

  React.useEffect(() => {
    fetch("http://localhost:8080/studenti/lista")
      .then((res) => res.json())
      .then((result) => {
        setStudents(result);
      });
  }, []);

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <Box
          component="form"
          sx={{ "& > :not(style)": { m: 1, width: "30ch" } }}
          noValidate
          autoComplete="off"
        >
          <h1 style={{ color: "blue" }}>
            <u>Nuovo Studente</u>
          </h1>
          <TextField
            id="nome"
            label="Nome"
            variant="outlined"
            fullWidth
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            error={!!errors.nome}
            helperText={errors.nome}
          />
          <br />
          <TextField
            id="cognome"
            label="Cognome"
            variant="outlined"
            fullWidth
            value={cognome}
            onChange={(e) => setCognome(e.target.value)}
            error={!!errors.cognome}
            helperText={errors.cognome}
          />
          <br />
          <TextField
            id="anni"
            label="Anni"
            variant="outlined"
            fullWidth
            value={anni}
            onChange={(e) => setAnni(e.target.value)}
            error={!!errors.anni}
            helperText={errors.anni}
          />
          <br />
          <Button variant="contained" color="secondary" onClick={clickMe}>
            Submit
          </Button>
        </Box>
      </Paper>

      <Container>
        <Paper elevation={3} style={{ padding: "50px 20px", width: 600, margin: "20px auto" }}>
          <h1 style={{ color: "blue" }}>
            <u>Lista Studenti</u>
          </h1>
          <TableContainer component={Paper}>
            <Table aria-label="lista studenti">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nome</TableCell>
                  <TableCell>Cognome</TableCell>
                  <TableCell>Anni</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map((studente) => (
                  <TableRow key={studente.id}>
                    <TableCell>{studente.id}</TableCell>
                    <TableCell>{studente.nome}</TableCell>
                    <TableCell>{studente.cognome}</TableCell>
                    <TableCell>{studente.anni}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </Container>
  );
}