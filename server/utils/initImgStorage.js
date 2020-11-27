import multer from 'multer';
import path from 'path';

export const initImgStorage = (type) => {
    const destination = path.join(__dirname, '../', `images/${type}`);

    const storage = multer.diskStorage({
        destination,
        filename: (req, file, cb) => {

            const label = `${type.toUpperCase()}-`
            const extension = path.extname(file.originalname);

            cb(null,  label + req.session.uid + Date.now() + extension);

        }
    });

    const upload = multer({
        storage,
        limits: {fileSize: 1000000000}
    }).single('image');

    return upload;
}