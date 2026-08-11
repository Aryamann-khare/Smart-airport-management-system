const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: "db.fr-roub1.bengt.wasmernet.com",
    port: 20184,
    database: "smart",
    user: "user_4c375953",
    password: "pw_HIkhyS1CEhUotu79mNWNSFEeQonpjqQh",
    ssl: {
        rejectUnauthorized: false
    }
});

console.log('✅ Connected db.js to Wasmer Cloud Database -> db.fr-roub1.bengt.wasmernet.com:20184 (smart)');

module.exports = {
    pool,
    query: (text, params) => pool.query(text, params),
};
