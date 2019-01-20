import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';

export default class LocalState {
  static setToken(token) {
    const userToken = CryptoJS.AES.encrypt(token, process.env.HASH_USER);
    return localStorage.setItem('SSID', userToken);
  };

  static checkTokenValidity() {
    const userToken = localStorage.getItem('SSID');
    
    if (userToken) {
      const token = CryptoJS.AES.decrypt(userToken, process.env.HASH_USER)
      
      if (jwt.decode(token.toString(CryptoJS.enc.Utf8)).exp < new Date().getTime/1000) {
        return false;
      }
      return true;
    }
    return false;
  }

  static removeToken() {
    return localStorage.removeItem('SSID');
  }
}