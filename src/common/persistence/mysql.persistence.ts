import {createPool} from 'mysql2/promise'; //para que trabaja con las promesas


//configuramos conexion a mysql
export default createPool({
    host: process.env.db_mysql_host,
    user: process.env.db_mysql_user,
    password: process.env.db_mysql_password,
    database: process.env.db_mysql_database,
    decimalNumbers: true //reconocer numero decimales tambien
});