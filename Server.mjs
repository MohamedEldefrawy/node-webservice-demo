import {createServer} from 'http';
import {UsersServices} from './services/usersServices.mjs'
import fs from "fs";
import * as url from "url";
import * as querystring from "querystring";

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
                    if (result.success)
                        response.writeHead(200, {'Content-Type': 'application/json'});
                    else {
                        response.writeHead(400, {'Content-Type': 'application/json'})
                    }
                    response.end(JSON.stringify(result));
                });
            } else if (request.url === '/signup' && request.method === "POST") {
                let body = [];
                request.on('data', (chunk) => {
                    body.push(chunk);
                }).on('end', () => {
                    body = Buffer.concat(body).toString();
                    let result = new UsersServices().signup(JSON.parse(body));
                    if (result.success)
                        response.writeHead(200, {'Content-Type': 'application/json'});
                    else {
                        response.writeHead(400, {'Content-Type': 'application/json'})
                    }
                    response.end(JSON.stringify(result));
                });
            } else if (request.url === '/profile' && request.method === "POST") {
                let body = [];
                request.on('data', (chunk) => {
                    body.push(chunk);
                }).on('end', () => {
                    body = Buffer.concat(body).toString();
                    let result = new UsersServices().getUserByName(JSON.parse(body).username);
                    if (result !== undefined) {
                        let html = fs.readFileSync('./views/profile.html', 'utf8');
                        html = html.replace('UserName', JSON.parse(body).username);
                        response.writeHead(200, {'Content-Type': 'text/html'});
                        response.end(html);

                    } else {
                        let html = fs.readFileSync('./views/profile.html', 'utf8');
                        html = html.replace('UserName', "Notfound");
                        response.writeHead(400, {'Content-Type': 'text/html'});
                        response.end(html);
                    }
                });
            } else {
                response.writeHead(404);
                response.end();
            }
        })).listen(3000, 'localhost', () => {
            console.log("Server is started on ", "http://localhost:3000");
        });
    }
}