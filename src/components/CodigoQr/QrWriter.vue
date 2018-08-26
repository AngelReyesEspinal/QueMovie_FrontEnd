<template>
  <main>
      <div class="container animated fadeInDown">
            <div class="col s12">
                <div class="card-panel teal cartaListaUsuarioQRWriter">
                    <i class="material-icons tamanioIconoEditarUsuariosQRWriter">verified_user</i>
                    <br>
                    <span class="card-title tituloListaDeUsuarioQRWriter">PREGUNTA DE SEGURIDAD</span>
                </div>
                <div class="card-reveal colorfooterQRWriter"></div>
            </div>

            <div class="col s12">
                <div class="card-panel teal cartaListaUsuarioQRWriter">
                    <div class="text-center">
                        <img src="https://chart.googleapis.com/chart?cht=qr&chl=Hello+World&chs=160x160&chld=L|0" class="qr-code img-thumbnail img-responsive" download>
                    </div>

                    <p class="PreguntaDeSeguridad">{{PreguntaGenerada}}</p>
                    <div class="input-field col s6">
                        <i class="material-icons prefix lockQrW">lock_outline</i>
                        <input id="content" type="text" class="validate lblRespuestaQr" v-model="contenido" v-on:keyup="crearCodigo()">
                        <label for="content" class="lblRespuestaQr">Respuesta:</label>
                    </div>

                    <button class="btn waves-effect waves-light botonQrW" type="submit" @click="enviarUsuarioModificado()"> 
                        <i class="material-icons siz">check</i>
                    </button>
                </div>

                <ul class="collapsible subirCollaps">
                    <li>
                        <div class="collapsible-header headerQrWriter"><i class="material-icons">cloud_download</i>¿Cómo descargar mi código?</div>
                        <div class="collapsible-body">
                            <ol id="lista3" class="abajo">
                                <li>
                                    <span class="negro">Dar click derecho al código.</span>
                                </li>
                                <li>
                                    <span class="negro">Guardar imagen como...</span>
                                </li>
                                <li>
                                    <span class="negro">Guardar el código en un lugar seguro.</span>
                                </li>
                            </ol>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
  </main>
</template>

<script>
import axios from 'axios'
function htmlEncode (value)
{
    return $('<div/>').text(value).html();
}

export default {
    mounted(){
        swal('¡Casi terminamos ' + this.$session.get('nombre') + '!', '', 'success');
         $(document).ready(function(){
            $('.collapsible').collapsible();
        });
        this.GenerarPreguntaRandom();
        this.cargarObjetoUsuario();
    },
    name: 'QrWriter',
    data(){
        return{
            contenido:'',
            idPregunta:0,
            PreguntaGenerada: '',
            preguntasDeSeguridad:
            [
                {
                    idPregunta: 1,
                    pregunta: '¿Cúal fue el nombre de tu primera mascota?'
                },
                {
                    idPregunta: 2,
                    pregunta: '¿Cómo se llama tu abuela?'
                },
                {
                    idPregunta: 3,
                    pregunta: '¿Cúal es tu canción favorita?'
                },
                {
                    idPregunta: 4,
                    pregunta: '¿Cúal es tu deporte favorito?'
                },
                {
                    idPregunta: 5,
                    pregunta: '¿Cúal es tu equipo deportivo favorito?'
                },
                {
                    idPregunta: 6,
                    pregunta: '¿Cúal es tu marca de ropa preferida?'
                },
                {
                    idPregunta: 7,
                    pregunta: '¿Cúal es tu comida favorita?'
                }
            ],
            usuario: {
                UsuarioId: 0,
                Nombre: '',
                Apellido: '',
                NombreCuenta: '',
                Contrasenia: '',
                Correo: '',
                Sexo:'',
                Tipo: '',
                PreguntaDeSeguridad: '',
            },
        }
    },
    methods:{
        crearCodigo(){
            $(".qr-code").attr("src", "https://chart.googleapis.com/chart?cht=qr&chl=" + htmlEncode($("#content").val()) + "&chs=160x160&chld=L|0");
        },
        GenerarPreguntaRandom(){
            this.idPregunta = Math.floor(Math.random() * (7 - 1)) + 1;
            for(var i = 0; i < this.preguntasDeSeguridad.length ; i++)
            {
                if(this.idPregunta == this.preguntasDeSeguridad[i].idPregunta){
                    this.PreguntaGenerada = this.preguntasDeSeguridad[i].pregunta
                }
            }
        },
        cargarObjetoUsuario(){
            this.usuario.UsuarioId = this.$session.get('id');
            this.usuario.Nombre = this.$session.get('nombre');
            this.usuario.Apellido = this.$session.get('apellido');
            this.usuario.NombreCuenta = this.$session.get('nombreCuenta');
            this.usuario.Contrasenia = this.$session.get('contrasenia');
            this.usuario.Correo = this.$session.get('correo');
            this.usuario.Sexo = this.$session.get('genero');
            this.usuario.Tipo = this.$session.get('tipo');
        },
        enviarUsuarioModificado(){
            event.preventDefault(); 
            this.usuario.PreguntaDeSeguridad = this.contenido; //Se asigna el nuevo valor

            if(this.usuario.PreguntaDeSeguridad != ''){
                swal({
                    title: '¿Descargaste tu código de seguridad?',
                    buttons: {
                        cancel: "No, no lo he descargado.",
                        catch: {
                        text: "Sí, lo descargue!",
                        value: "catch",
                        },
                    },
                })
                .then((value) => {
                switch (value) 
                {
                    case "catch":
                        axios.put('http://localhost:8642/api/Usuarios/Put', this.usuario).then(response => {
                            if(response.data == true){
                                this.$session.set('preguntaDeSeguridad', this.usuario.PreguntaDeSeguridad)
                                swal("Bienvenido " + this.usuario.Nombre, "", "success");
                                this.$router.push('/');
                            }
                        }); 
                        
                    break;

                    default:
                        swal('Asegurate de descargarlo', '', 'warning');
                }
                });
            } else {
                swal('¡No ha respondido la pregunta!', '', 'warning');
            }
        },
    }
}
</script>

<style>
    .qr-code {
        align-content: center;
        width: 450px;
        margin-top:20px;
        border-radius: 40px 40px 40px 40px;
    }

    .collapsible-body{
        background-color: teal !important;
        opacity: 0.8;
    }

    .cartaListaUsuarioQRWriter{
        opacity: 0.8;
        margin-top: 15px !important;
    }

    .tamanioIconoEditarUsuariosQRWriter{
        font-size: 80px !important;
        color: white;    
    }

    .tituloListaDeUsuarioQRWriter{
        font-size: 30px !important;
        color: white;
        text-shadow: 2px 2px 7px black;
    }

    .colorfooterQRWriter{
        height: 20px !important;
        background-color: black !important;
        margin-top: -15px !important;
        opacity: 0.8;
    }

    .subirCollaps{
        margin-top: -14px !important;
        border: none !important;
    }

    .headerQrWriter{
        background-color: black !important;
        opacity: 0.8;
        color: white;
        font-size: 20px !important;
        border: none !important;
    }

    .lblRespuestaQr{
        color: white !important;
        font-size: 20px!important;
        text-shadow: 1px 1px 1px black;
    }

    .lockQrW{
        color: white;
        margin-top: 10px !important;
    }

    .PreguntaDeSeguridad{
        color: white;
        font-size: 20px!important;
        text-shadow: 1px 1px 1px black;
    }

    /* Lista */

    #lista3 {
        counter-reset: li; 
        list-style: none; 
        *list-style: decimal; 
        font: 15px 'trebuchet MS', 'lucida sans';
        padding: 0;
        margin-bottom: 4em;
        text-shadow: 0 1px 0 rgba(255,255,255,.5);
    }

    #lista3 ol {
        margin: 0 0 0 2em; 
    }

    #lista3 li{
        position: relative;
        display: block;
        padding: .4em .4em .4em .8em;
        *padding: .4em;
        margin: .5em 0 .5em 2.5em;
        background: #ddd;
        color: white;
        text-decoration: none;
        transition: all .3s ease-out;   
    }

    #lista3 li:hover{
        background: #eee;
    }   

    #lista3 li:before{
        content: counter(li);
        counter-increment: li;
        position: absolute; 
        left: -2.5em;
        top: 50%;
        margin-top: -1em;
        background: black;
        height: 2em;
        width: 2em;
        line-height: 2em;
        text-align: center;
        font-weight: bold;
    }

    #lista3 li:after{
        position: absolute; 
        content: '';
        border: .5em solid transparent;
        left: -1em;
        top: 50%;
        margin-top: -.5em;
        transition: all .3s ease-out;               
    }

    #lista3 li:hover:after{
        left: -.5em;
        border-left-color: black;             
    }

    .negro{
        color: black !important;
    }

    .botonQrW{
    background-color: black !important;
    font-size: 25px !important;
    text-shadow: 1px 1px 1px black;
    height: 50px !important ;
    width: 100%;
    border-top: white solid 1px;
    border-bottom: white solid 1px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
  }

  .botonQrW:hover{
    background-color: white !important; /* Cambiar cuando llegue la luz */
    text-shadow: 1px 1px 1px black;
    color: black !important;
    border-top: black solid 1px;
    border-bottom:black solid 2px;
  }

    .siz{
        font-size: 30px!important;
    }
</style>
