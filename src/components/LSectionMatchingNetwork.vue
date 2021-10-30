// obsluga bledow

<template>
  <div class=all-wraper>
    <div class="header-navigation">
      <router-link to="/"><img src="../assets/back.svg"></router-link>
    </div>
    <div class="wrapper">
      <div class="image">
        <img src="../assets/LSection.svg">
      </div>
      <div class="calculate-section">

        <div class="inputs-section">
          <p> R<sub>L</sub> = <input type="number"  v-model.number="R"> Ω </p>
          <p> X<sub>L</sub> = <input type="number"  v-model.number="X"> Ω </p>
          <p> Z<sub>0</sub> = <input type="number"  v-model.number="Zo"> Ω </p>

        </div>
        <div class="inputs-section">
          <p> f = <input type="number"  v-model.number="frequency"> MHz </p>
        </div>
        <div class="central-class">
            <div class="output-section">
                <div class="solution">
                    <img src="../assets/LS_2.svg" style="margin-bottom: 20px;">
                    <p class="output-text"> X<sub>1</sub> = {{X1}} Ω </p>
                    <p class="output-text"> B<sub>1</sub> = {{B1}} mS </p>
                    <p class="output-text"> C<sub>p</sub> = {{Cp}} pF </p>
                    <p class="output-text"> L<sub>s</sub> = {{Ls}} nH </p>
                </div>
                <div class="solution">
                    <img src="../assets/LS_1.svg" style="margin-bottom: 18px; margin-top: 3px;">
                    <p class="output-text"> X<sub>2</sub> = {{X2}} Ω </p>
                    <p class="output-text"> B<sub>2</sub> = {{B2}} mS </p>
                    <p class="output-text"> C<sub>s</sub> = {{Cs}} pF </p>
                    <p class="output-text"> L<sub>p</sub> = {{Lp}} nH </p>
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


<script>
export default {
    data() {
      return {
        R: '',
        X: '',
        frequency: '',
        messageError: '',
        Zo: '',

        X1: '',
        B1: '',
        Cp: '',
        Ls: '',

        X2: '',
        B2: '',
        Cs: '',
        Lp: '',

      };
    },
    methods: {
      calculate() {
        this.messageError = ''
        if (this.R < 0 || this.R == ''){
          this.messageError = create_error_message(this.messageError, 'R => 0')
        }
        if (this.Zo <= 0) {
          this.messageError = create_error_message(this.messageError, 'Zo > 0')
        }
        if (this.frequency <= 0) {
          this.messageError = create_error_message(this.messageError, 'f > 0')
        }

        if (this.R >= 0 && this.Zo > 0 && this.frequency > 0 && this.R != ''){
          let result = []
          result = calculate(this.R, this.X, this.Zo, this.frequency)
          this.write_otuput(result)
        }
      },
      reset() {
        this.R = ''
        this.X = ''
        this.Zo = ''
        this.frequency = ''
        this.messageError = ''

        this.X1 = ''
        this.B1 = ''
        this.Cp = ''
        this.Ls = ''
        this.X2 = ''
        this.B2 = ''
        this.Cs = ''
        this.Lp = ''

      },
      write_otuput(result) {
        let round_val = 1000
        // [X1, B1, Cp, Ls, X2, B2, Cs, Lp]
        this.X1 = Math.round(result[0] * round_val)/round_val
        this.B1 = (Math.round(result[1]*1000 * round_val)/round_val)
        this.Cp = Math.round(result[2] *1000000000000* round_val)/round_val
        this.Ls = Math.round(result[3] *1000000000* round_val)/round_val
        this.X2 = Math.round(result[4] * round_val)/round_val
        this.B2 = Math.round(result[5]*1000 * round_val)/round_val
        this.Cs = Math.round(result[6]*1000000000000 * round_val)/round_val
        this.Lp = Math.round(result[7]*1000000000* round_val)/round_val
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

function calculate(R, X, Zo, frequency) {
  let denominator = R**2 + X**2
  let nominator = X + Math.sqrt(R/Zo)*Math.sqrt(denominator - Zo*R)
  let B1 = nominator/denominator
  nominator = X - Math.sqrt(R/Zo)*Math.sqrt(denominator - Zo*R)
  let B2 = nominator/denominator
  let X1 = x_calculation(B1, R, X, Zo)
  let X2 = x_calculation(B2, R, X, Zo)
  let Ls = lc_calculate(X1, frequency)
  let Lp = lc_calculate(1/B2, frequency)*-1
  let Cp = lc_calculate(B1, frequency)
  let Cs = lc_calculate(1/X2, frequency)*-1

  return [X1, B1, Cp, Ls, X2, B2, Cs, Lp]

}

function x_calculation(B, R, X, Zo){
  return 1/B + X*Zo/R - Zo/(B*R)
}

function lc_calculate(X, frequency){
  return X/(2*Math.PI*frequency*10**6)
}

</script>

<style scoped>
.all-wraper {
  padding-top: 80px;
  display: flex;
  flex-direction: column;
  /* flex-wrap: wrap; */
}

.image {
    display: flex;
    align-items: center;
    justify-content: center;
}

.image img{
    width: 500px
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
    /* padding-left: 35px; */
    font-size: 18px;
    margin: 3px;

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
  grid-template-columns: 300px 300px;
  column-gap: 70px;
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