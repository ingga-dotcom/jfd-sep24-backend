//memanggil/mengimpor modul bawaan dari node.js yaitu http
//untuk membuat server http

const http = require ('http') //Memanggil/mengimpor modul bawaan http, yang digunakan untuk membuat server HTTP
const fs = require ('fs')  //Mengimpor modul (Sistem File) bawaan fs, yang digunakan untuk berinteraksi dengan sistem file (misalnya, membaca file)


// http.createServer(...): Membuat server HTTP.
// Ini function(request, response)adalah panggilan balik yang menangani permintaan masuk.
// request: Mewakili permintaan HTTP yang masuk (misalnya, URL, header).
// response: Mewakili respons yang akan dikirim kembali ke klien.
http.createServer ( function(request, response) {
    // response.writeHead(200, ...): Mengatur kode status respons HTTP ke 200(OK) dan menentukan bahwa tipe kontennya adalah text/html.
    // Ini memberitahu browser bahwa server akan mengirimkan kembali konten HTML.
    response.writeHead(200,{'content-type': 'text/html'})    //kita akan mengirim text plain/mentah(semua yg ada di dlm kurung). Bisa juga pake text/html


    //halaman-utama
    if (request.url == '/') {  //Memeriksa apakah URL permintaan adalah URL root ( http://localhost:3000/)
        //fs.createReadStream('./view/halaman-utama.html'): Membuat aliran baca untuk membaca halaman-utama.htmlberkas dari viewdirektori.
        //.pipe(response): Mengirimkan isi berkas halaman-utama.htmlsebagai respons.
        fs.createReadStream ('./view/halaman-utama.html').pipe(response)  
    }


    //halaman-profile
    else if (request.url  == '/profile'){  //Memeriksa apakah URL permintaan adalah /profile
        fs.createReadStream('./view/halaman-profile.html').pipe(response) //Membaca halaman-profile.html berkas,dan Mengirimkan konten halaman-profile.htmlsebagai respons
    }


    //halaman hubungi-saya
    else if (request.url == '/hubungi-saya') {  //Memeriksa apakah URL permintaan adalah `/h/hubungi-saya
        let kontak = {  //Mendefinisikan objek JavaScript 'kontak' akun
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
    


    //untuk menangani url yg tdk ada (Error 404)
    else {  // Eksekusi
        response.end (`<h1> 404:halaman tidak ditemukan</h1><hr>`)  //404berbuat salah
    }


//memulai server
}).listen(3000,function(){
    console.log('server active, buka http://localhost:3000')

})

//tes nambah komentar
//kirim ke 2X


