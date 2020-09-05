const express = require('express');
const mysql = require('mysql');

const app = express();

// konfig static file (css, js dan gambar)
app.use(express.static('public'));
// untuk mengakses nilai dari form
app.use(express.urlencoded({extended:false}));

// hubungkan ke mysql
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // sesuaikan
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

// halaman depan
app.get('/', (req, res) => {
  res.render('home.ejs');
});

// get data items untuk halaman /list
app.get('/list', (req, res) => {
  let query = 'select * from items';
  connection.query(
    query,
    (error, results) => {
      res.render('list.ejs', {items: results});
    }
  )
});


// render form tambah data
app.get('/tambah', (req, res) => {
  res.render('tambah.ejs');
});
// simpan data dan arahkan ke /list
app.post('/simpan', (req, res) => {
  connection.query(
    'insert into items (name) values (?)',
    [req.body.itemName],
    (error, results) => {
      res.redirect('/list');
    }
  )
});

// tampilkan form edit data sesuai param id
app.get('/edit/:id', (req, res) => {
  connection.query(
    'select * from items where id = ?',
    [req.params.id],
    (error, results) => {
      res.render('edit.ejs', {item:results[0]});
    }
  )
});

app.post('/update/:id', (req, res) => {
  connection.query(
    'update items set name=? where id=?',
    [req.body.itemName, req.params.id],
    () => {
      res.redirect('/list');
    }
  )
});

app.get('/delete/:id', (req, res) => {
  connection.query(
    'delete from items where id = ?',
    [req.params.id],
    () => {
      res.redirect('/list')  
    }
  )
});

app.listen(3000, () => {
  console.log("running: http://localhost:3000");
}); 