const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const fotosEjemplo = [
  'https://randomuser.me/api/portraits/women/44.jpg',
  'https://randomuser.me/api/portraits/men/36.jpg',
  'https://randomuser.me/api/portraits/women/68.jpg',
  'https://randomuser.me/api/portraits/men/25.jpg',
  'https://randomuser.me/api/portraits/women/50.jpg',
  'https://randomuser.me/api/portraits/men/10.jpg'
];

const descripciones = [
  'Amo la música y los atardeceres.',
  'Buscando alguien con quien compartir risas.',
  'Aventurera por naturaleza.',
  'Cocinero aficionado y amante del cine.',
  'Me encanta viajar y conocer nuevas culturas.',
  'Sincera y divertida.'
];

const rellenarUsuarios = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Conectado a MongoDB');

    const usuarios = await User.find();

    for (let i = 0; i < usuarios.length; i++) {
      const user = usuarios[i];

      let modificado = false;

      if (!user.foto) {
        user.foto = fotosEjemplo[i % fotosEjemplo.length];
        modificado = true;
      }

      if (!user.descripcion) {
        user.descripcion = descripciones[i % descripciones.length];
        modificado = true;
      }

      if (!user.edad) {
        user.edad = 20 + (i % 10); // edad entre 20 y 29
        modificado = true;
      }

      if (modificado) {
        await user.save();
        console.log(`✅ Usuario ${user.nombre} actualizado.`);
      } else {
        console.log(`🔍 Usuario ${user.nombre} ya tiene datos completos.`);
      }
    }

    mongoose.connection.close();
    console.log('✨ Usuarios actualizados con éxito');
  } catch (error) {
    console.error('❌ Error al actualizar usuarios:', error);
  }
};

rellenarUsuarios();
