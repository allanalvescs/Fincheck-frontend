export interface Transaction {
    id: string;
    name: string;
    date: string;
    type: "EXPENSE" | "INCOME";
    value: number;
    category: {
        id: string;
        name: string;
        icon: string;
    };
}