<template>
    <main class="animated fadeInDown">
        <div class="tituloSeriesCapitulosPorSerie">
            <h1>{{ tituloSerie }}</h1>    
        </div>
    
        <!-- Capitulos -->
        <div  v-for="capitulo in capitulos" :key="capitulo.titulo">
            <router-link :to="{name:'Reproductor', params:{ serie:serie.id ,capitulo:capitulo.capituloID }}"> 
                <div class="card cartaCxS z-depth-5">  
                    <div class="card-image waves-effect waves-block waves-light">
                        <img class="activator imagenes-peliculaCxS" :src="path+imagen">
                        <span class="card-title informacionMiniaturaCxS">{{capitulo.numeroCapitulo}}, {{capitulo.nombreDelCapitulo}}.</span> 
                    </div>
                </div>
            </router-link>
        </div>
    </main>
</template>

<script>
import axios from 'axios'

export default {
  name:  'CapitulosPorSerie',
  mounted(){
      this.obtenerCapitulos();
      this.obtenerTituloSerie();
  },
  data(){
    return{
        serie:{
            id: this.$route.params.id,
        },
        capitulos: [],
        tituloSerie: '',
        imagen:'',
        path:'static/Servidor/Series/',
    }
  },
  methods:{
        obtenerCapitulos(){
            axios.get('http://localhost:8642/api/capitulos/GetCaps/'+this.serie.id).then(response => {
                if(response.data == 0){
                    swal("Lo sentimos.","Aún no tenemos capítulos de esta serie.", "warning");
                }else{
                    this.capitulos = response.data;
                }
            });
        },
        obtenerTituloSerie(){
            axios.get('http://localhost:8642/api/series/Get/'+this.serie.id).then(response => {
                this.tituloSerie = response.data.titulo;
                this.imagen = response.data.imagen;
                console.log(this.tituloSerie);
            });
        }
  },
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

    /*ESTILO DE LOS CAPITULOS AQUI VAMOS*/

    .cartaCxS{
        float: left;
        display: inline-flex !important;
        width: 320px !important;
        height: 190px  !important;
        margin-left: 16px !important;
        opacity: 0.8;
        margin-top: 20px !important;
    }

    .cartaCxS:hover{
        border: 1px solid teal;
        opacity: 1 !important;
        border-radius: 50px 50px 50px 50px !important;
    }

    .imagenes-peliculaCxS{
        width: 320px !important;
        height: 190px  !important;
    } 

    .informacionMiniaturaCxS{
        padding: 5px !important;
        /* bottom: -10px !important; */
        width: 100%  !important;
        font-size: 15px !important;
        text-align: center !important;
    }

    .informacionMiniaturaCxS:hover{
        color: teal !important;
    }
</style>


