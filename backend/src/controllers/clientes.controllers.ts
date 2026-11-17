import { Request, Response } from 'express';
import { ClienteModel } from '../models/cliente.model.js';

export const obtenerClientes = async (_req: Request, res: Response) => {
  try {
    const clientes = await ClienteModel.obtenerClientesDB();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener clientes', exito: false });
  }
};

export const obtenerClientePorId = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const cliente = await ClienteModel.obtenerClientePorIdDB(id);

    if (!cliente) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado', exito: false });
    }

    res.json(cliente);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener cliente', exito: false });
  }
};

export const crearCliente = async (req: Request, res: Response) => {
  try {
    const { nombre, email, telefono, username, password } = req.body;

    if (!nombre || !email || !username || !password) {
      return res.status(400).json({
        mensaje: 'nombre, email, username y password son requeridos',
        exito: false,
      });
    }

    const cliente = await ClienteModel.crearClienteDB({
      nombre,
      email,
      telefono,
      username,
      password,
    });

    res.status(201).json({ mensaje: 'Usuario registrado', exito: true, usuario: cliente });
  } catch (error: any) {
    if (error?.code === '23505') {
      return res.status(409).json({ mensaje: 'El usuario o email ya existe', exito: false });
    }
    res.status(500).json({ mensaje: 'Error al registrar usuario', exito: false });
  }
};

export const actualizarCliente = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const cliente = await ClienteModel.actualizarClienteDB(id, req.body);

    if (!cliente) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado', exito: false });
    }

    res.json({ mensaje: 'Cliente actualizado', exito: true, cliente });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar cliente', exito: false });
  }
};

export const eliminarCliente = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const eliminado = await ClienteModel.eliminarClienteDB(id);

    if (!eliminado) {
      return res.status(404).json({ mensaje: 'Cliente no encontrado', exito: false });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar cliente', exito: false });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { usuario, username, password } = req.body;
    const user = usuario || username;

    if (!user || !password) {
      return res.status(400).json({
        mensaje: 'Usuario y contraseña son requeridos',
        exito: false,
      });
    }

    const usuarioEncontrado = await ClienteModel.loginDB(user, password);

    if (usuarioEncontrado) {
      return res.status(200).json({
        mensaje: 'Login exitoso',
        exito: true,
        usuario: {
          id: usuarioEncontrado.id_usuario,
          nombre: usuarioEncontrado.nombre,
          email: usuarioEncontrado.email,
          username: usuarioEncontrado.username,
        },
      });
    }

    return res.status(401).json({
      mensaje: 'Usuario o contraseña incorrectos',
      exito: false,
    });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({
      mensaje: 'Error interno del servidor',
      exito: false,
    });
  }
};