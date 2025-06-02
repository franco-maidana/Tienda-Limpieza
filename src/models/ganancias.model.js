import Conexion from '../config/db.js';

export const RegistrarGananciaAcumulada = async ({
  total_productos = 0,
  total_mantenimiento = 0,
  total_envio = 0,
}) => {
  const fecha = new Date();
  const total_nuevo = total_productos + total_mantenimiento + total_envio;

  // ✅ CORREGIDO: resultado está en rows[0]
  const [rows] = await Conexion.query(`
    SELECT total_general FROM ganancias_totales
    ORDER BY id DESC LIMIT 1
  `);

  const total_acumulado_anterior = rows[0]?.total_general || 0;
  const total_general = Number(total_acumulado_anterior) + Number(total_nuevo);


  console.log("🧠 [GANANCIAS] total_anterior:", total_acumulado_anterior);
console.log("🧠 [GANANCIAS] total_nuevo:", total_nuevo);
console.log("🧠 [GANANCIAS] total_general acumulado:", total_general);


  await Conexion.query(`
    INSERT INTO ganancias_totales (
      total_productos,
      total_mantenimiento,
      total_envio,
      total_general,
      fecha
    ) VALUES (?, ?, ?, ?, ?)
  `, [
    total_productos,
    total_mantenimiento,
    total_envio,
    total_general,
    fecha
  ]);
};




