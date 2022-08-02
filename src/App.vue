<template>
  <Header/>
  <div class="main">
    <router-view></router-view>
  </div>
  <Footer/>
</template>

<script>
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  }
}
</script>

<style>
@import "assets/styles/common.scss";
</style>
