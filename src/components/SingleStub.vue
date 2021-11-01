<template>
  <div class=all-wraper>
    <div class="header-navigation">
      <router-link to="/"><img src="../assets/back.svg"></router-link>
    </div>
    <div class="wrapper">
      <div class="image">
        <img v-if="this.chosen == 'series_open'" src="../assets/series_open.svg">
        <img v-if="this.chosen == 'series_short'" src="../assets/series_short.svg">
        <img v-if="this.chosen == 'shunt_short'" src="../assets/shunt_short.svg">
        <img v-if="this.chosen == 'shunt_open'" src="../assets/shunt_open.svg">
      </div>
      <div class="calculate-section">
        <div class="inputs-section">
          <p> R<sub>L</sub> = <input type="number" v-model.number="R"> Ω </p>
          <p> X<sub>L</sub> = <input type="number" v-model.number="X"> Ω </p>
          <p> Z<sub>0</sub> = <input type="number" v-model.number="Zo"> Ω </p>
        </div>
        <div class="choice-section">
          <p> series </p>
          <button class="choice-button" v-on:click="series_short"> <img src="../assets/series_short.svg"> </button>
          <button class="choice-button" v-on:click="series_open"> <img src="../assets/series_open.svg"> </button>
        </div>
        <div class="choice-section">
           <p> shunt </p>
          <button class="choice-button" v-on:click="shunt_short"> <img src="../assets/shunt_short.svg"> </button>
          <button class="choice-button" v-on:click="shunt_open"> <img src="../assets/shunt_open.svg"> </button>
        </div>
        <!-- <div class="chosen-option">
          <img v-if="this.chosen == 'series_open'" src="../assets/series_open.svg">
          <img v-if="this.chosen == 'series_short'" src="../assets/series_short.svg">
          <img v-if="this.chosen == 'shunt_short'" src="../assets/shunt_short.svg">
          <img v-if="this.chosen == 'shunt_open'" src="../assets/shunt_open.svg">
        </div> -->
        <div class="output-section">
          <p style="padding-top:20px; padding-bottom:10px"> SOLUTION 1 </p>
          <div class="solution">
            <p> d1/λ = {{d1_output}} </p>
            <p> l1/λ  = {{l1_output}} </p>
          </div>
          <p style="padding-top:20px; padding-bottom:10px"> SOLUTION 2 </p>
          <div class="solution">
            <p> d2/λ = {{d2_output}}</p>
            <p> l2/λ = {{l2_output}}</p>
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
        Zo: '',

        messageError: '',
        chosen: 'series_short',
        result: [],

        d1_output: '',
        d2_output: '',
        l1_output: '',
        l2_output: '',
      };
    },
    methods: {

      calculate() {
        this.messageError = ''
        this.result = []

        if (this.R < 0 || this.R.length == 0) {
            this.messageError = create_error_message(this.messageError, 'R >= 0')
        }
        if(this.Zo <= 0) {
          this.messageError = create_error_message(this.messageError, 'Zo > 0')
        }
        if (this.X == ''){
            this.messageError = create_error_message(this.messageError, 'X value')
        }
        if (this.R >= 0 &&  this.R.length != 0 && this.X != '' && this.Zo > 0){
            this.result = calculate(this.X, this.R, this.Zo)
            this.write_otuput()
        } else {
          this.d1_output = ''
          this.d2_output = ''
          this.l1_output = ''
          this.l2_output = ''
        }


      },
      write_otuput(){
        let round_val = 1000000
        this.d1_output = Math.round(this.result[this.chosen][0]['d1'] * round_val) / round_val
        this.d2_output = Math.round(this.result[this.chosen][0]['d2'] * round_val) / round_val
        this.l1_output = Math.round(this.result[this.chosen][0]['l1'] * round_val) / round_val
        this.l2_output = Math.round(this.result[this.chosen][0]['l2'] * round_val) / round_val
      },
      series_open() {
        this.chosen = 'series_open'
        this.calculate()
      },
      series_short() {
        this.chosen = 'series_short'
        this.calculate()
      },
      shunt_short() {
        this.chosen = 'shunt_short'
        this.calculate()
      },
      shunt_open() {
        this.chosen = 'shunt_open'
        this.calculate()
      },
      reset() {
        this.d1_output = ''
        this.d2_output = ''
        this.l1_output = ''
        this.l2_output = ''
        this.R = ''
        this.X = ''
        this.Zo = ''

      }

    },
}

function create_error_message(current_message, additional_text) {
  if (current_message == '') {
    return 'Set ' + additional_text
  }
  if (current_message != '') {
    return current_message + ' & ' + additional_text
  }
}

function calculate_d_lambda(t){
  let d
  if(t<0){
    d = (1/(2*Math.PI)) * (Math.PI + Math.atan(t))
  }else{
    d = (1/(2*Math.PI)) * (Math.atan(t))
  }
  if(d <= 0){
    d += 0.5
  }
  return d
}

function calculate_B(X, R, Zo, t){
  let nominator = (R**2)*t - (Zo-X*t)*(X+Zo*t)
  let denominator = (Zo*(R**2 + (X+Zo*t)**2))
  return nominator/denominator
}


function calculate_t(X, R, Zo){
  let t1, t2
  if(R == Zo){
    t1 = -X/(2*Zo)
    t2 = 8999999999999999
  }else{
    let nominator = X + Math.sqrt(R*((Zo-R)**2 + X**2)/Zo)
    let nominator_2 = X - Math.sqrt(R * ((Zo - R) ** 2 + X ** 2) / Zo)
    console.log('noms', nominator, nominator_2)
    let denominator = R - Zo
    t1 = nominator/denominator
    t2 = nominator_2/denominator
  }
  return [t1, t2]
}


function calculate_l_shunt(B, Zo){
    let Yo = 1/Zo
    let lo_lambda = (-1/(2*Math.PI))*Math.atan(B/Yo)
    let ls_lambda = (1/(2*Math.PI))*Math.atan(Yo/B)
    if (lo_lambda < 0){
      lo_lambda += 0.5
    }
    if (ls_lambda < 0){
      ls_lambda += 0.5
    }
    return [lo_lambda, ls_lambda]
}

function calculate_shunt(X, R, Zo){
  let t = calculate_t(X, R, Zo)
  
  console.log('t',t)
  let d1 = calculate_d_lambda(t[0])
  let d2 = calculate_d_lambda(t[1])
  let B1 = calculate_B(X, R, Zo, t[0])
  let B2 = calculate_B(X, R, Zo, t[1])
  let l1 = calculate_l_shunt(B1, Zo)
  let l2 = calculate_l_shunt(B2, Zo)
  return [{
    'shunt_open': [{
        'd1': d1,
        'l1': l1[0],
        'd2': d2,
        'l2': l2[0]
    }],
    'shunt_short': [{
        'd1': d1,
        'l1': l1[1],
        'd2': d2,
        'l2': l2[1]
    }]
  }]
}


function calculate_l_series(X, Zo){

  let ls_lambda = (-1/(2*Math.PI))*Math.atan(X/Zo)
  let lo_lambda = (1/(2*Math.PI))*Math.atan(Zo/X)
  if (lo_lambda < 0){
    lo_lambda += 0.5
  }
  if (ls_lambda < 0){
    ls_lambda += 0.5
  }
  return [lo_lambda, ls_lambda]
}

function calculate_series(X, R, Zo){
  let Yo = 1/Zo
  let Yl = math.divide(1, math.complex(R, X))
  let B = Yl.im
  let G = Yl.re


  let t = calculate_t(B, G, Yo)
  let d1 = calculate_d_lambda(t[0])
  let d2 = calculate_d_lambda(t[1])

  let B1 = calculate_B(B, G, Yo, t[0])
  let B2 = calculate_B(B, G, Yo, t[1])
  let l1 = calculate_l_series(B1, Zo)
  let l2 = calculate_l_series(B2, Zo)
  return [{
    'series_open': [{
        'd1': d1,
        'l1': l1[0],
        'd2': d2,
        'l2': l2[0]
    }],
    'series_short': [{
        'd1': d1,
        'l1': l1[1],
        'd2': d2,
        'l2': l2[1]
    }]
  }]
}


function calculate(X, R, Zo){
  let dict = {}
  let shunt = calculate_shunt(X, R, Zo)
  let series = calculate_series(X, R, Zo)
  dict['shunt_open'] = shunt[0]['shunt_open']
  dict['shunt_short'] = shunt[0]['shunt_short']
  dict['series_open'] = series[0]['series_open']
  dict['series_short'] = series[0]['series_short']
  return dict
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

.output-section {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}


.calculate-section img {
  width: 250px;
  padding: 12px;
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


.solution {
  display: grid;
  grid-template-columns: 200px 200px;


  
}
.choice-button{
  border: none;
  background-color: #E5E5E5;
  border-radius: 5px;
  
} 

.choice-section {
  max-width: 100% ;
  display: flex;
  justify-content: center;
}

.chosen-option {
  display: flex;
  justify-content: center;
}

.choice-button:active {
  transform: scale(1.1);
  box-shadow: 3px 2px 22px 1px rgba(0, 0, 0, 0.24);
}



.calculate-section {
    grid-area: "calculations";
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-left: 60px;
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