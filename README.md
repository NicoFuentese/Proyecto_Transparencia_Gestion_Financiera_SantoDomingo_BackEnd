# Proyecto Transferencia Gestion Financiera

## Objetivo


## Stack Tecnologico
- Node.js (Express)
- PostgreSQL
- Prisma ORM
- Docker

## Estructura del Proyecto

```
transparencia-backend/
├── prisma/
│   └── schema.prisma         # Modelo de datos y configuración del ORM
├── src/
│   ├── config/               # Variables de entorno y conexión a DB
│   ├── controllers/          # Lógica de negocio (authController, presupuestoController)
│   ├── middlewares/          # Interceptores (validarJWT, errorHandler)
│   ├── routes/               # Definición de endpoints RESTful
│   ├── utils/                # Funciones auxiliares (hash, generador JWT)
│   └── app.js                # Inicialización del servidor Express
├── .env                      # Credenciales de BD y JWT Secret (NO subir a GitHub)
├── .gitignore
└── package.json
```

## Comandos para el proyecto

### 1. Inicializar el proyecto Node.js (si aún no existe package.json)
npm init -y

### 2. Instalar dependencias core y de seguridad exigidas en la rúbrica
npm install express cors dotenv bcrypt jsonwebtoken

### 3. Instalar dependencias de desarrollo y el CLI de Prisma
npm install -D nodemon prisma

### 4. Inicializar Prisma (esto creará la carpeta /prisma y el archivo schema.prisma)
npx prisma init