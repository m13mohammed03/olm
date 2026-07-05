const pool = require('../config/database');

class Setting {
    static async getAll() {
        const [rows] = await pool.execute('SELECT * FROM settings');
        const settingsObj = {};
        rows.forEach(row => {
            settingsObj[row.key] = row.value;
        });
        return settingsObj;
    }

    static async update(key, value) {
        await pool.execute('UPDATE settings SET \`value\` = ? WHERE \`key\` = ?', [value, key]);
    }
}

module.exports = Setting;
