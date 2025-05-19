import { Router } from "express";
import {
  AgregarProductoAlCarritoController,
  ObtenerCarritoDelUsuario,
  ModificarProductoEnCarritoController,
  EliminarProductoCarritoController,
  VaciarCarritoController
} from "../../controllers/ordenes.controllers.js";

const ordenes = Router();

ordenes.post("/create", AgregarProductoAlCarritoController);
ordenes.get("/listado/:usuario_id", ObtenerCarritoDelUsuario);
ordenes.put('/upDate', ModificarProductoEnCarritoController);
ordenes.delete('/destroi/:usuario_id', EliminarProductoCarritoController);
ordenes.delete('/vaciar-carrito/:usuario_id', VaciarCarritoController);

export default ordenes;
