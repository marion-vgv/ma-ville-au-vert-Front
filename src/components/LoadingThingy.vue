<template>
  <div class="searchInProgress" id="searchInProgress">
    <div id="loader">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
    <h5 class="searchText">Chargement en cours...</h5>
  </div>
</template>

<script>
export default {
  name: "LoadingThingy",
  props: {},
};
</script>

<style lang="scss">
.searchInProgress {
  height: 50vh;
  position: relative;
  width: 100%;

  .searchText {
    font-family: $headerFont;
    font-size: 1rem;
    text-align: center;
    margin: auto;
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    letter-spacing: 0.1rem;
    line-height: 1.4;
  }
}
</style>
