import { getUserInfo, getProfilePic } from '../api/user';

export const fetchUser = async (userId) => {
    const picturePromise = getProfilePic(userId);
    const userPromise = getUserInfo(userId);

    const [imgURL, user] = await Promise.all([picturePromise, userPromise]);

    return { imgURL, user };
}