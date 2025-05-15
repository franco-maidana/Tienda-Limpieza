import { Router } from "express";
import usuarios from "./usuario.js";

const ApiRouter = Router()

ApiRouter.use('/users', usuarios)

export default ApiRouter