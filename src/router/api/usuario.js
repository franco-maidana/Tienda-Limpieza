import { Router } from "express";
import { RegistroUsuario, ObtenerTodosLosUsuarios, ActualizarDatosUsuario, RecuperarPassword, ResetearPassword } from '../../controllers/usuario.controllers.js'

const usuarios = Router()

usuarios.post('/create', RegistroUsuario );
usuarios.get('/listado', ObtenerTodosLosUsuarios);
usuarios.put('/upDate/:id', ActualizarDatosUsuario);
usuarios.post('/recuperar-password', RecuperarPassword);
usuarios.post('/reset-password', ResetearPassword);


export default usuarios