import pool from '../config/db.config.js';

export interface Cliente {
  id_usuario: number;
  nombre: string;
  email: string;
  telefono: string;
  username: string;
  password_hash: string;
}

const obtenerClientesDB = async () => {
  const result = await pool.query('SELECT id_usuario, nombre, email, telefono, username FROM Usuarios');
  return result.rows;
};

const obtenerClientePorIdDB = async (id: number) => {
  const result = await pool.query(
    'SELECT id_usuario, nombre, email, telefono, username FROM Usuarios WHERE id_usuario = $1',
    [id]
  );
  return result.rows[0];
};

interface CrearCliente {
  nombre: string;
  email: string;
  telefono?: string;
  username: string;
  password: string;
}

const crearClienteDB = async (datos: CrearCliente) => {
  const result = await pool.query(
    `INSERT INTO Usuarios (nombre, email, telefono, username, password_hash)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id_usuario, nombre, email, telefono, username`,
    [datos.nombre, datos.email, datos.telefono || null, datos.username, datos.password]
  );
  return result.rows[0];
};

interface ActualizarCliente {
  nombre: string;
  email: string;
  telefono: string;
}

const actualizarClienteDB = async (id: number, datos: ActualizarCliente) => {
  const result = await pool.query(
    'UPDATE Usuarios SET nombre = $1, email = $2, telefono = $3 WHERE id_usuario = $4 RETURNING id_usuario, nombre, email, telefono, username',
    [datos.nombre, datos.email, datos.telefono, id]
  );
  return result.rows[0];
};

const eliminarClienteDB = async (id: number) => {
  const result = await pool.query(
    'DELETE FROM Usuarios WHERE id_usuario = $1 RETURNING id_usuario, nombre, email, telefono, username',
    [id]
  );
  return result.rows[0];
};

const loginDB = async (username: string, password: string) => {
  const result = await pool.query(
    'SELECT id_usuario, nombre, email, telefono, username FROM Usuarios WHERE username = $1 AND password_hash = $2',
    [username, password]
  );
  return result.rows[0];
};

export const ClienteModel = {
  obtenerClientesDB,
  obtenerClientePorIdDB,
  crearClienteDB,
  actualizarClienteDB,
  eliminarClienteDB,
  loginDB,
};