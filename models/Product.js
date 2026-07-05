const pool = require('../config/database');

class Product {
    static async getAll() {
        const [rows] = await pool.execute(`
            SELECT p.*, c.name as category_name 
            FROM products p 
            LEFT JOIN categories c ON p.category_id = c.id 
            ORDER BY p.created_at DESC
        `);
        return rows;
    }

    static async getFeatured(limit = 4) {
        const limitNum = Number(limit);
        const [rows] = await pool.execute(`
            SELECT p.*, c.name as category_name 
            FROM products p 
            LEFT JOIN categories c ON p.category_id = c.id 
            ORDER BY p.created_at DESC LIMIT ${limitNum}
        `);
        return rows;
    }

    static async getByCategory(categoryId) {
        const [rows] = await pool.execute(`
            SELECT p.*, c.name as category_name 
            FROM products p 
            LEFT JOIN categories c ON p.category_id = c.id 
            WHERE p.category_id = ?
        `, [categoryId]);
        return rows;
    }

    static async findById(id) {
        const [rows] = await pool.execute(`
            SELECT p.*, c.name as category_name 
            FROM products p 
            LEFT JOIN categories c ON p.category_id = c.id 
            WHERE p.id = ?
        `, [id]);
        return rows[0];
    }

    static async create(product) {
        const { name, description, price, stock, category_id, image_url } = product;
        const [result] = await pool.execute(
            'INSERT INTO products (name, description, price, stock, category_id, image_url) VALUES (?, ?, ?, ?, ?, ?)',
            [name, description, price, stock, category_id, image_url]
        );
        return result.insertId;
    }
    
    static async update(id, product) {
        const { name, description, price, stock, category_id, image_url } = product;
        let query = 'UPDATE products SET name=?, description=?, price=?, stock=?, category_id=?';
        let params = [name, description, price, stock, category_id];
        
        if (image_url) {
            query += ', image_url=?';
            params.push(image_url);
        }
        query += ' WHERE id=?';
        params.push(id);
        
        await pool.execute(query, params);
    }
    
    static async delete(id) {
        await pool.execute('DELETE FROM products WHERE id = ?', [id]);
    }
    
    static async search(query) {
        const searchTerm = `%${query}%`;
        const [rows] = await pool.execute(`
            SELECT p.*, c.name as category_name 
            FROM products p 
            LEFT JOIN categories c ON p.category_id = c.id 
            WHERE p.name LIKE ? OR p.description LIKE ?
        `, [searchTerm, searchTerm]);
        return rows;
    }
}

module.exports = Product;
