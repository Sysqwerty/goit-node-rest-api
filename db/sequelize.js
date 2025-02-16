import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "db_contacts_xx92",
  "db_contacts_xx92_user",
  "zdS9I7CdkF45v9AwD0ZIaKkuq4ouBu5v",
  {
    host: "dpg-cuoa5p8gph6c73dkau8g-a.oregon-postgres.render.com", // External Database URL
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Дозволяє підключення через SSL
      },
    },
    logging: console.log, // Вимикає логи SQL-запитів у консолі
  }
);

// Перевірка підключення
try {
  await sequelize.authenticate();

  console.log("\x1b[32m%s\x1b[0m", "✅ Database connection successful");
} catch (err) {
  console.error("\x1b[31m%s\x1b[0m", "❌ Database connection error:", err);
  process.exit(1);
}

export default sequelize;
