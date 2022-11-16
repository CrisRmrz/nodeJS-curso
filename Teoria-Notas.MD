** Nodemon
Ejecutarlo: nodemon nombredelarchivo
Cancelar proceso para volver a escribir: ctrl + c

**Instalar el package.json
npm init

**Package.json 
Se instala con el comando: npm init -y

**Variables de entorno
https://www.npmjs.com/package/dotenv  para qye funcione la carpeta .env

**Webserver
Es un servidor web que nos brinda contenido http

**Express https://www.npmjs.com/package/express version del curso: 4.17.1

**Diferencia webserver restserver
webserver sirve contenido estatico, el restserver nos permite realizar peticiones por json y poder tener nuestros endpoints

**CORS https://www.npmjs.com/package/cors nos permite proteger nuestro servidor

**MONGOOSE https://mongoosejs.com/

**Bycryptjs paquete para encriptar las contraseñas en las bases de datos. Version usada en el curso: 2.4.3

**express-validator es el paquete que usamos para validar el correo. version usada: 6.9.2

**Subir cambios a heroku: hacer el git add, despues el commit y despues git push heroku main

**JWT: tiene 3 partes: HEADER, PAYLOAD, FIRMA: VERSION UTILIZADA 8.5.1
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
};

**TRABAJAR CON ARCHIVOS EN NODEJS: https://www.npmjs.com/package/express-fileupload   VERSION DEL CURSO 1.2.1

**Cloudinary version del curso: 1.32.0