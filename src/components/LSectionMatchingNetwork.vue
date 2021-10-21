<template>
  <div class=all-wraper>
    <div class="header-navigation">
      <router-link to="/"><img src="../assets/back2.svg"></router-link>
    </div>
    <div class="wrapper">
      <div class="image">
        <img src="../assets/atom.svg">
      </div>
      <div class="calculate-section">

        <div class="inputs-section">
          <p> R<sub>L</sub> = <input type="number"  v-model.number="a"> Ω </p>
          <p> X<sub>L</sub> = <input type="number"  v-model.number="b"> Ω </p>
          <p> Z<sub>o</sub> = <input type="number"  v-model.number="Er"> Ω </p>

        </div>
        <div class="inputs-section">
          <p> f = <input type="number"  v-model.number="Er"> MHz </p>
        </div>
        <div class="central-class">
            <div class="output-section">
                <div class="solution">
                    <img src="../assets/atom.svg">
                    <p class="output-text"> X<sub>1</sub> =  Ω </p>
                    <p class="output-text"> B<sub>1</sub> =  mS </p>
                    <p class="output-text"> C<sub>p</sub> =  pF </p>
                    <p class="output-text"> L<sub>s</sub> =  nH </p>
                </div>
                <div class="solution">
                    <img src="../assets/atom.svg">
                    <p class="output-text"> X<sub>2</sub> =  Ω </p>
                    <p class="output-text"> B<sub>2</sub> =  mS </p>
                    <p class="output-text"> C<sub>s</sub> =  pF </p>
                    <p class="output-text"> L<sub>p</sub> =  nH </p>
                </div>
            </div>
        </div>
        <div class="buttons-section">
          <div class="buttons">
            <button id="calculate" class="button" v-on:click="calculate"> Calculate </button>
            <button id="reset" class="button" v-on:click="reset"> Reset </button>
          </div>
        </div>
        <p class="message-error"> {{messageError}} </p>
      </div>
    </div>
  </div>
</template>


<style scoped>
.all-wraper {
  padding-top: 80px;
  display: flex;
  flex-direction: column;
  /* flex-wrap: wrap; */
}

.wrapper {
  width: 100%;
  max-width: 1280px;
  margin: auto;
  padding-bottom: 30px;

  display: grid;
  grid-template-columns: 500px 780px;
  grid-template-areas: "image" "calculations";
  
}
.output-text{
    padding-left: 35px;
    font-size: 18px;
}
.solution {
    display: flex;
    flex-direction: column;
    /* align-items: center; */
}
.header-navigation {
  /* padding-top:300px; */
  width: 100%;
  max-width: 1280px;
  margin: auto;
}

.central-class {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.calculate-section {
    grid-area: "calculations";
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-left: 60px;

}

.inputs-section {
    display: flex;
    justify-content: center;
    column-gap: 30px;
    /* flex-direction: column; */
    align-items: center;
    /* margin: auto; */
    padding-bottom: 20px;
    flex-shrink: 2;
}

.output-section {
  display: grid;
  grid-template-columns: 200px 200px;
  column-gap: 10px;
  align-items: center;
  text-align: left;
  padding: 5px;
}

.button {
    /* background-color: #00488A; */

    font-family: 'Montserrat', sans-serif;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1px;

    border-radius: 5px;
    width: 100px;
    height: 30px;
    border: none;
}

#calculate {
  color: white;
  background-color: #00488A;
}

#calculate:active {
  transform: scale(0.98);
  box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
  background-color: #E5E5E5;
  color: #00488A;
}

#reset {
  background-color: #E5E5E5;
  color: #00488A;
  border: 2px solid #00488A;;
}

#reset:active {
  background-color: #00488A;
  color: #E5E5E5;
  transform: scale(0.98);
  box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
}

.buttons-section {
  padding-top: 50px;
  padding-bottom: 50px;
  display: flex;
  justify-content: flex-end;
}

.buttons {
  display: grid;
  grid-template-columns: 110px 110px;
  /* padding-right: 150px; */
}

input {
  width: 110px;
  height: 20px;
  font-size: 16px;
  border: 2px solid #00488A;
  border-radius: 4px;
  background-color: #E5E5E5;
}

.message-error{
  font-weight: 600;
  color: red;
  display: block;
  height: 15px;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>