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

## Pruebas con POSTMAN

### Prueba de Usuario Registrado (POST)

*URL:http://localhost:3000/api/auth/register*
*Body - JSON*:
```
{
    "email": "admin@santodomingo.cl",
    "password": "AdminPassword2026!",
    "nombre": "Director de Finanzas"
}
```
*STATUS: 201 Created*

### Prueba de inicio de sesion (POST)
Esto nos entregara un Token.

*URL:http://localhost:3000/api/auth/login*
*Body - JSON*:
```
{
    "email": "admin@santodomingo.cl",
    "password": "AdminPassword2026!",
    "nombre": "Director de Finanzas"
}
```
*STATUS: 200 OK*

### Prueba de usuario autenticado (GET)
*URL:http://localhost:3000/api/usuario/perfil*
*Headers*:
Key: Authorization
Value: Bearer {TOKEN}

*STATUS: 200 OK*

## Ejecutar el Proyecto

1. Levantar toda la Infraestructura
```PowerShell
docker compose up -d
```

2. Verificar que todo este bien
```PowerShell
# Verificar ambos contenedores levantados
docker ps

# Verificar API tenga conexion a la base de datos
docker logs api_transparencia
```

3. Protocolo de apagado
```PowerShell
# No es necesario eliminar Volumenes, solo detener los contenedores
docker compose stop
```

4. Cambios en el esquema de DB
Si se necesita añadir Tablas o columnas ejecutar siempre despues de modificar el schema.prisma

```PowerShell
# Migrar BD con los esquemas actualizados y guardados
docker compose exec api npx prisma db push
```

5. Problemas de permisos o cache
Si el código "no se actualiza" a pesar de que guardaste el archivo, la "llave maestra" que limpiará cualquier residuo de Docker sin borrar los datos en la base de datos.

```PowerShell
#Baja loscontenedores
docker compose down

# Reconstruye
docker compose up -d --build
```