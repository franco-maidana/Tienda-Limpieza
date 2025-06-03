import { Router } from "express";
import {
  ActualizarValoracionController,
  CrearValoracionController,
  EliminarValoracionController,
  ObtenerValoracionesController,
  ObtenerValoracionesPorProductoController,
  ObtenerPromedioEstrellasController,
  ObtenerResumenValoracionesController
} from "../../controllers/valoraciones.controllers.js";

const valoraciones = Router();

valoraciones.post('/crear', CrearValoracionController); // crear
valoraciones.get('/listado', ObtenerValoracionesController); // listado
valoraciones.get('/promedio/:id', ObtenerPromedioEstrellasController); // promedio por producto
valoraciones.get('/producto/:id', ObtenerValoracionesPorProductoController); // valoraciones del producto individuales
valoraciones.get('/resumen/:id', ObtenerResumenValoracionesController); // cuantos votos obtubo en escala
valoraciones.put('/producto-upDate/:id', ActualizarValoracionController);  // Modificar una valoracion 
valoraciones.delete('/producto-del/:id/:usuarios_id', EliminarValoracionController); // Eliminar una valoracion

export default valoraciones;
