import {
  ObtenerGananciasTotales,
  ObtenerGananciaPorId,
  ObtenerGananciasDelMes,
  ObtenerComparativaMensual,
  ObtenerComparativaAnual,
  ObtenerGananciasDelAnio
} from "../models/ganancias.model.js";

export const GetGananciasService = () => ObtenerGananciasTotales();
export const GetGananciaByIdService = (id) => ObtenerGananciaPorId(id);
export const GetGananciasMesService = () => ObtenerGananciasDelMes();
export const GetGananciasAnioService = () => ObtenerGananciasDelAnio();
export const GetComparativaMensualService = () => ObtenerComparativaMensual();
export const GetComparativaAnualService = () => ObtenerComparativaAnual();