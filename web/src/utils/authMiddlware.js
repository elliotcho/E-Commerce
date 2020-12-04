export const authMiddleware = (config) => {
    const { headers } = config;

    const token = window.localStorage.getItem('token');
    const refreshToken = window.localStorage.getItem('refreshToken');

    if(token){
        headers['x-token'] = token;
    }

    if(refreshToken){
        headers['x-refresh-token'] = refreshToken;
    }

    return config;
}