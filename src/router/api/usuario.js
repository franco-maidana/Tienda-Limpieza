import { Router } from "express";
import {
  RegistroUsuario,
  ObtenerTodosLosUsuarios,
  ActualizarDatosUsuario,
  RecuperarPassword,
  ResetearPassword,
  ConfirmarEmail,
  EliminarUsuarioControllers,
  SolicitaBajaUsuario
} from "../../controllers/usuario.controllers.js";

const usuarios = Router();

usuarios.post("/create", RegistroUsuario); // crear usuario
usuarios.get("/listado", ObtenerTodosLosUsuarios); // ver todos los usuarios
usuarios.put("/upDate/:id", ActualizarDatosUsuario); // modificar usuaarios
usuarios.post("/recuperar-password", RecuperarPassword); // recuperar password
usuarios.post("/reset-password", ResetearPassword); // resetear password
usuarios.post("/verificar-email", ConfirmarEmail); // confirmacion email
usuarios.delete('/delete/:id', EliminarUsuarioControllers); // eliminar usuarios
usuarios.post('/solicitar-baja/:id', SolicitaBajaUsuario); // solicitar baja del usuario

export default usuarios;
