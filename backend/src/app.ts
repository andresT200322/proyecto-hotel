import express from 'express';
import cors from 'cors';
import path from 'path';
import clientesRoutes from './routes/clientes.routes.js';
import pool from './config/db.config';
import { errorHandler } from './middleware/error.middleware.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/v1/health', (_req, res) => {
  res.json({
    status: 'OK',
  });
});

app.use('/api/v1/clientes', clientesRoutes);

app.use('/fotos', express.static(path.join(__dirname, '..', 'fotos')));

const fotosPorId: Record<number, string> = {
  1: 'fachada101.webp',
  2: 'fachada 102.webp',
  3: 'fachada103.webp',
  4: 'fachada105.webp',
  5: 'fachada casa grande.webp',
};

app.get('/api/v1/tabla', async (_req, res) => {
  try {
    const result = await pool.query(
      'SELECT id_cabana AS id, nombre_cabana AS nombre, descripcion, precio, foto FROM cabañas'
    );
    const rows = result.rows.map((row: any) => ({
      ...row,
      foto: fotosPorId[row.id] || row.foto,
    }));
    res.json(rows);
  } catch (err) {
    console.error('Error en base de datos, usando datos de ejemplo:', (err as Error).message);
    const datosEjemplo = [
      { id: 1, nombre: 'Cabaña Deluxe 101', descripcion: 'Para 2 a 4 personas', precio: 250000, foto: 'fachada101.webp' },
      { id: 2, nombre: 'Cabaña Deluxe 102', descripcion: 'Para 2 a 4 personas', precio: 250000, foto: 'fachada 102.webp' },
      { id: 3, nombre: 'Cabaña Deluxe 103', descripcion: 'Para 2 a 4 personas', precio: 250000, foto: 'fachada103.webp' },
      { id: 4, nombre: 'Cabaña Doble Familiar 105', descripcion: 'Para 5 a 10 personas', precio: 500000, foto: 'fachada105.webp' },
      { id: 5, nombre: 'Casa Familiar Deluxe 104', descripcion: 'Dos pisos para 10 a 14 personas', precio: 800000, foto: 'fachada casa grande.webp' },
    ];
    res.json(datosEjemplo);
  }
});

// Servir el build estático del frontend Angular en producción (después de las rutas API)
const frontendDist = path.join(__dirname, '..', '..', 'frontend', 'dist', 'hotel', 'browser');
app.use(express.static(frontendDist));

// Fallback para que Angular maneje las rutas (SPA)
app.use((req, res, next) => {
  res.sendFile(path.join(frontendDist, 'index.html'), (err) => {
    if (err) next(err);
  });
});

app.use(errorHandler);

export default app;