const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const productoRoutes = require('./routes/producto');
const categoriaRoutes = require('./routes/categoria');

dotenv.config(); // Cargar las variables de entorno

const app = express();
app.use(express.json()); // Parsear el cuerpo de las peticiones como JSON

// Conectar a MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB', err));

// Rutas
app.use('/productos', productoRoutes);
app.use('/categorias', categoriaRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
