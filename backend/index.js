const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;
const sequelize = require('./config/db');
const Seccion = require('./models/seccion.model');
const path = require('path');

app.use(cors());
app.use(express.json());

// ✅ Rutas API primero
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hola desde Node.js!' });
});

app.get('/api/secciones/:id', async (req, res) => {
  try {
    const seccion = await Seccion.findByPk(req.params.id);
    if (!seccion) return res.status(404).json({ error: 'Sección no encontrada' });
    res.json(seccion);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener la sección' });
  }
});

// ✅ Servir imágenes si las tenés en una carpeta /img
app.use('/img', express.static(path.join(__dirname, 'img')));

// ✅ Servir frontend
app.use(express.static(path.join(__dirname, '../frontend/build')));

// ✅ Catch-all seguro solo para rutas que no son API
app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

// ✅ Conexión y arranque del servidor
sequelize.authenticate()
  .then(() => {
    console.log('Conectado a MySQL');
    return sequelize.sync();
  })
  .then(async () => {
    const count = await Seccion.count();
    if (count === 0) {
      await Seccion.bulkCreate([
        { nombre: 'Inicio', contenido: '...', img: 'img2.jpg' },
        { nombre: 'Nosotros', contenido: '...', img: 'img1.jpg' },
        { nombre: 'Servicios', contenido: '...', img: 'img3.jpg' },
        { nombre: 'Galeria', contenido: '...', img: 'img1.jpg' },
        { nombre: 'Contacto', contenido: '...', img: 'img2.jpg' }
      ]);
      console.log('Secciones iniciales creadas.');
    }

    // ✅ Iniciar el servidor SOLO si la DB está OK
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
  })
  .catch(err => console.error('Error al iniciar el backend:', err));
