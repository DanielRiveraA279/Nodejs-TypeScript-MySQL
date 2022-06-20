import connector from '../../../../common/persistence/mysql.persistence';
import { Subscription } from '../../domain/subscription';
import { SubscriptionRepository } from '../../subscription.repository';

//si o si tiene que cumplir con los contratos que dice la interface
export class SubscriptionMySQLRepository implements SubscriptionRepository {
    
    public async all(): Promise<Subscription[]> { //promesa que devuelve todos los registros de la tabla
        const [rows] = await connector.execute(
            'SELECT * FROM wallet_subscription ORDER BY id DESC'
        );

        return rows as Subscription[]; //retornamos array
    }

    //Buscar un registro por id
    public async find(id: number): Promise<Subscription | null> { //promesa que devuelve todos los registros de la tabla
        const [rows]: any[] = await connector.execute(
            'SELECT * FROM wallet_subscription WHERE id = ?', [id] //El signo de ? es para evitar inyeccion de sql
        );

        if(rows.length) {
            return rows[0] as Subscription; //retornamos primer registro como una estrucra de subscription
        }

        return null;
    }

    public async findByUserAndCode(user_id: number, code: string): Promise<Subscription | null> { //promesa que devuelve todos los registros de la tabla
        const [rows]: any[] = await connector.execute(
            'SELECT * FROM wallet_subscription WHERE id = ? AND code = ?', [user_id, code]
        );

        if(rows.length) {
            return rows[0] as Subscription; //retornamos primer registro como una estrucra de subscription
        }

        return null;
    }

    //Agregar nuevo Registro
    public async store(entry:Subscription): Promise<void> {
        const now = new Date();

        await connector.execute(
            'INSERT INTO wallet_subscription (user_id, code, amount, cron, created_at) VALUES (?, ?, ?, ?, ?)',
            [entry.user_id, entry.code, entry.amount, entry.cron, now]
        );
    }

    //Actualizar Registro
    public async update(entry:Subscription): Promise<void> {
        const now = new Date();

        await connector.execute(
            'UPDATE wallet_subscription SET user_id = ?, code = ?, amount = ?, cron = ?, updated_at = ? WHERE id = ?',
            [entry.user_id, entry.code, entry.amount, entry.cron, now, entry.id]
        );
    }

    public async remove(id: number): Promise<void> {

        await connector.execute(
            'DELETE FROM wallet_subscription WHERE id = ?', [id]
        );
    }

}