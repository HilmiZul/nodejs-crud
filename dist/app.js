"use strict";

var _koneksi = _interopRequireDefault(require("./koneksi"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var express = require('express');

var app = express(); // konfig static file (css, js dan gambar)

app.use(express["static"]('public')); // untuk mengakses nilai dari form

app.use(express.urlencoded({
  extended: false
})); // hubungkan ke mysql

var connection = _koneksi["default"]; // halaman depan

app.get('/', function (req, res) {
  res.render('home.ejs');
}); // get data items untuk halaman /list

app.get('/list', function (req, res) {
  var query = 'select * from items';
  connection.query(query, function (error, results) {
    res.render('list.ejs', {
      items: results
    });
  });
}); // render form tambah data

app.get('/tambah', function (req, res) {
  res.render('tambah.ejs');
}); // simpan data dan arahkan ke /list

app.post('/simpan', function (req, res) {
  connection.query('insert into items (name) values (?)', [req.body.itemName], function (error, results) {
    res.redirect('/list');
  });
}); // tampilkan form edit data sesuai param id

app.get('/edit/:id', function (req, res) {
  connection.query('select * from items where id = ?', [req.params.id], function (error, results) {
    res.render('edit.ejs', {
      item: results[0]
    });
  });
});
app.post('/update/:id', function (req, res) {
  connection.query('update items set name=? where id=?', [req.body.itemName, req.params.id], function () {
    res.redirect('/list');
  });
});
app.get('/delete/:id', function (req, res) {
  connection.query('delete from items where id = ?', [req.params.id], function () {
    res.redirect('/list');
  });
});
app.listen(3000, function () {
  console.log("running: http://localhost:3000");
});