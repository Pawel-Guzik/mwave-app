<template>
  <div class=all-wraper>
    <div class="header-navigation">
      <router-link to="/"><img src="../assets/arrow.svg"></router-link>
    </div>
    <div class="wrapper">
      <div class="image">
        <img src="../assets/LSection5.svg">
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

                    <img v-if="this.chosen == 'second' && this.f_e_s == 'L' && this.f_e_r =='L'" src="../assets/k2_LL.svg" style="margin-bottom: 20px;">
                    <img v-if="this.chosen == 'second' && this.f_e_s == 'C' && this.f_e_r =='C'" src="../assets/k2_CC.svg" style="margin-bottom: 20px;">
                    <img v-if="this.chosen == 'second' && this.f_e_s == 'L' && this.f_e_r =='C'" src="../assets/k2_CL.svg" style="margin-bottom: 20px;">
                    <img v-if="this.chosen == 'second' && this.f_e_s == 'C' && this.f_e_r =='L'" src="../assets/k2_LC.svg" style="margin-bottom: 20px;">
                  
                    <img v-if="this.chosen == 'first' && this.f_e_s == 'L' && this.f_e_r =='L'" src="../assets/k1_LL.svg"  style="margin-bottom: 20px;">
                    <img v-if="this.chosen == 'first' && this.f_e_s == 'C' && this.f_e_r =='C'" src="../assets/k1_CC.svg"  style="margin-bottom: 20px;">
                    <img v-if="this.chosen == 'first' && this.f_e_s == 'L' && this.f_e_r =='C'" src="../assets/k1_LC.svg"  style="margin-bottom: 20px;">
                    <img v-if="this.chosen == 'first' && this.f_e_s == 'C' && this.f_e_r =='L'" src="../assets/k1_CL.svg"  style="margin-bottom: 20px;">
                    <p class="output-text"> X<sub>1</sub> = {{X1}} Ω </p>
                    <p class="output-text"> B<sub>1</sub> = {{B1}} mS </p>
                    <p class="output-text"> {{f_e_r}}<sub>p</sub> = {{first_rownolegly}}</p>
                    <p class="output-text"> {{f_e_s}}<sub>s</sub> = {{first_szeregowy}}</p>
                </div>
                <div class="solution">

                    <img v-if="this.chosen == 'second' && this.s_e_s == 'L' && this.s_e_r =='L'" src="../assets/k2_LL.svg" style="margin-bottom: 18px; margin-top: 3px;">
                    <img v-if="this.chosen == 'second' &&this.s_e_s == 'C' && this.s_e_r =='C'" src="../assets/k2_CC.svg" style="margin-bottom: 18px; margin-top: 3px;">
                    <img v-if="this.chosen == 'second' &&this.s_e_s == 'L' && this.s_e_r =='C'" src="../assets/k2_CL.svg" style="margin-bottom: 18px; margin-top: 3px;">
                    <img v-if="this.chosen == 'second' &&this.s_e_s == 'C' && this.s_e_r =='L'" src="../assets/k2_LC.svg" style="margin-bottom: 18px; margin-top: 3px;">
                    
                    <img v-if="this.chosen == 'first' && this.s_e_s == 'L' && this.s_e_r =='L'" src="../assets/k1_LL.svg" style="margin-bottom: 18px; margin-top: 3px;">
                    <img v-if="this.chosen == 'first' &&this.s_e_s == 'C' && this.s_e_r =='C'" src="../assets/k1_CC.svg" style="margin-bottom: 18px; margin-top: 3px;">
                    <img v-if="this.chosen == 'first' &&this.s_e_s == 'L' && this.s_e_r =='C'" src="../assets/k1_LC.svg" style="margin-bottom: 18px; margin-top: 3px;">
                    <img v-if="this.chosen == 'first' &&this.s_e_s == 'C' && this.s_e_r =='L'" src="../assets/k1_CL.svg" style="margin-bottom: 18px; margin-top: 3px;">
                    <p class="output-text"> X<sub>2</sub> = {{X2}} Ω </p>
                    <p class="output-text"> B<sub>2</sub> = {{B2}} mS </p>
                    <p class="output-text"> {{s_e_s}}<sub>s</sub> = {{second_szeregowy}} </p>
                    <p class="output-text"> {{s_e_r}}<sub>p</sub> = {{second_rownolegly}} </p>
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
        chosen: "first",
        X1: '',
        B1: '',
        first_rownolegly: '',
        first_szeregowy: '',
        f_e_r: '',
        f_e_s: '',
        s_e_r: '',
        s_e_s: '',
        X2: '',
        B2: '',
        second_szeregowy: '',
        second_rownolegly: '',

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
          if (this.R >= this.Zo){
            this.chosen = "first"
            result = calculate_first(this.R, this.X, this.Zo, this.frequency)
          }
          else {
            this.chosen = "second"
            result = calculate_second(this.R, this.X, this.Zo, this.frequency)
          }
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
        this.first_rownolegly = ''
        this.first_szeregowy = ''
        this.X2 = ''
        this.B2 = ''
        this.second_szeregowy = ''
        this.second_rownolegly = ''

      },
      write_otuput(result) {
        let first = result[0]
        let second = result[1]
        let round_val = 1000

        for (let [key, value] of Object.entries(first)) {
          if (key == 'X1'){
            this.X1 = Math.round(value * round_val)/round_val
          }
          if (key == 'B1') {
            this.B1 = (Math.round(value*1000 * round_val)/round_val)
          }
          if (key == 'Cs') {
            this.first_szeregowy = String(Math.round(value *1000000000000* round_val)/round_val) + ' pF'
            this.f_e_s = "C"
          }
          if (key == 'Ls') {
            this.first_szeregowy = String(Math.round(value *1000000000* round_val)/round_val) + ' nH'
            this.f_e_s = "L"
          }
          if (key == 'Cp') {
            this.first_rownolegly = String(Math.round(value *1000000000000* round_val)/round_val) + ' pF'
            this.f_e_r = "C"
          }
          if (key == 'Lp') {
            this.first_rownolegly = String(Math.round(value*1000000000* round_val)/round_val) + ' nH'
            this.f_e_r = "L"
          }
        }

        for (const [key, value] of Object.entries(second)) {
          if (key == 'X2'){
            this.X2 = Math.round(value * round_val)/round_val
          }
          if (key == 'B2') {
            this.B2 = (Math.round(value*1000 * round_val)/round_val)
          }
          if (key == 'Cs') {
            this.second_szeregowy = String(Math.round(value *1000000000000* round_val)/round_val) + ' pF'
            this.s_e_s = "C"
          }
          if (key == 'Ls') {
            this.second_szeregowy = String(Math.round(value *1000000000* round_val)/round_val) + ' nH'
            this.s_e_s = "L"
          }
          if (key == 'Cp') {
            this.second_rownolegly = String(Math.round(value *1000000000000* round_val)/round_val) + ' pF'
            this.s_e_r = "C"
          }
          if (key == 'Lp') {
            this.second_rownolegly = String(Math.round(value*1000000000* round_val)/round_val) + ' nH'
            this.s_e_r = "L"
          }
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

function calculate_first(R, X, Zo, frequency) {
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
  // cp ls - first solution
  // lp cs - second solution

  let first_solution = {
    'X1': X1,
    'B1': B1
  }

  let second_solution = {
    'X2': X2,
    'B2': B2
  }

  if (Ls < 0) { 
    Ls = lc_calculate(1/X1, frequency)*-1
    first_solution['Cs'] = Ls
  } else {
    first_solution['Ls'] = Ls
  }

  if (Cp < 0) {
    Cp = lc_calculate(1/B1, frequency)*-1
    first_solution['Lp'] = Cp
  }else {
    first_solution['Cp'] = Cp
  }


  if (Cs < 0) {
    Cs = lc_calculate(X2, frequency)
    second_solution['Ls'] = Cs
  } else {
    second_solution['Cs'] = Cs
  }

  if (Lp < 0) {
    Lp = lc_calculate(B2, frequency)
    second_solution['Cp'] = Lp
  } else {
    second_solution['Lp'] = Lp
  }


  return [first_solution, second_solution]


}
function calculate_second(R, X, Zo, frequency) {
  let X1 = Math.sqrt(R*(Zo-R)) - X
  let X2 = -Math.sqrt(R*(Zo-R)) - X
  let B1 = Math.sqrt((Zo-R)/R)/Zo
  let B2 = -Math.sqrt((Zo-R)/R)/Zo
  let Ls = lc_calculate(X1, frequency)
  let Lp = lc_calculate(1/B2, frequency)*-1
  let Cp = lc_calculate(B1, frequency)
  let Cs = lc_calculate(1/X2, frequency)*-1
  // cp ls - first solution
  // lp cs - second solution
  let first_solution = {
    'X1': X1,
    'B1': B1
  }

  let second_solution = {
    'X2': X2,
    'B2': B2
  }

  if (Ls < 0) { 
    Ls = lc_calculate(1/X1, frequency)*-1
    first_solution['Cs'] = Ls
  } else {
    first_solution['Ls'] = Ls
  }

  if (Cp < 0) {
    Cp = lc_calculate(1/B1, frequency)*-1
    first_solution['Lp'] = Cp
  }else {
    first_solution['Cp'] = Cp
  }


  if (Cs < 0) {
    Cs = lc_calculate(X2, frequency)
    second_solution['Ls'] = Cs
  } else {
    second_solution['Cs'] = Cs
  }

  if (Lp < 0) {
    Lp = lc_calculate(B2, frequency)
    second_solution['Cp'] = Lp
  } else {
    second_solution['Lp'] = Lp
  }


  return [first_solution, second_solution]

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