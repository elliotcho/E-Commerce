import User from '../models/user';
import jwt from 'jsonwebtoken';
import _ from 'lodash';

//create token and refresh token
export const createTokens = async (user, secret, secret2) => {
    const token = jwt.sign({ user: _.pick(user, ['_id', 'isAdmin']) }, secret, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ user: _.pick(user, ['_id', 'isAdmin']) }, secret2, { expiresIn: '7d' });

    return [token, refreshToken];
}

export const refreshTokens = async (token, refreshToken) => {
    let uid;

    try {
        const { user: { _id } } = jwt.decode(refreshToken);
        uid = _id;
    } catch (err) {
        return {};
    }

    //invalid refresh token
    if(!uid){
        return {};
    }

    const user = await User.findOne({ _id: uid });

    //user with decoded id does not exist
    if(!user){
        return {};
    }

    const refreshSecret = user.password + process.env.REFRESH_SECRET;

    try { 
        jwt.verify(refreshToken, refreshSecret);
    } catch (err) {
        return {};
    }

    const [ newToken, newRefreshToken ] = await createTokens(user, process.env.JWT_SECRET, refreshSecret);

    return { 
        token: newToken,
        refreshToken: newRefreshToken,
        user
    };
}