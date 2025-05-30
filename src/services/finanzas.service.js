import { EliminarGastoPorId, ActualizarBalance } from '../models/finanzas.models.js';

export const EliminarGastoYActualizarBalance = async (gasto_id) => {
  await EliminarGastoPorId(gasto_id);
  await ActualizarBalance();
};
