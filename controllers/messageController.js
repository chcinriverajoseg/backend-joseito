const Message = require('../models/Message');
// controllers/messageController.js


const obtenerMensajes = async (req, res) => {
  try {
    const userId = req.header('x-user-id');
    const partnerId = req.params.partnerId;

    const mensajes = await Message.find({
      $or: [
        { de: userId, para: partnerId },
        { de: partnerId, para: userId }
      ]
    }).sort('creadoEn');

    res.json(mensajes);
  } catch (err) {
    console.error('❌ Error al obtener mensajes:', err);
    res.status(500).json({ message: 'Error al cargar mensajes' });
  }
};

const enviarMensaje = async (req, res) => {
  try {
    const userId = req.header('x-user-id');
    const partnerId = req.params.partnerId;
    const { texto } = req.body;

    if (!texto) return res.status(400).json({ message: 'Mensaje vacío' });

    const nuevoMensaje = new Message({ de: userId, para: partnerId, texto });
    await nuevoMensaje.save();

    res.json(nuevoMensaje);
  } catch (err) {
    console.error('❌ Error al enviar mensaje:', err);
    res.status(500).json({ message: 'Error al enviar mensaje' });
  }
};

module.exports = { obtenerMensajes, enviarMensaje };
