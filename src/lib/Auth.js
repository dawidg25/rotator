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
        window.location.reload(true);
    }
}
auth.getUserId = function() {
    console.log(this.getUser().id);
    return this.getUser().id;
}
export default auth;