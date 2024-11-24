import { createPool } from "mysql2/promise";


const db = createPool({
  host: "saralin-db.cdgiyweqkb7z.ap-southeast-2.rds.amazonaws.com",
  user: "admin",
  password: "saralinsecret",
  database: "saralinDB",
  port: 3306,
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