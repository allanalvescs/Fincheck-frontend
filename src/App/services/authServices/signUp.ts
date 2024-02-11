import api from "../HttpClient";

export interface SignUpBody {
    name: string,
    email: string,
    password: string,
}

interface AxiosResponseSingUp {
    accessToken: string
}

export async function signUp(body: SignUpBody) {
    const { data } = await api.post<AxiosResponseSingUp>('/auth/signup', body)

    return data
}