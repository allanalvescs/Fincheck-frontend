import { Transaction } from "../../entities/Transaction";
import api from "../HttpClient";

export type TransactionsResponse = Array<Transaction>

export type TransactionsFilters = {
    month: number;
    year: number;
    bankAccountId?: string;
    type?: Transaction["type"];
}

export async function getAll(filters: TransactionsFilters) {
    const { data } = await api.get<TransactionsResponse>("/transactions", {
        params: filters
    });

    return data;
}