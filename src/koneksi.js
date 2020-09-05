const mysql = require('mysql');
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'passwd48', // sesuaikan
  database: 'daftar_belanja' // sesuaikan
});

// tes koneksi
connection.connect((err) => {
  if (err) {
    console.log("koneksi:"+err.stack);
    return;
  }
  console.log('db: success');
});


export default conn;