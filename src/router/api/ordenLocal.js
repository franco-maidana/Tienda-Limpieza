import {Router} from 'express'
import {
  CrearCarritoController,
  AgregarProductoController,
  ObtenerCarritoController,
  ConfirmarCarritoController,
  CancelarCarritoController,
  EliminarProductoDelCarritoController
} from '../../controllers/ordenLocal.controllers.js'

const ordenLocal = Router();


ordenLocal.post('/crear', CrearCarritoController); // Crear nuevo carrito
ordenLocal.post('/:ordenId/agregar', AgregarProductoController); // Agregar producto al carrito
ordenLocal.get('/:ordenId', ObtenerCarritoController); // Obtener detalle del carrito
ordenLocal.post('/:ordenId/confirmar', ConfirmarCarritoController); // Confirmar venta
ordenLocal.delete('/:ordenId', CancelarCarritoController); // Elimina ordenes_locales
ordenLocal.delete('/:ordenId/producto/:productoId', EliminarProductoDelCarritoController); // Elimina el producto del carrito


export default ordenLocal