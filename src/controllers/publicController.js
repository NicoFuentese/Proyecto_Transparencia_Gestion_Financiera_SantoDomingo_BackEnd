const prisma = require('../config/db');
const { sendSuccess, sendError } = require('../utils/responseHandler');

const obtenerDepartamentos = async (req, res) => {
    try {
        const departamentos = await prisma.departamento.findMany();
        return sendSuccess(res, 200, departamentos);
    } catch (error) {
        return sendError(res, 500, 'Error al obtener departamentos');
    }
};

const obtenerPresupuestos = async (req, res) => {
    try {
        const presupuestos = await prisma.presupuesto.findMany({ include: { departamento: true } });
        return sendSuccess(res, 200, presupuestos);
    } catch (error) {
        return sendError(res, 500, 'Error al obtener presupuestos');
    }
};


const obtenerContratos = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const [contratos, totalRegistros] = await Promise.all([
            prisma.contrato.findMany({
                skip: skip,
                take: limit,
                include: { departamento: true },
                orderBy: { fechaInicio: 'desc' }
            }),
            prisma.contrato.count()
        ]);

        const paginacionData = {
            items: contratos,
            meta: {
                total: totalRegistros,
                page: page,
                limit: limit,
                totalPages: Math.ceil(totalRegistros / limit)
            }
        };

        return sendSuccess(res, 200, paginacionData);
    } catch (error) {
        console.error('[Error en obtenerContratos]:', error);
        return sendError(res, 500, 'Error al obtener contratos paginados');
    }
};

module.exports = { obtenerDepartamentos, obtenerPresupuestos, obtenerContratos };