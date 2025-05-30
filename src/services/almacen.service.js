import {CrearInsumo} from '../models/insumos.model.js'
import {CrearEnvase} from '../models/envases.model.js'
import {RegistrarGasto, ActualizarBalance} from '../models/finanzas.models.js'

export const CrearInsumoConGasto = async (datos) => {
  const {
    nombre,
    tipo,
    stock_litros = 0,
    stock_unidades = 0,
    precio_litro = 0,
    precio_seco = 0
  } = datos;

  // Validación de campos obligatorios
  if (!nombre || !tipo) {
    throw new Error("Faltan campos obligatorios: nombre y tipo");
  }

  // Conversión segura
  const stockLitros = parseFloat(stock_litros) || 0;
  const stockUnidades = parseInt(stock_unidades) || 0;
  const precioLitro = parseFloat(precio_litro) || 0;
  const precioSeco = parseFloat(precio_seco) || 0;

  // Crear el insumo
  const id = await CrearInsumo(
    nombre,
    tipo,
    stockLitros,
    stockUnidades,
    precioLitro,
    precioSeco
  );

  // Registrar gasto si corresponde
  let monto = 0;
  let descripcion = "";

  if (tipo === 'liquido' && stockLitros > 0 && precioLitro > 0) {
    monto = stockLitros * precioLitro;
    descripcion = `Alta de insumo líquido "${nombre}" con ${stockLitros} litros`;
  }

  if (tipo === 'seco' && stockUnidades > 0 && precioSeco > 0) {
    monto = stockUnidades * precioSeco;
    descripcion = `Alta de insumo seco "${nombre}" con ${stockUnidades} unidades`;
  }

  if (monto > 0) {
    await RegistrarGasto("Reposición", descripcion, monto);
    await ActualizarBalance();
  }

  return id;
};

export const CrearEnvaseConGasto = async (tipo, capacidad_litros, stock, precio_envase) => {
  const id = await CrearEnvase(tipo, capacidad_litros, stock, precio_envase);

  if (stock > 0 && precio_envase > 0) {
    const monto = stock * precio_envase;
    const descripcion = `Alta de envases tipo "${tipo}" (${capacidad_litros}L) con ${stock} unidades`;
    await RegistrarGasto('Reposición', descripcion, monto);
    await ActualizarBalance();
  }

  return id;
};