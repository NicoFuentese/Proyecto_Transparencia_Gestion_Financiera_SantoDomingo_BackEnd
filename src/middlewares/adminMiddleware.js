const verificarAdmin = (req, res, next) => {
    // req.usuario es inyectado por el authMiddleware previo
    if (req.usuario && req.usuario.rol === 'ADMIN') {
        next();
    } else {
        res.status(403).json({ error: 'Acceso denegado: Se requieren privilegios de Administrador' });
    }
};

module.exports = verificarAdmin;