const express = require('express');
const router = express.Router();
const protegerRuta = require('../middlewares/authMiddleware');
const verificarAdmin = require('../middlewares/adminMiddleware');
const prisma = require('../config/db');

// POST: Crear un nuevo contrato
router.post('/contratos', protegerRuta, verificarAdmin, async (req, res) => {
    const { titulo, proveedor, monto, fechaInicio, departamentoId } = req.body;
    try {
        const nuevoContrato = await prisma.contrato.create({
            data: { titulo, proveedor, monto, fechaInicio, departamentoId }
        });
        res.status(201).json(nuevoContrato);
    } catch (error) {
        res.status(400).json({ error: 'Error al registrar contrato' });
    }
});

// DELETE: Eliminar un contrato
router.delete('/contratos/:id', protegerRuta, verificarAdmin, async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.contrato.delete({ where: { id: parseInt(id) } });
        res.json({ mensaje: 'Contrato eliminado correctamente' });
    } catch (error) {
        res.status(400).json({ error: 'No se pudo eliminar el contrato' });
    }
});

module.exports = router;