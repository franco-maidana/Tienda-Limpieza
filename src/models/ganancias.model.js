import Conexion from '../config/db.js';

export const RegistrarGananciaLocal = async (total_productos) => {
  const total_mantenimiento = 0;
  const total_envio = 0;
  const total_general = total_productos + total_mantenimiento + total_envio;

  await Conexion.query(`
    INSERT INTO ganancias_totales 
    (total_productos, total_mantenimiento, total_envio, total_general)
    VALUES (?, ?, ?, ?)
  `, [total_productos, total_mantenimiento, total_envio, total_general]);
};


