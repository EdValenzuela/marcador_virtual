//Requerimientos
const http = require('http');


//Salida del puerto HTTP
http.createServer((req, resp) => {

        //Salida JSON
        resp.writeHead(200, { 'content-Type': 'application/json' })

        let salida = {
            nombre: "hola mundo",
            url: req.url
        }

        resp.write(JSON.stringify(salida));
        resp.end();

    })
    .listen(4000);

console.log("Habilitando el puerto 4000");