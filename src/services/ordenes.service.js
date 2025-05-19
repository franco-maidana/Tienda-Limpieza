import {
ObtenerProductoPorId,
DescontarStock,
ObtenerCarritoPendientePorUsuario,
MarcarOrdenesComoPagadas,
ActualizarEnvioYMantenimiento,
InsertarOrdenSimplificada,
ModificarCantidadProductoCarritoPorProducto,
EliminarProductoDelCarrito,
VaciarCarritoUsuario,
BuscarProductoEnCarrito,
ActualizarCantidadExistente
} from "../models/ordenes.model.js";
import {RegistrarMovimientoFinanciero} from '../models/movimientosFinancieros.model.js'


export const ConfirmarOrdenUsuario = async (usuario_id) => {
  const carrito = await ObtenerCarritoPendientePorUsuario(usuario_id);
  if (carrito.length === 0) throw new Error('No hay productos pendientes');

  const subtotalTotal = carrito.reduce((acc, item) => acc + item.subtotal, 0);

  const envio = subtotalTotal >= 20000 ? 0 : 800;
  const mantenimiento = 200;
  const totalFinal = subtotalTotal + envio + mantenimiento;

  // Asignar envío y mantenimiento solo al primer producto
  await ActualizarEnvioYMantenimiento(carrito[0].id, envio, mantenimiento);

  // Actualizar estado de todos a pagado
  await MarcarOrdenesComoPagadas(usuario_id);

  for (const item of carrito) {
    const producto = await ObtenerProductoPorId(item.producto_id);
    await DescontarStock(item.producto_id, item.cantidad);

    const ganancia = (producto.precio_unitario - producto.precio_lista) * item.cantidad;
    const reposicion = producto.precio_lista * item.cantidad;

    await RegistrarMovimientoFinanciero('ingreso', 'Ganancia', `Ganancia - producto ${producto.id}`, ganancia, item.id, usuario_id);
    await RegistrarMovimientoFinanciero('gasto', 'Reposición', `Reposición - producto ${producto.id}`, reposicion, item.id, usuario_id);
  }

  await RegistrarMovimientoFinanciero('ingreso', 'Mantenimiento', 'Cargo plataforma', mantenimiento, carrito[0].id, usuario_id);

  if (envio > 0) {
    await RegistrarMovimientoFinanciero('ingreso', 'Envío', 'Ingreso por envío', envio, carrito[0].id, usuario_id);
  }

  return {
    totalProductos: subtotalTotal,
    mantenimiento,
    envio,
    totalFinal
  };
};

export const AgregarProductoAlCarrito = async (usuario_id, producto_id, cantidad) => {
  const producto = await ObtenerProductoPorId(producto_id);
  if (!producto) throw new Error('Producto no encontrado');
  if (producto.stock < cantidad) throw new Error('Stock insuficiente');

  const existente = await BuscarProductoEnCarrito(usuario_id, producto_id);

  if (existente) {
    const nuevaCantidad = parseFloat(existente.cantidad) + cantidad;
    if (nuevaCantidad > producto.stock) {
      throw new Error('No hay suficiente stock para aumentar esa cantidad');
    }

    await ActualizarCantidadExistente(existente.id, nuevaCantidad);

    return {
      producto: producto.nombre,
      cantidad: nuevaCantidad,
      mensaje: 'Cantidad actualizada en el carrito'
    };
  } else {
    const total = producto.precio_unitario * cantidad;
    await InsertarOrdenSimplificada(usuario_id, producto_id, cantidad, producto.precio_unitario, total);

    return {
      producto: producto.nombre,
      cantidad,
      total_unitario: producto.precio_unitario,
      mensaje: 'Producto agregado al carrito'
    };
  }
};

export const VerCarritoDelUsuario = async (usuario_id) => {
  const carrito = await ObtenerCarritoPendientePorUsuario(usuario_id);
  if (carrito.length === 0) {
    return {
      productos: [],
      subtotal: 0,
      envio: 0,
      mantenimiento: 0,
      total: 0
    };
  }

const subtotal = carrito.reduce((acc, item) => acc + parseFloat(item.subtotal), 0);
const envio = subtotal >= 15000 ? 0 : 800;
const mantenimiento = 200;
const total = subtotal + envio + mantenimiento;


  return {
    productos: carrito,
    subtotal,
    envio,
    mantenimiento,
    total
  };
};

export const EditarCantidadProductoEnCarrito = async (usuario_id, producto_id, nuevaCantidad) => {
  if (!nuevaCantidad || nuevaCantidad <= 0) {
    throw new Error('Cantidad inválida');
  }

  const producto = await ObtenerProductoPorId(producto_id);

  if (!producto) {
    throw new Error('Producto no encontrado');
  }

  if (nuevaCantidad > producto.stock) {
    throw new Error('Stock insuficiente para la cantidad solicitada');
  }

  await ModificarCantidadProductoCarritoPorProducto(usuario_id, producto_id, nuevaCantidad);

  return {
    usuario_id,
    producto_id,
    cantidad_actualizada: nuevaCantidad
  };
};

export const QuitarProductoDelCarrito = async (usuario_id, producto_id) => {
  await EliminarProductoDelCarrito(usuario_id, producto_id);
  return { usuario_id, producto_id };
};

export const VaciarCarrito = async (usuario_id) => {
  await VaciarCarritoUsuario(usuario_id);
  return { usuario_id };
};

