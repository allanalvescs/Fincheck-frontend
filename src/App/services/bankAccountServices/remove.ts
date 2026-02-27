import api from "../HttpClient";


export async function remove(bankAccountId: string) {
    const { data } = await api.delete(`/bank-accounts/${bankAccountId}`);

    return data;
}