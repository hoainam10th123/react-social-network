import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { history } from "..";
import { IUser, UserLogin } from "../models/user";
import { store } from "../stores/stores";

const sleep = (delay: number) => {
    return new Promise((resolve => {
        setTimeout(resolve, delay)
    }))
}

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use(config => {
    const token = store.userStore.user?.token;
    if (token) config.headers!.Authorization = `Bearer ${token}`
    return config;
})

axios.interceptors.response.use(async respone => {
    if (process.env.NODE_ENV === 'development') await sleep(1000);
    return respone;
}, (error: AxiosError) => {
    const { data, status, config } = error.response!;
    switch (status) {
        case 400:
            const dulieu = data as any;
            if (dulieu.errors) {
                const modelStateErrors = [];
                for (const key in dulieu.errors) {
                    if (dulieu.errors[key]) {
                        modelStateErrors.push(dulieu.errors[key]);
                    }
                }
                throw modelStateErrors.flat();
            } else {
                toast.error(dulieu);
            }
            break;
        case 401:
            toast.error('unauthorised!');
            break;
        case 404:
            history.push('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data as any);
            history.push('/server-error');
            break;
        default:
            console.log(data);
            toast.error(status.toString() + ' see console');
            break;
    }
    return Promise.reject(error);
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Account = {
    current: () => requests.get<IUser>('account'),
    login: (user: UserLogin) => requests.post<IUser>('account/login', user),
}

const RecordFile = {
    saveRecoredFile: (formData: any) => requests.post('RecordVideo', formData),
}


const agent = {
    Account,
    RecordFile,
}

export default agent;