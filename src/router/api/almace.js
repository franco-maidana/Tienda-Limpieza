import { Router} from 'express'
import {CrearEnvaseController,CrearInsumoController} from '../../controllers/amacen.controllers.js'

const almacen = Router()

almacen.post('/create-envases', CrearEnvaseController);
almacen.post('/create-insumos', CrearInsumoController);


export default almacen