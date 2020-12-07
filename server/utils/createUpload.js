import multer from 'multer';
import path from 'path';

export const createUpload = (type) => {
    const destination = path.join(__dirname, '../', `images/${type}`);

    const storage = multer.diskStorage({
        destination,
        filename: (req, file, cb) => {

            const label = `${type.toUpperCase()}-`
            const extension = path.extname(file.originalname);

            cb(null,  label + req.user._id + Date.now() + extension);

        }
    });

    const upload = multer({
        storage,
        limits: {fileSize: 1000000000}
    }).single('image');

    return upload;
}