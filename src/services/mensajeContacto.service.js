import MensajeContacto from "../models/mensajeContacto.models.js";

export const crearMensaje = async ({ usuario_id, asunto, mensaje, mensaje_padre_id, remitente }) => {
  if (!mensaje || !remitente) {
    throw new Error('Faltan campos obligatorios');
  }

  // Si es respuesta, no se requiere asunto
  if (!mensaje_padre_id && !asunto) {
    throw new Error('El asunto es requerido para mensajes nuevos');
  }

  const id = await MensajeContacto.crear({
    usuario_id,
    asunto,
    mensaje,
    mensaje_padre_id,
    remitente
  });

  return await MensajeContacto.obtenerPorId(id);
};

export const obtenerConversacion = async (idRaiz) => {
  return await MensajeContacto.obtenerConversacion(idRaiz);
};

export const obtenerMensajesIniciales = async () => {
  return await MensajeContacto.obtenerMensajesIniciales();
};

export const obtenerNoLeidosPorUsuario = async (usuario_id, remitente) => {
  return await MensajeContacto.obtenerNoLeidosPorUsuario(usuario_id, remitente);
};

export const marcarMensajeComoLeido = async (id) => {
  await MensajeContacto.marcarComoLeido(id);
};

