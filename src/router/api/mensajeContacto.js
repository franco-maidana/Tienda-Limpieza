import { Router } from "express";
import {
  enviarMensaje,
  listarConversacion,
  listarMensajesIniciales,
  responderMensaje,
  listarNoLeidos,
  marcarLeido
} from "../../controllers/mensajeContacto.controllers.js";

const mensajeContacto = Router();

mensajeContacto.post("/enviar", enviarMensaje); // crear nuevo o respuesta
mensajeContacto.get("/listado", listarMensajesIniciales); // solo mensajes raíz
mensajeContacto.get('/mensajes/no-leidos', listarNoLeidos); // mensajes no leidos
mensajeContacto.post('/mensajes/:id/responder', responderMensaje); // responder mensaje
mensajeContacto.get("/listado/:id/conversacion", listarConversacion); // obtener hilo completo
mensajeContacto.put('/mensajes/:id/marcar-leido', marcarLeido); // mensajes leeidos

export default mensajeContacto;
