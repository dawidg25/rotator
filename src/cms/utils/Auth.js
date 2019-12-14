import notification from './Notification';
var auth = {
    getToken: () => {
        return localStorage.getItem('x-auth');
    },
    setToken: token => {
        localStorage.setItem('x-auth', token);
    },
    deleteToken: (reload) => {
        localStorage.removeItem('x-auth');
        if(reload) {
            window.location.replace('/cms');
        }
    },
    setUser: (user) => {
        localStorage.setItem('user', user);
    },
    deleteUser: () => {
        localStorage.removeItem('user');
    },
    getUser: () => {
        return JSON.parse(localStorage.getItem('user'));
    }
}
auth.verifyError = function(error) {
    if(error.response.status === 403) {
        this.deleteUser();
        this.deleteToken();
        window.location.replace('/cms');
    } else {
        if(error.response.data.errors.url){
            return notification.create('Url is already used', 'error');
        }
        notification.create('Something go wrong', 'error');
    }
}
auth.getUserId = function() {
    return this.getUser().id;
}
export default auth;