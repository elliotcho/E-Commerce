import express from 'express'; 

import {
    createDepartment,
    getAllDepartments
} from '../controllers/departments'; 

const router = express.Router();

router.post('/', createDepartment); 
router.get('/', getAllDepartments);

export default router; 