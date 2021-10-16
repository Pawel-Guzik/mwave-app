<template>
    <div class="all-wraper">
        <div class="header-navigation">
            <router-link to="/"><img src="../assets/back2.svg"></router-link>
        </div>
        <div class="wrapper">
            <div class="image">
                <img src="../assets/atom.svg">
            </div>
            <div class="calculate-section">
                <div class="inputs-section">
                    <p> {{first_parameter}} <input type="number" v-model.number="first_value"> {{first_unit}} </p>
                    <p> {{second_parameter}} <input type="number" v-model.number="second_value"> {{second_unit}} </p>
                    <p> Zo = <input type="number" v-model.number="Zo"> Ohm </p>
                </div>
                <div class="output-section">
                    <input type="radio" name="select" value="VSWR" v-model="checked" checked>
                    <p> VSWR = </p> 
                    <p> {{vswr}}</p>
                    <p> </p>
                    <p> arg(G) = </p>
                    <p>{{vswr_arg}} </p>
                    <p style="text-align: left;"> deg </p>
                </div>
                <div class="output-section">
                    <input type="radio" name="select" value="|G|" v-model="checked">
                    <p> |G| = </p> 
                    <p>{{g_module}}</p>
                    <p> </p>
                    <p> arg(G) = </p>
                    <p>{{g_arg}} </p>
                </div>
                <div class="output-section">
                    <input type="radio" name="select" value="Re(G)" v-model="checked">
                    <p> Re(G) = </p> 
                    <p>{{re_g}}</p>
                    <p> </p>
                    <p> Im(G) = </p>
                    <p>{{im_g}} </p>
                </div>
                <div class="output-section">
                    <input type="radio" name="select" value="r" v-model="checked">
                    <p> r = </p> 
                    <p>{{r_normalized}}</p>
                    <p> </p>
                    <p> jx = </p>
                    <p>{{jx_normalized}} </p>
                </div>
                <div class="output-section">
                    <input type="radio" name="select" value="g" v-model="checked">
                    <p> g = </p> 
                    <p>{{g_normalized}}</p>
                    <p> </p>
                    <p> jb = </p>
                    <p>{{jb_normalized}} </p>
                </div>
                <div class="output-section">
                    <input type="radio" name="select" value="R" v-model="checked">
                    <p> R = </p> 
                    <p> {{R}}</p>
                    <p style="text-align: left;"> Ohm </p>
                    <p> jX = </p>
                    <p>{{jX}} </p>
                    <p style="text-align: left;"> Ohm </p>
                </div>
                <div class="output-section">
                    <input type="radio" name="select" class="choice" value="G" v-model="checked">
                    <p> G = </p> 
                    <p>{{G}}</p>
                    <p style="text-align: left;"> S </p>
                    <p> jB = </p>
                    <p>{{jB}} </p>
                    <p style="text-align: left;"> S </p>
                </div>
                <div class="buttons-section">
                    <div class="buttons">
                        <button id="calculate" class="button" v-on:click="calculate"> Calculate </button>
                        <button id="reset" class="button" v-on:click="reset"> Reset </button>
                    </div>
                </div>
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
        vswr: '',
        vswr_arg: '',

        g_module: '',
        g_arg: '',

        re_g: '',
        im_g: '',

        r_normalized: '',
        jx_normalized: '',

        g_normalized: '',
        jb_normalized: '',
        
        R: '',
        jX: '',

        G: '',
        jB: '',

        checked: 'VSWR',

        first_parameter: 'VSWR =',
        second_parameter: 'arg(G) =',

        first_unit: '',
        second_unit: 'deg',

        first_value: '',
        second_value: '',

        Zo: '50'
      };
    },
    methods: {
        calculate() {
            console.log(this.checked)
            let result = []
            this.vswr = this.first_value
            this.vswr_arg = this.second_value
            result = calculate_on_VSWR(this.vswr, this.vswr_arg, this.Zo)
            this.write_output(result)
        },




        write_output(result) {
            let round_val = 1000000
            this.vswr = Math.round(result[0] * round_val)/round_val
            this.vswr_arg = this.g_arg = Math.round(result[7] *round_val)/round_val
            this.g_module = Math.round(result[1]*round_val)/round_val
            this.re_g = Math.round(result[2].re*round_val)/round_val
            this.im_g = Math.round(result[2].im*round_val)/round_val
            this.r_normalized = Math.round(result[3].re*round_val)/round_val
            this.jx_normalized = Math.round(result[3].im*round_val)/round_val
            this.g_normalized = Math.round(result[4].re*round_val)/round_val
            this.jb_normalized = Math.round(result[4].im*round_val)/round_val
            this.R = Math.round(result[5].re*round_val)/round_val
            this.jX = Math.round(result[5].im*round_val)/round_val
            this.G = Math.round(result[6].re*round_val)/round_val
            this.jB = Math.round(result[6].im*round_val)/round_val
        }
        
    },
    watch: {
        checked(value) {
            console.log(value)
            if (value == "VSWR") {
                this.first_parameter = 'VSWR ='
                this.second_parameter = 'arg(G) ='
                this.second_unit = "deg"
            }
            if (value == "|G|") {
                this.first_parameter = '|G| ='
                this.second_parameter = 'arg(G) ='
                this.second_unit = "deg"
            }
            if (value == "Re(G)") {
                this.first_parameter = 'Re(G) ='
                this.second_parameter = 'Im(G) ='
            }
            if (value == "r") {
                this.first_parameter = 'r ='
                this.second_parameter = 'jx ='
            }
            if (value == "g") {
                this.first_parameter = 'g ='
                this.second_parameter = 'jb ='
            }
            if (value == "R") {
                this.first_parameter = 'R ='
                this.second_parameter = 'jX ='
                this.first_unit = "Ohm"
                this.second_unit = "Ohm"
            }
            if (value == "G") {
                this.first_parameter = 'G ='
                this.second_parameter = 'jB ='
                this.first_unit = "S"
                this.second_unit = "S"
            }
        }
    }
}


function calculate_arg(arg) {
    return arg*Math.PI/180
}
function calculate_on_VSWR(VSWR, arg, Zo) {

    let arg_used = calculate_arg(arg)
    let g_module = (VSWR - 1) / (VSWR + 1)

    let g_complex = math.complex(g_module*Math.cos(arg_used), g_module*Math.sin(arg_used))
    let R = math.multiply(math.divide(math.add(g_complex, 1),math.add(g_complex, -1)),-Zo)
    let G = math.divide(1, R)
    let r = math.divide(R, Zo)
    let g = math.divide(G, (1/Zo))
    console.log(g_complex, R, G, r, g)
    return [VSWR, g_module, g_complex, r, g, R, G, arg]
}
</script>




<style scoped>
.all-wraper {
  padding-top: 80px;
  display: flex;
  flex-direction: column;
}
.header-navigation {
  /* padding-top:300px; */
  width: 100%;
  max-width: 1280px;
  margin: auto;
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

.inputs-section {
  display: flex;
  /* justify-content: space-between; */
  column-gap: 30px;
  align-items: center;
  padding-bottom: 50px;
}

.output-section {
  display: grid;
  grid-template-columns: 60px 70px 110px 30px 70px 110px 30px;
  column-gap: 10px;
  align-items: center;
  text-align: right;
  padding: 5px;
}
.calculate-section {
    grid-area: "calculations";
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-left: 60px;
}

input {
  width: 110px;
  height: 20px;
  font-size: 16px;
  border: 2px solid #00488A;
  border-radius: 4px;
  background-color: #E5E5E5;
  /* border: none; */
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





</style>