require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../modules/users/user.model");

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for seeding...");

    const seedData = [
      {
        name: "Super Admin",
        email: "admin@travel.com",
        password: "admin123",
        role: "admin",
      },
      {
        name: "Travel Agent",
        email: "agent@travel.com",
        password: "agent123", 
        role: "agent",
      },
      {
        name: "John Doe",
        email: "user@travel.com",
        password: "user123", 
        role: "user",
      }
    ];

    for (const data of seedData) {
      const existing = await User.findOne({ email: data.email });

      if (existing) {
        console.log(`Skipping: ${data.role} (${data.email}) already exists.`);
      } else {
        // User.create() triggers the pre('save') hook in your schema
        await User.create(data);
        console.log(`Created: ${data.role} account (${data.email})`);
      }
    }

    console.log("Seeding completed successfully!");
    process.exit(0);

  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
}

seedDatabase();