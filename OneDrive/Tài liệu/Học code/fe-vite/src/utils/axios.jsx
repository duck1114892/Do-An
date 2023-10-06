import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL
const instance = axios.create({
    withCredentials: true,
    baseURL: baseURL,
});
instance.defaults.headers.common = { 'Authorization': `Bearer ${localStorage.getItem('access_token')}` }
const handleRefreshToken = async () => {
    const res = await instance.get('/api/v1/auth/refresh')
    if (res && res.data) return res.data.access_token
    else return null
}
const NO_RETRY_HEADER = 'no_value'
instance.interceptors.request.use(function (config) {
    return config;
}, function (error) {

    return Promise.reject(error);
});


instance.interceptors.response.use(function (response) {

    return response && response.data ? response.data : response;
},
    async function (error) {

        if (error.config && error.response && +error.response.status === 401 && !error.config.headers[NO_RETRY_HEADER]) {
            const access_token = handleRefreshToken()
            error.config.headers[NO_RETRY_HEADER] = 'true'
            if (access_token) {
                error.config.headers['Authorization'] = `Bearer ${access_token}`
                localStorage.setItem('access_token', access_token)
                return instance.request(error.config);
            }

        }



        return error?.response?.data ?? Promise.reject(error)
    });
export default instance