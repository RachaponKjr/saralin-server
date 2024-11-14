import { createPool } from "mysql2/promise";


const db = createPool({
  host: "localhost",
  user: "root",
  password: "saralin",
  database: "saralinDB",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

db.getConnection()
  .then((connection) => {
    console.log('DB Connected');
    connection.release();
  })
  .catch((err) => {
    console.error('DB Connection Failed:', err);
  });

export default db;