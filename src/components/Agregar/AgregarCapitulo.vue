<template>
    <main>
        <form class="col s12" enctype="multipart/form-data"> 
            <div class="row">
                <div class="col s12 animated fadeInDown">
                    <div class="card transparent .center-align registrarCapitulo">
                        <div class="card-content white-text">
                            <span v-if="this.accion == 'Editar'" class="card-title tituloCap"> Editar Capítulo </span>
                            <span v-else class="card-title tituloCap"> Agregar Capítulo </span>
                            <div class="row">

                                <div class="input-field col s10">
                                  <input id="nombreDelCapitulo" type="text" class="validate" v-model="Capitulo.NombreDelCapitulo" required>
                                  <label for="nombreDelCapitulo" class="active letras">Nombre del capítulo:</label>
                                </div>

                                <div class="input-field col s2">
                                  <input id="numDelCapitulo" type="number" class="validate" v-model="NumeroCapituloInput" required>
                                  <label for="numDelCapitulo" class="active letras">Número del capítulo:</label>
                                </div>

                                <div class="file-field input-field col s8">
                                  <div class="btn">
                                    <span>Capítulo</span>
                                    <input type="file" @change="processFile($event)">
                                  </div>
                                  <div class="file-path-wrapper">
                                    <input class="file-path validate" type="text" v-model="Capitulo.DireccionDelCapitulo" required>
                                  </div>
                                </div>

                                <div class="input-field col s4">
                                  <input id="temporada" type="number" class="validate" v-model="Capitulo.Temporada" required>
                                  <label for="temporada" class="active letras">Temporada:</label>
                                </div>

                                <div class="input-field col s6">
                                  <a class="tooltipped" data-position="right" data-delay="50" data-tooltip="Presione enter para buscar la serie.">
                                    <input id="serieAjax" type="text" class="validate"  v-model="serieABuscar" v-on:keydown.enter="obtenerSerie()">
                                    <label for="serieAjax" class="active letras">Escriba la serie a la que pertenece:</label>
                                  </a>
                                </div>

                                <div class="input-field col s6">
                                  <input id="serie" type="text" class="validate letras" required v-model="aux">
                                </div>
                            </div>

                            <div class="col s1 margenArribaCapitulos">
                              <label for="" class="letras">Resultado: </label>
                            </div>

                            <div class="col s2 margenArribaCapitulos">
                              <label id="resultado" class="letras resultado" @click="seleccionado()"> {{ serie.titulo }} </label>
                            </div>

                            <button v-if="this.accion == 'Agregar'" class="btn boton waves-effect waves-light margenArribaBtnCapitulo" type="submit" @click="enviarCapitulo()"> 
                              Agregar
                            </button>
                            <button v-else class="btn boton waves-effect waves-light margenArribaBtnCapitulo" type="submit" @click="enviarCapituloEditado()"> 
                              Editar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </form>

        <div id="loaderCapitulos">
            <div class="preloader-wrapper big active">
                <div class="spinner-layer spinner-teal-only">
                    <div class="circle-clipper left">
                        <div class="circle"></div>
                    </div><div class="gap-patch">
                        <div class="circle"></div>
                    </div><div class="circle-clipper right">
                        <div class="circle"></div>
                    </div>
                </div>
            </div>
        </div>
        
    </main>
</template>

<script>
import axios from 'axios'

var capitulo = new FormData;

export default {
  name: 'AgregarCapitulo',
  mounted(){
    $('.tooltipped').tooltip({delay: 50});
    this.cargarCapituloAEditar();
  },
  data(){
    return {
      id: this.$route.params.id,
      accion: this.$route.params.accion,
      idS: 0,
      Capitulo:{
        NumeroCapitulo: 0,
        NombreDelCapitulo: '',
        DireccionDelCapitulo: '',
        Temporada: '',
        SerieId: 0 
      },
      NumeroCapituloInput: '',
      File: File,
      aux: '',
      serieABuscar:'',
      serie:{
        id: '',
        titulo:'',
      },
      //Paga gestionar el file, en el editar
      comparador: '',
    }
  },
  methods:{
    seleccionado(){
      this.aux = $("#resultado").text();
    },
    obtenerSerie(){
      event.preventDefault();
      if(this.serieABuscar != ''){
        axios.get('http://localhost:8642/api/Series/GetSearched/' +this.serieABuscar, $('#loaderCapitulos').fadeIn("slow")).then(response => {
          if(response.data.titulo != null){
            this.serie.id = response.data.serieId;
            this.Capitulo.SerieId = this.serie.id; 
            this.serie.titulo = response.data.titulo;
            $('#loaderCapitulos').fadeOut("slow");
          } else {
            swal('Disculpe', 'Por favor sea más específico.', 'warning');
            $('#loaderCapitulos').fadeOut("slow");
          }
        }); 
      } else {
        swal('No ha ingresado nada', '', 'warning');
      }
    },
    processFile(event) {
      this.File = event.target.files[0];
      this.Capitulo.DireccionDelCapitulo = this.File.name;
    },
    cargarData(){

      this.Capitulo.NumeroCapitulo = parseInt(this.NumeroCapituloInput);

      if(this.id > 0){
        capitulo.append('CapituloID', this.id);
      }

      capitulo.append('NumeroCapitulo', this.Capitulo.NumeroCapitulo);
      capitulo.append('NombreDelCapitulo', this.Capitulo.NombreDelCapitulo);
      capitulo.append('DireccionDelCapitulo', this.Capitulo.DireccionDelCapitulo);
      capitulo.append('Temporada', this.Capitulo.Temporada);
      capitulo.append('SerieId', this.Capitulo.SerieId);
      capitulo.append('File', this.File);

      return  {
        capitulo
      }
     
    },
    limpiarObjetoAEnviar(){
      if(capitulo.get('CapituloID') > 0){
        capitulo.delete('CapituloID'); // Solo para el editar
      }
      capitulo.delete('NumeroCapitulo');
      capitulo.delete('NombreDelCapitulo');
      capitulo.delete('DireccionDelCapitulo');
      capitulo.delete('Temporada');
      capitulo.delete('SerieId');
      capitulo.delete('File');
    },
    enviarCapitulo(){
      event.preventDefault();
      this.cargarData();

      axios.post('http://localhost:8642/api/Capitulos/PostAsync', capitulo, $('#loaderCapitulos').fadeIn("slow")).then(response => {
        if(response.data)
        {
          swal("¡Muy bien!", "¡Se ha agregado correctamente!", "success");
          this.limpiarObjetoAEnviar();
          $('#loaderCapitulos').fadeOut("slow");
          this.$router.push('/EditarCapitulo/' + this.id)
        } 
        else
        {
          $('#loaderCapitulos').fadeOut("slow");
          swal("¡Ha ocurrido un inconveniente!", "", "error");
          console.log(error.response);   
        }
      })

    },
    cargarCapituloAEditar(){
      if(this.accion == 'Editar'){
        axios.get('http://localhost:8642/api/Capitulos/Get/'+this.id).then(response => {
          //Cargar capitulo:
          this.Capitulo.NumeroCapitulo = response.data.numeroCapitulo;
          this.NumeroCapituloInput = response.data.numeroCapitulo;
          this.Capitulo.NombreDelCapitulo = response.data.nombreDelCapitulo;
          this.Capitulo.DireccionDelCapitulo = response.data.direccionDelCapitulo;
          this.comparador = response.data.direccionDelCapitulo;
          this.Capitulo.Temporada = response.data.temporada;
          this.Capitulo.SerieId = response.data.serieId;
          
          //Obtener nombre de la serie:
          this.idS = response.data.serieId;
          axios.get('http://localhost:8642/api/Series/Get/'+this.idS).then(response2 =>  {
            this.aux = response2.data.titulo;
          });
        });
      } else {
        //Esto es solo agregar
        axios.get('http://localhost:8642/api/Series/Get/'+this.id).then(response =>  {
          this.aux = response.data.titulo;
          this.Capitulo.SerieId = this.id;
        });
      }
    },
    enviarCapituloEditado(){
      event.preventDefault();
      this.cargarData();
       axios.put('http://localhost:8642/api/Capitulos/PutAsync', capitulo, $('#loaderCapitulos').fadeIn("slow")).then(response => {
        if(response.data){
          swal("¡Muy bien!", "¡Se ha editado correctamente!", "success");
          this.limpiarObjetoAEnviar();
          $('#loaderCapitulos').fadeOut("slow");
          this.$router.push('/EditarCapitulo/' + this.idS)
        } else
        {
          $('#loaderCapitulos').fadeOut("slow");
          swal("¡Ha ocurrido un inconveniente!", "", "error");
          console.log(error.response);   
        }
      }).
      catch(function (error) {
        console.log(error.response);
        swal("¡Ha ocurrido un inconveniente!", "", "error");
        $('#loaderCapitulos').fadeOut("slow");
      });
    },
  }
}
</script>

<style>
  #loaderCapitulos{
    margin-top: -300px !important;
    margin-left: 600px !important;
    position: absolute;
    z-index: 100;
    display: none;
  }
  .registrarCapitulo{
    margin-top: 90px !important;
  }

  .margenArribaCapitulos{
    margin-top: -20px !important;
  }

  .margenArribaBtnCapitulo{
    margin-top: 40px !important;
  }

  .input-field label {
    color: white;
  }

  .tituloCap{
    color: teal;
    font-size: 50px !important;
    text-shadow: 1px 1px 1px white;
    margin-bottom: 20px !important;
  }

  .segundaFila{
    margin-top: -70px !important;
  }

  .letras{
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
    font-size: 20px !important;
  }

  .letrasSelector{
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
    font-size: 15px !important;
  }

  .boton{
    width: 100%;
    font-size: 20px !important;
  }

  .Izquierda{
    float: left;
    margin-right: 5px !important;
  }

  .resultado:hover{
    color: teal;
  }

  .generosLetras{
    color: white !important;
  }
</style>