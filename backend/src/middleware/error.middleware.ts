import type { NextFunction, Request, Response } from 'express';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  console.error(err);
  res.status(500).json({
    message: 'Error interno del servidor',
  });
}

// aca es un extra para que el backend no siga si hay un error
