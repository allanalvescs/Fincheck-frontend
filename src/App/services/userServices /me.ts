import api from "../HttpClient";

export interface SignInBody {
    email: string,
    password: string,
}

interface AxiosResponseSingIn {
    accessToken: string
}

export async function me() {
    const { data } = await api.get<AxiosResponseSingIn>('/users/me')

    return data
}