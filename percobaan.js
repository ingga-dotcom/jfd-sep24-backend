//memanggil modul bawaan dari node.js yaitu http
//untuk membuat server http
const http = require ('http')
const fs = require ('fs')

http.createServer ( function(request, response) {
    response.writeHead(200,{'content-type': 'text/html'})    //kita akan mengirim text plain/mentah(semua yg ada di dlm kurung). Bisa juga pake text/html


    //halaman utama
    if (request.url == '/') {
        fs.createReadStream ('./view/halaman-utama.html').pipe(response)
    }


    //halaman profile
    else if (request.url  == '/profile'){
        fs.createReadStream('./view/halaman-profil.html').pipe(response)
    }


    //halaman hubungi-saya
    else if (request.url == '/hubungi-saya') {
        let kontak = {
            mob : '601111001113',
            email : 'inggadewi.w@gmail.com',
            ig : 'ingga_syalala',
            linkedin : 'Dewi Ingga Wijayanti',
        }

        response.end (
        `<ul>
            <li>mobile : ${kontak.mob}</li>
            <li>email : ${kontak.email}</li>
            <li>instagram : ${kontak.ig}</li>
            <li>linkedIn : ${kontak.linkedin}</li>
        </ul>`

        )   
    }
    


    //untuk menangani url yg tdk ada
    else {
        response.end (`<h1> 404:halaman tidak ditemukan</h1><hr>`)
    }



}).listen(3000,function(){
    console.log('server active, buka http://localhost:3000')

})

//tes nambah komentar
//kirim ke 2X