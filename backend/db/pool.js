const {Pool }=require('pg');

const pool = new Pool({
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'medsynth_db',
    password: process.env.DB_PASSWORD || 'password',
    port: parseInt(process.env.DB_PORT) || 5432,
});


pool.on('error', (err)=> {
console.error('Unexpected error on idle PostgreSQL client',err);
process.exit(-1);
});

module.exports= {query: (text,params)=>pool.query(text,params) };