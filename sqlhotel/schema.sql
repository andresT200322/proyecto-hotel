-- =============================================
-- Base de datos: sqlhotel
-- Proyecto Hotel
-- =============================================

CREATE TABLE Usuarios (
  id_usuario SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefono VARCHAR(50),
  username VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL
);

CREATE TABLE cabañas (
  id_cabana SERIAL PRIMARY KEY,
  nombre_cabana VARCHAR(255) NOT NULL,
  descripcion VARCHAR(500),
  precio INT,
  foto VARCHAR(255)
);
