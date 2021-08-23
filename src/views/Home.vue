<template>
  <div class="home">
    <Header />
    <SearchForm />
    <Footer />
  </div>
</template>

<script>
// @ is an alias to /src
import SearchForm from "@/components/SearchForm.vue";
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "Home",
  components: {
    SearchForm,
    Header,
    Footer,
  },
};
</script>

<style lang="scss">
.home {
  width: 100%;
}
</style>
