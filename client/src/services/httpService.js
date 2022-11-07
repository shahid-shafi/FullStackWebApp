import axios from "axios";
import Swal from "sweetalert2";

axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT;
axios.interceptors.response.use(null, (error) => {
    const expectedError =
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500;
    if (expectedError) {
        let errorMessage = "An Unexpected error occurred";
        if (error.response) {
            if (error.response.status === 400) errorMessage = "Its a bad request";
            else if (error.response.status === 401)
                errorMessage = "You are not authorized. Please login again";
            else if (error.response.status === 403)
                errorMessage = "Access is forbidden";
            else if (error.response.status === 500)
                errorMessage = "Internal server error occurred";
        } else {
            errorMessage = "Network error occurred.";
        }

        Swal.fire({
            title: "Oops!",
            text: errorMessage,
            icon: "error",
            confirmButtonColor: "#0033a0",
            confirmButtonText: "Ok",
            customClass: "buttonTextColor",
        });
    }
    return Promise.reject(error);
});

const config = () => {
    let configObject = {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
        },
    };
    return configObject;
};

const HttpService = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    config: config,
};

export default HttpService;