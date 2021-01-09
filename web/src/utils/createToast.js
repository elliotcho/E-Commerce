import { fetchUser } from './fetchUser';
import Toast from '../components/layout/Toast';
import { toast } from 'react-toastify';

export const createToast = async (data)  => {
    if(data){
        const { user: { _id, username }, imgURL } = await fetchUser(data.sender);

        const props = { 
            userId: _id,
            content: data.content, 
            username, 
            imgURL 
        };

        toast.success(<Toast {...props} />, {
          position: toast.POSITION.BOTTOM_RIGHT,
          draggable: false
        });
    }
}