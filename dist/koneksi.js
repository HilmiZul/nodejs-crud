"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var mysql = require('mysql');

var conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'passwd48',
  // sesuaikan
  database: 'daftar_belanja' // sesuaikan

});
var _default = conn;
exports["default"] = _default;