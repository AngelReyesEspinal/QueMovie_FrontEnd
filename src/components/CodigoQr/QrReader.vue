<template>
    <main>        
        <div class="tituloSeriesCapitulosPorSerie">
            <h1>Coloca tu código Aqui:</h1>    
        </div>
        
        <video id="preview" class="camara"> </video>
        <br>
        <button class="btn waves-effect waves-light botonLogin" type="submit" @click="volver()"> 
            Volver
        </button>
        
    </main>
</template>

<script>
const Instascan = require('instascan');

export default {
    mounted(){
        let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
        scanner.addListener('scan', function (content) { 
            swal('Tu codigo es', content, 'success');
        });
        Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
            scanner.start(cameras[0]);
        } else {
            console.error('No cameras found.');
        }
        }).catch(function (e) {
        console.error(e);
        });
    },
    name:'QrReader',
    methods:{
        volver(){
            this.$router.push('/Usuario')
        }
    }
}
</script>

<style>
    .tituloSeriesCapitulosPorSerie{
        margin-top: -15px !important;
        font-size: 50px !important;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
        text-shadow: 1px 1px 1px black;
        color: white;
        background-color: black;
        opacity: 0.5;
        border-bottom: 1px solid white;
        border-radius: 0px 0px  0px 0px;
        height: 77px !important;
        margin-bottom: 15px!important;
    }

    .camara{
        margin-left: 30px;
        border-radius: 50px 50px 50px 50px;
    }

    .botonLogin{
        background-color: black !important;
        font-size: 20px !important;
        text-shadow: 1px 1px 1px black;
        width: 400px;
        border-top: white solid 1px;
        border-bottom: white solid 1px;
        border-radius: 50px 50px 50px 50px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
        margin-top: 10px;
        margin-bottom: 15px;
    }

    .botonLogin:hover{
        background-color: white !important; /* Cambiar cuando llegue la luz */
        text-shadow: 1px 1px 1px black;
        color: black !important;
        border-top: black solid 1px;
        border-bottom:black solid 2px;
    }
</style>
