import {
  CrearProducto,
  ObtenerProductoPorId,
  ObtenerProductos,
  ContarProductos,
  EliminarProducto,
  AnularProducto,
  ActivarProducto,
  ObtenerProductosAdmin
} from "../models/productos.model.js";

export const Crear = async (datos, imagen, creado_por) => {
  const imagen_url = imagen ? `/uploads/productos/${imagen.filename}` : null;

  const resultado = await CrearProducto(
    datos.nombre,
    datos.descripcion,
    datos.tipo_medida,
    datos.stock,
    datos.stock_minimo,
    datos.precio_lista,
    datos.ganancia,
    datos.marca,
    datos.categoria_id,
    imagen_url,
    creado_por
  );

  // Buscamos el producto recién creado
  const producto = await ObtenerProductoPorId(resultado.insertId);

  return producto;
};

export const ListarProductos = async (
  pagina = 1,
  limite = 10,
  buscar = "",
  categoriaId = null
) => {
  const offset = (pagina - 1) * limite;
  const productos = await ObtenerProductos(limite, offset, buscar, categoriaId);
  const total = await ContarProductos(buscar, categoriaId);
  const totalPaginas = Math.ceil(total / limite);

  const productosConAlerta = productos.map((p) => ({
    ...p,
    stock_bajo: p.stock <= p.stock_minimo,
  }));

  return {
    productos: productosConAlerta,
    total,
    totalPaginas,
    paginaActual: pagina,
  };
};

export const ModificarProducto = async (id, datos, imagen) => {
  const campos = { ...datos };

  if (imagen) {
    campos.imagen_url = `/uploads/productos/${imagen.filename}`;
  }

  // Evitá stock negativo
  if ("stock_minimo" in campos && parseFloat(campos.stock_minimo) < 0) {
    throw new Error("El stock mínimo no puede ser negativo");
  }

  await ActualizarProducto(id, campos);
  const productoActualizado = await ObtenerProductoPorId(id);
  return productoActualizado;
};

export const BorrarProducto = async (id) => {
  return await EliminarProducto(id);
};

export const DesactivarProducto = async (id) => {
  return AnularProducto(id);
};

export const ListarProductosAdmin = async () => {
  const productos = await ObtenerProductosAdmin();

  return productos.map(p => ({
    ...p,
    stock_bajo: p.stock <= p.stock_minimo
  }));
};

export const ReactivarProducto = async (id) => {
  return await ActivarProducto(id);
};