import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from '../models/adminModel.js';
import connectDB from '../config/db.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();

    const adminEmail = 'admin@securium.com';
    const existingAdmin = await Admin.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log('Admin already exists. Updating password to "admin123"...');
      existingAdmin.password = 'admin123';
      await existingAdmin.save();
    } else {
      await Admin.create({
        name: 'System Admin',
        email: adminEmail,
        password: 'admin123',
        role: 'admin',
      });
      console.log('New Admin User Created in Admin Collection!');
    }

    console.log('---------------------------');
    console.log('Admin Email: ' + adminEmail);
    console.log('Admin Pass:  admin123');
    console.log('---------------------------');
    
    mongoose.connection.close();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();
