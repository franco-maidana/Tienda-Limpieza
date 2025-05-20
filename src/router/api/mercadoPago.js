import { Router } from "express";
import { CrearPreferenciaDesdeCarrito } from '../../controllers/mercadoPago.controllers.js'

const  mercadoPago = Router()

mercadoPago.post('/crear-pago', CrearPreferenciaDesdeCarrito);

export default mercadoPago