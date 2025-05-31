import { Router } from "express";
import {
  CrearEnvaseController,
  CrearInsumoController,
  VerEnvasesController,
  VerInsumosController,
  EditarInsumoController,
  EditarEnvaseController,
  EliminarInsumoController,
  EliminarEnvaseController
} from "../../controllers/amacen.controllers.js";

const almacen = Router();

almacen.post("/create-envases", CrearEnvaseController); // Crear Envases
almacen.post("/create-insumos", CrearInsumoController); // Crear Insumos

almacen.get('/insumos', VerInsumosController); // Ver Insumos
almacen.get('/envases', VerEnvasesController); // Ver Envases 

almacen.put('/insumos-up/:id', EditarInsumoController); // Modificar Insumos
almacen.put('/envases-up/:id', EditarEnvaseController); // Modificar Envases 

almacen.delete('/insumos-del/:id', EliminarInsumoController); // Eliminar Insumos
almacen.delete('/envases-del/:id', EliminarEnvaseController); // Eliminar Envses 

export default almacen;
