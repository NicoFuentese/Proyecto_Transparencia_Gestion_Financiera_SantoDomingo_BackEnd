const prisma = require('../config/db');

const obtenerDepartamentos = async (req, res) => {
    try {
        const departamentos = await prisma.departamento.findMany();
        res.json(departamentos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener departamentos' });
    }
};

const obtenerPresupuestos = async (req, res) => {
    try {
        const presupuestos = await prisma.presupuesto.findMany({ include: { departamento: true } });
        res.json(presupuestos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener presupuestos' });
    }
};

const obtenerContratos = async (req, res) => {
    try {
        const contratos = await prisma.contrato.findMany({ include: { departamento: true } });
        res.json(contratos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener contratos' });
    }
};

module.exports = { obtenerDepartamentos, obtenerPresupuestos, obtenerContratos };