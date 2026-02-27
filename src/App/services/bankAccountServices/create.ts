import api from "../HttpClient";

export interface CreateBankAccountParams {
    name: string;
    initialBalance: number;
    color: string;
    type: "CHECKING" | "INVESTMENT" | "CASH"
}

export async function create(params: CreateBankAccountParams) {
    const { data } = await api.post("/bank-accounts", params);

    return data;
}