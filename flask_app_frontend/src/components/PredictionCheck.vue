<template>
  <div class="page-container">
    <div class="container">
      <img alt="Selected Image" class="logo" :src="imagePath" />

      <div class="error-box mb-3" v-if="message">
        <label class="error-msg">{{ message }}</label>
      </div>
      <h4 class="bold-text" v-if="!message && prediction !== ''">
        Voorspelling: <span class="bold">{{ prediction }}</span> klopt dit?
      </h4>
      <div class="content">
        <div class="button-container" v-if="!message && prediction !== ''">
          <button class="btnCorrect" @click="NavigateToPage('/camera')">Correct</button>
          <button class="btnIncorrect" @click="navigateToPredicionChange">
            Incorrect
          </button>
        </div>
        <a @click="NavigateToPage('/camera')">
          <img src="@/assets/images/cameraIcon.jpg" alt="cameraicon" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import WelcomeItem from "./WelcomeItem.vue";
import HelloWorld from "./HelloWorld.vue";
import axios from "../axios-auth";
import { mapGetters } from "vuex";
import store from "../store/store";
export default {
  data() {
    return {
      imagePath: "",
      imageName: "",
      image: Object,
      images: [],
      test: [],
      capturedImageData: "",
      file: "",
      prediction: "",
      testimage: "",
      message: "",
    };
  },
  computed: {
    ...mapGetters(["getCapturedImage", "getImageFIle"]),
  },

  mounted() {
    this.getImageIdFromUrl();
    this.loadImages(this.imageName);
  },
  methods: {
    getFileNameFromPath(path) {
      return path.split("/").pop();
    },
    getFile() {
      return this.$store.getters.getImageFIle;
    },
    NavigateToPage(name) {
      this.$router.push(name);
    },

    loadImages(id) {
      const testfile = this.getFile();
      this.testimage = testfile;
      this.test = [];
      this.capturedImageData = this.getTakenImage();

      const imageFiles = import.meta.glob(`@/assets/localimages/*.jpg`);
      for (const imagePath in imageFiles) {
        if (imageFiles.hasOwnProperty(imagePath)) {
          const imageName = this.getFileNameFromPath(imagePath);
          const imageId = this.getImageIdFromName(id);
          if (imageId === id) {
            const image = {
              path: (this.imagePath = imagePath.replace(
                /\d+(?=\.jpg$)/,

                imageId
              )),
              name: imageName,
              data: this.capturedImageData,
            };
            const reader = new FileReader();
            reader.onload = (event) => {
              image.data = event.target.result;
              const base64Data = image.data.split(",")[1];
              image.data = base64Data;
              const isImageExists = this.test.some((existingImage) => {
                return (
                  existingImage.path === image.path &&
                  existingImage.name === image.name
                );
              });
              if (!isImageExists) {
                this.test.push(this.testimage);
                this.getprediction();
              }
            };
            const blob = new Blob([imageFiles[imagePath]], {
              type: "image/jpeg",
            });
            reader.readAsDataURL(blob); //
            break;
          }
        }
      }
    },
    getTakenImage() {
      return this.$store.getters.getCapturedImage;
    },
    getprediction() {
      console.log(this.testimage);
      const uploadPromises = this.test.map(() => {
        const formData = new FormData();
        formData.append("image_file", this.testimage);
        return axios.post(`/prediction/`, formData, {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: `${localStorage.getItem("token")}`,
          },
        });
      });

      Promise.all(uploadPromises)
        .then((responses) => {
          const targetarray = responses.map((response) => response.data);
          if (targetarray.length > 0) {
            const predictionObject = targetarray[0];
            if (predictionObject.hasOwnProperty("prediction")) {
              this.prediction = predictionObject.prediction;
              console.log(this.testimage);
              console.log(this.testimage.name);
              const imageData = {
                image: this.testimage,
                prediction: this.prediction,
                name: this.testimage.name,
              };
              console.log(imageData);
              this.$store.commit("setImageInformation", imageData);
            }
          }
        })
        .catch((error) => {
          this.message = error.response.data.message;
          console.log(error);
        });
    },

    getImageIdFromUrl() {
      const currentPath = window.location.pathname;
      const pathParts = currentPath.split("/");
      const imageName = pathParts[pathParts.length - 1];
      return (this.imageName = imageName);
    },
    getImageIdFromName(imageName) {
      return imageName.split(".")[0];
    },
    // navigateToCamera() {
    //   this.$router.push("/camera");
    // },
    removeExtension(fileName) {
      const dotIndex = fileName.lastIndexOf(".");
      if (dotIndex !== -1) {
        return fileName.substring(0, dotIndex);
      } else {
        return fileName;
      }
    },
    navigateToPredicionChange() {
      const imageName = this.removeExtension(this.imageName);
      this.$router.push({
        name: "predictionmodify",
        params: { image: imageName },
      });
    },
  },
  components: {
    WelcomeItem,
    HelloWorld,
  },
};
</script>

<style scoped>
.error-msg {
  font-size: 20px;
  color: black;
  font-weight: bold;
  text-align: center;
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
.button-container {
  display: flex;
}

.button-container button {
  margin-bottom: 70px;
  flex: 1;
}
.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

.bold-text {
  font-size: 30px;
  color: black;
}
@media (max-width: 768px) {
  .bold-text {
    font-size: 24px;
  }
}
.bold {
  font-weight: bold;
}

.content {
  margin-top: 2rem;
  text-align: center;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
  max-width: 100%;
  max-height: 100%;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    font-size: 1rem;
    padding: 1rem 0;
  }
}
</style>
