const express = require('express');
const router = express.Router();
const protegerRuta = require('../middlewares/authMiddleware');
const verificarAdmin = require('../middlewares/adminMiddleware');
const adminController = require('../controllers/adminController');
const prisma = require('../config/db');

// Inyección de middlewares a nivel de enrutador (aplica a todas las rutas debajo)
router.use(protegerRuta);
router.use(verificarAdmin);

router.post('/departamentos', adminController.crearDepartamento);
router.put('/departamentos/:id', adminController.actualizarDepartamento);
router.post('/presupuestos', adminController.crearPresupuesto);
router.put('/presupuestos/:id', adminController.actualizarPresupuesto);
router.post('/contratos', adminController.crearContrato);
router.put('/contratos/:id', adminController.actualizarContrato);
router.delete('/contratos/:id', adminController.eliminarContrato);

module.exports = router;