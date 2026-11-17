import { Pool } from 'pg';

// Configuración de conexión a PostgreSQL
// En producción usa DATABASE_URL o variables de entorno (Render, Railway, etc.)
const pool = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
      }
    : {
        user: process.env.DB_USER || 'postgres',
        host: process.env.DB_HOST || 'localhost',
        database: process.env.DB_NAME || 'sqlhotel',
        port: Number(process.env.DB_PORT) || 5432,
        password: process.env.DB_PASSWORD || '200309',
      }
);

pool.on('connect', (client) => {
  console.log('📊 Conectado a PostgreSQL');
});

pool.on('error', (err) => {
  console.error('❌ Error en la base de datos', err);
  process.exit(-1);
});

export default pool;
