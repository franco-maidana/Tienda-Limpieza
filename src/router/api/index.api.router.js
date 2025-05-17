import { Router } from "express";
import usuarios from "./usuario.js";
import productos from "./productos.js";

const ApiRouter = Router()

ApiRouter.use('/users', usuarios);
ApiRouter.use('/products', productos);

export default ApiRouter