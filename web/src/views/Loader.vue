<template functional>
  <div id="loader" class="center">
    <b style="font-size: 1.4em">... LOADING ...</b>
    <br />
    <div id="spinner" />
  </div>
</template>

<script>
export default {
  name: "loader",
};
</script>

<style scoped>
/* Overwrite the center class to make text-align center and also force cover entire view-port */
#loader {
  text-align: center;
  min-height: 100vh;
}

#spinner {
  border: 0.3em solid #f3f3f3; /* Light grey */
  border-top: 0.3em solid #3498db; /* Blue */
  border-radius: 50%;
  width: 3em;
  height: 3em;
  animation: spin 1.6s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
