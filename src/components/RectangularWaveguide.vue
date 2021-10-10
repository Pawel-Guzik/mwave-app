


<template>
    <div class="wrapper">
      <div class="image">
        <p> some image </p>
      </div>
      <div class="calculate-section">
        <div class="inputs-section">
          <p> a = <input type="text" v-model.number="a"> </p>
          <p> b = <input type="text" v-model.number="b"> </p>
          <p> Er = <input type="text" v-model.number="Er"> </p>
        </div>
        <div class="output-section">
          <p> fc_10 = {{result[0]}} </p>
          <p> fc_20 = {{result[1]}}</p>
          <p> fc_30 = {{result[2]}}</p>
          <p> fc_01 = {{result[3]}}</p>
          <p> fc_02 = {{result[4]}}</p>
          <p> fc_03 = {{result[5]}}</p>
          <p> fc_11 = {{result[6]}}</p>
          <p> fc_12 = {{result[7]}}</p>
          <p> fc_13 = {{result[8]}}</p>
        </div>
        <div class="inputs-section">
          <p> n = <input type="text"> </p>
          <p> m = <input type="text"> </p>
        </div>
        <button class="button" v-on:click="calculate"> Calculate </button>
      </div>
    </div>
</template>

<script>
export default {
    data() {
      return {
        a: '',
        b: '',
        Er: '',
        result: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      };
    },
    methods: {
      calculate() {
        this.result = wavenumber(this.a, this.b, this.Er)
      }
    }
}

// (22.86, 10.16, 1)
function wavenumber(a,b,ep) {
  a = a/1000;
  b = b/1000;
  var mn = [[1,0], [2,0], [3,0],
              [0,1], [0,2], [0,3],
              [1,1], [1,2], [1,3]];
  var first_element = 0;
  var second_element = 0;
  for (var i=0; i<9; i++){
    first_element = (mn[i][0] * Math.PI / a)
    second_element = (mn[i][1] * Math.PI / b)
    var p = Math.sqrt(first_element ** 2 + second_element ** 2)
    mn[i] = p * 299_792_458 / (2 * Math.PI * Math.sqrt(ep) * 1000_000_000)
  }
  return mn
    
}
</script>




<style scoped>
.wrapper {
  width: 100%;
  max-width: 1280px;
  margin: auto;
  padding-bottom: 30px;
  padding-top: 300px;

  display: grid;
  grid-template-columns: 500px 780px;
  /* grid-template-rows: 200px 100px; */
  grid-template-areas: "image" "calculations";
}


.calculate-section {
    grid-area: "calculations";
}

.inputs-section {
  display: flex;
  /* justify-content: space-between; */
  column-gap: 40px;
}

.output-section {
  padding-top: 50px;
}

.button {
    background-color: #00488A;

    font-family: 'Montserrat', sans-serif;
    color: white;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1px;


    border-radius: 5px;
    width: 100px;
    height: 30px;
    /* padding-top: ; */
}
</style>