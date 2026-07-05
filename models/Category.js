const pool = require('../config/database');

class Category {
    static async getAll() {
        const [rows] = await pool.execute('SELECT * FROM categories ORDER BY name ASC');
        return rows;
    }

    static async findById(id) {
        const [rows] = await pool.execute('SELECT * FROM categories WHERE id = ?', [id]);
        return rows[0];
    }

    static async create(name, description) {
        const [result] = await pool.execute(
            'INSERT INTO categories (name, description) VALUES (?, ?)',
            [name, description]
        );
        return result.insertId;
    }
    
    static async update(id, name, description) {
        await pool.execute(
            'UPDATE categories SET name = ?, description = ? WHERE id = ?',
            [name, description, id]
        );
    }
    
    static async delete(id) {
        await pool.execute('DELETE FROM categories WHERE id = ?', [id]);
    }
}

module.exports = Category;
