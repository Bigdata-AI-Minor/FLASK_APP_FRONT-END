import { createStore } from 'vuex';
import axios from '../axios-auth'

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
        logout(state){
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
        logout({commit}){
            axios.defaults.headers.common["Authorization"] = "";
            localStorage.clear()
            commit('logout');
        },
        login({ commit }, parameters) {
            return new Promise((resolve, reject) => {
                axios
                .post("http://localhost:5000/auth/login", {
                //    id: parameters.id,
                  Username: parameters.Username,
                  Password: parameters.Password
                }, {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin' : '*',
                    }
                })
                    .then(res => {
                        console.log(res)
                        axios.defaults.headers.common["Authorization"] = "Bearer " + res.data.token;
                        console.log(res.data.token);
                        localStorage.setItem('token', res.data.token);
                        localStorage.setItem('username', res.data.username);
                        localStorage.setItem('id', res.data.id);
                        commit('loginSuccesful', {
                            token: res.data.token,
                            username: res.data.username,
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