<template>
  <div class="modal-overlay">
    <div class="page-container">
      <div class="container">
        <div class="background-layer">
          <h4>Wil je deze foto verwijderen?</h4>
          <div class="close">
            <div class="button-container">
              <button class="btnCorrect" @click="deleteImage()">Correct</button>
              <button class="btnIncorrect" @click="$emit('close-modal')">
                Incorrect
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WelcomeItem from "./WelcomeItem.vue";
import HelloWorld from "./HelloWorld.vue";
// import ViteFS from 'vite-fs'
// import fs from 'fs-extra';
import path from "path";
export default {
  name: "Gallery",
  data() {
    return {
      images: [],
      imagePath: "",
      newPath: "",
    };
  },
  components: {
    WelcomeItem,
    HelloWorld,
  },
  mounted() {
    this.loadImages();
  },
  methods: {
    loadImages() {
      this.images = [];
      const imageFiles = import.meta.glob(`@/assets/localimages/*.jpg`);
      for (const imagePath in imageFiles) {
        if (imageFiles.hasOwnProperty(imagePath)) {
          const imageName = this.getFileNameFromPath(imagePath);
          const image = {
            path: imagePath,
            name: imageName,
          };
          this.imagePath = imagePath;
          this.images.push(image);
        }
      }
    },
    // deleteImage() {
    //   this.images = [];
    //   const imageFiles = import.meta.glob(`@/assets/localimages/*.jpg`);
    //   window
    //     .showDirectoryPicker()
    //     .then((dirHandle) => {
    //       const deletePromises = [];
    //       for (const imagePath in imageFiles) {
    //         if (imageFiles.hasOwnProperty(imagePath)) {
    //           const imageName = this.getFileNameFromPath(imagePath);
    //           const image = {
    //             path: imagePath,
    //             name: imageName,
    //           };
    //           console.log(dirHandle);
    //           const deletePromise = this.deleteFileLocally(dirHandle, imagePath)
    //             .then(() => {
    //               this.images.push(image);
    //             })
    //             .catch((error) => {
    //               console.error(error);
    //             });

    //           deletePromises.push(deletePromise);
    //           console.log(deletePromise);
    //         }
    //       }

    //       Promise.all(deletePromises)
    //         .then(() => {
    //           //   this.$router.push("/library");
    //         })
    //         .catch((error) => {
    //           console.error(error);
    //         });
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    //   //   this.$router.push("/library");
    // },
    // it fails in this method

    // async deleteFileLocally(dirHandle, fileName) {
    //   try {
    //     const fileHandle = await dirHandle.getFileHandle(fileName, {
    //       create: false,
    //     });
    //     await fileHandle.remove();
    //   } catch (error) {
    //     console.error(error);
    //     throw new Error("Failed to delete the file.");
    //   }
    // },
    async deleteImage(path) {
        path = this.imagePath;
      try {
        const response = await fetch(path);
        if (response.ok) {
          const fileContent = await response.text();
            response.
          console.log("i can read the file");
        } else {
          console.error("Failed to read file:", response.status);
        }
      } catch (error) {
        console.error("Error reading file:", error);
      }
    },

    // async deleteImage() {
    //   try {
    //     const sourcePath = this.imagePath;
    //     const targetPath = sourcePath.replace("localimages", "deletedimages");

    //     const fileHandle = await window.showDirectoryPicker();
    //     const targetDirectory = await this.resolveDirectory(
    //       fileHandle,
    //       targetPath
    //     );
    //     const sourceFile = await fileHandle.getFileHandle(sourcePath);
    //     // const fileHandle = await window.showDirectoryPicker();
    //     // const sourceFile = await fileHandle.getFileHandle(sourcePath);

    //     // const targetDirectory = await fileHandle.getDirectoryHandle(
    //     //   targetPath,
    //     //   { create: true }
    //     // );

    //     await sourceFile.moveTo(targetDirectory, { name: sourceFile.name });

    //     console.log("File moved successfully!");
    //   } catch (error) {
    //     console.error("Failed to move the file:", error);
    //   }
    // },
    // async resolveDirectory(baseDirectory, directoryPath) {
    //   const parts = directoryPath.split("/");
    //   let currentDirectory = baseDirectory;

    //   for (const part of parts) {
    //     if (part === "..") {
    //       currentDirectory = await currentDirectory.getParent();
    //     } else {
    //       currentDirectory = await currentDirectory.getDirectoryHandle(part, {
    //         create: true,
    //       });
    //     }
    //   }

    //   return currentDirectory;
    // },

    getFileNameFromPath(path) {
      return path.split("/").pop();
    },
  },
};
</script>

<style scoped>
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

button {
  background-color: #ac003e;
  width: 150px;
  color: white;
  font-size: 14px;
  border-radius: 16px;
}
</style>