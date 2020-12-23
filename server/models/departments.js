import mongoose from 'mongoose';

const DepartmentSchema = new mongoose.Schema({
    name: {
        type: String
    },
    key: {
        type: String
    }
}); 

export const Department = mongoose.model('department', DepartmentSchema);