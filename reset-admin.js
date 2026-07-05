const pool = require('./config/database');
const bcrypt = require('bcryptjs');

async function resetAdmin() {
    try {
        const email = 'admin@olmsuyari.com';
        const password = 'admin123';
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
        
        if (rows.length > 0) {
            await pool.execute('UPDATE users SET password = ?, role = "admin" WHERE email = ?', [hashedPassword, email]);
            console.log('Admin password updated successfully.');
        } else {
            await pool.execute('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', ['Admin', email, hashedPassword, 'admin']);
            console.log('Admin user created successfully.');
        }
    } catch (err) {
        console.error('Error:', err);
    } finally {
        process.exit(0);
    }
}

resetAdmin();
