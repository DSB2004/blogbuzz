import { Pool, PoolConnection } from 'mysql2/promise'; 

export const getConnection = async (pool: Pool): Promise<PoolConnection> => {
    try {
        const connection = await pool.getConnection();
        return connection;
    } catch (err) {
        console.error(err);
        throw new Error(`CONNECTION_ERROR ${err}`);
    }
};

export const executeQuery = async (connection: PoolConnection, SQL: string, values?: any[]): Promise<any> => {
    try {
        const [result] = await connection.query(SQL, values);
        return result;
    } catch (err) {

        // @ts-ignore
        switch (err.code) {
            case 'ER_DUP_ENTRY':
                throw new Error('ERR_DUPLICATE_VALUE');
            case 'ER_BAD_FIELD_ERROR':
                throw new Error('ERR_SQL_QUERY');
            case 'PROTOCOL_CONNECTION_LOST':
            case 'ECONNREFUSED':
            case 'ER_CON_COUNT_ERROR':
                throw new Error('ERR_DATABASE_CONNECTION');
            default:
                    // @ts-ignore
                throw new Error(err.code);
        }
    }
};
