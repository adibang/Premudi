const mongoose = require('mongoose');

/**
 * Fungsi untuk menghubungkan aplikasi ke MongoDB.
 * Menggunakan variabel lingkungan MONGODB_URI yang dikonfigurasi di Railway.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // Pengaturan timeout 10 detik agar proses build di Railway tidak macet jika DB sulit dijangkau
      serverSelectionTimeoutMS: 10000, 
      socketTimeoutMS: 45000,
    });

    // Menampilkan host database yang terhubung (berguna untuk debugging)
    console.log(`✅ MongoDB Terkoneksi: ${conn.connection.host}`);
  } catch (err) {
    console.error(`❌ Error Koneksi MongoDB: ${err.message}`);
    
    // Memberikan petunjuk spesifik jika variabel lupa diisi
    if (!process.env.MONGODB_URI) {
      console.error('Tip: Pastikan variabel MONGODB_URI sudah diisi di Dashboard Railway!');
    }

    // Keluar dari proses dengan kegagalan jika gagal koneksi di tahap awal
    process.exit(1);
  }
};

module.exports = connectDB;
