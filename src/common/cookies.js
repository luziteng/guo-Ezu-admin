import Cookies from 'js-cookie'

const prefix = "AFT-OVERALL-ADMIN";

export default {
    setCookies: (key, val, expires) => {
        Cookies.set(prefix + key, val, { expires: expires });
    },
    getCookies: key => {
        return Cookies.get(prefix + key);
    },
    removeCookies: key => {
        Cookies.remove(prefix + key);
    },
    getCasToken() {
        return Cookies.get(prefix + 'token')
    }
}