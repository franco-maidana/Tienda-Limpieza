import { Router } from "express";
import usuarios from "./usuario.js";
import productos from "./productos.js";
import ordenes from "./ordenes.js";

const ApiRouter = Router()

ApiRouter.use('/users', usuarios);
ApiRouter.use('/products', productos);
ApiRouter.use('/ordenes', ordenes);

export default ApiRouter