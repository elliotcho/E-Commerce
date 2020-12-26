import { API } from '../constants';
import { authMiddleware } from '../utils/authMiddlware';
import { authAfterware } from '../utils/authAfterware';
import axios from 'axios';

export const sendMessage = async(data) => {
    const config = {headers: {'content-type': 'application/json'}};
    const res = await axios.post(`${API}/api/message/createMessage`, {data}, authMiddleware(config));
    authAfterware(config);
    const result = res.data;
    return result;
}