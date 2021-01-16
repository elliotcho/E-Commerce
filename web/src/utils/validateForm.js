import { createErrorToast } from './createToast';

export const validateProductForm = (data) => {
    const { name, departmentId, description, price, quantity } = data;

    let msg;

    if(name.trim().length === 0){
        msg = 'Name cannot be blank';
    } 
    
    else if(!departmentId){
        msg = 'You must select a department!';
    }  
    
    else if(!price || Number(price) === 0){
        msg = 'You cannot sell an item for free';
    } 
    
    else if(description.trim().length === 0){
        msg = 'A description is required';
    } 
    
    else {        
        let sum = 0;

        Object.keys(quantity).forEach(s => { 
            sum += parseInt(quantity[s]);
        });

        if(sum === 0) {
            msg = 'You cannot sell something with 0 quantity';
        }
    }

    if(msg){
        createErrorToast(msg);
        return false;
    }

    return true;
}