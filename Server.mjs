import {createServer} from 'http';

export class Server {
    static run() {
        createServer(((req, res) => {
            console.log("Request has been received");
        })).listen(3000, 'localhost', () => {
            console.log("Server is started on ", "http://localhost:3000");
        });
    }
}