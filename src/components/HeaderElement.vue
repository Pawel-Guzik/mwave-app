<template>
  <header>
    <div class="title-panel">
        <h1>Microwave Calculator</h1>
    </div>
  </header>
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