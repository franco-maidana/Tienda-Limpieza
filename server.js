import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import Conexion from "./src/config/db.js";
import indexRouter from "./src/router/index.router.js";

dotenv.config();

const server = express();
const PORT = process.env.PORT || 8081;

// Middleware para JSON, formularios y cookies
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());

// Rutas
server.use('/', indexRouter);

// Función que prueba la conexión con una query simple
const ready = async () => {
  try {
    await Conexion.query('SELECT 1'); // test de conexión
    console.log('🟢 Te has conectado a la base de datos');
    console.log('🚀 Servidor corriendo en el puerto ' + PORT);
  } catch (err) {
    console.error('❌ Error al conectar a la base de datos:', err.message);
    process.exit(1);
  }
};

server.listen(PORT, ready);
