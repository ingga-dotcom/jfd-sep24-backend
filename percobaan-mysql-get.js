
//buat variable , mysql adl nama var
const mysql = require('mysql2')


// sambungkan ke mysql
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_jfd_satu'
})


// buka koneksi
db.connect( (error)=>{
    if (error) {
        throw error
    } else {
        console.log('berhasil tersambung ke mysql')
    }
})


db.query('SELECT * FROM karyawan', function(errorSql, hasil) {
    if (errorSql) {
        console.log(errorSql)
    } else {
        console.log(hasil)
    }
})