// server/server.js
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3306;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Cambia esto si tu contraseña de MySQL no está vacía
    database: 'Catacionesdevino'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

// Routes
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Verificar si el usuario existe y las credenciales son correctas
    const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
    db.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Error fetching data from MySQL:', err);
            res.status(500).send('Error al verificar los datos en la base de datos');
        } else if (results.length > 0) {
            res.status(200).send('Inicio de sesión exitoso');
        } else {
            res.status(401).send('Credenciales incorrectas');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
