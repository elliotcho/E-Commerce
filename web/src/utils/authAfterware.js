export const afterMiddleware = (response) => {
    const { headers } = response; 

    const token = headers['x-token'];
    const refreshToken = headers['x-refresh-token'];

    window.localStorage.setItem('token', token);
    window.localStorage.setItem('refreshToken', refreshToken);
}