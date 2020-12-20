import {Department} from '../models/departments'; 

export const createDepartment =  async (req, res) => {
    const {name} = req.body;

    const newDepartment = new Department({name});

    await newDepartment.save();

    res.json({msg:'success'});

}

export const getAllDepartments = async (req, res) => {

    const departments = await Department.find({});

    res.json(departments);
}