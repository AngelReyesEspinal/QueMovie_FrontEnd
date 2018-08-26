<template>
    <main>
        <div class="container animated fadeInDown">
            <div class="card cartaDetalle z-depth-5">
                <div class="card-image waves-effect waves-block waves-light">
                    <img class="activator imagenescartaDetalle" :src="path+serie.Imagen">
                </div>
                <div v-if="this.$session.exists()" class="card-reveal revealColorDeFondo">
                    <span class="card-title colorCerrarReveal"><i class="material-icons right">close</i></span>
                    <router-link :to="{name:'CapitulosPorSerie', params:{ id:serie.id }}">
                        <span class="card-title revealTitulo"> 
                            ¡VER AHORA! 
                        </span>
                    </router-link>
                </div>
                <div v-else class="card-reveal revealColorDeFondo">
                    <span class="card-title colorCerrarReveal"><i class="material-icons right">close</i></span>
                    <router-link to="/Login">
                        <span class="card-title revealTitulo"> 
                            ¡VER AHORA! 
                        </span>
                    </router-link>
                </div>
            </div>
            
            <div class="animated fadeInDown">
                <div class="tituloSeriesDetalle">
                    <h1>{{ serie.Titulo }}</h1>
                </div>
                
                <div class="row">
                    <div class="informacionesRelevantes col s12">
                        <p class="subtitulos"> SOBRE LA SERIE </p>
                    </div>
                </div>        
            </div>

            <!-- Sipnopsis -->
            <div class="row">
                <div class="col s12">
                    <div class="card-panel teal cartasDeLaIzquierda" id="sinop">
                        <span class="white-text">
                            <div class="subtitulosDelSubtitulo">Sinopsis:</div>
                            <br/>
                            <br/>
                            <p class="contenidoSerieDetalle">{{ serie.Sinopsis }}</p>
                            
                            <!-- Generos -->
                            <div class="card-action color">
                                <div class="contenidoSerieDetalle"><span class="generosStyle">Generos: {{ serie.Genero }}. </span></div>
                            </div>  
                        </span>
                    </div>
                </div>
            </div>

            <div class="row">
                <!-- Temporadas -->
                <div class="col s6">
                    <div class="card-panel black cartasDeLaIzquierda" id="temporada">
                        <span class="white-text">
                            <div class="subtitulosDelSubtitulo">Temporadas:</div>
                            <br/>
                            <br/>
                            <p class="contenidoSerieDetalle"> Un total de: {{ serie.Temporadas }} temporadas.</p>
                        </span>
                    </div>
                </div>

                <!-- Estreno -->
                <div class="col s6">
                    <div class="card-panel teal cartasDeLaIzquierda" id="estreno">
                        <span class="white-text">
                            <div class="subtitulosDelSubtitulo">Estreno:</div>
                            <br/>
                            <br/>
                            <p class="contenidoSerieDetalle"> Se estrenó en el año: {{ serie.Anio }}.</p>
                        </span>
                    </div>
                </div>

                <!-- Productora -->
                <div class="col s6">
                    <div class="card-panel teal cartasDeLaIzquierda" id="productora">
                        <span class="white-text">
                            <div class="subtitulosDelSubtitulo">Productora:</div>
                            <br/>
                            <br/>
                            <p class="contenidoSerieDetalle"> {{ serie.Productora }}.</p>
                        </span>
                    </div>
                </div>

                <!-- Duracion x Capitulo -->
                <div class="col s6">
                    <div class="card-panel black cartasDeLaIzquierda" id="duracion">
                        <span class="white-text">
                            <div class="subtitulosDelSubtitulo">Duración:</div>
                            <br/>
                            <br/>
                            <p class="contenidoSerieDetalle">La serie tiene una media de {{ serie.Duracion }} por capitulo.</p>
                        </span>
                    </div>
                </div>
            </div>

            <!-- Trailer ACTIVAR DIA DE ENTREGA -->
            <div class="row" id="vevo">
                <div class="col s12">
                    <iframe class="video" width="100%" height="600px" :src="serie.Trailer" frameborder="0" gesture="media"></iframe>
                </div>
            </div>
            
            <!-- Agregar a mis Favoritos -->
            <div v-show="haySesion()">
                <div class="row">
                    <button class="btn waves-effect waves-light botonSerieF col s12" @click="agregarAFavorito()"> 
                        <i v-if="prueba" class="material-icons iconoAgregarF animated infinite pulse">
                            star
                        </i>
                        <i v-else class="material-icons iconoEliminarF animated infinite pulse">
                            star
                        </i>
                    </button>
                </div>
            </div>

        </div>
  </main>
</template>

<script>
import axios from 'axios'

export default {
  name: 'SerieDetalle',
  mounted(){
    this.cargarSerie();
    this.cargarGeneros();
    this.comprobarSiEstaSerieEsFavorita();
  },
  data(){
    return{
        id: this.$route.params.id,
        serie:{
            id: 0,
            Titulo: '',
            Sinopsis:'',
            Genero: '',
            Anio: '',
            Productora:'',
            Duracion:'',
            Imagen:'',
            Trailer: '',
            Temporadas: ''
        },
        path: 'static/Servidor/Series/',
        favorita:{
            SerieId: 0,
            UsuarioId: 0
        },
        favoritas: [],
        prueba: null,
        generosId:[],
    }
  },
  methods:{
    cargarSerie(){
        axios.get('http://localhost:8642/api/Series/Get/'+this.id).then(response =>  {
            this.serie.id = response.data.serieId;
            this.serie.Titulo = response.data.titulo;
            this.serie.Sinopsis = response.data.sinopsis;
            this.serie.Genero = response.data.genero;
            this.serie.Anio = response.data.anio;
            this.serie.Productora = response.data.productora;
            this.serie.Duracion = response.data.duracion;
            this.serie.Imagen = response.data.imagen;
            this.serie.Trailer = response.data.trailer;
            this.serie.Temporadas = response.data.temporadas;
        });
    },
    cargarGeneros(){ //Copiado del Editar Serie XD
        axios.get('http://localhost:8642/api/GeneroSerie/GetEditar/'+ this.id).then(response => {
            this.generosId = response.data; //Carga el array
            axios.post('http://localhost:8642/api/Generos/GetSearched', this.generosId).then(response => {
                this.serie.Genero = response.data; // Convierte el array en una grasita
                this.serie.Genero = this.serie.Genero.slice(0 , -2);
            });
        });
    },
    haySesion(){
      if(this.$session.exists()){
        return true;
      }
      else{
        return false;
      }
    },
    comprobarSiEstaSerieEsFavorita(){
        this.favorita.SerieId = this.id;
        this.favorita.UsuarioId = this.$session.get('id');

        axios.post('http://localhost:8642/api/UsuariosSeries/VerificarSerieFavorita', this.favorita).then(response => {   
           this.favorita.SerieId = response.data.serieId;
           this.favorita.UsuarioId = response.data.usuarioId;

            if(this.favorita.SerieId == 0){
                this.prueba = true;
            }
        });
    },
    agregarAFavorito(){
        this.favorita.SerieId = this.id;
        this.favorita.UsuarioId = this.$session.get('id');

        if(this.favorita.SerieId != 0 &&  this.favorita.UsuarioId != 0){
            axios.post('http://localhost:8642/api/UsuariosSeries/Post', this.favorita).then(response => {
                if(response.data == true){
                    this.prueba = !this.prueba;
                }
            });
        }
    },
  }
}
</script>

<style>
    .generosStyle{
        font-size: 20px !important;
    }

    .cartasDeLaIzquierda{
        margin-top: 15px !important;
        margin-bottom: 0;
        opacity: 0.7;
        padding: 10px !important;
        border-bottom: solid white 1px;
    }

    .cartasDeLaIzquierda:hover{
        opacity: 0.8;
    }

    .cartaDetalle{
        margin-top: 0 !important;
        width: 100% !important;
        height: 400px  !important;
    }

    .imagenescartaDetalle{
        width: 100% !important;
        height: 400px  !important;
    }

    .revealColorDeFondo{
        background-color: black !important;
        opacity: 0.5;
    }

    .revealTitulo{
        margin-top: 80px !important;
        font-size: 135px !important;
        text-shadow: 1px 1px 1px black;
        color: white !important
    }

    .colorCerrarReveal{
        color: white !important;
    }

    .tituloSeriesDetalle{
        margin-top: -15px !important;
        font-size: 50px !important;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
        text-shadow: 1px 1px 1px black;
        color: white;
        background-color: black;
        opacity: 0.5;
        border-bottom: 1px solid white;
        border-radius: 0px 0px  90px  90px;
        height: 77px !important;
    }

    .informacionesRelevantes{
        border-top: 1px solid white;
        margin-top: 15px !important;
        background: black;
        opacity: 0.5;
        border-radius: 90px 90px 0px 0px;
        color: white;
    }

    .subtitulos{
        margin-top: 10px !important;
        margin-bottom: 10px !important;
        font-size: 40px !important;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
        border-bottom: 1px solid white;
    }

    .contenidoSerieDetalle{
        text-align: justify;
        margin-left: 10px!important;
    }

    .subtitulosDelSubtitulo{
        font-size: 30px !important;
        float: left;
    }

    .tab{
        margin-left: 30px !important;
    }

    .video{
        margin-top: 15px !important;
        padding-bottom: 20px !important;
    }

    .row{
        margin-bottom: 0;
    }

    .color{
        background-color: black !important;
    }

    .botonSerieF{
        margin-top: -10px !important;
        margin-bottom: 15px !important;
        background-color: black !important;
        font-size: 25px !important;
        text-shadow: 1px 1px 1px black;
        height: 50px !important ;
        width: 50%;
        border: white solid 1px;
        opacity: 0.7;
    }

    .botonSerieF:hover{
        background-color: black !important; /* Cambiar cuando llegue la luz */
        text-shadow: 1px 1px 1px black;
        border: teal solid 1px;
        border-radius: 50px 50px 50px 50px;
    }

    .iconoAgregarF{
        font-size: 40px!important;
        margin-top: 5px!important;
    }

    .iconoAgregarF{
        color: white !important;
    }

    .iconoEliminarF{
        font-size: 40px!important;
        margin-top: 5px!important;
    }

    .iconoEliminarF{
        color: yellow !important;
    }
</style>
