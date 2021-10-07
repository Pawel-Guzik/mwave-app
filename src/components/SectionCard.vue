<template>
    <div class="card">
        <div class="card-image">
            
        </div>
        <div class="card-text">
            <h1> {{ title }} </h1>
            <p> {{ description }} </p>
            <button class="button">Calculate</button>
        </div>
        
    </div>
</template>


<script>


export default {
    props: [
        'title',
        'description'
    ]
}
</script>



<style scoped>
.card {
    color: #00488A;
    width: 400px;
    display: grid;
    grid-template-columns: 400px;
    grid-template-rows: 200px 100px;
    grid-template-areas: "image" "text";

    border-radius: 18px;
    background:white;
    box-shadow: 1px 1px 3px rgba(0,0,0,0.4) ;
    text-align: center;
}

.card-image {
    grid-area: image;
    background: wheat;
    border-top-right-radius: 18px;
    border-top-left-radius: 18px;
}

p {
    color: black;
    /* font-weight: 600; */
    font-size: 15px;
}
h1 {
    margin-top: 6px;
    font-size:20px;
}
.card-text {
    grid-area: text;
    background: white;
    border-bottom-left-radius: 18px;
    border-bottom-right-radius: 18px;
    text-align: left;
    margin-left: 15px;
    font-family: 'Montserrat', sans-serif;
    padding-bottom: 10px;
}

.button {
    background-color: #00488A;

    font-family: 'Montserrat', sans-serif;
    color: white;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 1px;

    position: relative;
    border-radius: 5px;
    width: 100px;
    height: 30px;
    top: 10px;
    bottom: 25px;
    left: 270px;
}

* {
  margin: 0;
  padding: 0;
}
</style>