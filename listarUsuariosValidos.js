// listarUsuariosValidos.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const listarUsuariosValidos = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Conectado a MongoDB');

    const usuarios = await User.find();

    if (usuarios.length === 0) {
      console.log('No hay usuarios en la base de datos.');
    } else {
      console.log('Usuarios válidos en la base de datos:');
      usuarios.forEach(u => {
        console.log(`- ID: ${u._id} | Nombre: ${u.nombre} | Email: ${u.email || 'No tiene email'}`);
      });
    }

    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error al listar usuarios:', error);
  }
};

listarUsuariosValidos();
