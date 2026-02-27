import api from "../HttpClient";

type BankAccountResponse = {
    id: string,
    name: string,
    initialBalance: number,
    type: "CHECKING" | "INVESTMENT" | "CASH",
    color: string,
    currentBalance: number,
}

export async function getAll() {
    const { data } = await api.get<BankAccountResponse[]>("/bank-accounts");

    return data;
}