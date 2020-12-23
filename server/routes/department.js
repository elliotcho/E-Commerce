import express from 'express'; 

import {
    createDepartment,
    getAllDepartments,
    deleteDepartment
} from '../controllers/departments'; 

const router = express.Router();

router.post('/', createDepartment); 
router.get('/', getAllDepartments);
router.delete('/:deptId', deleteDepartment);

export default router; 