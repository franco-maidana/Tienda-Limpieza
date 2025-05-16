import bcryot from "bcrypt";
import nodemailer from "nodemailer";
import crypto from "crypto";
import {
  CrearUsuario,
  ObtenemosUsuarios,
  ContarUsuario,
  ActualizarUsuario,
  ObtenerUsuarioPorId,
  GuardarTokenRecuperacion,
  ActualizarPassword,
  ObtenerUsuarioPorToken,
  VerificarEmailUsuario,
  EliminarUsuario,
  SolicitarEliminacionUsuario,
} from "../models/usuario.models.js";

export const Crear = async (
  nombre,
  email,
  password,
  telefono,
  direccion,
  latitud,
  longitud
) => {
  try {
    const passwordHash = await bcryot.hash(password, 10);

    const verificacion_token = crypto.randomBytes(32).toString("hex");
    const verificacion_expira = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24hs

    // creamos el usuario con el token incluido
    const usuario = await CrearUsuario(
      nombre,
      email,
      passwordHash,
      telefono,
      direccion,
      latitud,
      longitud,
      verificacion_token,
      verificacion_expira
    );

    // enviamos el mail de verificación
    await EnviarEmailVerificacion(email, verificacion_token);

    return usuario;
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      throw new Error("El email ya está registrado, intenta con otro.");
    }
    throw error;
  }
};

export const ListarUsuarios = async (pagina = 1, limite = 10, buscar = "") => {
  const offset = (pagina - 1) * limite;
  const total = await ContarUsuario(buscar);
  const usuarios = await ObtenemosUsuarios(limite, offset, buscar);
  const totalPagina = Math.ceil(total / limite);

  return {
    usuarios,
    total,
    totalPagina,
    paginaActual: pagina,
  };
};

export const ModificarUsuario = async (id, datos, rol = "cliente") => {
  if ("password" in datos) {
    throw new Error("No se permite modificar la contraseña por este medio");
  }

  const camposPermitidos = [
    "nombre",
    "telefono",
    "direccion",
    "latitud",
    "longitud",
  ];
  if (rol === "admin") camposPermitidos.push("email");

  const camposFiltrados = {};

  for (const campo of camposPermitidos) {
    const valor = datos[campo];

    // Ignorar campos que lleguen como vacío, null o undefined
    if (valor !== undefined && valor !== null && valor !== "") {
      camposFiltrados[campo] =
        campo === "latitud" || campo === "longitud"
          ? parseFloat(valor) // aseguramos decimal si viene como string
          : valor;
    }
  }

  if (Object.keys(camposFiltrados).length === 0) {
    throw new Error("No se enviaron campos válidos para modificar");
  }

  await ActualizarUsuario(id, camposFiltrados);
  const usuarioActualizado = await ObtenerUsuarioPorId(id);
  return usuarioActualizado;
};

export const SolicitarRecuperacionPassword = async (email) => {
  const token = crypto.randomBytes(32).toString("hex");
  const expiracion = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos

  // Guardamos token y expiracion
  await GuardarTokenRecuperacion(email, token, expiracion);

  // Configuramos transporte (usa tu datos reales)
  const transporte = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GOOGLE_EMAIL,
      pass: process.env.GOOGLE_PASSWORD,
    },
    // modificar esto - cambiar gamil que va a quedar y hacer que funcione toda la seguridad para volcarlo aca
    tls: {
      rejectUnauthorized: false,
    },
  });

  const link = `https://tusitio.com/reset-password?token=${token}`;

  await transporte.sendMail({
    from: `"Soporte Tienda Limpieza" <${process.env.GOOGLE_EMAIL}>`,
    to: email,
    subject: "Recuperacion de contraseña",
    html: `
          <p>Has solicitado restablecer tu contraseña.</p>
          <p>Has click en el siguiente enlace para comtinuar:</p>
          <a href="${link}">${link}</a>
          <p>Copia el token: ${token} para poder cambiar la contraseña </p>
          <p>Este enlace es valido por 15 minutos. </a>
          `,
  });

  return true;
};

export const CambiarPassworPorToken = async (token, nuevaPassword) => {
  if (!token || !nuevaPassword) {
    throw new Error("Token y nueva contraseña son requeridas");
  }

  const usuario = await ObtenerUsuarioPorToken(token);
  if (!usuario) {
    throw new Error("Token invalido");
  }

  if (new Date(usuario.verficacion_expira) < new Date()) {
    throw new Error("El enlace ha expirado");
  }

  // validacion de seguridad
  const cumpleRequisitos = /^(?=.*\d).{8,}$/.test(nuevaPassword);
  if (!cumpleRequisitos) {
    throw new Error(
      "La contraseña debe tener al menos 8 caracteres y un número"
    );
  }

  const passwordHasheada = await bcryot.hash(nuevaPassword, 10);
  await ActualizarPassword(usuario.id, passwordHasheada);

  return true;
};

export const EnviarEmailVerificacion = async (email, token) => {
  const link = `http://localhost:8080/api/auth/verificar-email?token=${token}`;

  // log del enlace de verificacion (solo para desarrollo)
  console.log("Verificación email:", link); // Funca

  const transporte = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GOOGLE_EMAIL,
      pass: process.env.GOOGLE_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false, // solo en desarrollo
    },
  });

  await transporte.sendMail({
    from: `"Soporte Tienda Limpieza" <${process.env.GOOGLE_EMAIL}>`,
    to: email,
    subject: "Verificá tu cuenta",
    html: `<p>Gracias por registrarte. Hacé clic para verificar tu cuenta:</p>
            <a href="${link}">${link}</a>
            <p>Este enlace es válido por 24 horas.</p>`,
  });
};

export const VerificarEmail = async (token) => {
  return await VerificarEmailUsuario(token);
};

export const BorrarUsuario = async (id) => {
  const resultado = await EliminarUsuario(id);
  if (resultado.affectedRows === 0) {
    throw new Error("Usuario no encontrado");
  }
  return true;
};

export const SolicitarEliminacion = async (id, email) => {
  await SolicitarEliminacionUsuario(id);

  const transporte = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GOOGLE_EMAIL,
      pass: process.env.GOOGLE_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const fechaEliminacion = new Date();
  fechaEliminacion.setHours(fechaEliminacion.getHours() + 48);

  const fechaFormateada = fechaEliminacion.toLocaleString("es-AR");

  await transporte.sendMail({
    from: `"Soporte Tienda Limpieza" <${process.env.GOOGLE_EMAIL}>`,
    to: email,
    subject: "Solicitud de eliminación de cuenta",
    html: `
    <p>Hola,</p>
    <p>Recibimos una solicitud para eliminar tu cuenta.</p>
    <p>Tu cuenta será eliminada el <strong>${fechaFormateada}</strong>.</p>
    <p>Si no fuiste vos o querés cancelar esta solicitud, contactanos antes de esa fecha.</p>
    <p>Gracias por haber usado nuestra tienda.</p>
  `,
  });

  return true;
};
