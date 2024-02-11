import api from "../HttpClient";

export interface SignInBody {
    email: string,
    password: string,
}

interface AxiosResponseSingIn {
    accessToken: string
}

export async function signIn(body: SignInBody) {
    const { data } = await api.post<AxiosResponseSingIn>('/auth/signin', body)

    return data
}