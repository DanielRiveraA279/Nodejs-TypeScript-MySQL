//estructura de tipado de la tabla
export interface Subscription {
    id: number;
    code: string;
    user_id: number;
    amount: number;
    cron: string;
    create_at: Date | null;
    updated_at: Date | null;
}