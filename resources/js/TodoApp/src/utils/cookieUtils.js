import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

const secretKey = 'TodoApp-Key51421$%(*#$Efdgfd45';

export const setEncryptedCookie = (name, value, days) => {
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(value), secretKey).toString();
    Cookies.set(name, encrypted, { expires: days })
};

export const getDecryptedCookie = (name) => {
    const encrypted = Cookies.get(name);
    if (!encrypted) return null;
    try {
        const bytes = CryptoJS.AES.decrypt(encrypted, secretKey);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        return JSON.parse(decrypted);
    } catch {
        return null;
    }
};

export const removeCookie = (name) => {
    Cookies.remove(name);
};