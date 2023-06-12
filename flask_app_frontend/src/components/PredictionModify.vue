<template>
  <div class="page-container">
    <div class="container">
      <img alt="Selected Image" class="logo" :src="imagePath" />
      <h4 class="bold-text">Wat is wel het materiaal</h4>
      <div class="content">
        <div class="button-container">
          <div class="dropdown">
            <button class="dropdown-toggle" @click="toggleDropdown">
              {{ selectedOption || "materiaal" }}
            </button>
            <ul class="dropdown-menu" :class="{ open: isDropdownOpen }">
              <li
                v-for="(classification, index) in trimmedClassifications"
                :key="index"
                @click="selectOption(classification)"
              >
                {{ classification }}
              </li>
            </ul>
          </div>
        </div>
        <div class="camera">
          <a href="/camera">
            <img
              src="@/assets/images/return.jpg"
              style="float: left"
              alt="cameraicon"
            />
          </a>
          <a @click="navigateToPrediction">
            <img
              src="@/assets/images/correct.jpg"
              style="float: right"
              alt="cameraicon"
            />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WelcomeItem from "./WelcomeItem.vue";
import HelloWorld from "./HelloWorld.vue";
import axios from "../axios-auth";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      classifications: Object,
      trimmedClassifications: Array,
      isDropdownOpen: false,
      selectedOption: null,
      imagePath: "",
      imageName: "",
    };
  },

  mounted() {
    this.getClassifications();
    this.getImageIdFromUrl();
    this.getImageById(this.imageName);
    this.updateClassification();
  },
  computed: {
    ...mapGetters(["getImageInformation"]),
  },
  methods: {
    getInformation() {
      return this.$store.getters.getImageInformation;
    },

    getClassifications() {
      axios
        .get(`/classification/`, {
          headers: {
            Accept: "application/json",
          },
        })
        .then((response) => {
          this.classifications = response.data;
          this.trimClassifications(response);
        })
        .catch((error) => console.log(error));
    },

    trimClassifications(response) {
      const trimmedClassifications = response.data.data.reduce((acc, item) => {
        acc.push(item.classification);
        return acc;
      }, []);
      this.trimmedClassifications = trimmedClassifications;
    },

    updateClassification() {
      const value = this.getInformation();
      const selectedValue = this.selectedOption;
      const name = this.getImageIdFromUrl() + ".jpg";
      for (let i = 0; i < value.length; i++) {
        const foto = value[i];
        if(foto.name == name){
          foto.prediction = selectedValue;
          return;
        }
      }
    },

    async getImageById(id) {
      const imageFiles = await import.meta.glob(`@/assets/localimages/*.jpg`);
      for (const imagePath in imageFiles) {
        if (imageFiles.hasOwnProperty(imagePath)) {
          const imageId = this.getImageIdFromName(id);
          if (imageId === id) {
            const file = new File([], imagePath);
            const image = {
              path: (this.imagePath = imagePath.replace(
                /\d+(?=\.jpg$)/,
                imageId
              )),
              name: imageId,
              dateCreated: (this.imageTime = file.lastModifiedDate),
            };
            return image;
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
    navigateToPrediction() {
      this.updateClassification();
      const imageName = this.removeExtension(this.imageName);
      this.$router.push({
        name: "predictionconfirm",
        params: { image: imageName },
      });
    },
    removeExtension(fileName) {
      const dotIndex = fileName.lastIndexOf(".");
      if (dotIndex !== -1) {
        return fileName.substring(0, dotIndex);
      } else {
        return fileName;
      }
    },
    // navigateToCamera() {
    //   this.$router.push("/camera");
    // },
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    selectOption(option) {
      this.selectedOption = option;
      this.isDropdownOpen = false;
    },
  },
  components: {
    WelcomeItem,
    HelloWorld,
  },
};
</script>

<style scoped>
.image-container {
  position: relative;
  margin-bottom: 0;
  transition: margin-bottom 0.3s ease;
}

.image-container.expanded {
  margin-bottom: 2rem;
}

.logo {
  display: block;
  margin: 0 auto;
  max-width: 100%;
  max-height: 100%;
  position: relative;
  top: 0;
  transition: top 0.3s ease, transform 0.3s ease;
}

.image-container.expanded .logo {
  top: 2rem;
  transform: translateY(-50%);
}
.dropdown {
  margin-bottom: 150px;
  position: relative;
}
.dropdown-toggle {
  background-color: #eee;
  padding: 10px;
  border: none;
  cursor: pointer;
}

.dropdown-menu {
  border-radius: 10px;
  display: none;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 200px;
  position: absolute;
  z-index: 1;
}

.dropdown-menu.open {
  display: block;
}

.dropdown-menu li {
  border-radius: 10px;
  padding: 5px;
  background-color: white;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
}

.dropdown-menu li:last-child {
  border-bottom: none;
}

.dropdown-menu li:hover {
  background-color: #ddd;
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
  /* display: flex; */
  margin-bottom: 10px;
  padding: 10px;
  background-color: #0179ff;
}

.button-container button {
  border-radius: 10px;
  flex: 1;
  width: 200px;
  background-color: white;
  border: 1px solid #ddd;
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
  text-align: center;
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
  max-width: 100%;
  max-height: 100%;
  margin-bottom: 20px;
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
