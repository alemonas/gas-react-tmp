export const getEmailLocalPart = (email = '') => {
    return email.split('@')[0].replace(/['"]+/g, '');
};
