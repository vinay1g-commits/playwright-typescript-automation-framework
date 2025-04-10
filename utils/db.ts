import mysql from 'mysql2/promise';

export async function query(sql: string, values?: any[]) {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'playwright_db'
  });

  const [results] = await connection.execute(sql, values);
  await connection.end();
  return results;
}
