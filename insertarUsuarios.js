// guardar como insertarUsuarios.js en backend-joseito

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

dotenv.config();

const usuarios = [
  {
    nombre: "Lucía",
    email: "lucia@email.com",
    password: "123456",
    edad: 28,
    descripcion: "Me encanta viajar y conocer nuevas personas.",
    foto: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    nombre: "Carlos",
    email: "carlos@email.com",
    password: "123456",
    edad: 30,
    descripcion: "Apasionado por la música y el café.",
    foto: "https://randomuser.me/api/portraits/men/44.jpg",
  },
  {
    nombre: "Ana",
    email: "ana@email.com",
    password: "123456",
    edad: 25,
    descripcion: "Amante de los perros y las películas.",
    foto: "https://randomuser.me/api/portraits/women/45.jpg",
  },
];

async function insertar() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Conectado a MongoDB');

    for (const u of usuarios) {
      const existe = await User.findOne({ email: u.email });
      if (existe) {
        console.log(`Usuario ${u.email} ya existe, saltando...`);
        continue;
      }
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(u.password, salt);
      u.password = hash;

      const nuevoUsuario = new User(u);
      await nuevoUsuario.save();
      console.log(`Usuario ${u.email} creado correctamente.`);
    }

    mongoose.connection.close();
  } catch (err) {
    console.error('❌ Error:', err);
  }
}

insertar();
