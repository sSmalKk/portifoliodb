// seedAdmin.js
const mongoose = require('mongoose');
const User = require('../model/User'); // Caminho para o modelo User
const bcrypt = require('bcrypt');

const seedAdmin = async () => {
  try {
    const adminData = {
      username: 'admin',
      email: 'admin@example.com',
      password: await bcrypt.hash('admin123', 8),
      userType: 1, // Definindo 1 como ADMIN no sistema
      isDeleted: false,
      isActive: true,
    };

    let admin = await User.findOne({ email: adminData.email });
    if (!admin) {
      admin = new User(adminData);
      await admin.save();
      console.log('Administrador criado com sucesso.');
    } else {
      console.log('Administrador já existe.');
    }
    return admin;
  } catch (error) {
    console.error('Erro ao criar administrador:', error.message);
    throw error;
  }
};

module.exports = seedAdmin;
