alter user 'root'@'localhost' identified with mysql_native_password by '280506';
create database dbvillanueva;
use dbvillanueva;

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre_usuario VARCHAR(50) NOT NULL,
  password VARCHAR(100) NOT NULL,
  tipo_usuario ENUM('normal', 'administrador') NOT NULL
);

INSERT INTO usuarios (nombre_usuario, password, tipo_usuario) VALUES ('Aldair', '123456', 'administrador');

select * from usuarios;

CREATE TABLE proveedores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  direccion VARCHAR(100) NOT NULL,
  telefono VARCHAR(20) NOT NULL
);
