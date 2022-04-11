import {createServer} from 'http';
import {UsersServices} from './services/usersServices.mjs'
import fs from "fs";

export class Server {
    static run() {

        createServer(((request, response) => {
            if (request.url === '/' || request.url === '/home') {
                fs.createReadStream('./views/home.html').pipe(response);
            } else if (request.url === '/login' && request.method === "POST") {
                let body = [];

                request.on('data', (chunk) => {
                    body.push(chunk);
                }).on('end', () => {
                    body = Buffer.concat(body).toString();
                    let result = new UsersServices().login(JSON.parse(body));
                    response.end(JSON.stringify(result));
                });
            } else if (request.url === '/signup') {
                response.writeHead(200, {'Content-Type': 'application/json'});
                var obj = {
                    firstname: 'John',
                    lastname: 'Doe'
                };
                response.end(JSON.stringify(obj));
            } else if (request.url === '/profile') {
                response.writeHead(200, {'Content-Type': 'application/json'});
                var obj = {
                    firstname: 'John',
                    lastname: 'Doe'
                };
                response.end(JSON.stringify(obj));
            } else {
                response.writeHead(404);
                response.end();
            }
        })).listen(3000, 'localhost', () => {
            console.log("Server is started on ", "http://localhost:3000");
        });
    }
}