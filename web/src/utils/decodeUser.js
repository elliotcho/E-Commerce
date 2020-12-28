import decode from 'jwt-decode';

export const decodeUser = () => {
    try { 
        const token = localStorage.getItem('token');
        const { user } = decode(token);

        return user;
    } catch (err) { 
        return null;
    }
}