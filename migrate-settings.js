const pool = require('./config/database');

async function migrate() {
    try {
        console.log('Creating settings table...');
        await pool.execute(`
            CREATE TABLE IF NOT EXISTS settings (
                \`key\` VARCHAR(50) PRIMARY KEY,
                \`value\` TEXT
            )
        `);

        const defaults = [
            ['site_name', 'OLM SUYARI'],
            ['site_logo', ''],
            ['contact_email', 'support@olmsuyari.com'],
            ['contact_phone', '+1 (555) 123-4567'],
            ['contact_address', '123 Beauty Blvd, Suite 400\\nNew York, NY 10001']
        ];

        console.log('Inserting default settings...');
        for (const [key, value] of defaults) {
            await pool.execute('INSERT IGNORE INTO settings (\`key\`, \`value\`) VALUES (?, ?)', [key, value]);
        }

        console.log('Migration successful.');
    } catch (err) {
        console.error('Migration failed:', err);
    } finally {
        process.exit(0);
    }
}

migrate();
