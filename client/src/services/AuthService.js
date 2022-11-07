import http from "./httpService";
import { LOGIN, FORGET_PASSWORD } from "../utils/ApiUrls";
const login = async (data) => {
    try {
        var response = await http.post(LOGIN, {
            data,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

// const register = async (slug, pageNumber, pageSize) => {
//     try {
//         var response = await (http.get(`public/gallery-images?slug=${slug}&pageNumber=${pageNumber}&pageSize=${pageSize}`));
//         return response.data;
//     } catch (error) {
//         throw error;
//     }
// }

const forgetPassword = async (data) => {
    try {
        var response = await http.post(FORGET_PASSWORD, { data });
        return response.data;
    } catch (error) {
        throw error;
    }
}

const AuthService = {
    login,
    // register,
    forgetPassword
}

export default AuthService;







// await AuthService.forgetPassword({ email })
//     .then((response) => {
//         console.log(response);
//         // setResponse(response.data.);
//     }).catch((error) => {
//         setError("Failed to send email");
//     });