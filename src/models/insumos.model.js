import Conexion from '../config/db.js';

export const CrearInsumo = async (
  nombre,
  tipo,
  stock_litros = 0,
  stock_unidades = 0,
  precio_litro = 0,
  precio_seco = 0
) => {
  const [res] = await Conexion.query(`
    INSERT INTO insumos_base (
      nombre, tipo, stock_litros, stock_unidades, precio_litro, precio_seco
    ) VALUES (?, ?, ?, ?, ?, ?)
  `, [
    nombre,
    tipo,
    stock_litros,
    stock_unidades,
    precio_litro,
    precio_seco
  ]);
  return res.insertId;
};


export const ObtenerInsumoPorId = async (id) => {
  const [rows] = await Conexion.query(`SELECT * FROM insumos_base WHERE id = ?`, [id]);
  return rows[0];
};

export const DescontarLitros = async (id, litros) => {
  await Conexion.query(`UPDATE insumos_base SET stock_litros = stock_litros - ? WHERE id = ?`, [litros, id]);
};


export const ActualizarStockInsumo = async (id, cantidadDescontar) => {
  await Conexion.query(`
    UPDATE insumos_base SET stock_litros = stock_litros - ?
    WHERE id = ?
  `, [cantidadDescontar, id]);
};

export const DescontarStockUnidades = async (id, unidades) => {
  await Conexion.query(
    `UPDATE insumos_base SET stock_unidades = stock_unidades - ? WHERE id = ?`,
    [unidades, id]
  );
};
