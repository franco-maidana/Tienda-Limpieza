import { Router } from "express";
import usuarios from "./usuario.js";
import productos from "./productos.js";
import ordenes from "./ordenes.js";
import mercadoPago from "./mercadoPago.js";
import webhook from "./webhook.js";
import almacen from "./almace.js";
import finanzas from "./finanzas.js";

const ApiRouter = Router()

ApiRouter.use('/users', usuarios);
ApiRouter.use('/products', productos);
ApiRouter.use('/ordenes', ordenes);
ApiRouter.use('/pagos', mercadoPago);
ApiRouter.use('/webhook', webhook);
ApiRouter.use('/almacen', almacen);
ApiRouter.use('/finanzas', finanzas);

export default ApiRouter