import { Router } from "express";
import {
  AgregarProductoAlCarritoController,
  ObtenerCarritoDelUsuario,
  ModificarProductoEnCarritoController,
  EliminarProductoCarritoController,
  VaciarCarritoController,
  ObtenerOrdenPorGrupoController
} from "../../controllers/ordenes.controllers.js";

const ordenes = Router();

ordenes.post("/create", AgregarProductoAlCarritoController);
ordenes.get("/listado/:usuario_id", ObtenerCarritoDelUsuario);
ordenes.put('/upDate', ModificarProductoEnCarritoController);
ordenes.delete('/destroi/:usuario_id', EliminarProductoCarritoController);
ordenes.delete('/vaciar-carrito/:usuario_id', VaciarCarritoController);
ordenes.get('/obtener/:grupo_orden', ObtenerOrdenPorGrupoController);

export default ordenes;
