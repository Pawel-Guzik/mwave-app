<template>
    <header-element></header-element>
    <div class="wrapper">
        <section-card
          title="Rectangular Waveguide"
          description="Cutoff frequency calculations"
          direction="/rectangularwaveguide"
        ></section-card>
        <section-card
          title="Microstrip Line"
          description="Microstrip line synthesis and analysis"
          direction="/microstripline"
        ></section-card>
        <section-card
          title="VSWR"
          description="Different VSWR parameters calculations"
          direction="/vswrcalculation"
        ></section-card>
        <section-card
          title="Load Impedance"
          description="Load impedance calculations"
          direction="/loadimpedance"
        ></section-card>
        <section-card
        title="L-section network"
        description="Impedance Matching - L-section network"
        direction="/lsection"
        ></section-card>
        <section-card
        title="Impedance Transformation"
        description="Calculate impedance toward generator or load"
        direction="/impedancetransformation"
        ></section-card>
        <!-- <section-card
        title="Load Impedance"
        description="Load impedance calculations"
        ></section-card>
        <section-card
        title="Impedance Transformation"
        description="Calculate impedance toward generator or load"
        ></section-card>
        <section-card
        title="VSWR"
        description="Different VSWR parameters calculations"
        ></section-card>
        <section-card
        title="Single Stub"
        description="Impedance Matching - Single Stub"
        ></section-card>
        <section-card
        title="L-section network"
        description="Impedance Matching - L-section network"
        ></section-card> -->
    </div>
</template>




<script>
import HeaderElement from './HeaderElement.vue';
import SectionCard from './SectionCard.vue';



export default {
  components: { HeaderElement, SectionCard },
  data() {
    return {
      name: 'Pawel',
    }

  }
};
</script>

<style scoped>

.wrapper {
  width: 100%;
  max-width: 1280px;
  margin: auto;
  padding-bottom: 30px;
  padding-top: 30px;

  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-between; */
  justify-content: space-between;
  /* column-gap: 30px; */
  row-gap: 40px;
}

</style>