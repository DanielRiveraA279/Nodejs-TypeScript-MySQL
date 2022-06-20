import { MovementType } from "../../../common/enums/movement-type";

export interface Movement { 
    id: number;
    user_id: number;
    type: MovementType; // 1: income(entrada), 2: outcome(salida) de un caso
    amount: number;
    created_at: Date | null;
    updated_at: Date | null;
}