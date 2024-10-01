const express = require ('express')
const app = express()

app.get('/', function (req, res) {
  res.send('<h1>Hello World</h1>')
})

app.get('/pendidikan', function (req, res) {  //bikin page /pendidikan
    res.send('<h1>Riwayat Pendidikan</h1>')
})

app.get('/karyawan', function (req, res) { 
    res.send('<h1>List Karyawans</h1>')
})



app.listen (3000,()=>{
    console.log ('server aktif, buka http://localhost:3000')
})