import cookieParser from "cookie-parser";
import express from "express";
import Conexion from "./src/config/db.js";
import dotenv from 'dotenv'
import indexRouter from "./src/router/index.router.js";

dotenv.config();

const server = express();

const PORT = process.env.PORT || 8081


const ready = () => {
  console.log(' Servidor corriendo en el puerto ' + PORT)
  Conexion
}

// Middlewares para procesar JSON y manejar cookies
server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(cookieParser());

// carga de rutas 
server.use('/', indexRouter);
// inicializamos el servidor 
server.listen(PORT, ready);