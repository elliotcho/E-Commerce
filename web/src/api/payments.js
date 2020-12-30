import { API } from '../constants';
import { authMiddleware } from '../utils/authMiddlware';
import { authAfterware } from '../utils/authAfterware';
import axios from 'axios';

//data = {nonce, verification, uuid}
export const sendNonce = async(data) =>{
    const config = {headers: {'content-type': 'application/json'}};
    
    const response = await axios.post(`${API}/api/payment/send_payment`, data, authMiddleware(config));

    authAfterware(response);
    console.log("Web APi: " + response.data.result);
    return response.data.result;
}