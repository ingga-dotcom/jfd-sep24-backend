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

    getAll_agama: function() {
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

}