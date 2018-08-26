<template>
  <main>
    <div class="index">
      
      <particlesJS class="animated fadeInDown"/>

      <!--Carousel-->
      <carousel class="animated fadeInDown">
        <carouselslider>
          <img src="~@/assets/imagenes/strangerthings.jpg" alt="" class="imagenes">
        </carouselslider>
        <carouselslider>
          <img src="~@/assets/imagenes/dwd.jpg" alt=""  class="imagenes">
        </carouselslider>
        <carouselslider>
          <img src="~@/assets/imagenes/gameofthrones.jpg" alt="" class="imagenes">
        </carouselslider>
      </carousel>

      <!--Localizador-->
      <a class="btn teal localizador  animated fadeInUp" onclick="Materialize.toast('Estas en la página principal.', 4000)">
        <i class="material-icons">location_on</i>
      </a>
      
      <!--Search-->
      <div class="row">
        <div class="col s6 offset-s6">
          <nav class="search animated fadeInDown">
            <div class="nav-wrapper">
              <form>
                <div class="input-field teal">
                  <input id="search" type="search" v-model="ObjetoABuscar" v-on:keyup="obtenerSerie()">
                  <label class="label-icon icono_del_search" for="search"><i class="material-icons" >search</i></label>
                  <i class="material-icons icono_de_cerrar" v-on:click ="limpiarSearch">close</i>
                </div>
              </form>
            </div>
          </nav>
        </div>
      </div>

      <!-- Series -->
      <div v-if="validarSearch()">
        <div  v-for="serie in series" :key="serie.imagenes">
          <router-link :to="{name:'SerieDetalle', params:{ id:serie.serieId }}">
            <div class="card carta z-depth-5">  
              <div class="card-image waves-effect waves-block waves-light">
                <img class="activator imagenes-pelicula" :src="path+serie.imagen">

                <!-- Fav -->
                <span v-show="haySesion()" class="card-title informacionMiniaturaEditarSerie">
                  <i v-if="comprobarSiEstaSerieEsFavorita(serie.serieId)" class="material-icons laSerieEsFavorita">
                    star
                  </i>
                  <i v-else class="material-icons laSerieNoEsFavorita">
                    star
                  </i>
                </span>            

              </div>
            </div>
          </router-link>
        </div>
      </div>

      <!-- Buscadas -->
      <div v-else>
        <div  v-for="serieB in serieBuscada" :key="serieB.imagenes" >
          <router-link :to="{name:'SerieDetalle', params:{ id:serieB.serieId }}">
            <div class="card carta z-depth-5">  
              <div class="card-image waves-effect waves-block waves-light">
                <img class="activator imagenes-pelicula" :src="path+serieB.imagen">          
                
                <!-- Fav -->
                <span v-show="haySesion()" class="card-title informacionMiniaturaEditarSerie">
                  <i v-if="comprobarSiEstaSerieEsFavorita(serieB.serieId)" class="material-icons laSerieEsFavorita">
                    star
                  </i>
                  <i v-else class="material-icons laSerieNoEsFavorita">
                    star
                  </i>
                </span>  

              </div>
            </div>
          </router-link>
        </div>
      </div>

    </div>
  </main>
</template>

<script>
import axios from 'axios'
import particlesJS from '@/components/Particles/particlesJS'
import carousel from '@/components/carousel/carousel'
import carouselslider from '@/components/carousel/carouselslider'

export default {
  name: 'Index',
   mounted(){
    this.cargarPagina();
    $('.tooltipped').tooltip({delay: 50});
    this.usuarioId = this.$session.get('id'); //Seteo el id usuario
    this.cargarFavoritas(); //Ahora con id entra en accion
  },
  data(){
    return{
      ObjetoABuscar: '',
      series: [],
      serieBuscada: [], 
      path: 'static/Servidor/Series/',
      esFavorita: null,
      usuarioId: 0,
      favoritas:[],
    }
  },
  methods: {
    limpiarSearch(){
      this.ObjetoABuscar = '';
    },
    cargarFavoritas(){
      if(this.usuarioId != undefined){
        axios.get('http://localhost:8642/api/UsuariosSeries/Get/'+this.usuarioId).then(response => {
        if(response.data){
          this.favoritas = response.data;
        }
      });
      }
    },
    cargarPagina(){
      axios.get('http://localhost:8642/api/Series/Get').then(response => {
        if(response.data){
          this.series = response.data;
        }
      });
    },
    obtenerSerie(){
      event.preventDefault();
      axios.get('http://localhost:8642/api/Series/GetBuscadas/'+this.ObjetoABuscar).then(response => {
        if(response.data){
          this.serieBuscada = response.data; 
        }
      });
    },
    validarSearch(){
        if(this.ObjetoABuscar == ""){
        return true;
      }
    },
    haySesion(){
      if(this.$session.exists()){
        return true;
      }
      else{
        return false;
      }
    },
    comprobarSiEstaSerieEsFavorita(serieEnCurso){
      if(this.usuarioId != undefined)
      {  
        if(this.favoritas.length != 0)
        {
          for(var i = 0; i < this.favoritas.length ; i++)
          {
            if(this.favoritas[i].serieId == serieEnCurso){
              return true;
            }
          }
        }
      }
       
    }
  },
  components:{
    carousel,
    carouselslider,
    particlesJS 
  }
};
</script>

<style>
  ::-webkit-scrollbar {
    display: none;
  }

  .texto{
    position: absolute; 
    left: 0; 
    right: 0; 
    text-align: center;
    top: 50%; 
    color: white; 
    font-size: 20px;
  }
  
  .localizador{
    width: 100%;
  }

  .imagenes{
    margin-top: -7%;
    width: 100%;
    height: 600px;
    opacity: 0.5;
  }

  .carta{
    float: left;
    display: inline-flex !important;
    width: 320px !important;
    height: 190px  !important;
    margin-left: 16px !important;
    opacity: 0.8;
  }

  .carta:hover{
    border: 1px solid teal;
    opacity: 1 !important;
    border-radius: 50px 50px 50px 50px !important;
  }

  .search{
    margin-top: 20px !important;
    height: 50px;
    margin-bottom: 20px !important;
  }


  .iconitoPlay{
    color: white;
    size: 20px !important;
  }


  .imagenes-pelicula{
    width: 320px !important;
    height: 190px  !important;
  } 

  .labelDelSearch{
    color: white;
  }

  .icono_del_search{
    margin: -17px;
    margin-left: 1%;
  }

  .icono_de_cerrar{
    margin: -6px;
  }

  .informacionMiniaturaEditarSerie{
    padding: 5px !important;
    width: 100%  !important;
    font-size: 15px !important;
    text-align: right !important;
  }

  .laSerieNoEsFavorita{
    color: white !important;
  }

  .laSerieEsFavorita{
    color: yellow !important;
  }
</style>
