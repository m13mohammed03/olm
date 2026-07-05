const pool = require('../config/database');

class Order {
    static async create(userId, totalAmount, deliveryAddress, phone, cartItems) {
        const connection = await pool.getConnection();
        try {
            await connection.beginTransaction();

            const [orderResult] = await connection.execute(
                'INSERT INTO orders (user_id, total_amount, delivery_address, phone, status) VALUES (?, ?, ?, ?, ?)',
                [userId, totalAmount, deliveryAddress, phone, 'pending']
            );
            
            const orderId = orderResult.insertId;

            for (const item of cartItems) {
                await connection.execute(
                    'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
                    [orderId, item.product.id, item.quantity, item.product.price]
                );
            }

            await connection.commit();
            return orderId;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }

    static async getByUserId(userId) {
        const [rows] = await pool.execute('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC', [userId]);
        return rows;
    }

    static async getById(id) {
        const [orderRows] = await pool.execute('SELECT * FROM orders WHERE id = ?', [id]);
        if (orderRows.length === 0) return null;
        
        const order = orderRows[0];
        
        const [itemsRows] = await pool.execute(`
            SELECT oi.*, p.name as product_name, p.image_url 
            FROM order_items oi 
            JOIN products p ON oi.product_id = p.id 
            WHERE oi.order_id = ?
        `, [id]);
        
        order.items = itemsRows;
        return order;
    }

    static async getAll() {
        const [rows] = await pool.execute(`
            SELECT o.*, u.name as user_name, u.email 
            FROM orders o 
            LEFT JOIN users u ON o.user_id = u.id 
            ORDER BY o.created_at DESC
        `);
        return rows;
    }

    static async updateStatus(id, status) {
        await pool.execute('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
    }
}

module.exports = Order;
