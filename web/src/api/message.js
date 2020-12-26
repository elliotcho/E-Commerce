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