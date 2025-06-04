import {
  crearMensaje,
  obtenerConversacion,
  obtenerMensajesIniciales,
  marcarMensajeComoLeido,
  obtenerNoLeidosPorUsuario
} from "../services/mensajeContacto.service.js";

export const enviarMensaje = async (req, res) => {
  try {
    const { usuario_id, asunto, mensaje, mensaje_padre_id, remitente } =
      req.body;

    const nuevoMensaje = await crearMensaje({
      usuario_id,
      asunto,
      mensaje,
      mensaje_padre_id,
      remitente,
    });

    res.status(201).json({ message: "Mensaje creado", data: nuevoMensaje });
  } catch (err) {
    console.error("❌ Error al crear mensaje:", err.message);
    res.status(400).json({ error: err.message });
  }
};

export const listarConversacion = async (req, res) => {
  try {
    const { id } = req.params;
    const conversacion = await obtenerConversacion(id);
    res.status(200).json({ data: conversacion });
  } catch (err) {
    console.error("❌ Error al obtener conversación:", err.message);
    res.status(500).json({ error: "Error al obtener conversación" });
  }
};

export const listarMensajesIniciales = async (req, res) => {
  try {
    const mensajes = await obtenerMensajesIniciales();
    res.status(200).json({ data: mensajes });
  } catch (err) {
    console.error("❌ Error al obtener mensajes:", err.message);
    res.status(500).json({ error: "Error al obtener mensajes" });
  }
};

export const responderMensaje = async (req, res) => {
  try {
    const mensaje_padre_id = req.params.id;
    const { usuario_id, mensaje, remitente } = req.body;

    if (!mensaje || !remitente) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const respuesta = await crearMensaje({
      usuario_id,
      mensaje,
      mensaje_padre_id,
      remitente,
    });

    res.status(201).json({
      message: "Respuesta enviada",
      data: respuesta,
    });
  } catch (err) {
    console.error("❌ Error al responder:", err.message);
    res.status(500).json({ error: "Error al responder mensaje" });
  }
};

// 🟡 Ver mensajes no leídos para el usuario
export const listarNoLeidos = async (req, res) => {
  try {
    const { usuario_id, remitente } = req.query;

    if (!usuario_id || !remitente) {
      return res.status(400).json({ error: 'Faltan datos: usuario_id y remitente' });
    }

    const mensajes = await obtenerNoLeidosPorUsuario(usuario_id, remitente);
    res.status(200).json({ data: mensajes });
  } catch (err) {
    console.error('❌ Error al listar no leídos:', err.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

// ✅ Marcar mensaje como leído
export const marcarLeido = async (req, res) => {
  try {
    const { id } = req.params;
    await marcarMensajeComoLeido(id);
    res.status(200).json({ message: `Mensaje ${id} marcado como leído` });
  } catch (err) {
    console.error('❌ Error al marcar como leído:', err.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
};