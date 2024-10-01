
//buat variable , mysql adl nama var
const mysql = require('mysql2')
const http = require ('http')
const fs = require ('fs')

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


function getAll_karyawan() {
    return new Promise((resolve, reject) => {  //Promise & Away = memaksa JS supaya berurutan
    db.query('SELECT * FROM karyawan', function(errorSql, hasil) {
        if (errorSql) {
            reject(errorSql)
        } else {
            resolve(hasil)
        }
    })
})
}



http.createServer ( async function(request, response) {  // async : perintah untuk menunggu
    response.writeHead(200,{'content-type': 'text/html'})

if (request.url == '/') {  
    fs.createReadStream ('./view/halaman-utama.html').pipe(response)
    }
    else if (request.url  == '/karyawan'){  

        //tarik data dari database
        let data = await getAll_karyawan()  //Promise & Away = memaksa JS supaya berurutan
        console.log (data)

        //kirim hasil nya ke front end
        response.end (
            `<h1> Data Karyawan PT Data Informasi Teknologi</h1>
            <hr> 
            Nama Lengkap: ${data[0].nama}<br>
            Nomor Induk Karyawan: ${data[0].nik}<br>
            <pre>${JSON.stringify (data,null, 4)}</pre>`
        )
        console.log (data)
}

}).listen(3000,function(){
    console.log('server active, buka http://localhost:3000')
})