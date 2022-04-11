import {FileHandler} from '../utilities/FileHandler.mjs'

export class UsersServices {

    getAllUsers() {
        return new FileHandler().readJsonFile('./users.json');
    }

    getUserByName(username) {
        return this.getAllUsers().find((user) => {
            if (user.username === username)
                return user;
        });
    }

    login(user) {
        let currentUser = this.getUserByName(user.username);

        if (currentUser !== null && user.password === currentUser.password)
            return {
                'success': true,
                'message': `Welcome${user.username}`
            };
        return {
            'success': false,
            'message': "Wrong username or password"
        };
    }

    signup(newUser) {
        let users = this.getAllUsers();
        console.log(this.getUserByName(newUser.username));

        if (this.getUserByName(newUser.username) === undefined) {
            users.push(newUser);
            let fileHandler = new FileHandler();
            fileHandler.fileName = './users.json';
            fileHandler.writeJsonFile(JSON.stringify(users));
            return {
                'success': true,
                'newUser': newUser
            }
        } else
            return {
                success: false,
                message: 'user name already exists'
            }
    }

}