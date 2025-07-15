const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
  nombre: String,
  email: String,
  password: String,
  edad: Number,
  descripcion: String,
  pais: String,
  foto: String,
  fotos: [String], // ✅ fotos adicionales
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  matches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});


// 👉 Hash de contraseña antes de guardar
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Solo si cambió
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// 👉 Método para comparar contraseña
userSchema.methods.comparePassword = function (passwordIngresada) {
  return bcrypt.compare(passwordIngresada, this.password);
};


module.exports = mongoose.model('User', userSchema);
