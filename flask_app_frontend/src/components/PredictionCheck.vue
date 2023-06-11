<template>
  <div class="page-container">
    <div class="container">
      <img alt="Selected Image" class="logo" :src="imagePath" />
      <h4 class="bold-text">
        Voorspelling: <span class="bold">XXX</span> klopt dit?
      </h4>
      <div class="content">
        <div class="button-container">
          <button class="btnCorrect" @click="navigateToCamera">Correct</button>
          <button class="btnIncorrect" @click="navigateToPredicionChange">
            Incorrect
          </button>
        </div>
        <a href="/camera">
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
export default {
  data() {
    return {
      imagePath: "",
      imageName: "",
      image: Object,
    };
  },
  mounted() {
    this.getImageIdFromUrl();
    this.getImageById(this.imageName);
  },
  methods: {
    getPrediction(image) {
      const fileData = image.data; // Adjust the property name as per your object structure
      const trimmedString = fileData.substring(fileData.indexOf(",") + 1);
      const fileBlob = new Blob([trimmedString], { type: "image/jpeg" });
      const formData = new FormData();
      formData.append("image_file", fileBlob, image.name);
      axios
        .post(`/prediction/`, formData, {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((error) => (this.message = error.response.data.message));
    },
      getpredictionTest() {
      const uploadPromises = this.selectedImages.map((image) => {
        const fileData = image.data; // Adjust the property name as per your object structure
        const trimmedString = fileData.substring(fileData.indexOf(",") + 1);
        const fileBlob = new Blob([trimmedString], { type: "image/jpeg" });
        const formData = new FormData();
        formData.append("image_file", fileBlob, image.name);
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
          console.log(responses);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async getImageById(id) {
      const imageFiles = await import.meta.glob(`@/assets/localimages/*.jpg`);
      for (const imagePath in imageFiles) {
        if (imageFiles.hasOwnProperty(imagePath)) {
          const imageId = this.getImageIdFromName(id);
          if (imageId === id) {
            const file = new File([], imagePath);
            const reader = new FileReader();
            reader.onload = (event) => {
              const image = {
                path: (this.imagePath = imagePath.replace(
                  /\d+(?=\.jpg$)/,
                  imageId
                )),
                name: imageId,
                dateCreated: (this.imageTime = file.lastModifiedDate),
                data: event.target.result,
              };
              this.image = image;
              this.getPrediction(image);
            };
            reader.readAsDataURL(file);
          }
        }
      }
      return null;
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
    navigateToCamera() {
      this.$router.push("/camera");
    },
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
