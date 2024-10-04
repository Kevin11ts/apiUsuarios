const pool = require('../config/db');

class User {
    static async findAll() { //Lista de todos los usuarios
        const result = await
            pool.query('SELECT *FROM users'); //Una sentencia
        return result.rows; //Filas
    }

    static async create(data) {
        const { name, email } = data; //{"name": "Kevin", "email": "kevin@gmail.com"}
        // const name = data.name;
        const result = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *', [name, email]
        ); //Posicion 1 y 2

        return result.rows[0];
    }
    static async finById(id) { //Espera a que termine una accion
        const result = await pool.query('SELECT * FROM users where id = $1', [id]); //Una sentencia
        return result.rows[0]; //Filas
    }
    static async update(id, data) {
        const { name, email } = data;
        const result = await pool.query('UPDATE users SET name = $1, email = $2, update_at = current_timestamp where id = $3 and deleted_ at is null RETURNING *', [name, email, id]);
        return result.rows[0];
    }
    static async delete(id) {
        const result = await pool.query
        ('UPDATE users set delete_at = now() WHERE id = $1 and update_at is null RETURNING *', [id]);
        return result.rows[0];
    }
    
    static async generarExcel() {
        const result = await pool.query(`
            SELECT name, email FROM users
            WHERE delete_at IS NULL`);
        return result.rows;
    }
}

module.exports = User;

//Acesso a la base de datos
//Inyección sql