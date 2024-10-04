const {Pool} = require('pg') //Requerir un recurso(require)
require('dotenv').config(); //Accede al archivo .env
const pool = new Pool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
})

module.exports = pool;