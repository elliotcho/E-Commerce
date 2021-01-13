import mongoose from 'mongoose';

const DepartmentSchema = new mongoose.Schema({
    name: {
        type: String
    },
    key: {
        type: String
    }
}); 

const Department = mongoose.model('department', DepartmentSchema);
export default Department;