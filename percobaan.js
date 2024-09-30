//memanggil modul bawaan dari node.js yaitu http
//untuk membuat server http



const http = require ('http')

http.createServer ( function(request, response) {
    console.log(request.url)
    response.writeHead(200,{'content-type': 'text/html'})    //kita akan mengirim text plain/mentah(semua yg ada di dlm kurung). Bisa juga pake text/html

    //halaman utama
    if (request.url == '/') {
    response.end (`<h1>WELCOME TO MY WEBSITE</h1><hr>)
    <a href="/profil">Lihat Profil</a>`
    )
    }

    //halaman profile
    else if (request.url  == '/profile'){

        let tahun_lahir = 1945
        let tahun_ini = 2024
        let umur = tahun_ini - tahun_lahir

        response.end (
        `<ul>
            <li>nama lengkap : Dewi Ingga Wijayanti</li>
            <li>alamat : central park residence</li>
            <li>tanggal lahir : 27 september ${tahun_lahir}</li>
            <li>umur : ${umur} tahun</li>
        </ul>
        <br>
        <a href="/">Balik ke beranda</a>`
        )
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