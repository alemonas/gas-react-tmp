import copy from 'copy-to-clipboard';

export const copyToClipboard = (text) => {
    try {
        copy(text);
    } catch (e) {
        console.error('Failed to copy text: ', e);
    }
};
