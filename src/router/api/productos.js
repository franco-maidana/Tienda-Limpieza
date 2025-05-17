import { Router } from "express";
import upload from "../../utils/multer.js";
import {
  CrearProductoControllers,
  ObtenerTodosLosProductos,
  ActualizarProductoController,
  EliminarProductoControllers,
  DesactivarproductoControllers,
  ObtenerListadoAdmin,
  ReactivarProductoController
} from "../../controllers/productos.controllers.js";

const productos = Router();

productos.post("/create", upload.single("imagen"), CrearProductoControllers);
productos.get("/listar", ObtenerTodosLosProductos);
productos.put("/upDate/:id", ActualizarProductoController);
productos.delete("/delete/:id", EliminarProductoControllers);
productos.put('/desactivar/:id', DesactivarproductoControllers);
productos.get('/admin-listado', ObtenerListadoAdmin);
productos.put('/reactivar/:id', ReactivarProductoController);

export default productos;
