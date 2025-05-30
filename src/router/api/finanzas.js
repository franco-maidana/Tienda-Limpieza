import { Router } from "express";
import {
  EliminarGastoController,
  ActualizarGastoController,
  CrearGastoManualController,
  ListarGastosController,
  ObtenerGastoPorIdController,
  GastosMensualesController,
  ResumenGastosAnualesController
} from "../../controllers/finanzas.controllers.js";

const finanzas = Router();

finanzas.delete("/eliminar/:id", EliminarGastoController);  // Eliminamos gasto
finanzas.post('/gastos/manual', CrearGastoManualController); // creamos gastos
finanzas.get("/gastos", ListarGastosController);  // listamos gastos
finanzas.get('/gastos/mensuales', GastosMensualesController); // me dice los gastos mensuales 
finanzas.get('/gastos/resumen', ResumenGastosAnualesController); // me dice el gasto anual
finanzas.get("/gastos/:id", ObtenerGastoPorIdController);  // listamos gastos por id
finanzas.put("/upDate/:id", ActualizarGastoController); // Modificar Gastos

export default finanzas;
