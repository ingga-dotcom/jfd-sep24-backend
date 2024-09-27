//memanggil modul bawaan dari node.js yaitu http
//untuk membuat server http



const http = require ('http')

http.createServer ( function(request, response) {
    response.writeHead(200,{'content-type': 'text/html'})    //kita akan mengirim text plain/mentah(semua yg ada di dlm kurung). Bisa juga pake text/html
    response.end('<h1>WELCOME TO MY WEBSITE</h1><hr>')
}).listen(3000,function(){
    console.log('server sudah nyala, buka http://localhost:3000')

})