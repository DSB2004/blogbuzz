import mysql from "mysql";
import { DB_DATABASE, DB_HOST, DB_USERNAME, DB_PASSWORD } from "@/env";




const DATABASE_INSTANCE = mysql.createPool({
  user: DB_USERNAME,
  database: DB_DATABASE,
  password: DB_PASSWORD,
  host: DB_HOST,
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0,  
  ssl: {
    rejectUnauthorized:true
    // ca: caCertificate ? Buffer.from(caCertificate, 'base64').toString('utf-8') : undefined,
  },
});


DATABASE_INSTANCE.on("acquire", () => console.log("Database Connection Acquired"));
DATABASE_INSTANCE.on("error", (err) => console.error("Database error", err));
DATABASE_INSTANCE.on("release", () => console.log("Database Connection Released"));

export default DATABASE_INSTANCE;
