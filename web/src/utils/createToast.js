import { fetchUser } from './fetchUser';
import MessageToast from '../components/layout/MessageToast';
import InfoToast from '../components/layout/InfoToast';
import { toast } from 'react-toastify';

export const createMessageToast = async (data)  => {
    if(data){
        const { user: { _id, username }, imgURL } = await fetchUser(data.sender);

        const props = { 
            userId: _id,
            content: data.content, 
            username, 
            imgURL 
        };

        toast.success(<MessageToast {...props} />, {
          position: toast.POSITION.BOTTOM_RIGHT,
          draggable: false
        });
    }
}

export const createErrorToast = (text) => {
    toast.error(<InfoToast text={text} />, {
        position: toast.POSITION.BOTTOM_RIGHT,
        draggable: false
    });
}

export const createSuccessToast = (text) => {
    toast.success(<InfoToast text={text} />, {
        position: toast.POSITION.BOTTOM_RIGHT,
        draggable: false
    });
}