import { API } from '../constants';
import { authMiddleware } from '../utils/authMiddlware';
import { authAfterware } from '../utils/authAfterware';
import axios from 'axios';

export const sendMessage = async (data, isImage) => {
    let config;

    if(isImage){
        config = { headers: {'content-type': 'multipart/form-data'} };
    } else{
        config = { headers: {'content-type': 'application/json'} };
    }

    const response = await axios.post(`${API}/api/message`, data, authMiddleware(config));
    const { ok, msg } = response.data;

    if(ok){
        authAfterware(response);
        return msg;
    }
}

export const getSidebarChats = async () => {
    const config = { headers: {} };
    const response = await axios.get(`${API}/api/message`, authMiddleware(config));
    const { ok, chats } = response.data;
    
    if(ok){
        authAfterware(response);
        return chats;
    }
}

export const loadMessages = async (otherUser) => {
    const config = {headers: {'content-type': 'application/json'}};

    const response = await axios.post(`${API}/api/message/messages`, { otherUser }, authMiddleware(config));
    const { ok, messages } = response.data;

    for(let i=0;i<messages.length;i++){
        const config = { responseType: 'blob'};
        const route = `${API}/api/message/image/${messages[i]._id}`;

        if(messages[i].image) {
            const result = await axios.get(route, config);
            const imgURL = URL.createObjectURL(result.data);
            messages[i].image = imgURL;        
        }
    }

    if(ok){
        authAfterware(response);
        return messages;
    }
}

export const readMessages = async (otherUser) => {
    const config = { headers: {} };

    const response = await axios.put(`${API}/api/message`, { otherUser }, authMiddleware(config));
    
    if(response.data.ok){
        authAfterware(response);
    }

    return response.data;
}

export const getUnreadChats = async () => {
    const config = { headers: {} };

    const response = await axios.get(`${API}/api/message/unread`, authMiddleware(config));
    const { ok, unread } = response.data;

    if(ok){
        authAfterware(response);
    }

    return  ok? unread : 0;
}