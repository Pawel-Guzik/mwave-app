<template>
  <div class=all-wraper>
    <div class="header-navigation">
      <router-link to="/"><img src="../assets/arrow.svg"></router-link>
    </div>
    <div class="wrapper">
      <div class="image">
        <img src="../assets/transformation.svg">
      </div>
      <div class="calculate-section">
        <div class="inputs-section">
          <p> R<sub>L</sub>/Z<sub>0</sub> = <input type="number" v-model.number="R"> Ω </p>
          <p> X<sub>L</sub>/Z<sub>0</sub> = <input type="number" v-model.number="X"> Ω </p>
          <p> λ = <input type="number" v-model.number="lambda"> mm </p>
        </div>
        <div class="inputs-section">
          <p> d = <input type="number" v-model.number="distance"> mm </p>
        </div>
        <div class="central-class">
            <div class="output-section">
                <p> Towards generator </p>
                <p> Z<sub>L</sub>' = {{towards_generator}}</p>
                
            </div>
            <div class="output-section">
                <p> Towards load </p>
                <p> Z<sub>L</sub>' = {{towards_load}}</p>
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

<script>
import {create, all} from 'mathjs';
const math = create(all, {})
export default {
    data() {
      return {
        R: '',
        X: '',
        lambda: '',
        messageError: '',
        distance: '',
        towards_load: '',
        towards_generator: '',
      };
    },
    methods: {
      calculate() {
        this.messageError = ''
        let result = []

        if (this.lambda <= 0) {
            this.messageError = create_error_message(this.messageError, 'λ > 0')
        }
        if (this.R < 0 || this.R.length == 0) {
            this.messageError = create_error_message(this.messageError, 'R >= 0')
        }
        if (this.distance < 0 || this.distance == ''){
            this.messageError = create_error_message(this.messageError, 'd >= 0')
        }
        if (this.X == ''){
            this.messageError = create_error_message(this.messageError, 'X value')
        }

        if (this.lambda > 0 && this.R >= 0 && this.distance >= 0 && this.X != ''){
            result = calculate(this.lambda, this.R, this.distance, this.X)
            this.write_otuput(result)
        }
      },
      reset() {

      },
      write_otuput(result) {
        let round_val = 100000000
        result[0].re = Math.round(result[0].re * round_val)/round_val
        result[0].im = Math.round(result[0].im * round_val)/round_val
        result[1].re = Math.round(result[1].re * round_val)/round_val
        result[1].im = Math.round(result[1].im * round_val)/round_val
        if (result[0].im < 0){
            result[0].im = result[0].im*-1
            this.towards_load = result[0].re + ' - ' + result[0].im +'j'
        }
        else {
            this.towards_load = result[0].re + ' + ' + result[0].im +'j'
        }
        if (result[1].im < 0){
            result[1].im = result[1].im*-1
            this.towards_generator = result[1].re + '-' + result[1].im +'j'
        } else {
            this.towards_generator = result[1].re + ' + ' + result[1].im +'j'
        }
        
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

function calculate(lambda, R, distance, X){
    let load_impedance = math.complex(R, X)
    let tanges_load = Math.tan(2*Math.PI*distance/lambda)
    let tanges_generator = Math.tan(-2*Math.PI*distance/lambda)
    let towards_load = math.divide(math.complex(load_impedance.re, -1*tanges_load+load_impedance.im),math.complex(1+1*load_impedance.im*tanges_load, -1*load_impedance.re*tanges_load))
    let towards_generator = math.divide(math.complex(load_impedance.re, -1*tanges_generator+load_impedance.im),math.complex(1+1*load_impedance.im*tanges_generator, -1*load_impedance.re*tanges_generator))
    return [towards_load, towards_generator]
}


</script>
<style scoped>
.all-wraper {
  padding-top: 80px;
  display: flex;
  flex-direction: column;
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

.image {
    display: flex;
    align-items: center;
    justify-content: center;
}

.image img{
  width: 500px
}

.header-navigation {
  /* padding-top:300px; */
  width: 100%;
  max-width: 1280px;
  margin: auto;
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

.output-section {
  display: grid;
  grid-template-columns: 150px 250px;
  column-gap: 10px;
  align-items: center;
  text-align: left;
  padding: 5px;
}

.central-class {
  display: flex;
  flex-direction: column;
  align-items: center;
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