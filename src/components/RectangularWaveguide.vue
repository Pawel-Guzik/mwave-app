


<template>
    <div class="wrapper">
      
      <div class="image">
        <img src="../assets/atom.svg">
      </div>
      <div class="calculate-section">
        <div class="inputs-section">
          <p> a = <input type="number" step="0.01" v-model.number="a"> mm </p>
          <p> b = <input type="number" step="0.01" v-model.number="b"> mm </p>
          <p> Er = <input type="number" step="0.01" v-model.number="Er"> </p>
        </div>
        <div class="output-section">
          <div>
            <p> fc_10 = {{result[0]}} GHz</p>
            <p> fc_20 = {{result[1]}} GHz</p>
            <p> fc_30 = {{result[2]}} GHz</p>
          </div>
          <div>
            <p> fc_01 = {{result[3]}} GHz</p>
            <p> fc_02 = {{result[4]}} GHz</p>
            <p> fc_03 = {{result[5]}} GHz</p>
          </div>
          <div>
            <p> fc_11 = {{result[6]}} GHz</p>
            <p> fc_12 = {{result[7]}} GHz</p>
            <p> fc_13 = {{result[8]}} GHz</p>
          </div>
        </div>
        <div class="inputs-section">
          <p> m = <input input type="number" v-model.number="m"> </p>
          <p> n = <input input type="number" v-model.number="n"> </p>
          <p> {{frequency}} = {{specific_result}} GHz </p>
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
</template>

<script>
export default {
    data() {
      return {
        a: '',
        b: '',
        Er: '',
        m: 1,
        n: 0,
        messageError: '',
        frequency: 'fc_10',
        result: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        specific_result: 0,
      };
    },
    methods: {
      calculate() {
        this.messageError = ''
        
        if (this.Er >= 1 && this.a > 0 && this.b > 0){
          this.result = calculate_all(this.a, this.b, this.Er)
          if (this.n >= 0 && this.m >= 0 && Number.isInteger(this.n) && Number.isInteger(this.m)) {
            this.specific_result = calculate_specific_frequency(this.a, this.b, this.Er, this.n, this.m)
            this.frequency = 'fc_' + this.m + this.n
          }
        }
        if (this.a <= 0) {
          this.messageError = create_error_message(this.messageError, 'a > 0')
        }
        if (this.b <= 0) {
          this.messageError = create_error_message(this.messageError, 'b > 0')
        }
        if (this.Er < 1) {
          this.messageError = create_error_message(this.messageError, 'Er >= 1')
        }
        
        
        if (this.n < 0){
          this.messageError = create_error_message(this.messageError, 'n > 0')
        }
        if (this.m < 0) {
          this.messageError = create_error_message(this.messageError, 'm > 0')
        }
        if (!Number.isInteger(this.n)){
          this.messageError = create_error_message(this.messageError, 'n as an integer')
        }
        if (!Number.isInteger(this.m)){
          this.messageError = create_error_message(this.messageError, 'm as an integer')
        }
      },
      reset() {
        this.a = ''
        this.b = ''
        this.Er = ''
        this.m = 1
        this.n = 0
        this.messageError = ''
        this.frequency = 'fc_10'
        this.result = [0, 0, 0, 0, 0, 0, 0, 0, 0]
        this.specific_result= 0
      }
    }
}


function create_error_message(current_message, additional_text) {
  if (current_message == '') {
    return 'Set ' + additional_text
  }
  if (current_message != '') {
    return current_message + ' & ' + additional_text
  }
}
// (22.86, 10.16, 1)
function calculate_all(a,b,ep) {
  a = a/1000
  b = b/1000
  let mn = [[1,0], [2,0], [3,0],
              [0,1], [0,2], [0,3],
              [1,1], [1,2], [1,3]];
  let first_element = 0
  let second_element = 0
  for (let i=0; i<9; i++) {
    first_element = (mn[i][0] * Math.PI / a)
    second_element = (mn[i][1] * Math.PI / b)
    let p = Math.sqrt(first_element ** 2 + second_element ** 2)
    mn[i] = p * 299_792_458 / (2 * Math.PI * Math.sqrt(ep) * 1000_000_000)
    mn[i] = Math.round(mn[i]*1000000) / 1000000
  }
  return mn
}

function calculate_specific_frequency(a,b,ep,n,m) {
  a = a/1000
  b = b/1000
  let first_element = (m * Math.PI / a)
  let second_element = (n * Math.PI / b)
  let p = Math.sqrt(first_element ** 2 + second_element ** 2)
  let frequency = p * 299_792_458 / (2 * Math.PI * Math.sqrt(ep) * 1000_000_000)
  frequency = Math.round(frequency*1000000) / 1000000
  return frequency
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
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-left: 60px;
}

.inputs-section {
  display: flex;
  /* justify-content: space-between; */
  column-gap: 30px;
  align-items: center;
}

.output-section {
  padding-top: 50px;
  padding-bottom: 50px;
  display: grid;
  grid-template-columns: 220px 220px 220px;
  font-size: 18px;
  column-gap: 20px;
  row-gap: 30px;

}

.output-section > div > p {
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