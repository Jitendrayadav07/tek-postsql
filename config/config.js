require("dotenv").config();

// module.exports = {
//   HOST: process.env.DB_HOST || "localhost",
//   USER: process.env.DB_USER || "postgres",
//   PASSWORD: process.env.DB_PASSWORD || "jituyadav",
//   DB: process.env.DB_NAME || "tek",
//   dialect: "postgres",
//   port: 5432,
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000
//   }
// };


//Server configuration for production
module.exports = {
    HOST: "35.200.132.55",
    USER: "postgres",
    PASSWORD: "4VEtU@4hEczs)PO7",
    DB: "arena_indexing",
    dialect: "postgres",
    port: 5432,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
};

