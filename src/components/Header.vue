<template>
  <header class="header">
    <h1 class="headerTitle headerLine1">Ma ville au</h1>
    <h1 class="headerTitle headerLine2">vert</h1>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: {},
};
</script>

<style lang="scss">
.header {
  width: 100%;
  height: 500px;
  position: relative;

  // IMAGE
  background-image: url("~@/assets/bannerMaVilleAuVert.jpeg");
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: cover;

  // TEXT
  text-align: center;

  // FLEXBOX
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 700px) {
    height: 400px;
  }

  .headerTitle {
    color: white;
    letter-spacing: 0.5rem;
    text-shadow: $blackish 0 0 5px;

    @media screen and (max-width: 700px) {
      width: 90%;
    }
  }

  .headerLine1 {
    font-size: 3rem;

    @media screen and (max-width: 700px) {
      font-size: 2.5rem;
    }
  }

  .headerLine2 {
    font-size: 6rem;

    @media screen and (max-width: 700px) {
      font-size: 5rem;
    }
  }
}
</style>
