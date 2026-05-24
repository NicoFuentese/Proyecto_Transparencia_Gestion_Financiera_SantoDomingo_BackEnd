const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

// Extraer la URL de conexión desde variables de entorno
const connectionString = process.env.DATABASE_URL;

// Inicializar el Pool de Postgres
const pool = new Pool({ connectionString });

// Crear adaptador y pasarlo al cliente de Prisma
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

module.exports = prisma;