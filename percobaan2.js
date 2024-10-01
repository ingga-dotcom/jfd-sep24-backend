//supaya bisa panggil file nama_lengkap di table data_pribadi
// syarat menggunakan variabel/object yg ada di file lain:
//1. panggil dulu nama table nya nya
//2. table yg dipanggil, sdh mengekspor variable nya
// 3.panggil table.variabel


//cara penulisan 1
const dp = require ('./data_pribadi')
console.log (dp.nama_lengkap)
console.log (dp.nama_depan)
console.log (dp.alamat)

//cara penulisan 2
console.log (require('./data_pribadi').nama_lengkap)
console.log (require('./data_pribadi').alamat)