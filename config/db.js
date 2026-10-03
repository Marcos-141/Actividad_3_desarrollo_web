const mongoose = require('mongoose');

// Cadena de conexión con Atlas (usa process.env si existe, o la URL directa de respaldo)
const ATLAS_URI = process.env.MONGO_URI || "mongodb+srv://mpicos_db_user:SDs4ewJF0W6obt6l@cluster0.fwcvexl.mongodb.net/hoja_de_vida?appName=Cluster0";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(ATLAS_URI);
        console.log(`MongoDB Atlas Conectado: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error al conectar con MongoDB Atlas: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;