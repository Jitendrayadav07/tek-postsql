require("dotenv").config();


const db = require("../../config/db");
const sequelize = db.sequelize;

const shill_categories = [
  { shill_category: "Hard" },
  { shill_category: "Soft" },
  { shill_category: "Medium" },
  { shill_category: "Custom" },
];

const insertShillCategories = async () => {
  try {
    await sequelize.sync();
    await db.ShillCategory.bulkCreate(shill_categories, { ignoreDuplicates: true });
    console.log("Shill categories inserted successfully");
  } catch (error) {
    console.error("Error inserting shill categories:", error);
  } finally {
    await sequelize.close();
  }
};

insertShillCategories();