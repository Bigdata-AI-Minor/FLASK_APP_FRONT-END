<template>
  <div class="container">
    <nav class="custom-navbar">
      <a class="navbar-brand" href="#"> Jouw foto's </a>
    </nav>
    <div class="container">
      <div v-if="images.length === 0">
        <img
          alt="photolibrary"
          class="logo"
          src="@/assets/images/photolibrary.jpg"
          width="200"
          height="200"
        />
        <h3>Nog geen foto's</h3>
        <h5>
          Je hebt nog geen foto's toegevoegd. Klik op de camera om een foto te
          maken.
        </h5>
      </div>
      <div class="row">
        <div v-for="(image, index) in images" :key="index" class="col">
          <div class="image-prediction">{{ image.prediction }}</div>
          <img
            :src="image.path"
            :alt="image.name"
            class="image"
            :class="{ selected: image.selected }"
            @click="toggleSelection(image)"
            @dblclick="navigateToImage(image)"
          />
        </div>
      </div>
      <button class="upload" @click="handleUpload">Upload</button>
      <!-- <button class="upload" @click="uploadImages; showModal = true ">Upload</button> -->
    </div>
    <footer>
      <div class="row">
        <div class="col">
          <a href="/camera" class="footer-link">
            <img
              src="@/assets/images/photolibrary/camera.png"
              alt="Image 1"
              class="footer-image"
            />
          </a>
        </div>
        <div class="col">
          <a href="/library" class="footer-link">
            <img
              src="@/assets/images/photolibrary/fotos.jpg"
              alt="Image 2"
              class="footer-image"
            />
          </a>
        </div>
        <div class="col">
          <a href="/profile" class="footer-link">
            <img
              src="@/assets/images/photolibrary/profiel.png"
              alt="Image 3"
              class="footer-image"
            />
          </a>
        </div>
      </div>
    </footer>
    <SavedModal v-show="showModal" @close-modal="showModal = false" />
  </div>
</template>

<script>
import WelcomeItem from "./WelcomeItem.vue";
import HelloWorld from "./HelloWorld.vue";
import axios from "../axios-auth";
import SavedModal from "../components/UploadDecision.vue";
import { mapGetters } from "vuex";
export default {
  name: "Gallery",
  data() {
    return {
      images: [],
      selectedImages: [],
      showModal: false,
      newimages: [],
      imagepredictions: [],
    };
  },
  components: {
    WelcomeItem,
    HelloWorld,
    SavedModal,
  },
  computed: {
    ...mapGetters(["getImageInformation" , "getfotoPredictions"]),
  },
  mounted() {
    this.loadImages();
  },
  methods: {
    getInformation() {
      return this.$store.getters.getImageInformation;
    },
     getFilteredImages() {
      return this.$store.getters.getSelectedImages;
    },
    // get imageprediction is maybe not necessary
    getPrediction() {
      return this.$store.getters.getfotoPredictions;
    },
    handleUpload() {
      this.uploadImages();  
      this.showModal = true; 
    },
    loadImages() {
      this.newimages = this.getInformation();
      // this.imagepredictions = this.getPrediction();
      this.images = [];
      const imageFiles = import.meta.glob(`@/assets/localimages/*.jpg`);
      for (const imagePath in imageFiles) {
        if (imageFiles.hasOwnProperty(imagePath)) {
          const imageName = this.getFileNameFromPath(imagePath);
          const image = {
            path: imagePath,
            name: imageName,
            prediction: null,
          };

          for (let i = 0; i < this.newimages.length; i++) {
            const imageData = this.newimages[i];
            if (imageData.name === imageName){
              image.prediction = imageData.prediction;
            }
          }

          const reader = new FileReader();
          reader.onload = (event) => {
            image.data = event.target.result;
            const base64Data = image.data.split(",")[1];
            image.data = base64Data;
            // here will check if it exists in the selected aray
            const uploadedImages = this.getFilteredImages();
            const exists = uploadedImages.some((image) => image.name === imageName);
            if (!exists) {
              this.images.push(image);
            } 
          };
          const blob = new Blob([imageFiles[imagePath]], {
            type: "image/jpeg",
          });
          reader.readAsDataURL(blob); //
        }
      }
    },
    navigateToImage(image) {
      const imageName = this.removeExtension(image.name);
      this.$router.push({
        name: "imagedetails",
        params: { image: imageName },
      });
    },
    toggleSelection(image) {
      image.selected = !image.selected;
      if (image.selected) {
        this.selectedImages.push(image); // Add selected image to the array
      } else {
        const index = this.selectedImages.findIndex(
          (selectedImage) => selectedImage.path === image.path
        );
        if (index !== -1) {
          this.selectedImages.splice(index, 1); // Remove deselected image from the array
        }
      }
    },
    removeExtension(fileName) {
      const dotIndex = fileName.lastIndexOf(".");
      if (dotIndex !== -1) {
        return fileName.substring(0, dotIndex);
      } else {
        return fileName;
      }
    },
    getFileNameFromPath(path) {
      return path.split("/").pop();
    },
    uploadImages() {
      const uploadPromises = this.selectedImages.map((image) => {
        this.$store.commit("setSelectedImages", image);
        const fileData = image.data; // Adjust the property name as per your object structure
        const trimmedString = fileData.substring(fileData.indexOf(",") + 1);
        const fileBlob = new Blob([trimmedString], { type: "image/jpeg" });
        const formData = new FormData();
        formData.append("image_file", fileBlob, image.name);
        return axios.post(`/bitstrings/`, formData, {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
            Authorization: `${localStorage.getItem("token")}`,
          },
        });
      });

      Promise.all(uploadPromises)
        .then((responses) => {
          console.log(responses);
        })
        .catch((error) => {
          console.log(error);
        });
         const History = {
                amount: this.selectedImages.length,
                uploadDate: Date.now(),
              };
     
      this.$store.commit("setUploadHistory", History);
      this.selectedImages = []; // Clear the selectedImages array
    },
  },
};
</script>

<style scoped>
.upload {
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border-radius: 25px;
  color: white;
  background-color: blue;
  width: 100%;
  color: white;
  width: -webkit-fill-available;
}
.image {
  width: 80px;
  height: 80px;
  border-radius: 15px;
  /* margin-bottom: 15px; */
}
.image.selected {
  border: 6px solid blue;
}
.upload {
  position: fixed; /* or position: absolute; */
  bottom: 100px;
  left: 50%;
  transform: translateX(-50%);
  /* Add other styles for the button */
}
.col {
  text-align: center;
}
.custom-navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: blue;
  color: white;
  text-align: center;
  z-index: 1;
  padding: 10px;
}
.footer-navigation {
  display: flex;
  justify-content: center;
}
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px; /* Adjust the height based on your needs */
  background-color: #f5f5f5; /* Adjust the background color based on your needs */
  padding: 10px;
}
h5 {
  font-size: 12px;
  text-align: center;
}
h3 {
  text-align: center;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  margin-top: 30px;
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

.button-container {
  margin-top: 2rem;
}

.btnLogin {
  padding: 1rem 2rem;
  font-size: 1.2rem;
  border-radius: 25px;
  color: white;
  background-color: black;
  width: 100%;
}

button {
  color: red;
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








