const User = require('../models/userModel');

class userController {
    static async getAllUsers(req, res) //Repost retorna el servidor
    {
        try {
            const users = await User.findAll();
            res.json(users);
        } catch (error) {
            res.status(500).
                json({ error: error.message });
        }
    }

    static async createUser(req, res) { //req tdo aquello que le pasemos al body y res lo que retorna el api en el servidor
        try {
            const user = await User.create(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).
                json({ error: error.message });
        }

    }
    static async getUserById(req, res) {
        try {
            const user = await User.finById(req.params.id);
            if (!user) { //se nega
                return res.status(404).json({ message: "User not found" });
            }
            return res.json(user);
        } catch (error) {
            res.status(500).
                json({ error: error.message });
        }
    }
    static async updateUser(req, res) {
        try {
            const user = await User.update(req.params.id, req.body);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.json(user);
        } catch(error){
            res.status(500).
                json({ error: error.message });
        }
      
    }
    static async deleteUser(req, res) {
        try {
            const user = await User.delete(req.params.id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            return res.json({ message: "User delete", user:user});
        } catch(error){
            res.status(500).
                json({ error: error.message });
        }
      
    }
    static async downloadUsersExcel(req, res) {
        try {
            // Obtener los productos del modelo
            const user = await User.generarExcel();

            // Convertir los productos a una hoja de Excel
            const workbook = excel.utils.book_new();
            const worksheet = excel.utils.json_to_sheet(users);
            excel.utils.book_append_sheet(workbook, worksheet, 'Usuarios');

            // Escribir el archivo Excel en un buffer
            const excelBuffer = excel.write(workbook, { type: 'buffer', bookType: 'xlsx' });

            // Configurar los encabezados para la descarga
            res.setHeader('Content-Disposition', 'attachment; filename=productos.xlsx');
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

            // Enviar el archivo al cliente
            res.send(excelBuffer);
        } catch (error) {
            console.error('Error al generar el archivo Excel:', error);
            res.status(500).json({ error: 'Error al generar el archivo Excel.' });
        } 
    }


}

module.exports = userController;

//Toda la logica del negocio, si se hace un proceso tambien van acá, paso de parametros


