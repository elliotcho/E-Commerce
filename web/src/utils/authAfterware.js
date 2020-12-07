export const authAfterware = (response) => {
    const { headers } = response; 

    const token = headers['x-token'];
    const refreshToken = headers['x-refresh-token'];

    if(token){
        window.localStorage.setItem('token', token);
    }

    if(refreshToken){
        window.localStorage.setItem('refreshToken', refreshToken);
    }
}