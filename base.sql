use dbvillanueva;

CREATE TABLE usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre_usuario VARCHAR(50) NOT NULL,
  password VARCHAR(100) NOT NULL,
  tipo_usuario ENUM('normal', 'administrador') NOT NULL
);

INSERT INTO usuarios (nombre_usuario, password, tipo_usuario) VALUES ('Aldair', '123456', 'administrador');

select * from usuarios
