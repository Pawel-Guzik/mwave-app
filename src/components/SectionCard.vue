<template>
    <div class="card">
        <div class="card-image">
            <p> image </p>
        </div>
        <div class="card-text">
            <h1>Rectangular Waveguide</h1>
            <p> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard </p>
        </div>
        
    </div>
</template>



<style scoped>
.card {
    color: #00488A;
    width: 450px;
    display: grid;
    grid-template-columns: 450px;
    grid-template-rows: 200px 150px;
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
    font-weight: 600;
    /* size: 14px; */
}
h1 {
    font-size:24px;
}
.card-text {
    grid-area: text;
    background: white;
    border-bottom-left-radius: 18px;
    border-bottom-right-radius: 18px;

    text-align: left;
    margin-left: 15px;
}
</style>