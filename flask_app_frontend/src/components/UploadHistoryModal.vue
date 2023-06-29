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
          <h4>Upload History</h4>
          <div class="content">
            <table>
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Upload Date</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in history" :key="index">
                  <td>{{ item.amount }}</td>
                  <td>{{ formatDate(item.uploadDate)}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      showModal: false,
      message: "",
      Date: "",
      Amount: "",
    };
  },
  computed: {
    ...mapGetters(["getTest"]),
    history() {
      return this.$store.getters.getTest;
    },
  },
  mounted() {
    // this.displayHistory();
  },
  // get the history upload history of the store
  methods: {
    getInformation() {
      return this.$store.getters.getUploadHistory;
    },
    // get a valid date instead of only numbers
    formatDate(timestamp) {
      const date = new Date(timestamp);
      return date.toLocaleDateString();
    },
    // dynamically fill the table based on the amount of items in the array (Store)
    displayHistory() {
      const history = this.getInformation();

      history.forEach((item, index) => {
        // console.log(index + ":");
        // console.log(item);
        console.log(item.amount);
        console.log(item.uploadDate);
      });
    },
  },
  components: {},
};
</script>

<style scoped>
h4 {
  text-align: center;
}
td,
th {
  text-align: left;
  padding: 8px;
  padding-right: 50px;
}

label {
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
.closemodal {
  cursor: pointer;
  justify-content: end;
  display: flex;
  margin-bottom: 10px;
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
  height: 40px;
  color: white;
  font-size: 14px;
  border-radius: 16px;
}
</style>
