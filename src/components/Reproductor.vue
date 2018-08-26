<template>
  <main>

    <div class="tituloCapituloEnCurso">
      <h1 @click="volverCxS">{{ tituloDelVideo }}</h1>
    </div>

    <a v-show="botonAtras == true" class="waves-effect transparent btn-large botonIzquierda tamanioBotones" @click="botonIzquierda()">
      <i class="material-icons iconoReproductorVideo">chevron_left</i>
    </a>

    <a v-show="botonAdelante == true" class="waves-effect transparent btn-large botonDerecha tamanioBotones" @click="botonDerecha()">
      <i class="material-icons iconoReproductorVideo">chevron_right</i>
    </a>

    <div class="container">

      <!-- Video -->
      <video v-if="direccionDelVideo != ''" width="100%" class="alturaVideo" autoplay controls played id="miVideo"> 
        <source :src="path+direccionDelVideo" type="video/mp4">
      </video>

      <!-- Comentarios -->
      <div class="comentariosTitulo">
        <h2> Comentarios: </h2>
      </div>

      <!-- Caja de comentarios -->
      <div v-if="comentarios.length > 0">
        <div v-for="comentario in comentarios" :key="comentario.usuarioCapituloId"> 
          <div class="card-panel black cartaComentario">
            <span class="card-title Cabecera"> 
              <i class="material-icons">chat</i> 
              {{comentario.comentador}}
            </span>
            <span class="EditoresComentario">
              <template v-if="mostrarOpcionesDeEdicion(comentario.usuarioId) == true">
                <i class="material-icons editarComentario" @click="Editar(comentario.usuarioCapituloId)">edit</i> 
                <i class="material-icons eliminarComentario" @click="Eliminar(comentario.usuarioCapituloId)">delete_forever</i>
              </template>
            </span> 
          </div>
          <div class="card-reveal colorfooterComentario">
            <div class="contenidoComentario">
                {{comentario.comentario}}
              <span class="estaEditado">
                {{comentario.editado}}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Habilitador del comentario -->
      <a v-if="mostrarInputVariable == false" class="btn-floating btn-large waves-effect waves-light teal botonDesplegarComentario" @click="mostrarInput"><i class="material-icons">comment</i></a>
      
      <!-- Input donde se comenta -->
      <div v-else class="row">
        <form class="col s12">

          <div class="row">
            <div class="input-field col s12 inputComentar">
              <i class="material-icons prefix iconoTextarea">comment</i>
              <textarea id="textarea1" class="materialize-textarea comentarioTextarea" v-model="comentario.Comentario"></textarea>
              <label for="textarea1" class="active labelTextarea">Escribe tu comentario: </label>
            </div>

            <button class="btn waves-effect waves-light botonComentar" type="submit" @click="comentar()"> 
              Enviar
            </button>
          </div>
          
        </form>
      </div>
      
    </div>
  </main>
</template> 

<script>
import axios from 'axios'

export default {
  mounted(){
    this.obtenerCapitulos();
    this.cargarComentariosExistentes();
  },
  beforeRouteUpdate (to, from, next) {
    this.capitulo = to.params.capitulo;
    this.direccionDelVideo = '';
    this.obtenerCapitulos();
    this.cargarComentariosExistentes();
    next();
  },
  name: 'Reproductor',
  data(){
    return{
      serie: this.$route.params.serie,
      capitulo: this.$route.params.capitulo,
      botonAtras: true,
      botonAdelante: true,
      mostrarInputVariable: false,
      capitulos: [],
      comentarios: [],
      comentario:
      {
        UsuarioCapituloId: 0,
        Comentario: '',
        Comentador: '',
        Editado: '',
        UsuarioId: 0,
        CapituloID: 0,
      },

      //VideoActual:
      path:'http://localhost:8642/api/Capitulos/Video/',
      direccionDelVideo: '', 
      tituloDelVideo:'',
    }
  },
  methods:{
    cargarComentariosExistentes(){
  
      axios.get('http://localhost:8642/api/UsuariosCapitulos/Get/'+ this.capitulo).then(response => {
        this.comentarios = response.data;
      });
      
    },
    botonIzquierda(){
      for(var i = 0 ; i < this.capitulos.length ; i++)
      {
        if(this.capitulos[i].capituloID == this.capitulo)
        {
          this.$router.push('/Reproductor/' + this.serie + '/' + this.capitulos[i - 1].capituloID)
          break;
        }
      }
    },
    botonDerecha(){
      for(var i = 0 ; i < this.capitulos.length ; i++)
      {
        if(this.capitulos[i].capituloID == this.capitulo)
        {
          this.$router.push('/Reproductor/' + this.serie + '/' + this.capitulos[i + 1].capituloID)
          break;
        }
      }
    },
    mostrarInput(){
      this.mostrarInputVariable = true; 
    },
    limpiarObjetoComentario(){
      this.comentario.UsuarioCapituloId = 0;
      this.comentario.Comentario = '';
      this.comentarios.Comentador = '';
      this.comentario.Editado = '';
      this.comentario.UsuarioId = 0;
      this.comentario.CapituloID = 0;
    },
    cargarComentario(){
      if(this.comentario.Comentario != '')
      {
        this.comentario.CapituloID = this.capitulo;
        this.comentario.Comentador = this.$session.get('nombre') + ' ' + this.$session.get('apellido');
        this.comentario.UsuarioId = this.$session.get('id');
      } 
      else 
      {
        swal('No has escrito nada', '', 'warning');
        this.mostrarInputVariable = true; 
      }
    },
    comentar(){
      event.preventDefault();
      this.cargarComentario();
      if(this.comentario.UsuarioCapituloId != 0){
        axios.put('http://localhost:8642/api/UsuariosCapitulos/Put', this.comentario).then(response => {
          if(response.data){
            swal('Comentario modificado', '', 'success');
            this.cargarComentariosExistentes();
            this.limpiarObjetoComentario();
          }
        });
      } 
      else 
      {
        axios.post('http://localhost:8642/api/UsuariosCapitulos/Post', this.comentario).then(response => {
          swal('¡Comentario realizado!', '', 'success');
          this.cargarComentariosExistentes();
          this.limpiarObjetoComentario();
        });
      }

      this.mostrarInputVariable = false; 
    },
    Editar(capituloAEditar){
      this.limpiarObjetoComentario();
      this.mostrarInputVariable = true;

      for(var i = 0; i < this.comentarios.length ; i++){
        if(this.comentarios[i].usuarioCapituloId == capituloAEditar)
        {
          this.comentario.Editado = 'Editado';
          this.comentario.UsuarioCapituloId = capituloAEditar;
          this.comentario.Comentario = this.comentarios[i].comentario;
          this.comentario.Comentador = this.comentarios[i].comentador;
          this.comentario.UsuarioId  = this.comentarios[i].usuarioId;
          this.comentario.CapituloID = this.comentarios[i].capituloID;
        }
      }
    },
    Eliminar(capituloAEliminar){
      axios.delete('http://localhost:8642/api/UsuariosCapitulos/Delete/'+ capituloAEliminar).then(response => {
        if(response.data){
          swal('Comentario eliminado', '', 'success');
          this.cargarComentariosExistentes();
        }
      });
    },
    mostrarOpcionesDeEdicion(idUsuario){
      if(idUsuario == this.$session.get('id'))
      {
        return true;
      }
    },
    obtenerCapitulos(){
      axios.get('http://localhost:8642/api/capitulos/GetCaps/'+this.serie).then(response => {
        this.capitulos = response.data;

        if(this.capitulos[0].capituloID == this.capitulo){
          this.botonAtras = false;
        } else {
          this.botonAtras = true;
        }

        if(this.capitulos[this.capitulos.length - 1].capituloID == this.capitulo){
          this.botonAdelante = false;
        } else {
          this.botonAdelante = true;
        }

        //Cargar video actual:
        for(var i = 0 ; i < this.capitulos.length ; i++){
          if(this.capitulos[i].capituloID == this.capitulo){
            this.direccionDelVideo = this.capitulos[i].direccionDelCapitulo;
            this.tituloDelVideo = this.capitulos[i].nombreDelCapitulo;
          }
        }
      });
    },
    volverCxS(){
      this.$router.push('/CapitulosPorSerie/' + this.serie);
    }
  }
}
</script>

<style>
  .comentariosTitulo{
    margin-top: -10px !important;
    width: 450px;
    font-size: 50px !important;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
    text-shadow: 1px 1px 1px black;
    color: white;
    background-color: black;
    opacity: 0.5;
    border-bottom: 1px solid white;
    border-right: 1px solid white;
    height: 65px !important;
  }

  .tituloCapituloEnCurso{
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
  }

  .tituloCapituloEnCurso:hover{
    cursor: pointer;
  }

  .alturaVideo{
    margin-top: -80px !important;
  }

  .botonIzquierda{
    z-index: 100;
    top: 200px !important;
    left: -540px;
  }

  .botonDerecha{
    z-index: 100;
    top: 200px !important;
    left: 540px;
  }

  .tamanioBotones{
    height: 100px;
    width: 100px;
  }

  .iconoReproductorVideo{
    margin-top: 25px !important;
    margin-left: -30px !important;
    font-size: 100px !important;
    opacity: 0.9;
    color: teal;
  }
  
  .iconoReproductorVideo:hover{
    color:white;
  }

  .botonDesplegarComentario{
    float: right;
    margin-top: 10px;
    margin-bottom: 10px !important;
  }

  .botonComentar{
    margin-top:-10px!important;
    margin-bottom: 20px !important;
    float: right;
    background-color: black !important;
    font-size: 15px !important;
    text-shadow: 1px 1px 1px black;
    border-top: white solid 1px;
    border-bottom: white solid 1px;
    border-radius: 50px 50px 50px 50px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
  }

  
  .botonComentar:hover{
    background-color: white !important;  
    text-shadow: 1px 1px 1px black;
    color: black !important;
    border-top: black solid 1px;
    border-bottom:black solid 1px;
  }
  
  .inputComentar{
    margin-top: 30px !important;
  }

  .cartaComentario{
    opacity: 0.8;
    margin-top: 20px !important;
  }

  .Cabecera{
    margin-top: -15px !important;
    font-size: 25px !important;
    float: left;
    color: white;
    text-shadow: 1px 1px 1px black;
  }

  .colorfooterComentario{
    background-color: teal !important;
    margin-top: -15px !important;
    opacity: 0.8;
  }

  .contenidoComentario{
    padding: 20px!important;
    text-align: justify;
    color: white;
  }

  .EditoresComentario{
    margin-top: -10px!important;
    float: right;
    color: white;
    cursor: pointer;
  }

  .editarComentario:hover{
    color: teal;
  }

  .eliminarComentario:hover{
    color: red;
  }

  .estaEditado{
    text-shadow: 1px 1px 1px black;
    margin-top: 10px !important;
    float: right;
    color: white;
  }

  .comentarioTextarea{
    color: white;
    font-size: 20px !important;
  }

  .labelTextarea{
    color:white;
    font-size: 20px!important;
  }

  .iconoTextarea{
    color:white;
  }
</style>

