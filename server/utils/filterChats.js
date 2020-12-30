import _ from 'lodash';

export const filterChats = (result, map, messages, userType) => {
    messages.forEach(msg => {
        if(!map[msg[userType]]){
            map[msg[userType]] = msg.dateSent;
            result.push(msg);
        } 
        
        else if(map[msg[userType]] < msg.dateSent){
            map[msg[userType]] = msg.dateSent;

            const idx = _.findIndex(result, [userType, msg[userType]]);
            result.splice(idx, 1);
            result.push(msg);
        }
    });

    return result;
}