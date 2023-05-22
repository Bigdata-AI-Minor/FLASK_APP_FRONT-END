import { createStore } from 'vuex';
import axios from '../axios-auth'

const store = createStore({
    state() {
        return {
            token: null,
            username: null,
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
            state.username = parameters.username;
            state.id = parameters.id;
        },
        logout(state){
            state.token = null;
            state.username = null;
            state.id = null;
        }
    },
    actions: {
        autoLogin({ commit }) {
            let token = localStorage.getItem('token');
            let username = localStorage.getItem('username');
            let id = localStorage.getItem('id');
            if (token) {
                axios.defaults.headers.common["Authorization"] = "Bearer " + token;
                commit('loginSuccesful', {
                    token: token,
                    username: username,
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
                    .post("/auth/login", {
                        id: parameters.id,
                        username: parameters.username,
                        password: parameters.password
                    })
                    .then(res => {
                        axios.defaults.headers.common["Authorization"] = "Bearer " + res.data.token;
                        console.log(res.data.token);
                        console.log("the button is doing something")
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