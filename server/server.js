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
app.delete('/Productos/:idProductos', verifyUser, (req, res) => {
  const productoId = req.params.idProductos;

  const sql = 'DELETE FROM productos WHERE idProductos = ?';
  db.query(sql, [productoId], (err, result) => {
    if (err) {
      console.error('Error al eliminar el producto:', err);
      return res.status(500).json({ message: 'Error al eliminar el producto' });
    }
    return res
      .status(200)
      .json({ message: 'Producto eliminado correctamente' });
  });
});
app.get('/Productos', verifyUser, (req, res) => {
  const sql = 'SELECT * FROM productos';
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
app.put('/Productos/:idProductos', verifyUser, (req, res) => {
  const productoId = req.params.idProductos;
  const { categoriaId, nombre, descripcion, precio, stock, fabricante } =
    req.body;

  const sql =
    'UPDATE productos SET categoriaId = ?, nombre = ?, descripcion = ?, precio = ?, stock = ?, fabricante = ? WHERE idProductos = ?';
  db.query(
    sql,
    [categoriaId, nombre, descripcion, precio, stock, fabricante, productoId],
    (err, result) => {
      if (err) {
        console.error('Error al actualizar los datos del producto:', err);
        return res
          .status(500)
          .json({ message: 'Error al actualizar los datos del producto' });
      }
      return res.status(200).json({
        message: 'Datos del producto actualizados correctamente',
      });
    }
  );
});
app.post('/Productos', verifyUser, (req, res) => {
  const { categoriaId, nombre, descripcion, precio, stock, fabricante } =
    req.body;

  const sql =
    'INSERT INTO productos (categoriaId, nombre, descripcion, precio, stock, fabricante) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(
    sql,
    [req.body.categoriaId, nombre, descripcion, precio, stock, fabricante],
    (err, result) => {
      if (err) {
        console.error('Error al guardar los datos del producto:', err);
        return res
          .status(500)
          .json({ message: 'Error al guardar los datos del producto' });
      }
      return res
        .status(200)
        .json({ message: 'Datos del producto guardados correctamente' });
    }
  );
});
app.get('/Categorias', verifyUser, (req, res) => {
  const sql = 'SELECT * FROM categorias';
  db.query(sql, (err, data) => {
    if (err) {
      console.error('Error al obtener las categorías:', err);
      return res
        .status(500)
        .json({ message: 'Error al obtener las categorías' });
    }
    return res.status(200).json(data);
  });
});
app.post('/Categorias', verifyUser, (req, res) => {
  const { nombrecategoria, descripcionCategoria } = req.body;

  const sql =
    'INSERT INTO categorias(nombrecategoria, descripcionCategoria) VALUES (?, ?)';
  db.query(sql, [nombrecategoria, descripcionCategoria], (err, result) => {
    if (err) {
      console.error('Error al guardar los datos de la categoría:', err);
      return res
        .status(500)
        .json({ message: 'Error al guardar los datos de la categoría' });
    }
    return res
      .status(200)
      .json({ message: 'Datos de la categoría guardados correctamente' });
  });
});
app.delete('/Categorias/:idCategoria', verifyUser, (req, res) => {
  const categoriaId = req.params.idCategoria;

  const sql = 'DELETE FROM categorias WHERE idCategoria = ?';
  db.query(sql, [categoriaId], (err, result) => {
    if (err) {
      console.error('Error al eliminar la categoría:', err);
      return res
        .status(500)
        .json({ message: 'Error al eliminar la categoría' });
    }
    return res
      .status(200)
      .json({ message: 'Categoría eliminada correctamente' });
  });
});
app.put('/Categorias/:idCategoria', verifyUser, (req, res) => {
  const categoriaId = req.params.idCategoria;
  const { nombrecategoria, descripcionCategoria } = req.body;

  const sql =
    'UPDATE categorias SET nombrecategoria = ?, descripcionCategoria = ? WHERE idCategoria = ?';
  db.query(
    sql,
    [nombrecategoria, descripcionCategoria, categoriaId],
    (err, result) => {
      if (err) {
        console.error('Error al actualizar los datos de la categoría:', err);
        return res
          .status(500)
          .json({ message: 'Error al actualizar los datos de la categoría' });
      }
      return res.status(200).json({
        message: 'Datos de la categoría actualizados correctamente',
      });
    }
  );
});
app.get('/DetalleVenta', verifyUser, (req, res) => {
  const sql = 'SELECT * FROM detalleventa';
  db.query(sql, (err, data) => {
    if (err) {
      console.error('Error al obtener los detalles de venta:', err);
      return res
        .status(500)
        .json({ message: 'Error al obtener los detalles de venta' });
    }
    return res.status(200).json(data);
  });
});
app.get('/Ventas', verifyUser, (req, res) => {
  const sql =
    'SELECT  DetalleVenta.idDetalleVenta,  Ventas.idVenta,  clientes.NombreCliente,  productos.nombre,  Ventas.fechaVenta,  DetalleVenta.cantidadVendida,  productos.precio,  Ventas.TotalVenta FROM  DetalleVenta  INNER JOIN Ventas ON Ventas.idVenta = DetalleVenta.idVenta  INNER JOIN productos ON DetalleVenta.idProducto = productos.idProductos  INNER JOIN clientes ON Ventas.idCliente = clientes.idcliente';
  db.query(sql, (err, data) => {
    if (err) {
      console.error('Error al obtener las ventas:', err);
      return res.status(500).json({ message: 'Error al obtener las ventas' });
    }
    return res.status(200).json(data);
  });
});
app.get('/Clientes', verifyUser, (req, res) => {
  const sql = 'SELECT * FROM clientes';
  db.query(sql, (err, data) => {
    if (err) {
      console.error('Error al obtener los clientes:', err);
      return res.status(500).json({ message: 'Error al obtener los clientes' });
    }
    return res.status(200).json(data);
  });
});
app.post('/Clientes', verifyUser, (req, res) => {
  const { nombreCliente, DNI, direccion, telefono } = req.body;
  const sql =
    'INSERT INTO clientes (nombreCliente, DNI, direccion, telefono) VALUES (?, ?, ?, ?)';
  db.query(sql, [nombreCliente, DNI, direccion, telefono], (err, result) => {
    if (err) {
      console.error('Error al guardar los datos del cliente:', err);
      return res
        .status(500)
        .json({ message: 'Error al guardar los datos del cliente' });
    }
    return res
      .status(200)
      .json({ message: 'Datos del cliente guardados correctamente' });
  });
});
app.put('/Clientes/:idCliente', verifyUser, (req, res) => {
  const clienteId = req.params.idCliente;
  const { nombreCliente, DNI, direccion, telefono } = req.body;

  const sql =
    'UPDATE clientes SET nombreCliente = ?, DNI = ?, direccion = ?, telefono = ? WHERE idCliente = ?';
  db.query(
    sql,
    [nombreCliente, DNI, direccion, telefono, clienteId],
    (err, result) => {
      if (err) {
        console.error('Error al actualizar los datos del cliente:', err);
        return res.status(500).json({
          message: 'Error al actualizar los datos del cliente',
        });
      }
      return res.status(200).json({
        message: 'Datos del cliente actualizados correctamente',
      });
    }
  );
});
app.delete('/Clientes/:idCliente', verifyUser, (req, res) => {
  const clienteId = req.params.idCliente;

  const sql = 'DELETE FROM clientes WHERE idCliente = ?';
  db.query(sql, [clienteId], (err, result) => {
    if (err) {
      console.error('Error al eliminar el cliente:', err);
      return res.status(500).json({ message: 'Error al eliminar el cliente' });
    }
    return res.status(200).json({ message: 'Cliente eliminado correctamente' });
  });
});
app.listen(3000, () => {
  console.log('Servidor en el puerto 3000');
});
