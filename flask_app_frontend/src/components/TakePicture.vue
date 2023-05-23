<template>
  <div>
    <video ref="video">Stream unavailable</video>
    <button @click="takePicture">Take picture</button>
    <canvas ref="canvas" style="display:none"></canvas>
  </div>
</template>

<script>
export default {
  name: 'Picture',
  mounted() {
    this.video = this.$refs.video;
    this.canvas = this.$refs.canvas;
    this.startCapture();
  },
  methods: {
    startCapture() {
      navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(stream => {
          this.video.srcObject = stream;
          this.video.play();
        })
        .catch(error => {
          console.log(error);
        });
    },
    takePicture() {
      const context = this.canvas.getContext('2d');
      const width = 1280; // Desired width (HD resolution)
      const height = 720; // Desired height (HD resolution)
      this.canvas.width = width;
      this.canvas.height = height;
      context.drawImage(this.video, 0, 0, width, height);
      const imageData = this.canvas.toDataURL('image/jpeg');
      this.downloadImage(imageData);
    },
    downloadImage(imageData) {
      const link = document.createElement('a');
      link.href = imageData;
      link.download = 'picture.jpg';
      link.click();
    },
    initCanvas() {
      this.canvas.setAttribute('width', this.video.videoWidth);
      this.canvas.setAttribute('height', this.video.videoHeight);
    },
  },
  data() {
    return {
      video: null,
      canvas: null
    };
  }
}
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
