
const express  = require ('express')
const app      = express ()
const mysql    = require ('mysql2')
const {body, query, validationResult} = require('express-validator')


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
        LEFT JOIN agama as agm ON agm.id = kry.agama
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
        //notifikasi: req.query.notif,
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





let formValidasiInsert = [
    body('form_nik').notEmpty().isNumeric(),
    body('form_nama').notEmpty().isString(),
    body('form_tanggal_lahir').notEmpty(),
    body('form_alamat').notEmpty(),
]



//bikin rute untuk karyawan/proses-insert-data
app.post('/karyawan/proses-insert-data', formValidasiInsert, async function(req,res) {
    const errors = validationResult(req)
    // jika lolos validasi
    if (errors.isEmpty()) {
    // in case request params meet the validation criteria



    // 1. tangkap isi data dari masing-masing form
    // req.body             => ambil semua inputan dari form
    // req.body.nama_form   => ambil satuan inputan dari form

    try {
        // 2. kirim sebagai script SQL
        let insert = await insert_karyawan( req )

        // 3. proses pengecekan terinput ke db atau gagal
        if (insert.affectedRows > 0) {
            // 3a. jika berhasil, tampilkan pesan sukses
            res.redirect('/karyawan?notif=Berhasil input karyawan baru')
            // console.log('berhasil input ke database')
        }
    } catch (error) {
        // 3b. jika gagal, tampilkan pesan error
        throw error
    }


        // jika tidak lolos
        }else {
            // res.status(422).json({errors: errors.array()})
            let errorData = {
                pesanError: errors.array()
            }
            errorData.pesanError[0].fields
            res.render('page-karyawan-form-tambah', errorData)
        }

})




function insert_karyawan( req ) {
    return new Promise( (resolve, reject) => {
        let sqlSyntax =
        `INSERT INTO karyawan SET ?`

        let sqlData = {
            nama            : req.body.form_nama,
            nik             : req.body.form_nik,
            tanggal_lahir   : req.body.form_tanggal_lahir,
            alamat          : req.body.form_alamat,
            jabatan         : req.body.form_jabatan,
            agama           : req.body.form_agama,
        }

        // let sqlSyntax =
        // `INSERT INTO karyawan
        // (nama, nik, tanggal_lahir, alamat, jabatan, agama)
        // VALUES
        // (?, ?, ?, ?, ?, ?)`

        // let sqlData = [
        //     req.body.form_nama,
        //     req.body.form_nik,
        //     req.body.form_tanggal_lahir,
        //     req.body.form_alamat,
        //     req.body.form_jabatan,
        //     req.body.form_agama,
        // ]




        db.query(sqlSyntax, sqlData, function(errorSql, hasil) {
            if (errorSql) {
                reject(errorSql)
            } else {
                resolve(hasil)
            }
        })
    })
}



function hapusKaryawan(idkry) {
    return new Promise( (resolve, reject) => {
        let sqlSyntax =
        `DELETE FROM karyawan WHERE id = ?`

        db.query(sqlSyntax, [idkry], function(errorSql, hasil) {
            if (errorSql) {
                reject(errorSql)
            } else {
                resolve(hasil)
            }
        })
    })
}


//bikin rute
app.get('/karyawan/hapus/:id_karyawan', async function(req,res) {
    try {
        let hapus = await hapusKaryawan( req.params.id_karyawan )
        if (hapus.affectedRows > 0) {
            res.redirect('/karyawan')
        }
    } catch (error) {
        throw error
    }
})




function getAll_jabatan() {
    return new Promise( (resolve, reject) => {
        let sqlSyntax =
        `SELECT * FROM jabatan`
        db.query(sqlSyntax, function(errorSql, hasil) {
            if (errorSql) {
                reject(errorSql)
            } else {
                resolve(hasil)
            }
        })
    })
}


function getAll_agama() {
    return new Promise( (resolve, reject) => {
        let sqlSyntax =
        `SELECT * FROM agama`
        db.query(sqlSyntax, function(errorSql, hasil) {
            if (errorSql) {
                reject(errorSql)
            } else {
                resolve(hasil)
            }
        })
    })
}



//bikin rute
app.get('/karyawan/tambah', async function(req,res) {
    let data = {
        jabatan: await getAll_jabatan(),
        agama: await getAll_agama(),
    }
    res.render('page-karyawan-form-tambah', data)
})









app.listen (3000,()=>{
    console.log ('server aktif, buka http://localhost:3000')
})