<template>
  <header-element></header-element>
  <div class="wrapper">
    <router-view> </router-view>
  </div>
</template>


<script>
export default {
  // components: { HeaderElement, SectionCard },
  data() {
    return {
      name: 'Pawel',
    }

  }
};
</script>

<style>
body {
    background: #E5E5E5;
    font-family: 'Montserrat', sans-serif;
    /* font-weight: 100; */
    color: black;
    /* overflow-x: hidden;  */
}



* {
  margin: 0;
  padding: 0;
}
</style>