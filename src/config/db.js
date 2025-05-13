import mysql from 'mysql2/promise'
import dotenv from 'dotenv'

dotenv.config();

const Conexion = mysql.createPool({
  host: process.env.SERVIDOR,
  user: process.env.USUARIO,
  password: process.env.PASSWORD,
  database: process.env.BASE_DE_DATOS,
})

if(Conexion){
  console.log('Te has conectado a la base de datos')
} else{
  console.log('Error en la conexion a la base de datos')
}

export default Conexion