const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mainRouter = require('./src/routes/index.js');
const dbConnection = require('./knexfile.js');

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

// Configuración de middleware
app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Prueba de conexión a la base de datos
dbConnection.raw('SELECT 1+1 AS result')
    .then(() => {
        console.log('Database connection established successfully');
    })
    .catch((err) => {
        console.error('Database connection failed:', err);
    });

// Rutas de la API
app.use('/api', mainRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

