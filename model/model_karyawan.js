const mysql = require('mysql2')
const db    = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_jfd_satu'
})
db.connect()


module.exports =
{

    getAll_karyawan: function() {
        return new Promise( (resolve, reject) => {
            let sqlSyntax =
            `SELECT 
                kry.*, jbt.nama as jabatan_nama, 
                jbt.singkatan as jabatan_singkatan, 
                agm.nama as agama_nama 
            FROM karyawan as kry 
            LEFT JOIN jabatan as jbt ON jbt.id = kry.jabatan 
            LEFT JOIN agama as agm ON agm.id = kry.agama`
    
            db.query(sqlSyntax, function(errorSql, hasil) {
                if (errorSql) {
                    reject(errorSql)
                } else {
                    resolve(hasil)
                }
            })
        })
    },



    getOne_karyawan: function( idkry ) {
        return new Promise( (resolve, reject) => {
            let sqlSyntax =
            `SELECT 
                kry.*, jbt.nama as jabatan_nama, 
                jbt.singkatan as jabatan_singkatan, 
                agm.nama as agama_nama 
            FROM karyawan as kry 
            LEFT JOIN jabatan as jbt ON jbt.id = kry.jabatan 
            LEFT JOIN agama as agm ON agm.id = kry.agama
            WHERE kry.id = ?`
    
            db.query(sqlSyntax, [idkry], function(errorSql, hasil) {
                if (errorSql) {
                    reject(errorSql)
                } else {
                    resolve(hasil)
                }
            })
        })
    },



    insert_karyawan: function( req ) {
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
    
            db.query(sqlSyntax, sqlData, function(errorSql, hasil) {
                if (errorSql) {
                    reject(errorSql)
                } else {
                    resolve(hasil)
                }
            })
        })
    },



    hapusKaryawan: function(idkry) {
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
    },



    update_karyawan: function(req) {
        return new Promise( (resolve, reject) => {
            let sqlSyntax =
            `UPDATE karyawan SET ? WHERE id = ?`
    
            let sqlData = {
                nama            : req.body.form_nama,
                nik             : req.body.form_nik,
                tanggal_lahir   : req.body.form_tanggal_lahir,
                alamat          : req.body.form_alamat,
                jabatan         : req.body.form_jabatan,
                agama           : req.body.form_agama,
            }
    
            db.query(sqlSyntax, [sqlData, req.params.id_karyawan], function(errorSql, hasil) {
                if (errorSql) {
                    reject(errorSql)
                } else {
                    resolve(hasil)
                }
            })
        })
    },
    

}