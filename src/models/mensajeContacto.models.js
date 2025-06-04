import Conexion from '../config/db.js'

const MensajeContacto = {
  async crear({ usuario_id, asunto = null, mensaje, mensaje_padre_id = null, remitente }) {
    const sql = `
      INSERT INTO mensaje_contacto (usuario_id, asunto, mensaje, mensaje_padre_id, remitente)
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await Conexion.query(sql, [usuario_id, asunto, mensaje, mensaje_padre_id, remitente]);
    return result.insertId;
  },

  async obtenerPorId(id) {
    const [rows] = await Conexion.query(`SELECT * FROM mensaje_contacto WHERE id = ?`, [id]);
    return rows[0];
  },

  async obtenerConversacion(idRaiz) {
    const [rows] = await Conexion.query(`
      SELECT * FROM mensaje_contacto
      WHERE id = ? OR mensaje_padre_id = ?
      ORDER BY fecha ASC
    `, [idRaiz, idRaiz]);
    return rows;
  },

  async obtenerMensajesIniciales() {
    const [rows] = await Conexion.query(`
      SELECT * FROM mensaje_contacto
      WHERE mensaje_padre_id IS NULL
      ORDER BY fecha DESC
    `);
    return rows;
  },

  async obtenerNoLeidosPorUsuario(usuario_id, remitente) {
    const [rows] = await Conexion.query(`
      SELECT * FROM mensaje_contacto
      WHERE usuario_id = ? AND remitente != ? AND leido = 0
      ORDER BY fecha DESC
    `, [usuario_id, remitente]);
    return rows;
  },

  async marcarComoLeido(id) {
    await Conexion.query(`
      UPDATE mensaje_contacto SET leido = 1 WHERE id = ?
    `, [id]);
  }
};

export default MensajeContacto;