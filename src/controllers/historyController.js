import History from '../models/History.js';

const authenticate = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'No autorizado' });
  }
  next();
};

export const getSearchHistory = async (req, res) => {
  try {
    const history = await History.find({ userId: req.user._id })
      .sort({ timestamp: -1 })
      .limit(20);

    res.json({ history });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el historial' });
  }
};

export const addToHistory = async (req, res) => {
  try {
    const { query } = req.body;

    const newEntry = new History({
      userId: req.user._id,
      query
    });

    await newEntry.save();

    res.status(201).json({ message: 'Búsqueda guardada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al guardar la búsqueda' });
  }
};

export const deleteHistoryEntry = async (req, res) => {
  try {
    const { id } = req.params;

    const entry = await History.findOneAndDelete({
      _id: id,
      userId: req.user._id
    });

    if (!entry) {
      return res.status(404).json({ error: 'Entrada no encontrada' });
    }

    res.json({ message: 'Búsqueda eliminada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la entrada' });
  }
};
