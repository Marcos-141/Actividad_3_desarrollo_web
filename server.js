const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const connectDB = require('./config/db.js');
const experienceRoutes = require('./routes/experienceRoutes.js');

dotenv.config();

// Conectar a la base de datos MongoDB
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Configuración de OpenAPI / Swagger
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Hoja de Vida - Experiencias Profesionales',
            version: '1.0.0',
            description: 'Interfaz de pruebas interactiva con Swagger para la gestión CRUD de experiencias profesionales.'
        },
        servers: [
            {
                url: 'http://localhost:5000/api',
                description: 'Servidor Local'
            }
        ]
    },
    apis: ['./routes/experienceRoutes.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Definición de Rutas API
app.use('/api/experiences', experienceRoutes);

app.get('/', (req, res) => {
    res.send('API REST activa. Accede a las pruebas interactivas en <a href="/api-docs">/api-docs</a>');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
    console.log(`Documentación y Pruebas Swagger UI en: http://localhost:${PORT}/api-docs`);
});