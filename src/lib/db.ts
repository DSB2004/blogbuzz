import mysql from 'mysql2/promise'; // Import the promise version of mysql2

import { DB_DATABASE, DB_HOST, DB_USERNAME, DB_PASSWORD } from '../env';

const DATABASE_INSTANCE = mysql.createPool({
    user: DB_USERNAME,
    database: DB_DATABASE,
    password: DB_PASSWORD,
    host: DB_HOST,
    ssl: {
        rejectUnauthorized: true,
    },
});

// Event listeners for connection pool
DATABASE_INSTANCE.on('acquire', (connection) => {
    console.log("Database Connected");
});

DATABASE_INSTANCE.on('release', (connection) => {
    console.log("Database Disconnected");
});

export default DATABASE_INSTANCE;
