import api from "../HttpClient";

export interface CreateTransactionParams {
    name: string;
    value: number;
    categoryId: string;
    bankAccountId: string;
    date: string;
    type: "EXPENSE" | "INCOME"
}

export async function create(params: CreateTransactionParams) {
    const { data } = await api.post("/transactions", params);

    return data;
}