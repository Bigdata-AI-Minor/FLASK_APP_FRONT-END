<template>
  <div class="camera-container">
    <video ref="video" :class="{ 'fullscreen-video': isMobile }">
      Stream unavailable
    </video>
    <img
      src="@/assets/images/fotoclick.jpg"
      alt="takepicture"
      @click="takePicture"
      class="takepicture"
    />
    <a href="/library" class="footer-link">
      <img src="@/assets/images/fotoslogo.jpg" alt="Image 3" class="fotos" />
    </a>
    <canvas ref="canvas" style="display: none"></canvas>
  </div>
</template>

<script>
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
    emitLocationUpdate(longitude, latitude,imageId) {
      const locationData = {
        latitude: longitude,
        longitude: latitude,
      };
      this.$store.dispatch("setLocationData", { imageId, locationData });
    },
    takePicture() {
      const context = this.canvas.getContext("2d");
      const width = 1280; // Desired width (HD resolution)
      const height = 720; // Desired height (HD resolution)
      this.canvas.width = width;
      this.canvas.height = height;
      context.drawImage(this.video, 0, 0, width, height);
      const imageData = this.canvas.toDataURL("image/jpeg");
      this.downloadImage(imageData);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          this.handleSuccess,
          this.handleError
        );
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    },
    handleSuccess(position) {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
      const imageid = this.imageId
      this.emitLocationUpdate(this.longitude, this.latitude,imageid);
    },
    handleError(error) {
      console.log("Error occurred while retrieving geolocation:", error);
    },
    downloadImage(imageData) {
      const link = document.createElement("a");
      link.href = imageData;
      link.download = this.imageId = `${this.generateRandomId()}.jpg`;
      console.log(this.imageId);
      link.setAttribute("data-latitude", this.latitude);
      link.setAttribute("data-longitude", this.longitude);
      link.click();
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
