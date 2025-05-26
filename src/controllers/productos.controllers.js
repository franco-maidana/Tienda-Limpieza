import {
  Crear,
  ListarProductos,
  ModificarProducto,
  BorrarProducto,
  DesactivarProducto,
  ListarProductosAdmin,
  ReactivarProducto
} from "../services/productos.service.js";

export const CrearProductoControllers = async (req, res) => {
  try {
    const datos = req.body;
    const imagen = req.file;
    const creado_por = 6;

    const producto = await Crear(datos, imagen, creado_por);

    return res.json({
      statusCode: 201,
      message: "Producto creado correctamente",
      producto,
    });
  } catch (error) {
    return res.json({
      statusCode: 400,
      message: error.message,
    });
  }
};

export const ObtenerTodosLosProductos = async (req, res) => {
  try {
    const pagina = parseInt(req.query.pagina) || 1;
    const limite = parseInt(req.query.limite) || 10;
    const buscar = req.query.buscar || "";
    const categoria = req.query.categoria_id || null;

    const resultado = await ListarProductos(pagina, limite, buscar, categoria);

    return res.status(200).json({
      statusCode: 200,
      message: "Productos obtenidos correctamente",
      ...resultado,
    });
  } catch (error) {
    return res.status(500).json({
      statusCode: 500,
      message: "Error al obtener productos",
      error: error.message,
    });
  }
};

export const ActualizarProductoController = async (req, res) => {
  try {
    const id = req.params.id;
    const datos = req.body;
    const imagen = req.file;

    const producto = await ModificarProducto(id, datos, imagen);

    return res.status(200).json({
      message: "Producto actualizado correctamente",
      producto,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error al actualizar producto",
      error: error.message,
    });
  }
};

export const EliminarProductoControllers = async (req, res) => {
  try {
    const id = req.params.id;
    const resultado = await BorrarProducto(id);

    return res.json({
      statusCode: 200,
      message: "Producto eliminado correctamente",
    });
  } catch (error) {
    return res.json({
      statusCode: 500,
      message: "Error al eliminar el producto",
      error: error.message,
    });
  }
};

export const DesactivarproductoControllers = async (req, res) => {
  try {
    const id = req.params.id;
    const resultado = await DesactivarProducto(id);

    return res.json({
      statusCode: 200,
      message: "Producto desactivado para la venta",
    });
  } catch (error) {
    return res.json({
      statusCode: 500,
      message: "Error al desactivar producto",
      error: error.message,
    });
  }
};

export const ObtenerListadoAdmin = async (req, res) => {
  try {
    const productos = await ListarProductosAdmin();
    return res.json({
      statusCode: 200,
      message: 'Listado completo para administración',
      productos
    });
  } catch (error) {
    return res.json({
      statusCode: 500,
      message: 'Error al obtener productos',
      error: error.message
    });
  }
};

export const ReactivarProductoController = async (req, res) => {
  try {
    const id = req.params.id;
    const resultado = await ReactivarProducto(id);
    return res.json({
      statusCode: 200,
      message: 'Producto reactivado correctamente',
    });
  } catch (error) {
    return res.json({
      statusCode: 500,
      message: 'Error al reactivar producto',
      error: error.message
    });
  }
};