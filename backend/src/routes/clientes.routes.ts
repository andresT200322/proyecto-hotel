import { Router } from 'express';
import {
  obtenerClientes,
  obtenerClientePorId,
  crearCliente,
  actualizarCliente,
  eliminarCliente,
  login,  // <--- Agregado
} from '../controllers/clientes.controllers.js';

const router = Router();

router.get('/', obtenerClientes);
router.get('/:id', obtenerClientePorId);
router.post('/', crearCliente);
router.put('/:id', actualizarCliente);
router.delete('/:id', eliminarCliente);
router.post('/login', login);  // <--- Agregado: ruta de login

export default router;