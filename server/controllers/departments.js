import {Department} from '../models/departments'; 

export const createDepartment =  async (req, res) => {
    const {name} = req.body;

    const newDepartment = new Department({ name, key: name.toLowerCase() });
    const dept = await newDepartment.save();

    res.json(dept);

}

export const getAllDepartments = async (req, res) => {
    const departments = await Department.find({});
    res.json(departments);
}

export const deleteDepartment = async (req, res) => {
    const {deptId} = req.params;

    await Department.deleteOne({_id:deptId});

    res.json({msg:'succesfully deleted'}); 
}