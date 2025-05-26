import { ObtenerUsuarioPorId } from "../models/usuario.models.js";
import {
  Crear,
  ListarUsuarios,
  ModificarUsuario,
  SolicitarRecuperacionPassword,
  CambiarPassworPorToken,
  VerificarEmail,
  BorrarUsuario,
  SolicitarEliminacion
} from "../services/usuario.service.js";

export const RegistroUsuario = async (req, res, next) => {
  try {
    const { nombre, email, password, telefono, direccion, latitud, longitud } =
      req.body;

    const lat = latitud && latitud !== "" ? parseFloat(latitud) : null;
    const long = longitud && longitud !== "" ? parseFloat(longitud) : null;

    // Validación
    if (!nombre || !email || !password || !telefono || !direccion) {
      return res.status(400).json({
        StatusCode: 400,
        message:
          "Faltan campos por llenar, por favor revise el formulario y envíelo de nuevo",
      });
    }

    // Crear el usuario
    const usuario = await Crear(
      nombre,
      email,
      password,
      telefono,
      direccion,
      lat,
      long
    );

    return res.status(201).json({
      StatusCode: 201,
      message: "Usuario creado correctamente",
      usuario,
    });
  } catch (error) {
    if (error.message.includes("ya está registrado")) {
      return res.status(409).json({
        StatusCode: 409,
        message: error.message,
      });
    }
    return next(error);
  }
};

export const ObtenerTodosLosUsuarios = async (req, res, next) => {
  try {
    const pagina = parseInt(req.query.pagina) || 1;
    const limite = parseInt(req.query.limite) || 10;
    const buscar = req.query.buscar || "";

    const resultado = await ListarUsuarios(pagina, limite, buscar);

    return res.status(200).json({
      StatusCode: 200,
      message: "Usuarios obtenidos correctamente",
      ...resultado,
    });
  } catch (error) {
    return next(error);
  }
};

export const ActualizarDatosUsuario = async (req, res, next) => {
  try {
    const id = req.params.id;
    const datos = req.body;

    // Simulamos el rol (más adelante vendrá del JWT)
    const rol = req.body.rol || "cliente";

    const usuario = await ModificarUsuario(id, datos, rol);

    return res.status(200).json({
      StatusCode: 200,
      message: "Usuario actualizado correctamente",
      resultado: usuario,
    });
  } catch (error) {
    return res.status(400).json({
      StatusCode: 400,
      message: error.message,
    });
  }
};

export const RecuperarPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        statusCode: 400,
        message: "Email requerido",
      });
    }

    await SolicitarRecuperacionPassword(email); // 💥 esto faltaba

    return res.status(200).json({
      statusCode: 200,
      message: "Se ha enviado un enlace de recuperación a tu email",
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: "Error al enviar el email",
      error: error.message,
    });
  }
};

export const ResetearPassword = async (req, res) => {
  try {
    const { token, nuevaPassword } = req.body;

    await CambiarPassworPorToken(token, nuevaPassword);

    return res.json({
      StatusCode: 200,
      message: "Contraseña actualizada correctamente",
    });
  } catch (error) {
    return res.json({
      statusCode: 400,
      message: error.message,
    });
  }
};

export const ConfirmarEmail = async (req, res) => {
  try {
    const { token } = req.query;
    await VerificarEmail(token);

    return res
      .status(200)
      .send(
        "<h1>Email verificado correctamente. Ahora podés iniciar sesión.</h1>"
      );
  } catch (error) {
    return res.status(400).send(`<h1>Error: ${error.message}</h1>`);
  }
};

export const EliminarUsuarioControllers = async (req, res) => {
  try {
    const id = req.params.id

    await BorrarUsuario(id);

    return res.json({
      statusCode: 200,
      message: 'Usuario eliminado correctamente'
    })

  } catch (error) {
    return res.json({
      statusCode: 404,
      message: error.message
    })
  }
}

export const SolicitaBajaUsuario = async (req, res) => {
  try {
    const id = req.params.id

    // buscamos el usuario po id para obtener su email
    const usuarios = await ObtenerUsuarioPorId(id);
    
    if(!usuarios){
      return res,json({
        statusCode: 404,
        message: 'Usuario no encontrado'
      })
    }

    await SolicitarEliminacion(id, usuarios.email);

    return res.json({
      statusCode: 200,
      message: 'Se solicito la eliminacion. Recibiras un email con los detalles'
    });

  } catch (error) {
    return res.json({
      StatusCode: 500,
      message: 'Error al solicitar la baja',
      error: error.message
    })
  }
}