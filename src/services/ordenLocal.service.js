import {
  CrearOrdenLocal,
  AgregarProductoAOrden,
  ObtenerDetalleOrden,
  ConfirmarOrden,
  EliminarOrdenLocal,
  ActualizarTotalOrden,
  ObtenerGrupoOrden,
  LimpiarDetalleCarrito,
  EliminarProductoDeOrden
} from '../models/ordenLocal.model.js';

import { ObtenerProductoPorId, RegistrarProductoVendido } from '../models/productos.model.js';
import { RestarInsumosDeProducto } from '../models/insumos.model.js';
import { RestarEnvasesDeProducto } from '../models/envases.model.js';
import {RegistrarGananciaLocal} from '../models/ganancias.model.js'


// 🧾 Crear carrito vacío = crea una orden_Local
export const CrearCarritoService = async () => {
  const ordenId = await CrearOrdenLocal();
  return ordenId;
};
// ➕ Agregar producto al carrito == agrega un producto en la orden_local
export const AgregarProductoService = async ({ ordenId, productoId, cantidad }) => {
  const producto = await ObtenerProductoPorId(productoId);
  if (!producto) throw new Error(`Producto con ID ${productoId} no existe`);

  await AgregarProductoAOrden(ordenId, productoId, cantidad);
};
// 🔍 Ver carrito = muestra la orden con los productos adentro y el total a pagar 
export const ObtenerCarritoService = async (ordenId) => {
  const productos = await ObtenerDetalleOrden(ordenId);
  const total = productos.reduce((acc, item) => acc + parseFloat(item.subtotal), 0);
  return { productos, total };
};
// ✅ Confirmar carrito == confirma el pago 
export const ConfirmarCarritoService = async (ordenId) => {
  const productos = await ObtenerDetalleOrden(ordenId);
  if (productos.length === 0) throw new Error('El carrito está vacío');

  const grupoOrden = await ObtenerGrupoOrden(ordenId);

  for (const item of productos) {
    await RestarInsumosDeProducto(item.producto_id, item.cantidad);
    await RestarEnvasesDeProducto(item.producto_id, item.cantidad);
    await RegistrarProductoVendido(
      item.producto_id,
      item.cantidad,
      item.precio_unitario,
      grupoOrden
    );
  }

  const total = productos.reduce((acc, item) => acc + parseFloat(item.subtotal), 0);

  // Esto hace UPDATE a la orden que ya existe
  await ConfirmarOrden(total, grupoOrden);

  // ✅ Limpiar el carrito
  await LimpiarDetalleCarrito(ordenId);

  await RegistrarGananciaLocal(total);

  return {
    total,
    cantidad_productos: productos.length
  };
};
// ❌ Cancelar carrito == elimina la ordenLocal
export const CancelarCarritoService = async (ordenId) => {
  await EliminarOrdenLocal(ordenId);
};
// Elimina el producto del carrito = Elimina el producto dentro de la orden 
export const EliminarProductoService = async ({ ordenId, productoId }) => {
  await EliminarProductoDeOrden(ordenId, productoId);
  await ActualizarTotalOrden(ordenId); // 🧮 recalcular total
};