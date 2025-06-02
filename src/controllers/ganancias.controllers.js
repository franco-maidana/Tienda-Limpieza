import {
  GetComparativaAnualService,
  GetComparativaMensualService,
  GetGananciaByIdService,
  GetGananciasAnioService,
  GetGananciasMesService,
  GetGananciasService
} from "../services/ganancias.service.js";

export const ObtenerGanancias = async (req, res) => {
  const data = await GetGananciasService();
  res.json(data);
};

export const ObtenerGananciaPorId = async (req, res) => {
  const { id } = req.params;
  const data = await GetGananciaByIdService(id);
  if (!data) return res.status(404).json({ msg: 'Ganancia no encontrada' });
  res.json(data);
};

export const ObtenerGananciasMes = async (req, res) => {
  const data = await GetGananciasMesService();
  res.json(data);
};

export const ObtenerGananciasAnio = async (req, res) => {
  const data = await GetGananciasAnioService();
  res.json(data);
};

export const ObtenerComparativaMensual = async (req, res) => {
  const data = await GetComparativaMensualService();
  res.json(data);
};

export const ObtenerComparativaAnual = async (req, res) => {
  const data = await GetComparativaAnualService();
  res.json(data);
};