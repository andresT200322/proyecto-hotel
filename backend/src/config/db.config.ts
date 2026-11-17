import { Pool } from 'pg';

// Configuración de conexión a PostgreSQL
// Contraseña: 200309 (según indicó el usuario)
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sqlhotel',
  port: 5432,
  password: '200309',
});

pool.on('connect', (client) => {
  console.log('📊 Conectado a PostgreSQL');
});

pool.on('error', (err) => {
  console.error('❌ Error en la base de datos', err);
  process.exit(-1);
});

export default pool;