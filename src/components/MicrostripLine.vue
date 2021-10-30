// za duze liczby, obsługa błędów

<template>
  <div class=all-wraper>
    <div class="header-navigation">
      <router-link to="/"><img src="../assets/back.svg"></router-link>
    </div>
    <div class="wrapper">
      <div class="image">
        <img src="../assets/microstrip.svg">
      </div>
      <div class="calculate-section">
        <div class="inputs-section" style="padding-bottom: 40px;">
            <button id="calculate" class="button" v-on:click="analysis"> Analysis </button>
            <button id="calculate" class="button" v-on:click="synthesis"> Synthesis </button>
        </div>
        <div class="inputs-section">
          <p> H = <input type="number" v-model.number="h"> mm </p>
          <p> Eps<sub>r</sub> = <input type="number" v-model.number="eps_r">  </p>
        </div>
        <div class="inputs-section">
          <p v-if="this.section == 'analysis'"> W = <input type="number" v-model.number="w"> mm </p>
          <p v-if="this.section == 'synthesis'"> Z<sub>o</sub> = <input type="number" v-model.number="Zo"> mm </p>
          <p> f = <input type="number" v-model.number="frequency"> GHz </p>
        </div>
        <div class="output-section">
            <p v-if="this.section == 'analysis'"> Z<sub>0</sub> = {{Zo_output}} Ω</p>
            <p v-if="this.section == 'synthesis'"> W = {{w_output}} mm</p>
            <p> Eps<sub>eff</sub> = {{eps_eff}} </p>
            <p> λ = {{lambda}} mm </p>
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
        h: '',
        eps_r: '',
        w: '',
        frequency: '',
        Zo: '',

        Zo_output: '',
        eps_eff: '',
        lambda: '',
        w_output: '',

        section: "analysis",
        messageError: ''
        

      };
    },
    methods: {
      calculate() {
        let result = []
        this.messageError = ''
        console.log(this.section)
        if (this.h <= 0){
            this.messageError = create_error_message(this.messageError, 'H > 0')
        }
        if (this.frequency <= 0){
            this.messageError = create_error_message(this.messageError, 'f > 0')
        }
        if (this.eps_r < 1){
            this.messageError = create_error_message(this.messageError, 'Eps_r >= 1')
        }
        if (this.section == "analysis"){
            if (this.w <= 0){
                this.messageError = create_error_message(this.messageError, 'w > 0')
            }
            if (this.h > 0 && this.frequency > 0 && this.eps_r >=1 && this.w > 0){
                result = analysis(this.h, this.frequency, this.eps_r, this.w)
                this.write_otuput(result)
            }

        }
        if (this.section == "synthesis"){
            if (this.Zo <= 0){
                this.messageError = create_error_message(this.messageError, 'Zo > 0')
            }
            if (this.h > 0 && this.frequency > 0 && this.eps_r >=1 && this.Zo > 0){
                result = synthesis(this.h, this.frequency, this.eps_r, this.Zo)
                this.write_otuput(result)
            }
        }
      },

      

      reset() {
        this.Zo_output = ''
        this.eps_eff = ''
        this.lambda = ''
        this.messageError = ''
        this.h = ''
        this.eps_r = ''
        this.w = ''
        this.frequency = ''
        this.Zo = ''
        this.w_output = ''


      },
      write_otuput(result) {
        let round_val = 1000000
        this.eps_eff = Math.round(result[1] * round_val)/round_val
        this.lambda = Math.round(result[2]*1000 * round_val)/round_val
        if (this.section == "analysis") {
            this.Zo_output = Math.round(result[0] * round_val)/round_val
        }
        if (this.section == "synthesis") {
            this.w_output = Math.round(result[0] * round_val)/round_val
        }
        // if (this.section != "synthesis") {
        //     this.eps_r
        //   }
      },
      analysis() {
          if (this.section != "analysis") {
              this.section = "analysis"
              this.reset()
          }
      },
      synthesis() {
          if (this.section != "synthesis") {
              this.section = "synthesis"
              this.reset()
          }
      }
    },
    // watch: {
    //     section(value) {
    //         if (value == "analysis"){
    //             return []
    //         }
    //         if (value == "synthesis"){
    //             return []
    //         }
    //     }
    // }
}


function create_error_message(current_message, additional_text) {
  if (current_message == '') {
    return 'Set ' + additional_text
  }
  if (current_message != '') {
    return current_message + ' & ' + additional_text
  }
}

function analysis(h, frequency, eps_r, w) {
    let eps_eff = (eps_r+1)/2 + (eps_r-1)/(2*Math.sqrt(1+12*h/w))
    let lambda = (3*10**8)/(frequency*10**9*Math.sqrt(eps_eff))
    let Zo = 0
    if ((w/h) < 1){
        Zo = (60/Math.sqrt(eps_eff))*Math.log((8*h/2) + w/(4*h))
    } else {
        Zo = (120*Math.PI)/(Math.sqrt(eps_eff)*((w/h) + 1.393 + 0.667*Math.log((w/h)+1.444)))
    }
    return [Zo, eps_eff, lambda]
}

function synthesis(h, frequency, eps_r, Zo){ 
    let a = (Zo/60)*Math.sqrt((eps_r+1)/2) + ((eps_r-1)/(eps_r+1))*(0.23 + 0.11/eps_r)
    let b = (377*Math.PI)/(2*Zo*Math.sqrt(eps_r))
    let wd_1 = (8 * Math.exp(a)) / (Math.exp(2*a) - 2)
    let wd_2 = (2 / Math.PI) * (b - 1 - Math.log(2*b - 1) + ((eps_r - 1) / (2 * eps_r)) * (Math.log(b - 1) + 0.39 - (0.61 / eps_r)))
    console.log(isNaN(wd_1))
    console.log(isNaN(wd_2))
    let w1 = wd_1 * h
    let w2 = wd_2 * h
    let eps_eff_1 = (eps_r + 1) / 2 + (eps_r - 1) / (2 * Math.sqrt(1 + 12 * (1 / wd_1)))
    let eps_eff_2 = (eps_r + 1) / 2 + (eps_r - 1) / (2 * Math.sqrt(1 + 12 * (1 / wd_2)))
    let lambda_1 = (3 * 10 ** 8) / (frequency * 10 ** 9 * Math.sqrt(eps_eff_1))
    let lambda_2 = (3 * 10 ** 8) / (frequency * 10 ** 9 * Math.sqrt(eps_eff_2))
    let correct_width = select_correct_width(w1, w2, Zo, h, frequency, eps_r)
    if (correct_width == w1){
      return [w1, eps_eff_1, lambda_1]
    } else {
      return [w2, eps_eff_2, lambda_2]
    }
    
}

function select_correct_width(w1, w2, Zo, h ,frequency, eps_r) {
  console.log(w1)
  console.log(w2)
  if (w1 < 0){
    return w2
  }
  if(w2 < 0) {
    return w1
  }

  let Zo_w1 = analysis(h, frequency, eps_r, w1)[0]
  let Zo_w2 = analysis(h, frequency, eps_r, w2)[0]

  let first_option_diff = Math.abs(Zo_w1 - Zo)
  let second_option_diff = Math.abs(Zo_w2 - Zo)
  if (first_option_diff > second_option_diff){
    return w2
  } else {
    return w1
  }
}
</script>


<style scoped>
.all-wraper {
  padding-top: 80px;
  display: flex;
  flex-direction: column;
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


.output-section {
  display: flex;

  column-gap: 70px;
  /* align-items: center; */
  justify-content: center;
  text-align: left;
  padding: 5px;
}

</style>