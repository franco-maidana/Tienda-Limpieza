import { Router } from "express";
import usuarios from "./usuario.js";
import productos from "./productos.js";
import ordenes from "./ordenes.js";
import mercadoPago from "./mercadoPago.js";
import webhook from "./webhook.js";
import almacen from "./almace.js";
import finanzas from "./finanzas.js";
import ordenLocal from "./ordenLocal.js";
import ganancias from "./ganancias.js";
import valoraciones from "./valoraciones.js";

const ApiRouter = Router()

ApiRouter.use('/users', usuarios);
ApiRouter.use('/products', productos);
ApiRouter.use('/ordenes', ordenes);
ApiRouter.use('/pagos', mercadoPago);
ApiRouter.use('/webhook', webhook);
ApiRouter.use('/almacen', almacen);
ApiRouter.use('/finanzas', finanzas);
ApiRouter.use('/ordenLocal', ordenLocal);
ApiRouter.use('/ganancias', ganancias);
ApiRouter.use('/valoraciones', valoraciones);

export default ApiRouter