<template>
  <header-element></header-element>
  <section-card></section-card>
</template>


<script>
import HeaderElement from './components/HeaderElement.vue';
import SectionCard from './components/SectionCard.vue';



export default {
  components: { HeaderElement, SectionCard },
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
    font-weight: 100;
    color: black;
}
</style>