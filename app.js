const { profile } = require('console')
const express = require ('express')
const app = express()

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

app.get('/karyawan', function (req, res) { 
    res.render('page-karyawan')
})



app.listen (3000,()=>{
    console.log ('server aktif, buka http://localhost:3000')
})