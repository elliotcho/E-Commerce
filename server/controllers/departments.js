import {Department} from '../models/departments'; 

export const createDepartment =  async (req, res) => {
    const {name} = req.body;

    const newDepartment = new Department({name});

    await newDepartment.save();

    res.json({msg:'success'});

}

