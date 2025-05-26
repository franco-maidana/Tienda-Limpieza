import Conexion from '../config/db.js';

export const RegistrarGasto = async (categoria, descripcion, monto) => {
  await Conexion.query(
    `INSERT INTO gastos_totales (categoria, descripcion, monto) VALUES (?, ?, ?)`,
    [categoria, descripcion, monto]
  );
};

export const ActualizarBalance = async () => {
  // Obtener el último ingreso real (última venta, último cobro)
  const [[ultimaGanancia]] = await Conexion.query(`
    SELECT total_general FROM ganancias_totales
    ORDER BY id DESC
    LIMIT 1
  `);

  const ingresos = ultimaGanancia?.total_general || 0;

  // Sumar todos los gastos acumulados
  const [[{ gastos = 0 }]] = await Conexion.query(`
    SELECT SUM(monto) AS gastos FROM gastos_totales
  `);

  const balance = ingresos - gastos;

  // Actualizar o insertar fila única en balance_actual
  const [[existe]] = await Conexion.query(`SELECT id FROM balance_actual WHERE id = 1`);

  if (existe) {
    await Conexion.query(`
      UPDATE balance_actual
      SET total_ingresos = ?, total_gastos = ?, balance = ?, fecha = CURRENT_TIMESTAMP
      WHERE id = 1
    `, [ingresos, gastos, balance]);
  } else {
    await Conexion.query(`
      INSERT INTO balance_actual (id, total_ingresos, total_gastos, balance)
      VALUES (1, ?, ?, ?)
    `, [ingresos, gastos, balance]);
  }
};

export const EliminarGastoPorProducto = async (nombre_producto) => {
  await Conexion.query(
    `DELETE FROM gastos_totales 
      WHERE categoria = 'Reposición' AND descripcion LIKE ?`,
    [`%Alta de producto "${nombre_producto}"%`]
  );
};

