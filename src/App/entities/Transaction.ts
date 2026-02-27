export interface Transaction {
    value: number;
    name: string;
    categoryId: string;
    bankAccountId: string;
    date: string;
    type: "EXPENSE" | "INCOME";
}