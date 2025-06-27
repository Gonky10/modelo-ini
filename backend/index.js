const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3001;
const sequelize = require('./config/db');
const Seccion = require('./models/seccion.model');
const path = require('path');

app.use(cors());
app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hola desde Node.js!' });
});

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
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

sequelize.authenticate()
  .then(() => {
    console.log('Conectado a MySQL');
    return sequelize.sync(); // crea la tabla si no existe
  })
  .then(async () => {
    // Insertar datos solo si la tabla está vacía
    const count = await Seccion.count();
    if (count === 0) {
      await Seccion.bulkCreate([
        {
          nombre: 'Inicio',
          contenido: '¡Bienvenido a nuestra web! Te ofrecemos soluciones digitales de alta calidad con un enfoque profesional y moderno.',
          img: 'img2.jpg'
        },
        {
          nombre: 'Nosotros',
          contenido: 'Somos un equipo apasionado por el desarrollo de software, comprometidos con la excelencia y la innovación tecnológica.',
          img: 'img1.jpg'
        },
        {
          nombre: 'Servicios',
          contenido: 'Diseño web, desarrollo de aplicaciones móviles, soluciones a medida y mantenimiento. ¡Transformamos tus ideas en realidades digitales!',
          img: 'img3.jpg'
        },
        {
          nombre: 'Galeria',
          contenido: 'Te invitamos a conocer una selección de nuestros proyectos más destacados. Cada imagen representa un desafío superado y una historia de éxito junto a nuestros clientes.',
          img: 'img1.jpg'
        },
        {
          nombre: 'Contacto',
          contenido: '¿Querés iniciar un proyecto, hacer una consulta o simplemente saludarnos? Completá el formulario, escribinos por WhatsApp o envianos un correo. ¡Estamos listos para ayudarte!',
          img: 'img2.jpg'
        }
      ]);
      console.log('Secciones iniciales creadas.');
    }
  })
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en todas las interfaces en el puerto ${PORT}`);
  })  
  .catch(err => console.error('Error:', err));
