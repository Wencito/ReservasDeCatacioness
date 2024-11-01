import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mainRouter from './src/routes/index.js';  // Ajusta la ruta según la ubicación de tus rutas
import dbConnection from './knexfile.js';  // Importación directa de knexfile.js
dotenv.config();

const PORT = process.env.PORT || 3000;

if (dbConnection) {
    console.log('Database connection established');
}

const app = express();

// Configuraciones de middleware
app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Rutas de la API
app.use('/api', mainRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


