import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcrypt';
import db from '../models/index.js';

async function main() {
  try {
    await db.sequelize.authenticate();
    console.log('DB connected.');
    await db.sequelize.sync();
    console.log('DB synced.');

    // Create test users if not exist
    const password = await bcrypt.hash('password123', 10);

    const [owner] = await db.User.findOrCreate({
      where: { email: 'owner@example.com' },
      defaults: {
        name: 'Owner Test',
        email: 'owner@example.com',
        phone: '+231770000001',
        role: 'owner',
        password,
      },
    });

    const [renter] = await db.User.findOrCreate({
      where: { email: 'renter@example.com' },
      defaults: {
        name: 'Renter Test',
        email: 'renter@example.com',
        phone: '+231770000002',
        role: 'renter',
        password,
      },
    });

    // Seed vehicles for owner
    const vehiclesData = [
      {
        ownerId: owner.id,
        make: 'Toyota',
        model: 'Camry',
        year: 2020,
        pricePerDay: 45,
        type: 'Sedan',
        seats: 5,
        fuel: 'Gasoline',
        location: 'Monrovia',
        images: [
          'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800',
        ],
      },
      {
        ownerId: owner.id,
        make: 'Honda',
        model: 'Civic',
        year: 2021,
        pricePerDay: 35,
        type: 'Compact',
        seats: 5,
        fuel: 'Gasoline',
        location: 'Sinkor',
        images: [
          'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=800',
        ],
      },
    ];

    for (const data of vehiclesData) {
      await db.Vehicle.findOrCreate({
        where: { ownerId: data.ownerId, make: data.make, model: data.model, year: data.year },
        defaults: data,
      });
    }

    console.log('Seed completed.');
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  }
}

main();

