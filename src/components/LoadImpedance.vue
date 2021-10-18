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
                    <p> SWR = <input type="number" v-model.number="swr"> </p>
                    <p> λ = <input type="number" v-model.number="lambda"> mm </p>
                    <p> d = <input type="number" v-model.number="distance"> mm </p>
                </div>
                <div class="central-class">
                  <div class="output-section">
                      <p> Voltage wave </p>
                      <p> Z<sub>L</sub> = {{voltage_re}} {{voltage_sign}} {{voltage_im}}j</p>
                      
                  </div>
                  <div class="output-section">
                      <p> Current wave </p>
                      <p> Z<sub>L</sub> = {{current_re}} {{current_sign}} {{current_im}}j</p>
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
          swr: '',
          lambda: '',
          distance: '',
          messageError: '',
          current_sign: '+',
          current_re: 'R',
          current_im: 'X',
          voltage_sign: '+',
          voltage_re: 'R',
          voltage_im: 'X',
      };
    },
    methods: {
      calculate() {
        this.messageError = ''
        if (this.swr < 1){
            this.messageError = create_error_message(this.messageError, 'SWR >= 1')
        }
        if (this.lambda <= 0) {
            this.messageError = create_error_message(this.messageError, 'λ > 0')
        }
        if (this.distance < 0 || this.distance == ''){
            this.messageError = create_error_message(this.messageError, 'd >= 0')
        }
        if (this.swr >= 1 && this.lambda > 0 && this.distance >= 0){
            let result = calculate_load_impedance(this.swr, this.lambda, this.distance)
            this.write_output(result)
        }
      },
      write_output(result) {
        let round_val = 1000000
        this.voltage_re = Math.round(result[0].re * round_val)/round_val
        this.voltage_im = Math.round(result[0].im * round_val)/round_val
        if (this.voltage_im >= 0){
            this.voltage_sign = '+'
        }else {
            this.voltage_sign = '-'
            this.voltage_im = this.voltage_im*-1
        }

        
        this.current_re = Math.round(result[1].re *round_val)/round_val
        this.current_im = Math.round(result[1].im *round_val)/round_val
        if (this.current_im >= 0){
            this.current_sign = '+'
        }else {
            this.current_sign = '-'
            this.current_im = this.current_im*-1
        }
      },
      reset(){
          this.messageError = ''
          this.current_sign = '+'
          this.current_re = 'R'
          this.current_im = 'X'
          this.voltage_sign = '+'
          this.voltage_re = 'R'
          this.voltage_im = 'X'
          this.swr = ''
          this.lambda = ''
          this.distance = ''
      }
    },
    watch: {
        messageError(value){
            if (value != '') {
                this.current_sign = '+'
                this.current_re = 'R'
                this.current_im = 'X'
                this.voltage_sign = '+'
                this.voltage_re = 'R'
                this.voltage_im = 'X'
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

function calculate_load_impedance(swr, lambda, distance) {
    lambda = lambda/1000
    distance = distance/1000
    let current_wave_angle = 2*Math.PI*distance/lambda
    let voltage_wave_angle = current_wave_angle + Math.PI/2
    let current = math.divide(math.complex(swr,-1*Math.tan(current_wave_angle)),math.complex(1,-1*swr*Math.tan(current_wave_angle)))
    let voltage = math.divide(math.complex(swr,-1*Math.tan(voltage_wave_angle)),math.complex(1,-1*swr*Math.tan(voltage_wave_angle)))
    console.log(current)
    console.log(voltage)
    return [voltage, current]
}
</script>



<style scoped>

.card-image{
  width: 100px;
  height: 100px;
}

.all-wraper {
  padding-top: 80px;
  display: flex;
  flex-direction: column;
}
.central-class {
  display: flex;
  flex-direction: column;
  align-items: center;
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

.header-navigation {
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
    /* align-items: center; */
}

.inputs-section {
  display: flex;
  /* justify-content: space-between; */
  column-gap: 30px;
  align-items: center;
  padding-bottom: 60px
}

.output-section {
  display: grid;
  grid-template-columns: 150px 250px;
  column-gap: 10px;
  align-items: center;
  text-align: left;
  padding: 5px;
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

.output-section  > p {
  padding: 5px;
  font-size: 18px;
}
</style>