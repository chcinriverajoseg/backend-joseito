const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const limpiarUsuariosDuplicados = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Conectado a MongoDB');

    const usuarios = await User.find();
    const usuariosPorEmail = {};

    for (const user of usuarios) {
      if (!user.email || !user.password) {
        console.log(`🗑️ Eliminando sin email o password: ${user._id}`);
        await User.deleteOne({ _id: user._id });
        continue;
      }

      const email = user.email.toLowerCase();

      if (!usuariosPorEmail[email]) {
        usuariosPorEmail[email] = user;
      } else {
        console.log(`🗑️ Eliminando duplicado de ${email}: ${user._id}`);
        await User.deleteOne({ _id: user._id });
      }
    }

    console.log('✅ Limpieza completada.');
    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error durante limpieza:', error);
  }
};

limpiarUsuariosDuplicados();
