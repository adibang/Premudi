const Unit = require('../models/Unit');

exports.getAll = async (req, res) => {
  try {
    const units = await Unit.find().sort({ name: 1 });
    res.json(units);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const unit = new Unit({ name });
    await unit.save();
    res.status(201).json(unit);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const unit = await Unit.findByIdAndUpdate(id, { name }, { new: true });
    res.json(unit);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await Unit.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
