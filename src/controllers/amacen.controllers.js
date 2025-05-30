import {CrearEnvaseConGasto,CrearInsumoConGasto} from '../services/almacen.service.js'

export const CrearInsumoController = async (req, res) => {
  try {
    const {
      nombre,
      tipo, // 'liquido' o 'seco'
      stock_litros = 0,
      stock_unidades = 0,
      precio_litro = 0,
      precio_seco = 0
    } = req.body;

    // Convertir strings numéricos a número real si vienen de Postman
    const insumo_id = await CrearInsumoConGasto({
      nombre,
      tipo,
      stock_litros: parseFloat(stock_litros),
      stock_unidades: parseInt(stock_unidades),
      precio_litro: parseFloat(precio_litro),
      precio_seco: parseFloat(precio_seco)
    });

    return res.status(201).json({
      statusCode: 201,
      message: 'Insumo creado correctamente',
      insumo_id
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error al crear insumo',
      error: error.message
    });
  }
};

export const CrearEnvaseController = async (req, res) => {
  try {
    const { tipo, capacidad_litros, stock, precio_envase } = req.body;
    const id = await CrearEnvaseConGasto(tipo, parseFloat(capacidad_litros), parseInt(stock), parseFloat(precio_envase));

    return res.status(201).json({
      statusCode: 201,
      message: 'Envase creado correctamente',
      envase_id: id
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error al crear envase', error: error.message });
  }
};