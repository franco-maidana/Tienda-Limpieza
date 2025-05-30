import {Router} from 'express'
import {EliminarGastoController} from '../../controllers/finanzas.controllers.js'

const finanzas = Router()

finanzas.delete('/eliminar/:id', EliminarGastoController);

export default finanzas