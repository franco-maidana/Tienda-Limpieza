import { EliminarGastoYActualizarBalance } from '../services/finanzas.service.js';

export const EliminarGastoController = async (req, res) => {
  try {
    const { id } = req.params;

    const gasto_id = parseInt(id);
    if (isNaN(gasto_id)) {
      return res.status(400).json({ message: "ID de gasto inválido" });
    }

    await EliminarGastoYActualizarBalance(gasto_id);

    return res.status(200).json({
      message: `Gasto con ID ${gasto_id} eliminado correctamente y balance actualizado.`
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error al eliminar gasto",
      error: error.message,
    });
  }
};

