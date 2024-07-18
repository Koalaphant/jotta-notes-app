// const Pool = require("pg").Pool;
// const dotenv = require("dotenv");

// const env = process.env.NODE_ENV || "development";
// dotenv.config({ path: `.env.${env}` });

// const pool = new Pool({
//   user: process.env.VITE_API_USERNAME,
//   password: process.env.VITE_API_PASSWORD,
//   host: process.env.VITE_API_HOST,
//   port: process.env.VITE_API_DBPORT,
//   database: "jottanotes",
// });

// module.exports = pool;

const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables from .env file

const pool = new Pool({
  connectionString: process.env.VITE_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
