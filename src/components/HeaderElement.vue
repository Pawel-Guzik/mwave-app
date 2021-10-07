<template>
  <header>
    <div class="title-panel">
        <img src="../assets/atom.svg">
        <h1>Mwave Calculator</h1>
    </div>
  </header>
  <div class="wrapper">
    <h1>About application</h1>
    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
  </div>
</template>


<script>
export default {
  data() {
    return {
      name: 'Pawel',
    }

  }
};
</script>

<style scoped>
.title-panel {
    margin: auto;
    display: flex;
    justify-content: center;
    align-items: center;
}


header > div > img {
    width: 61px;
}

header > div > h1 {
    font-size: 32px;
}

header{
    color: #00488A;
    width: 100vw;
    box-shadow: 0px 2px 0px rgba(163, 163, 163, 0.2);
    padding: 10px;
    box-sizing: border-box;
}

p {
    color: black;
    /* font-weight: 600; */
}

h1 {
  color: #00488A;
  font-size: 24px;
  font-weight: 900;
}

.wrapper {
  width: 100%;
  max-width: 1280px;
  margin: auto;
}

* {
  margin: 0;
  padding: 0;
}
</style>