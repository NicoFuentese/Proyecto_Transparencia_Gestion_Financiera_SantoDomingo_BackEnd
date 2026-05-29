const prisma = require('../src/config/db.js');
const bcrypt = require('bcrypt');

async function main() {
  console.log('Iniciando el sembrado (seeding) de la base de datos...');

  // definicion credenciales del super admin
  const emailAdmin = 'admin@santodomingo.cl';
  const passwordPlana = 'Admin1234';

  // Evitar duplicados
  const adminExistente = await prisma.usuario.findUnique({
    where: { email: emailAdmin }
  });

  if (!adminExistente) {
    //eencriptacion password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(passwordPlana, salt);

    //PostgreSQL
    await prisma.usuario.create({
      data: {
        email: emailAdmin,
        password: hashedPassword,
        nombre: 'Super Administrador Municipal',
        rol: 'ADMIN',
      },
    });
    console.log(`Administrador creado con éxito: ${emailAdmin}`);
  } else {
    console.log(`El administrador ${emailAdmin} ya existe. Saltando creación.`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log('Sembrado finalizado.');
    process.exit(0);
  });