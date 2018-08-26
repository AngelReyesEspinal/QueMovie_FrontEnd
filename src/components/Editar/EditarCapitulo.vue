<template>
    <main class="animated fadeInDown">
        <div class="tituloSeriesCapitulosPorSerie">
            <h1>Administrar Capítulos</h1>    
        </div>
    
        <!-- Capitulos -->
        <div  v-for="capitulo in capitulos" :key="capitulo.titulo">
            <!-- <router-link :to="{name:'SerieDetalle', params:{ id:serie.serieId }}"> -->
                <div class="card cartaCxS z-depth-5">  
                    <div class="card-image waves-effect waves-block waves-light">
                        <img class="activator imagenes-peliculaCxS" :src="path+imagen">
                        <span class="card-title informacionMiniatura">{{capitulo.numeroCapitulo}}, {{capitulo.nombreDelCapitulo}}. 
                            <span class="manipuladores">
                            <router-link :to="{name:'AgregarCapitulo', params:{ id:capitulo.capituloID, accion:'Editar' }}" class="material-icons serieSettings">
                                settings
                            </router-link>
                            <i class="material-icons serieDelete" @click="eliminarSerie(capitulo.capituloID)">
                                delete_forever
                            </i>
                            </span>
                        </span>
                    </div>
                </div>
            <!-- </router-link> -->
        </div>

        <!-- Agregar Serie -->
        <div class="row">
            <router-link :to="{name:'AgregarCapitulo', params:{ id:serie.id, accion:'Agregar' }}" class="btn waves-effect waves-light botonEditarSerie col s12" @click="iniciarSesion()"> 
                <i class="material-icons iconoAgregarES">add</i>
            </router-link>
        </div>
    </main>
</template>

<script>
import axios from 'axios'

export default {
  name:  'EditarCapitulo',
  mounted(){
      this.obtenerCapitulos();
      this.obtenerImagenSerie();
  },
  data(){
    return{
        serie:{
            id: this.$route.params.id,
        },
        capitulos: [],
        limpiarCapitulo: [],
        tituloSerie: '',
        imagen:'',
        limpiarImagen: '',
        path:'static/Servidor/Series/',
    }
  },
  methods:{
        obtenerCapitulos(){
            axios.get('http://localhost:8642/api/capitulos/GetCaps/'+this.serie.id).then(response => {
                if(response.data != 0){
                    this.capitulos = response.data;
                }
            });
        },
        obtenerImagenSerie(){
            axios.get('http://localhost:8642/api/series/Get/'+this.serie.id).then(response => {
                this.tituloSerie = response.data.titulo;
                this.imagen = response.data.imagen;
            });
        },
        eliminarSerie(capituloId){
            swal({
                title: "¿Estás seguro?",
                text: "El capítulo se eliminará permanentemente.",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then((willDelete) => {
            if (willDelete) {
                axios.delete('http://localhost:8642/api/Capitulos/Delete/'+ capituloId).then(response => {
                    if(response.data == true){
                        // this.capitulos = this.limpiarCapitulo;
                        // this.imagen = this.limpiarImagen;

                        //Refrescando
                        this.obtenerCapitulos();
                        this.obtenerImagenSerie();
                        
                        //Limpiando
                        capituloId = 0;
                        swal("¡Capitulo eliminado correctamente!", "", "success");
                    }
                });
            } else {
                swal("No se elimino el capítulo!", "", "");
            }
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

    .informacionMiniatura{
        padding: 5px !important;
        /* bottom: -10px !important; */
        width: 100%  !important;
        font-size: 15px !important;
        text-align: right !important;
    }

    .informacionMiniatura:hover{
        color: teal !important;
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

    .iconoAgregarES{
        font-size: 40px!important;
        margin-top: 5px!important;
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
</style>

