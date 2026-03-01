const mongoose = require('mongoose');

const conversionSchema = new mongoose.Schema({
  unit: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit', required: true },
  value: { type: Number, required: true },
  barcode: { type: String, unique: true, sparse: true }, // sparse agar bisa null
  sku: String,
  price_base: Number,
  price_sell: Number,
  points_customer: Number,
  points_sales: Number,
});

const priceBreakSchema = new mongoose.Schema({
  min_qty: { type: Number, required: true },
  price: { type: Number, required: true },
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, unique: true }, // untuk timbangan
  isWeighted: { type: Boolean, default: false },
  barcode: { type: String, unique: true, sparse: true }, // untuk reguler
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  price_base: Number,
  price_sell: Number,
  discount: Number,
  weight: Number,
  unit: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit', required: true },
  sku: String,
  stock_initial: { type: Number, default: 0 },
  stock_min: { type: Number, default: 0 },
  rack_location: String,
  conversions: [conversionSchema],
  price_breaks: [priceBreakSchema],
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
