const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../config/db');

// Registro de Administradores Municipales
const register = async (req, res) => {
    try {
        const { email, password, nombre } = req.body;

        // 1. Verificar si el usuario ya existe
        const usuarioExistente = await prisma.usuario.findUnique({ where: { email } });
        if (usuarioExistente) {
            return res.status(400).json({ error: 'El correo ya está registrado en el municipio' });
        }

        // 2. Encriptar la contraseña (seguridad JWT)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Crear el usuario en PostgreSQL
        const nuevoUsuario = await prisma.usuario.create({
            data: {
                email,
                password: hashedPassword,
                nombre,
                rol: 'ADMIN' // Por defecto, asignamos rol de administrador
            }
        });

        res.status(201).json({ 
            mensaje: 'Funcionario registrado con éxito',
            usuario: { id: nuevoUsuario.id, email: nuevoUsuario.email, nombre: nuevoUsuario.nombre }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor al registrar usuario' });
    }
};

// Inicio de sesión (Login)
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Buscar al usuario
        const usuario = await prisma.usuario.findUnique({ where: { email } });
        if (!usuario) {
            return res.status(401).json({ error: 'Credenciales inválidas (email)' });
        }

        // 2. Verificar la contraseña encriptada
        const passwordValido = await bcrypt.compare(password, usuario.password);
        if (!passwordValido) {
            return res.status(401).json({ error: 'Credenciales inválidas (password)' });
        }

        // 3. Generar el token JWT
        const token = jwt.sign(
            { id: usuario.id, email: usuario.email, rol: usuario.rol },
            process.env.JWT_SECRET,
            { expiresIn: '8h' }
        );

        res.status(200).json({
            mensaje: 'Autenticación exitosa',
            token,
            usuario: { email: usuario.email, nombre: usuario.nombre, rol: usuario.rol }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error interno del servidor al iniciar sesión' });
    }
};

module.exports = { register, login };