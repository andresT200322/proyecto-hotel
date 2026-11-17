export interface Cliente {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  fecha_creacion: Date;
  usuario: string;    // <--- Agregado para login
  password_hash: string; // <--- Agregado para login
}

export const clientesDB: Cliente[] = [
  {
    id: 1,
    nombre: 'Juan Perez',
    email: 'juan@mail.com',
    telefono: '999888777',
    fecha_creacion: new Date('2026-10-01'),
    usuario: 'juanperez',    // <--- Usuario de prueba
    password_hash: '123456'  // <--- Contraseña de prueba (en producción usaría hash)
  },
  {
    id: 2,
    nombre: 'Maria Lopez',
    email: 'maria@mail.com',
    telefono: '988777666',
    fecha_creacion: new Date('2026-10-02'),
    usuario: 'marielopez',    // <--- Usuario de prueba
    password_hash: 'abcdef'   // <--- Contraseña de prueba
  },
];

export function obtenerSiguienteId(): number {
  if (clientesDB.length === 0) return 1;
  const maxId = Math.max(...clientesDB.map((cliente) => cliente.id));
  return maxId + 1;
}