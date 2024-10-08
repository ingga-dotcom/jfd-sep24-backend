
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


//ini untuk nge debug aja / menampilkan data di terminal halaman ini ketika diketik $ node percobaan-mysql-get
// db.query('SELECT * FROM karyawan', function(errorSql, hasil) {
//     if (errorSql) {
//         console.log(errorSql)
//     } else {
//         console.log(hasil)
//     }
// })


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



http.createServer ( async function(request, response) {  // async : perintah untuk menunggu
    response.writeHead(200,{'content-type': 'text/html'})

if (request.url == '/') {  
    fs.createReadStream ('./view/halaman-utama.html').pipe(response)
    }
    else if (request.url  == '/karyawan'){  

        //tarik data dari database
        let data = await getAll_karyawan()
        
        //looping data dalam bentuk elemen html
        let html_list_karyawan = ''
        for (const i in data) {
            html_list_karyawan +=
            `<b>Nama Lengkap</b>: ${data[i].nama}<br>
            <b>NIK</b>: ${data[i].nik}<br>
            <b>Tanggal Lahir</b>: ${new Date (data[i].tanggal_lahir).toLocaleDateString ('id-ID')}<br>
            <b>Alamat</b>: ${data[i].alamat}<br>
            <b>Jabatan</b>: ${(data[i].jabatan_nama)?data[i].jabatan_nama:'-'}<br>
            <b>Agama</b>: ${(data[i].agama_nama)?data[i].agama_nama:'-'}<br><br>`
        }





        //mengirimkan hasil nya ke front end
        response.end (
            `<h1> Data Karyawan PT Data Informasi Teknologi</h1>
            <hr> 
            ${html_list_karyawan}`
            // Nama Lengkap: ${data[0].nama}<br>  //
            // Nomor Induk Karyawan: ${data[0].nik}<br>  //
            // <pre>${JSON.stringify (data,null, 4)}</pre>`  //
        )
        //console.log (data)  //
}


}).listen(3000,function(){
    console.log('server active, buka http://localhost:3000')
})