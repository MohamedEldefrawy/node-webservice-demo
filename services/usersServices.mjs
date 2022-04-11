export class UsersServices {

    login(user) {
        if (user.username === 'dafro' & user.password === '12345')
            return {
                'success': true,
                'message': `Welcome${user.username}`
            };
        return {
            'success': false,
            'message': "Wrong username or password"
        };
    }
}