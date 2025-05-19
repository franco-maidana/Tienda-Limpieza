import Conexion from '../config/db.js'

export const ObtenerProductoPorId = async (producto_id) => {
  const [rows] = await Conexion.query(
    `SELECT * FROM productos_limpieza WHERE id = ?`,
    [producto_id]
  );
  return rows[0];
};

export const DescontarStock = async (producto_id, cantidad) => {
  await Conexion.query(
    `UPDATE productos_limpieza SET stock = stock - ? WHERE id = ?`,
    [cantidad, producto_id]
  );
};

export const ObtenerCarritoPendientePorUsuario = async (usuario_id) => {
  const [rows] = await Conexion.query(
    `SELECT 
      o.id,
      o.producto_id,
      p.nombre AS producto_nombre,
      o.cantidad,
      o.precio_unitario,
      o.subtotal
    FROM ordenes_simplificadas o
    JOIN productos_limpieza p ON o.producto_id = p.id
    WHERE o.usuario_id = ? AND o.estado = 'pendiente'`,
    [usuario_id]
  );
  return rows;
};

export const MarcarOrdenesComoPagadas = async (usuario_id) => {
  await Conexion.query(
    `UPDATE ordenes_simplificadas
     SET estado = 'pagado'
     WHERE usuario_id = ? AND estado = 'pendiente'`,
    [usuario_id]
  );
};

export const ActualizarEnvioYMantenimiento = async (id, envio, mantenimiento) => {
  await Conexion.query(
    `UPDATE ordenes_simplificadas
     SET envio = ?, mantenimiento = ?
     WHERE id = ?`,
    [envio, mantenimiento, id]
  );
};

export const InsertarOrdenSimplificada = async (
  usuario_id,
  producto_id,
  cantidad,
  precio_unitario,
  total
) => {
  await Conexion.query(
    `INSERT INTO ordenes_simplificadas 
     (usuario_id, producto_id, cantidad, precio_unitario, envio, mantenimiento, total, estado)
     VALUES (?, ?, ?, ?, 0, 0, ?, 'pendiente')`,
    [usuario_id, producto_id, cantidad, precio_unitario, total]
  );
};

// Modificar
export const ModificarCantidadProductoCarritoPorProducto = async (usuario_id, producto_id, nuevaCantidad) => {
  await Conexion.query(
    `UPDATE ordenes_simplificadas
      SET cantidad = ?
      WHERE usuario_id = ? AND producto_id = ? AND estado = 'pendiente'`,
    [nuevaCantidad, usuario_id, producto_id]
  );
};

// Eliminar 

export const EliminarProductoDelCarrito = async (usuario_id, producto_id) => {
  await Conexion.query(
    `DELETE FROM ordenes_simplificadas 
      WHERE usuario_id = ? AND producto_id = ? AND estado = 'pendiente'`,
    [usuario_id, producto_id]
  );
};

export const VaciarCarritoUsuario = async (usuario_id) => {
  await Conexion.query(
    `DELETE FROM ordenes_simplificadas 
      WHERE usuario_id = ? AND estado = 'pendiente'`,
    [usuario_id]
  );
};


export const BuscarProductoEnCarrito = async (usuario_id, producto_id) => {
  const [rows] = await Conexion.query(
    `SELECT * FROM ordenes_simplificadas 
      WHERE usuario_id = ? AND producto_id = ? AND estado = 'pendiente'`,
    [usuario_id, producto_id]
  );
  return rows[0];
};

export const ActualizarCantidadExistente = async (orden_id, nuevaCantidad) => {
  await Conexion.query(
    `UPDATE ordenes_simplificadas 
      SET cantidad = ?
      WHERE id = ?`,
    [nuevaCantidad, orden_id]
  );
};




