import {
  AgregarProductoAlCarrito,
  VerCarritoDelUsuario,
  EditarCantidadProductoEnCarrito,
  QuitarProductoDelCarrito,
  VaciarCarrito,
  ObtenerOrdenPorGrupo
} from "../services/ordenes.service.js";

export const AgregarProductoAlCarritoController = async (req, res) => {
  try {
    const { usuario_id, producto_id, cantidad } = req.body;

    if (!usuario_id || !producto_id || !cantidad) {
      return res.json({
        statusCode: 400,
        message: "Faltan campos obligatorios",
      });
    }

    const resultado = await AgregarProductoAlCarrito(
      parseInt(usuario_id),
      parseInt(producto_id),
      parseFloat(cantidad)
    );

    return res.json({
      statusCode: 201,
      message: "Producto agregado al carrito",
      resultado,
    });
  } catch (error) {
    return res.json({
      statusCode: 500,
      message: "Error al agregar producto al carrito",
      error: error.message,
    });
  }
};

export const ObtenerCarritoDelUsuario = async (req, res) => {
  try {
    const { usuario_id } = req.params;

    const resultado = await VerCarritoDelUsuario(usuario_id);

    return res.json({
      statusCode: 200,
      message: "Carrito obtenido correctamente",
      ...resultado,
    });
  } catch (error) {
    return res.json({
      statusCode: 500,
      message: "Error al obtener el carrito",
      error: error.message,
    });
  }
};

export const ModificarProductoEnCarritoController = async (req, res) => {
  try {
    const { usuario_id, producto_id, cantidad } = req.body;

    if (!usuario_id || !producto_id || !cantidad) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    const resultado = await EditarCantidadProductoEnCarrito(
      parseInt(usuario_id),
      parseInt(producto_id),
      parseFloat(cantidad)
    );

    return res.json({
      statusCode: 200,
      message: "Cantidad actualizada correctamente",
      resultado,
    });
  } catch (error) {
    return res.json({
      statusCode: 400,
      message: "Error al actualizar la cantidad",
      error: error.message,
    });
  }
};

export const EliminarProductoCarritoController = async (req, res) => {
  try {
    const usuario_id = parseInt(req.params.usuario_id);
    const producto_id = parseInt(req.body.producto_id);
    
    if (isNaN(usuario_id) || isNaN(producto_id)) {
      return res.json({
        statusCode: 400,
        message: "ID de usuario o producto inválido",
      });
    }

    const resultado = await QuitarProductoDelCarrito(
      parseInt(usuario_id),
      parseInt(producto_id)
    );

    return res.json({
      statusCode: 200,
      message: "Producto eliminado del carrito",
      resultado,
    });
  } catch (error) {
    return res.json({
      statusCode: 500,
      message: "Error al eliminar producto del carrito",
      error: error.message,
    });
  }
};

export const VaciarCarritoController = async (req, res) => {
  try {
    const { usuario_id } = req.params;
    const resultado = await VaciarCarrito(parseInt(usuario_id));

    return res.json({
      statusCode: 200,
      message: "Carrito vaciado correctamente",
      resultado,
    });
  } catch (error) {
    return res.json({
      statusCode: 500,
      message: "Error al vaciar el carrito",
      error: error.message,
    });
  }
};

export const ObtenerOrdenPorGrupoController = async (req, res) => {
  try {
    const { grupo_orden } = req.params;
    if (!grupo_orden) return res.status(400).json({ message: 'Falta grupo_orden' });

    const resultado = await ObtenerOrdenPorGrupo(grupo_orden);

    return res.json({
      statusCode: 200,
      message: 'Orden obtenida con éxito',
      ...resultado
    });

  } catch (error) {
    return res.json({
      statusCode: 500,
      message: 'Error al obtener la orden',
      error: error.message
    });
  }
};

