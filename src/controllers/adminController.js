const prisma = require('../config/db');

const adminController = {
    async crearDepartamento(req, res) {
        try {
            const { nombre, descripcion } = req.body;
            const nuevo = await prisma.departamento.create({
                data: { nombre, descripcion }
            });
            res.status(201).json(nuevo);
        } catch (error) {
            console.error('[Error en crearDepartamento]:', error);
            // Manejo específico para errores de unicidad (nombre duplicado)
            if (error.code === 'P2002') {
                return res.status(400).json({ error: 'El nombre del departamento ya existe.' });
            }
            res.status(500).json({ error: 'Error interno del servidor al crear el departamento.' });
        }
    },

    async crearPresupuesto(req, res) {
        try {
            const { ano, montoAsignado, departamentoId } = req.body;
            const nuevo = await prisma.presupuesto.create({
                data: { 
                    ano, 
                    montoAsignado, 
                    montoEjecutado: 0, // Se inicializa en 0 por defecto
                    departamentoId 
                }
            });
            res.status(201).json(nuevo);
        } catch (error) {
            console.error('[Error en crearPresupuesto]:', error);
            if (error.code === 'P2003') {
                return res.status(400).json({ error: 'El ID del departamento no existe.' });
            }
            res.status(500).json({ error: 'Error interno al registrar el presupuesto.' });
        }
    },

    async crearContrato(req, res) {
        try {
            const { titulo, proveedor, monto, fechaInicio, departamentoId } = req.body;
            const nuevo = await prisma.contrato.create({
                data: { 
                    titulo, 
                    proveedor, 
                    monto, 
                    // Aseguramos que el string de fecha se parsee a objeto Date nativo
                    fechaInicio: new Date(fechaInicio), 
                    departamentoId 
                }
            });
            res.status(201).json(nuevo);
        } catch (error) {
            console.error('[Error en crearContrato]:', error);
            res.status(500).json({ error: 'Error interno al registrar el contrato.' });
        }
    },

    async eliminarContrato(req, res) {
        try {
            const { id } = req.params;
            await prisma.contrato.delete({
                where: { id: parseInt(id) }
            });
            res.status(200).json({ mensaje: 'Contrato eliminado correctamente.' });
        } catch (error) {
            console.error('[Error en eliminarContrato]:', error);
            if (error.code === 'P2025') {
                return res.status(404).json({ error: 'El contrato no fue encontrado.' });
            }
            res.status(500).json({ error: 'Error interno al eliminar el contrato.' });
        }
    }
};

module.exports = adminController;