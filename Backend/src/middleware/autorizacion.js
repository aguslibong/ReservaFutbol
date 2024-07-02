import jwt from 'jsonwebtoken';
import auth from '../seguridad/auth.js'; // Asegúrate de que este es el camino correcto a tu módulo de autenticación

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log(authHeader)
  
  if (!authHeader) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  const token = authHeader.split(' ')[1];
  console.log(token)// Divide el valor del encabezado y toma el token
  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }

  jwt.verify(token, auth.accessTokenSecret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: 'Unauthorized!' });
    }

    req.userId = decoded.id;
    req.role = decoded.rol;
    next();
  });
};

export const isAdmin = (req, res, next) => {
  if (req.role === 'admin') {
    next();
  } else {
    res.status(403).send({ message: 'Require Admin Role!' });
  }
};

export const isMember = (req, res, next) => {
  if (req.role === 'member') {
    next();
  } else {
    res.status(403).send({ message: 'Require Member Role!' });
  }
};

export const isAdminOrMember = (req, res, next) => {
  if (req.role === 'admin' || req.role === 'member') {
    next();
  } else {
    res.status(403).send({ message: 'Require Admin or Member Role!' });
  }
};
