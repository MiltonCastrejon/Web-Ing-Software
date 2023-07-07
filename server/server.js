import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://localhost:5173'],
    methods: ['POST', 'GET', 'PUT', 'DELETE'],
    credentials: true,
  })
);

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '280506',
  database: 'dbvillanueva',
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión a la base de datos establecida correctamente');
});

const generateToken = (name) => {
  return jwt.sign({ name }, 'our-jsonwebtoken-secret-key', {
    expiresIn: '1d',
  });
};

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.json({ message: 'Acceso denegado' });
  else {
    jwt.verify(token, 'our-jsonwebtoken-secret-key', (err, decoded) => {
      if (err) {
        return res.json({ message: 'Error de autenticación' });
      } else {
        req.name = decoded.name;
        next();
      }
    });
  }
};

app.get('/', verifyUser, (req, res, next) => {
  return res.json({ status: 'Bienvenido', name: req.name });
});

app.post('/login', (req, res) => {
  const sql =
    'SELECT * FROM usuarios WHERE nombre_usuario = ? AND password = ?';
  db.query(sql, [req.body.usuario, req.body.password], (err, data) => {
    if (err) return res.json({ message: 'Error con la base de datos' });
    if (data.length > 0) {
      const name = data[0].name;
      const token = generateToken(name); // Generar el token utilizando la función generateToken
      res.cookie('token', token);
      return res.json({ status: 'Bienvenido', token });
    } else {
      return res.json({ message: 'Usuario o contraseña incorrectos' });
    }
  });
});

app.get('/logout', (req, res) => {
  res.clearCookie('token', { sameSite: 'none', secure: true });
  return res.json({ message: 'Sesión cerrada' });
});

app.post('/Proveedores', verifyUser, (req, res) => {
  const { nombre, direccion, telefono } = req.body;

  const sql =
    'INSERT INTO proveedores (nombre, direccion, telefono) VALUES (?, ?, ?)';
  db.query(sql, [nombre, direccion, telefono], (err, result) => {
    if (err) {
      console.error('Error al guardar los datos del proveedor:', err);
      return res
        .status(500)
        .json({ message: 'Error al guardar los datos del proveedor' });
    }
    return res
      .status(200)
      .json({ message: 'Datos del proveedor guardados correctamente' });
  });
});
app.get('/Proveedores', verifyUser, (req, res) => {
  const sql = 'SELECT * FROM proveedores';
  db.query(sql, (err, data) => {
    if (err) {
      console.error('Error al obtener los proveedores:', err);
      return res
        .status(500)
        .json({ message: 'Error al obtener los proveedores' });
    }
    return res.status(200).json(data);
  });
});
app.put('/Proveedores/:id', verifyUser, (req, res) => {
  const proveedorId = req.params.id;
  const { nombre, direccion, telefono } = req.body;

  const sql =
    'UPDATE proveedores SET nombre = ?, direccion = ?, telefono = ? WHERE id = ?';
  db.query(sql, [nombre, direccion, telefono, proveedorId], (err, result) => {
    if (err) {
      console.error('Error al actualizar los datos del proveedor:', err);
      return res
        .status(500)
        .json({ message: 'Error al actualizar los datos del proveedor' });
    }
    return res
      .status(200)
      .json({ message: 'Datos del proveedor actualizados correctamente' });
  });
});

app.delete('/Proveedores/:id', verifyUser, (req, res) => {
  const proveedorId = req.params.id;

  const sql = 'DELETE FROM proveedores WHERE id = ?';
  db.query(sql, [proveedorId], (err, result) => {
    if (err) {
      console.error('Error al eliminar el proveedor:', err);
      return res
        .status(500)
        .json({ message: 'Error al eliminar el proveedor' });
    }
    return res
      .status(200)
      .json({ message: 'Proveedor eliminado correctamente' });
  });
});

app.get('/productos', verifyUser, (req, res) => {
  const sql = 'SELECT nombre,imagen, precio, descripcion FROM productos';
  db.query(sql, (err, data) => {
    if (err) {
      console.error('Error al obtener los productos:', err);
      return res
        .status(500)
        .json({ message: 'Error al obtener los productos' });
    }
    return res.status(200).json(data);
  });
});

app.post('/productos', verifyUser, (req, res) => {
  const { nombre, imagen, precio, descripcion } = req.body;

  const sql =
    'INSERT INTO productos (nombre, imagen, precio, descripcion) VALUES (?, ?, ?, ?)';
  db.query(sql, [nombre, imagen, precio, descripcion], (err, result) => {
    if (err) {
      console.error('Error al guardar los datos del producto:', err);
      return res
        .status(500)
        .json({ message: 'Error al guardar los datos del producto' });
    }
    return res
      .status(200)
      .json({ message: 'Datos del producto guardados correctamente' });
  });
});

app.get('/productos/:id/imagen', (req, res) => {
  const productId = req.params.id;
  const sql = 'SELECT imagen FROM productos WHERE id = ?';
  db.query(sql, [productId], (err, data) => {
    if (err) {
      console.error('Error al obtener la imagen del producto:', err);
      return res
        .status(500)
        .json({ message: 'Error al obtener la imagen del producto' });
    }
    if (data.length === 0 || !data[0].imagen) {
      return res.status(404).json({ message: 'Imagen no encontrada' });
    }
    // Devuelve los datos binarios de la imagen al cliente
    const imageBuffer = data[0].imagen;
    res.writeHead(200, {
      'Content-Type': 'image/png', // Ajusta el tipo de contenido según el tipo de imagen
      'Content-Length': imageBuffer.length,
    });
    return res.end(imageBuffer);
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
