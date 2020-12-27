import { API } from '../constants';
import { authMiddleware } from '../utils/authMiddlware';
import { authAfterware } from '../utils/authAfterware';
import axios from 'axios';

export const sendMessage = async (data) => {
    const config = {headers: {'content-type': 'application/json'}};
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

    if(ok){
        authAfterware(response);
        return messages;
    }
}