import axios from 'axios';

const ApiCall = async ({ url, method, data }) => {
    const res = await axios({
        method: method,
        url: `/api/v1/user/${url}`,
        headers: {
            "Content-Type": "application/json"
        },
        data: data
    })
    return res
}
export default ApiCall;

