import { createStore } from 'vuex';
import axios from '../axios-auth';
import jwtDecode from 'jwt-decode';


function maskPassword(password) {
    var maskedPassword = "";
    for (var i = 0; i < password.length; i++) {
        maskedPassword += "*";
    }
    return maskedPassword;
}

const store = createStore({
    state() {
        return {
            token: null,
            Username: null,
            id: null
        }
    },
    getters: {
        isAuthenticated(state) {
            return state.token != null;
        }
    },
    mutations: {
        loginSuccesful(state, parameters) {
            state.token = parameters.token;
            state.Username = parameters.Username;
            state.id = parameters.id;
        },
        logout(state) {
            state.token = null;
            state.Username = null;
            state.id = null;
        }
    },
    actions: {
        autoLogin({ commit }) {
            let token = localStorage.getItem('token');
            let Username = localStorage.getItem('Username');
            let id = localStorage.getItem('id');
            if (token) {
                axios.defaults.headers.common["Authorization"] = "Bearer " + token;
                commit('loginSuccesful', {
                    token: token,
                    Username: Username,
                    id: id
                });
            }
        },
        logout({ commit }) {
            return new Promise((resolve, reject) => {
                axios.post("auth/logout", {}, {
                    headers: {
                        'Authorization': localStorage.getItem('token'),
                    }
                }
                )
                    .then(res => {
                        axios.defaults.headers.common["Authorization"] = "";
                        localStorage.clear()
                        commit('logout');
                        resolve();
                    })
                    .catch((error) => reject(error));
            })

        },
        login({ commit }, parameters) {
            return new Promise((resolve, reject) => {
                axios
                    .post("/auth/login", {

                        Username: parameters.Username,
                        Password: parameters.Password,
                    }, {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                        }
                    })
                    .then(res => {
                        const token = res.data.Authorization;
                        const payload = jwtDecode(token);
                        const maskedPassword = maskPassword(parameters.Password)
                        axios.defaults.headers.common["Authorization"] = "Bearer " + res.data.Authorization;
                        localStorage.setItem('token', res.data.Authorization);
                        localStorage.setItem('id', payload.sub);
                        localStorage.setItem('password', parameters.Password);
                        localStorage.setItem('username', parameters.Username);
                        localStorage.setItem('passwordLength', maskedPassword);
                        commit('loginSuccesful', {
                            token: res.data.token,
                            Username: res.data.Username,
                            id: res.data.id
                        });
                        resolve();
                    })
                    .catch((error) => reject(error));
            })
        }
    }
});
export default store;