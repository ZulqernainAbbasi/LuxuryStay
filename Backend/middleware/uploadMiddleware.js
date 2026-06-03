import multer from 'multer';

const upload = multer({srorage: multer.diskStorage({})})

export default upload;