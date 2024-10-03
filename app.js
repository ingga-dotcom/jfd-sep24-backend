const { profile } = require('console')
const express = require ('express')
const app = express()
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



//bikin function untuk narik data karyawan dr database
function getAll_karyawan() {
    return new Promise((resolve, reject) => {  //Promise & Away = memaksa JS supaya berurutan
    
    
        let sqlSyntax =  //biar rapi script SQL ini
        `SELECT
            kry.*, jbt.nama as jabatan_nama, 
            jbt.singkatan as jabatan_singkatan,
            agm.nama as agama_nama
        FROM karyawan as kry
        LEFT JOIN jabatan as jbt ON jbt.id = kry.jabatan
        LEFT JOIN agama as agm ON agm.id = kry.agama;`

        db.query(sqlSyntax, function(errorSql, hasil) {
        if (errorSql) {
            reject(errorSql)
        } else {
            resolve(hasil)
        }
    })
})
}




app.set ('view engine' , 'ejs')  //setting penggunaan template engine untuk express
app.set ('views' , './view-ejs')  //setting penggunaan folder untuk menyimpan file .ejs



//function render ('nama-file')
//nama file nya wajib ber eksensi .ejs
//otomatis mengambil file .ejs yg ada di folder view.ejs
app.get('/', function (req, res) {
  res.render('beranda')
})

app.get('/pendidikan', function (req, res) {  //bikin page /pendidikan
    let profil = {
        nama: 'Prabowo',
        s1: 'ITB : Sistem Informasi',
        smk: 'SMK Remaja: Akuntansi',

    }
    res.render('page-pendidikan', profil)
})

app.get('/karyawan', async function (req, res) { 

    //proses penarikan data
    let data = {
        karyawan: await getAll_karyawan()
    }
    res.render('page-karyawan' , data)
})



app.listen (3000,()=>{
    console.log ('server aktif, buka http://localhost:3000')
})