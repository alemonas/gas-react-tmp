import { encode } from 'js-base64';

export const getEncodedUserEmail = (email) => {
    const cleanEmail = email.replace(/['"]+/g, '');
    return encode(cleanEmail);
};
