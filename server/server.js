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
    methods: ['POST', 'GET'],
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

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.json({ message: 'Acceso denegado' });
  else {
    jwt.verify(token, "our-jsonwebtoken-secret-key", (err, decoded) => {
      if (err){
        return res.json({ message: 'Error de autentificacion' });
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
      const token = jwt.sign({name}, 'our-jsonwebtoken-secret-key', {
        expiresIn: '1d',
      });
      res.cookie('token', token);
      return res.json({ status: 'Bienvenido' })
    } else {
      return res.json({ message: 'Usuario o contraseña incorrectos' });
    }
  });
});

app.get('/logout', (req, res) => {
res.clearCookie('token');
return res.json({ message: 'Sesión cerrada' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
