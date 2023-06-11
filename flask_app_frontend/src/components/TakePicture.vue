<template>
  <div class="camera-container">
    <video ref="video" :class="{ 'fullscreen-video': isMobile }">
      Stream unavailable
    </video>
    <img
      src="@/assets/images/fotoclick.png"
      alt="takepicture"
      @click="takePicture"
      class="takepicture"
    />
    <a href="/library" class="footer-link">
      <img src="@/assets/images/fotoslibrary.png" alt="Image 3" class="fotos" />
    </a>
    <canvas ref="canvas" style="display: none"></canvas>
  </div>
</template>

<script>
// import store from "../store/store";
export default {
  name: "Picture",
  data() {
    return {
      video: null,
      canvas: null,
      isMobile: false,
      imageId: null,
    };
  },
  mounted() {
    this.video = this.$refs.video;
    this.canvas = this.$refs.canvas;
    this.startCapture();
    this.checkMobileDimensions();
    window.addEventListener("resize", this.checkMobileDimensions);
  },
  
  beforeUnmount() {
    window.removeEventListener("resize", this.checkMobileDimensions);
  },
  methods: {
    startCapture() {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then((stream) => {
          this.video.srcObject = stream;
          this.video.play();
          this.initCanvas();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    takePicture() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.handleSuccess(position);
          const context = this.canvas.getContext("2d");
          const width = 1280; // Desired width (HD resolution)
          const height = 720; // Desired height (HD resolution)
          this.canvas.width = width;
          this.canvas.height = height;
          context.drawImage(this.video, 0, 0, width, height);
          const imageData = this.canvas.toDataURL("image/jpeg");
          this.downloadImage(imageData);
        }, this.handleError);
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    },
    handleSuccess(position) {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
    },
    handleError(error) {
      console.log("Error occurred while retrieving geolocation:", error);
    },
    downloadImage(imageData) {
      const link = document.createElement("a");
      link.href = imageData;
      link.download = this.imageId = `${this.generateRandomId()}.jpg`;
      link.id = this.imageId;
      this.$store.commit("setLongitude", this.longitude);
      this.$store.commit("setLatitude", this.latitude);
      link.click();
      this.navigateToImage(this.imageId)
    },
    navigateToImage(image) {
      const imageName = this.removeExtension(image);
      this.$router.push({
        name: "prediction",
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
    // random Id gets generated based on current time combined with a random Id, of that number it takes the first ten
    generateRandomId() {
      return `${Date.now()}-${Math.random()}`.slice(0, 10);
    },
    initCanvas() {
      this.canvas.setAttribute("width", this.video.videoWidth);
      this.canvas.setAttribute("height", this.video.videoHeight);
    },
    checkMobileDimensions() {
      const mobileWidth = 600; // Adjust the value to match your desired mobile width
      const windowWidth = window.innerWidth;
      this.isMobile = windowWidth <= mobileWidth;
    },
  },
};
</script>

<style scoped>
.camera-container {
  position: relative;
}

.fullscreen-video {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.fotos {
  position: absolute;
  z-index: 2;
  margin-top: 570px;
  margin-left: 20px;
}
.takepicture {
  position: absolute;
  z-index: 2;
  margin-top: 500px;
  margin-left: 145px;
}
.capture-button {
  position: absolute;
  bottom: 20px;
  left: 20px;
  z-index: 2;
}
/* Add your component-specific styles here */
</style>
