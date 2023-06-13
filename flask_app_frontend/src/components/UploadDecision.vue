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
          <h4>Wil je deze fotos uploaden</h4>
          <div class="close">
            <div class="button-container">
              <button class="btnCorrect"  @click="showModal = true"> 
                Correct
              </button>
              <button class="btnIncorrect" @click="$emit('close-modal')">
                Incorrect
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <SavedModal v-show="showModal" @close-modal="showModal = false" />
  </div>
</template>

<!-- TODO navigate to the bevistige van upload scherm en close modal after pressing exit -->
<script>
import WelcomeItem from "./WelcomeItem.vue";
import HelloWorld from "./HelloWorld.vue";
import axios from "../axios-auth";
import SavedModal from '../components/UploadConformation.vue'
export default {
  name: "Gallery2",
  data() {
    return {
      images: [],
      selectedImages: [],
      showModal: false,
    };
  },
  components: {
    WelcomeItem,
    HelloWorld,
    SavedModal,
  },
  mounted() {
    // this.loadImages();
  },

  
};
</script>

<style scoped>
.fotos{
  float: right;
}
h4{
    text-align: center;
}
.button-container {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
}
.btnIncorrect {
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border-radius: 11px;
  color: white;
  background-color: rgba(255, 0, 0, 0.664);
  width: 100%;
  margin-left: 10px;
}
.btnCorrect {
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border-radius: 11px;
  color: white;
  background-color: rgb(43, 199, 43);
  width: 100%;
  margin-right: 10px;
}
.button label {
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

</style>