const express = require('express');
const Categoria = require('../models/categoria');
const router = express.Router();

// Crear una categoría
router.post('/', async (req, res) => {
  try {
    const categoria = new Categoria(req.body);
    await categoria.save();
    res.status(201).send(categoria);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Obtener todas las categorías
router.get('/', async (req, res) => {
  try {
    const categorias = await Categoria.find();
    res.status(200).send(categorias);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
