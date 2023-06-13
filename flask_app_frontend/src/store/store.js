import { createStore } from 'vuex';
import axios from '../axios-auth';
import jwtDecode from 'jwt-decode';
import createPersistedState from 'vuex-persistedstate';


function maskPassword(password) {
    var maskedPassword = "";
    for (var i = 0; i < password.length; i++) {
        maskedPassword += "*";
    }
    return maskedPassword;
}

const store = createStore({
    plugins: [createPersistedState()],
    state() {
        return {
            token: null,
            Username: null,
            id: null,
            imageLocationData: {},
            latitude: null,
            longitude: null,
            Imagedata: null,
            imagefIle: null,
            imageInformation: [],
            deletedImages: [],
            fotoPredictions: [],
            uploadHistory: [],
            selectedImages: [],
        }
    },

    getters: {
        isAuthenticated(state) {
            return state.token != null;
        },
        getLatitude(state) {
            return state.latitude;
        },
        getLongitude(state) {
            return state.longitude;
        },
        getCapturedImage(state) {
            return state.Imagedata;
        },
        getImageFIle(state) {
            return state.imagefIle;
        },
        getImageInformation(state) {
            return state.imageInformation;
        },
        getdeletedImages(state) {
            return state.deletedImages;
        },
        getfotoPredictions(state) {
            return state.fotoPredictions;
        },
        getUploadHistory(state) {
            return state.uploadHistory;
        },
        getSelectedImages(state) {
            return state.selectedImages;
        },

    },
    mutations: {
        // the logout clears all the data when logging out. it can clear all the getters and setters properties
        logout(state) {
            state.token = null;
            state.Username = null;
            state.id = null;
        },
        setLatitude(state, latitude) {
            state.latitude = latitude;
        },
        setLongitude(state, longitude) {
            state.longitude = longitude;
        },
        setCapturedImage(state, Imagedata) {
            state.Imagedata = Imagedata;
        },
        setImageFIle(state, imagefIle) {
            state.imagefIle = imagefIle;
        },
        setImageInformation(state, imageInformation) {
            state.imageInformation.push(imageInformation);
        },
        setDeletedImages(state, deletedImage) {
            state.deletedImages.push(deletedImage);
        },
        setUploadHistory(state, history) {
            state.uploadHistory.push(history);
        },
        setSelectedImages(state, selectedImages) {
            const exists = state.selectedImages.some((image) => image.name === selectedImages.name);
            if (!exists) {
              state.selectedImages.push(selectedImages);
            }
            // state.selectedImages.push(selectedImages);
        },
        setFotoPrediction(state, { name, prediction }) {
            const foto = state.fotoPredictions.find((foto) => foto.name === name);
            if (foto) {
                foto.prediction = prediction;
            }
        },

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
        setImageInformation({ commit }, imageInformation) {
            commit('imageInformation', imageInformation);
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
        },
    }
});
export default store;