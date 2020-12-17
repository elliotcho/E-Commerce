import express from 'express'; 

import {
    createDepartment
} from '../controllers/departments'; 

const router = express.Router();

router.post('/', createDepartment); 

export default router; 