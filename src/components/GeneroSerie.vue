<template>
  <main class="animated fadeInDown">

      <div class="tituloSeriesPorGenero">
        <h1 v-if="recargarSeries()" id="tituloSG">{{Nombre}}</h1>
      </div>

      <div  v-for="serie in series" :key="serie.imagenes">
        <router-link :to="{name:'SerieDetalle', params:{ id:serie.serieId }}">
          <div class="card carta z-depth-5">
            <div class="card-image waves-effect waves-block waves-light">
              <img class="activator imagenes-pelicula" :src="path+serie.imagen">
            </div>
          </div>
        </router-link>
      </div>

  </main>
</template>

<script>
import axios from 'axios'

export default {
  name: 'GeneroSerie',
  props:['Genero', 'Nombre'], //Aqui obtengo el parametro.
  data(){
    return{
      series: [],
      seriesId: [],
      path: 'static/Servidor/Series/',
      aux: 0,
    }
  },
  methods: {
    cargarSeriesPorGenero(){
      axios.get("http://localhost:8642/api/GeneroSerie/Get/"+this.Genero).then(response => {
        this.seriesId = response.data;
        console.log(this.seriesId);
      
          axios.post("http://localhost:8642/api/Series/GetBuscadasPorGenero", this.seriesId).then(response => {
          if(response.data == 0){
            this.aux = this.Genero;
            this.$router.push('/NoEncontrado');
          }
          else
          {
            this.series = response.data;
            this.aux = this.Genero;
          }
        });
        
      });
      
    },
    recargarSeries(){
      if(this.aux != this.Genero){
        this.cargarSeriesPorGenero();
      }
      return true;
    }
  }
}
</script>

<style>
  .tituloSeriesPorGenero{
    margin-top: -20px !important;
    font-size: 50px !important;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
    text-shadow: 1px 1px 1px black;
    color: white;
    background-color: black;
    opacity: 0.5;
    border-bottom: 1px solid white;
    border-radius: 0px 0px  0px 0px;
    height: 77px !important;
    margin-bottom: 20px !important;
  }

  .genero{
    margin-top: 25px !important;
  }

  .tituloGenero{
    float: left;
    margin-left: 100px !important;
  }
</style>


