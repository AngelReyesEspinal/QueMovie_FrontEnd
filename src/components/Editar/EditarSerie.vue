<template>
  <main class="animated fadeInDown">

    <div class="tituloSeriesDetalleEditar">
      <h1>Administrar Series</h1>
    </div>

    <!-- Todas las Series -->
    <div  v-for="serie in series" :key="serie.imagenes">
        <div class="card cartaEditarSerie z-depth-5">  
          <div class="card-image waves-effect waves-block waves-light">
            <img class="activator imagenes-peliculaEditarSerie" :src="path+serie.imagen">          
            <span class="card-title informacionMiniaturaEditarSerie">
              <router-link :to="{name:'EditarCapitulo', params:{ id:serie.serieId }}" class="material-icons serieCapitulos">
                ondemand_video
              </router-link>
              <router-link :to="{name:'AgregarSerie', params:{ id:serie.serieId }}" class="material-icons serieSettings">
                settings
              </router-link>
              <i class="material-icons serieDelete" @click="eliminarSerie(serie.serieId)">
                delete_forever
              </i>
            </span> 
          </div>
        </div>
    </div>

    <!-- Agregar Serie -->
    <div class="row">
      <router-link :to="{name:'AgregarSerie', params:{ id:0 }}" class="btn waves-effect waves-light botonEditarSerie col s12" @click="iniciarSesion()"> 
        <i class="material-icons iconoAgregarES">add</i>
      </router-link>
    </div>

  </main>
</template>

<script>
import axios from 'axios'

export default {
  mounted(){
    this.cargarTodasLasSeries();
  },
  name: 'EditarSerie',
  data(){
    return{
      series: [],
      path: 'static/Servidor/Series/',
    }
  },
  methods:{
    cargarTodasLasSeries(){
      axios.get('http://localhost:8642/api/Series/Get').then(response => {
        if(response.data){
          this.series = response.data;
        }
      });
    },
    eliminarSerie(SerieAEliminar)
    {
      swal({
        title: "¿Estás seguro?",
        text: "La serie se eliminará permanentemente.",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
      if (willDelete) {
          axios.delete('http://localhost:8642/api/Series/Delete/'+ SerieAEliminar).then(response => {
            if(response.data == true){
              //Refrescando
              this.cargarTodasLasSeries();
              swal("¡Serie eliminada correctamente!", "", "success"); 
            }
          });
      } else {
        swal("No se elimino la serie!", "", "");
      }
      });
    }
  }
}
</script>

<style>
  .cartaEditarSerie{
    float: left;
    display: inline-flex !important;
    width: 320px !important;
    height: 190px  !important;
    margin-left: 16px !important;
    opacity: 0.8;
  }

  .cartaEditarSerie:hover{
    border: 1px solid teal;
    opacity: 1 !important;
    border-radius: 50px 50px 50px 50px !important;
  }

  .imagenes-peliculaEditarSerie{
    width: 320px !important;
    height: 190px  !important;
  } 

  .tituloSeriesDetalleEditar{
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

  .informacionMiniaturaEditarSerie{
    padding: 5px !important;
    width: 100%  !important;
    font-size: 15px !important;
    text-align: right !important;
  }

  .serieCapitulos{
    color: white!important;
  }

  .serieCapitulos:hover{
    color: #e65100  !important;
  }

  .serieSettings{
    color: white!important;
  }
  
  .serieDelete{
    color: white !important;
  }

  .serieSettings:hover{
    color: teal !important;
  }

  .serieDelete:hover{
    color: red !important;
  }

  .iconoAgregarES{
    font-size: 40px!important;
    margin-top: 5px!important;
  }

  .botonEditarSerie{
    margin-top: 15px !important;
    margin-bottom: 15px !important;
    background-color: black !important;
    font-size: 25px !important;
    text-shadow: 1px 1px 1px white;
    height: 50px !important ;
    width: 50%;
    border-top: white solid 1px;
    border-bottom: white solid 1px;
    opacity: 0.7;
  }

  .botonEditarSerie:hover{
    background-color: white !important; /* Cambiar cuando llegue la luz */
    color: teal;
    text-shadow: 1px 1px 1px teal;
    border: teal solid 1px;
  }
</style>
