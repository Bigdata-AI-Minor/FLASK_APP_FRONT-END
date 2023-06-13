<template>
  <div class="page-container">
    <div class="container">
      <img
        alt="Selected Image"
        class="logo"
        :src="imagePath"
        width="200"
        height="200"
      />
      <!-- hier een table inzetten -->
      <div class="content">
        <table>
          <tr>
            <td>Naam</td>
            <td>{{ imageName + ".jpg" }}</td>
          </tr>
          <tr>
            <td>Locatie (long)</td>
            <td>{{ imageLocationlongtitude }}</td>
          </tr>
          <tr>
            <td>Locatie (Lat)</td>
            <td>{{ imageLocationlatitude }}</td>
          </tr>
          <tr>
            <td>Tijd</td>
            <td>{{ imageTime }}</td>
          </tr>
          <tr>
            <td>Classificatie</td>
            <td>{{ imageClassification }}</td>
          </tr>
        </table>
      </div>
      <div class="camera">
        <a href="/library">
          <img src="@/assets/images/return.jpg" alt="cameraicon" />
        </a>
        <img
          src="@/assets/images/delete.jpg"
          @click="showModal = true"
          alt="cameraicon"
        />
      </div>
    </div>
    <SavedModal v-show="showModal" @close-modal="showModal = false" />
  </div>
</template>

<script>
import WelcomeItem from "./WelcomeItem.vue";
import HelloWorld from "./HelloWorld.vue";
import SavedModal from "../components/DeleteImageModal.vue";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      image: {
        path: "",
        name: "",
      },
      imagePath: "",
      imageName: "",
      imageLocationlongtitude: "",
      imageLocationlatitude: "",
      imageTime: "",
      imageClassification: "",
      showModal: false,
      locationData: null,
    };
  },
  computed: {
    ...mapGetters(["getLatitude", "getLongitude", "getfotoPredictions"]),
  },
  
  mounted() {
    this.getImageIdFromUrl();
    this.getImageById(this.imageName);
  },
  methods: {
      getInformation() {
      return this.$store.getters.getImageInformation;
    },
    navigateToCamera() {
      this.$router.push("/camera");
    },
    handleLocationUpdate(locationData) {
      this.locationData = locationData;
    },

    modifyDate(dateTime) {
      const dateString = dateTime;
      const date = new Date(dateString);
      const time = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      return time;
    },
    getLatitudeValue() {
      return this.$store.getters.getLatitude;
    },
    getLongitudeValue() {
      return this.$store.getters.getLongitude;
    },

    async getImageById(id) {
      this.newimages = this.getInformation();
      const imageFiles = await import.meta.glob(`@/assets/localimages/*.jpg`);
      for (const imagePath in imageFiles) {
        if (imageFiles.hasOwnProperty(imagePath)) {
          const imageId = this.getImageIdFromName(id);
          const imageName = this.getFileNameFromPath(imagePath);
           
          if (imageId === id) {
            const file = new File([], imagePath);
            const image = {
              path: (this.imagePath = imagePath.replace(
                /\d+(?=\.jpg$)/,
                imageId
              )),
              name: imageId,
              dateCreated: (this.imageTime = file.lastModifiedDate),
              prediction: null,
            };
              for (let i = 0; i < this.newimages.length; i++) {
            const imageData = this.newimages[i];
            console.log(imageData.name);
             if (imageData.name === imageId + (".jpg")){

               console.log("i match");
              this.imageClassification = imageData.prediction;
             }
          }
            this.imageTime = this.modifyDate(this.imageTime);
            this.imageLocationlatitude = this.getLongitudeValue();
            this.imageLocationlongtitude = this.getLatitudeValue();
            return image;
          }
        }
      }
      return null;
    },
    getImageIdFromName(imageName) {
      const id = imageName.split(".")[0];
      return id;
    },
    getImageIdFromUrl() {
      const currentPath = window.location.pathname;
      const pathParts = currentPath.split("/");
      const imageName = pathParts[pathParts.length - 1]; 
      return (this.imageName = imageName);
    },
      getFileNameFromPath(path) {
        console.log(path);
      return path.split("/").pop();
    },
    getImagefromFile() {
      return this.images.find((image) => image.name.split(".")[0] === imageId);
    },
  },
  components: {
    WelcomeItem,
    HelloWorld,
    SavedModal,
  },
};
</script>

<style scoped>
.camera {
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  margin-top: 110px;
}
table {
  border-collapse: collapse;
  width: 100%;
}

td,
th {
  text-align: left;
  padding: 8px;
  padding-right: 50px;
}

.image-container {
  position: relative;
  margin-bottom: 0;
  transition: margin-bottom 0.3s ease;
}

.image-container.expanded {
  margin-bottom: 2rem;
}

.logo {
  width: 100%;
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
