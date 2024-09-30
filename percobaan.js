//memanggil modul bawaan dari node.js yaitu http
//untuk membuat server http



const http = require ('http')

http.createServer ( function(request, response) {
    console.log(request.url)
    response.writeHead(200,{'content-type': 'text/html'})    //kita akan mengirim text plain/mentah(semua yg ada di dlm kurung). Bisa juga pake text/html

    //halaman utama
    if (request.url == '/') {
    response.end (`<h1>WELCOME TO MY WEBSITE</h1><hr>`)
    }
    else if (request.url  == '/profile'){
        response.end (
        `<ul>
            <li>nama lengkap : Dewi Ingga Wijayanti</li>
            <li>alamat : central park residence</li>
        </ul>`
        )
    }
    else if (request.url == '/hubungi-saya') {
        response.end (
        `<ul>
            <li>mobile : 601111001113</li>
            <li>email : inggadewi.w@gmail.com</li>
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