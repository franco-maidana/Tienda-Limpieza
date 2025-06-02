import { Router } from "express";
import {
  ObtenerComparativaAnual,
  ObtenerComparativaMensual,
  ObtenerGananciaPorId,
  ObtenerGanancias,
  ObtenerGananciasAnio,
  ObtenerGananciasMes
} from "../../controllers/ganancias.controllers.js";

const ganancias = Router();

ganancias.get('/', ObtenerGanancias);
ganancias.get('/:id', ObtenerGananciaPorId);
ganancias.get('/mes/actual', ObtenerGananciasMes);
ganancias.get('/anio/actual', ObtenerGananciasAnio);
ganancias.get('/comparativa/mensual', ObtenerComparativaMensual);
ganancias.get('/comparativa/anual', ObtenerComparativaAnual);

export default ganancias;
