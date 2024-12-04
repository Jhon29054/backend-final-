const express = require('express');
const Producto = require('../models/producto');
const router = express.Router();

// Crear un producto
router.post('/', async (req, res) => {
  try {
    const producto = new Producto(req.body);
    await producto.save();
    res.status(201).send(producto);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const productos = await Producto.find().populate('categoria');
    res.status(200).send(productos);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Obtener un producto por ID
router.get('/:id', async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id).populate('categoria');
    if (!producto) {
      return res.status(404).send({ message: 'Producto no encontrado' });
    }
    res.status(200).send(producto);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Actualizar un producto
router.put('/:id', async (req, res) => {
  try {
    const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!producto) {
      return res.status(404).send({ message: 'Producto no encontrado' });
    }
    res.status(200).send(producto);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Eliminar un producto
router.delete('/:id', async (req, res) => {
  try {
    const producto = await Producto.findByIdAndDelete(req.params.id);
    if (!producto) {
      return res.status(404).send({ message: 'Producto no encontrado' });
    }
    res.status(200).send({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
