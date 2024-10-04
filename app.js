
const express  = require ('express')
const app      = express ()
const mysql    = require ('mysql2')

// sambungkan ke mysql 
const db = mysql.createConnection({
    //host: 'localhost',
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'db_jfd_satu'
})


// buka koneksi
db.connect()


//bikin function untuk narik data karyawan dr database - semua data
function getAll_karyawan() {
    return new Promise((resolve, reject) => {  //Promise & Away = memaksa JS supaya berurutan
    
        let sqlSyntax =     //biar rapi script SQL ini
        `SELECT
            kry.*, jbt.nama as jabatan_nama, 
            jbt.singkatan as jabatan_singkatan,
            agm.nama as agama_nama
        FROM karyawan as kry
        LEFT JOIN jabatan as jbt ON jbt.id = kry.jabatan
        LEFT JOIN agama as agm ON agm.id = kry.agama;
        `

        db.query(sqlSyntax, function(errorSql, hasil) {
        if (errorSql) {
            reject(errorSql)
        } else {
            resolve(hasil)
        }
    })
})
}




//bikin function untuk narik data karyawan dr database - satu data per id
function getOne_karyawan(idkry){
    return new Promise((resolve, reject) => {  //Promise & Away = memaksa JS supaya berurutan
    
        let sqlSyntax =     //biar rapi script SQL ini  
        `SELECT
            kry.*, jbt.nama as jabatan_nama, 
            jbt.singkatan as jabatan_singkatan,
            agm.nama as agama_nama
        FROM karyawan as kry
        LEFT JOIN jabatan as jbt ON jbt.id = kry.jabatan
        LEFT JOIN agama as agm ON agm.id = kry.agama
        WHERE kry.id=?`   //satu data per id

        db.query(sqlSyntax, [idkry] , function(errorSql, hasil) {
        if (errorSql) {
            reject(errorSql)
        } else {
            resolve(hasil)
        }
    })
})
}





// untuk mengambil data yg ter-encoded(enkripsi) dari form html
// yang dikirimkan melalui protokol http
app.use(express.urlencoded({extended:false}))
app.set ('view engine' , 'ejs')  //setting penggunaan template engine untuk express
app.set ('views' , './view-ejs')  //setting penggunaan folder untuk menyimpan file .ejs




//function render ('nama-file')
//nama file nya wajib ber eksensi .ejs
//otomatis mengambil file .ejs yg ada di folder view-ejs
app.get('/', function (req, res) {
  res.render('beranda')
})




//bikin rute /pendidikan
app.get('/pendidikan', function (req, res) {
    let profil = {
        nama: 'Prabowo',
        s1: 'ITB : Sistem Informasi',
        smk: 'SMK Remaja: Akuntansi',

    }
    res.render('page-pendidikan', profil)
})



//bikin rute /karyawan
app.get('/karyawan', async function (req, res) { 
    //proses penarikan data
    let data = {
        karyawan: await getAll_karyawan()
    }
    res.render('page-karyawan' , data)
})



//bikin rute /karyawan/detail
app.get('/karyawan/detail/:id_karyawan', async function (req, res) {
    //ini mau ambil data satuan, cuman punya sakura
    let data = {
        satukaryawan: await getOne_karyawan(req.params.id_karyawan) 
    }
    res.render('page-karyawan-detail' , data)
  })




//bikin rute karyawan/tambah
app.get('/karyawan/tambah', function (req, res) {
    res.render('page-karyawan-form-tambah')
  })





//bikin rute untuk karyawan/proses-insert-data
app.post('/karyawan/proses-insert-data', async function (req, res) {
    // 1. tangkap isi data dari masing-masing form
    // req.body             => ambil semua inputan dari form
    // req.body.nama_form   => ambil satuan inputan dari form

    try {
        // 2. kirim sebagai script SQL
        let insert = await insert_karyawan( req )

        // 3. proses pengecekan terinput ke db atau gagal
        if (insert.affectedRows > 0) {
            // 3a. jika berhasil, tampilkan pesan sukses
            res.redirect('/karyawan')
            // console.log('berhasil input ke database')
        }
    } catch (error) {
        // 3b. jika gagal, tampilkan pesan error
        throw error
    }

})



function insert_karyawan( req ) {
    return new Promise( (resolve, reject) => {
        let sqlSyntax =
        `INSERT INTO karyawan
        (nama, nik, tanggal_lahir, alamat, jabatan, agama)
        VALUES
        (?, ?, ?, ?, null, null)`

        let sqlData = [
            req.body.form_nama,
            req.body.form_nik,
            req.body.form_tanggal_lahir,
            req.body.form_alamat,
        ]

        db.query(sqlSyntax, sqlData, function(errorSql, hasil) {
            if (errorSql) {
                reject(errorSql)
            } else {
                resolve(hasil)
            }
        })
    })
}




app.listen (3000,()=>{
    console.log ('server aktif, buka http://localhost:3000')
})