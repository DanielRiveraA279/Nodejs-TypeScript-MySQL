import { Subscription } from "./domain/subscription";

//esto crea la estructura de interfaces para los metodos de consultas SQL que estan enlazados
export interface SubscriptionRepository {
    all(): Promise<Subscription[]>;
    find(id: number): Promise<Subscription | null>;
    findByUserAndCode(user_id: number, code: string): Promise<Subscription | null>;
    store(entry:Subscription): Promise<void>;
    update(entry:Subscription): Promise<void>;
    remove(id: number): Promise<void>;
}