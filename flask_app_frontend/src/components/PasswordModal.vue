<template>
  <div class="modal-overlay">
    <div class="page-container">
      <div class="container">
        <div class="background-layer">
          <div class="closemodal" @click="$emit('close-modal')">
            <img
              src="@/assets/images/exit.png"
              alt="Exit modal"
              class="fotos"
            />
          </div>
          <h4>Wachtwoord Wijzigen</h4>
          <label for="username">Oude wachtwoord</label>
          <div class="form-floating">
            <input
              type="text"
              class="form-control"
              id="username"
              v-model="username"
            />
          </div>
          <label for="password">Nieuwe wachtwoord</label>
          <div class="form-floating">
            <input
              type="password"
              class="form-control"
              id="Password"
              v-model="this.Password"
            />
            <div class="error-box mb-3">
              <label class="error-msg">{{ message }}</label>
            </div>
          </div>
          <div class="close">
            <button class="btnBevestigen" @click="showModal = true">
              Bevestigen
            </button>
          </div>
        </div>
      </div>
    </div>
    <SavedModal v-show="showModal" @close-modal="showModal = false" />
  </div>
</template>


<script>
import SavedModal from "../components/ConformationModal.vue";
import axios from "../axios-auth";
export default {
  data() {
    return {
      showModal: false,
       message: "",
    };
  },
  // make a axios request to the back-end server in swagger so the user can be edited
  methods: {
    editUser() {
      axios
        .put(`/users/${localStorage.getItem("id")}`, {
          role: this.user.username,
          Password: this.Password,
        })
        .then((res) => {
          this.currentUser = res.data;  
          console.log(res.data);
        })
        .catch((error) => console.log(error));
      // this.message = error.response.data.message;
    },
  },
  mounted(){
    // this.editUser();
  },
  components: {
    SavedModal,
  },
};
</script>

<style scoped>
label {
  display: block;
  margin-top: 1rem;
}

.container {
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: whitesmoke;
  padding: 25px;
}
.btnStyle {
  display: flex;
  justify-content: center;
  align-items: center;
}
.btnBevestigen {
  background-color: blue;
}
.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
.form-floating input.form-control {
  background: transparent;
  border: none;
  border-bottom: 1px solid #000000;
  margin-bottom: 20px;
}

.form-control.input {
  border: none;
  border-bottom: 1px solid #ccc;
  border-radius: 0;
  padding: 5px;
  font-size: 14px;
  color: #333;
}

.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
}

.close {
  cursor: pointer;
  justify-content: center;
  display: flex;
}
.closemodal {
  cursor: pointer;
  justify-content: end;
  display: flex;
  margin-bottom: 10px;
}

.close-img {
  width: 25px;
}

.check {
  width: 150px;
}

h6 {
  font-weight: 500;
  font-size: 28px;
  margin: 20px 0;
}

p {
  font-size: 16px;
  margin: 20px 0;
}

button {
  background-color: #ac003e;
  width: 150px;
  height: 40px;
  color: white;
  font-size: 14px;
  border-radius: 16px;
}
</style>
