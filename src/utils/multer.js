import multer from "multer";
import path from 'path'

// carpeta destino
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/productos'); // crear carpeta uploads
  },
  filename: (req, file, cb) => {
    const nombreUnico = Date.now() + '-' + file.originalname;
    cb(null, nombreUnico);
  }
});

const uploads = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const tiposPermitidos = /jpeg|jpg|png|webp/;
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, tiposPermitidos.test(ext))
  }
});

export default uploads