import { createStore } from 'vuex';
import axios from '../axios-auth';
import jwtDecode from 'jwt-decode';
import createPersistedState from 'vuex-persistedstate';

// when the user loggs in the password will be masked and saved so you can see it again in the profile screen where the user can modify their password
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
            newUploadHistory: [],
            test: [],
        }
    },
    // the getters are used to take the information from the store
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
            console.log(state);
            return state.uploadHistory;
        },
        getTest(state) {
            return state.test;
        },
        getSelectedImages(state) {
            return state.selectedImages;
        },
        

    },
    // de setters are used to set the information
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
        setTest(state, history) {
            state.test.push(history);
        },
        // setNewUploadHistory(state, history) {
        //     console.log(state.uploadHistory);
        
        //     state.uploadHistory.push(history);
        // },
        // the seleced images are used to not display the items that have been uploaded
        setSelectedImages(state, selectedImages) {
            const exists = state.selectedImages.some((image) => image.name === selectedImages.name);
            if (!exists) {
              state.selectedImages.push(selectedImages);
            }
        },
        // the prediction of the images will be saved on the together with the image name so it can be accessed later
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
        // this endpoint is used for logging in and check the username and password; if it is correct you will set the jwt token in the localstorage so it can be used for later functionalities
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
