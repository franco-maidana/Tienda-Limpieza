import Conexion from './../config/db.js'

export const CrearUsuario = async (nombre, email, password, telefono, direccion, latitud, longitud) => {
  // Creamos el usuario
  const [result] = await Conexion.query(
    `INSERT INTO usuarios (nombre, email, password, telefono, direccion, latitud, longitud)
    VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [nombre, email, password, telefono, direccion, latitud, longitud]
  );
  // Vemos el usuario
  const [usuarioCreado] = await Conexion.query(
    `SELECT id, nombre, email, telefono, direccion, latitud, longitud, rol, email_verificado, created_at 
    FROM usuarios WHERE id = ?`,
    [result.insertId]
  );

  return usuarioCreado[0];
};

export const ObtenemosUsuarios = async (limit, offset, buscar = '') => {
  const query = `
    SELECT id, nombre, email, telefono, direccion, latitud, longitud, rol, email_verificado, created_at
    FROM usuarios
    WHERE nombre LIKE ? OR email LIKE ?
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `;
  const like = `%${buscar}%`;
  const [usuarios] = await Conexion.query(query, [like, like, limit, offset]);
  return usuarios;
};

export const ContarUsuario = async (buscar = '') => {
  const query = `
    SELECT COUNT(*) AS total 
    FROM usuarios 
    WHERE nombre LIKE ? OR email LIKE ?
  `;
  const like = `%${buscar}%`;
  const [result] = await Conexion.query(query, [like, like]);
  return result[0].total;
};

export const ActualizarUsuario = async (id, camposActualizados) => {
  const campos = [];
  const values = [];

  for (const [key, value] of Object.entries(camposActualizados)) {
    campos.push(`${key} = ?`);
    values.push(value);
  }

  if (campos.length === 0) {
    throw new Error('No se recibieron campos para actualizar');
  }

  values.push(id); // El ID va al final

  const query = `
    UPDATE usuarios
    SET ${campos.join(', ')}
    WHERE id = ?
  `;

  const [resultado] = await Conexion.query(query, values);
  return resultado;
};

export const ObtenerUsuarioPorId = async (id) => {
  const [filas] = await Conexion.query(`
    SELECT id, nombre, email, telefono, direccion, latitud, longitud, rol, email_verificado, created_at
    FROM usuarios
    WHERE id = ?
  `, [id]);

  return filas[0];
};

export const GuardarTokenRecuperacion = async (email, token, expiracion) => {
  const [result] = await Conexion.query(
    `UPDATE usuarios SET verificacion_token = ?, verificacion_expira = ? WHERE email = ?`,
    [token, expiracion, email]
  );
  return result
}

export const ObtenerUsuarioPorToken = async (token) => {
  const [filas] = await Conexion.query(
    `SELECT * FROM usuarios WHERE verificacion_token = ?`,
    [token]
  );
  return filas[0]
}

export const ActualizarPassword = async (id, nuevaPassword) => {
  await Conexion.query(
      `UPDATE usuarios 
      SET password = ?, 
      verificacion_token = NULL, 
      verificacion_expira = NULL,
      password_actualizada = NOW()
      WHERE id = ?`,
    [nuevaPassword, id]
  );
};