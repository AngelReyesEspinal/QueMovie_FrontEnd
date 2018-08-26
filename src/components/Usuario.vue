<template>
    <main>
        <div class="container animated fadeInDown">

            <div class="rectanguloArriba">
            </div>
                
            <!-- About me -->
            <div class="col s12 m7">
                <div class="card horizontal black unflowcito">
                    <div class="card-image">
                        <img v-if="usuario.Sexo == 'Masculino'" src="~@/assets/imagenes/UsuarioMasculino.png" height="200px"  class=" animated infinite pulse">
                        <img v-else src="~@/assets/imagenes/UsuarioFemenino.png" height="200px"  class=" animated infinite pulse">
                    </div>
                    <div class="card-stacked">
                        <div class="card-content usuario">
                            <div class="contenidoUsuario">
                                <span class="tituloContenidoUsuario">  Nombre: </span>
                                <span class="contenidoDelUsuario">{{usuario.Nombre}} {{usuario.Apellido}}</span>
                                <br>
                                <br>
                                <span class="tituloContenidoUsuario">  Usuario: </span>
                                <span class="contenidoDelUsuario usuarioLeft">{{usuario.NombreCuenta}}</span>
                                <br>
                                <br>
                                <span class="tituloContenidoUsuario">  Correo: </span>
                                <span class="contenidoDelUsuario correoLeft">{{usuario.Correo}}</span>
                            </div>
                        </div>
                        <div class="card-action">
                            <a href="#" class="logout" @click="cerrarSesion()"> Cerrar Sesión </a>
                        </div>
                    </div>
                </div>
            </div>
                        
            <!-- Configuraciones -->
            <ul class="collapsible popout" data-collapsible="accordion">
                <li>
                    <div class="collapsible-header" @click="cambiarIcono()"><i class="material-icons set">{{icono}}</i>Configuración</div>
                    <div class="collapsible-body">
                        <div class="row">
                            <form>
                                <div class="input-field col s6">
                                    <i class="material-icons prefix inputsUsuario">verified_user</i>
                                    <input id="first_name" type="text" class="validate inputsUsuario" v-model="usuario.Nombre">
                                    <label for="first_name" class="active tituloContenidoConfiguracion">Nombre:</label>
                                </div>

                                <div class="input-field col s6">
                                    <i class="material-icons prefix inputsUsuario">verified_user</i>
                                    <input id="last_name" type="text" class="validate inputsUsuario" v-model="usuario.Apellido">
                                    <label for="last_name" class="active tituloContenidoConfiguracion">Apellidos:</label>
                                </div>

                                <div class="input-field col s6">
                                    <i class="material-icons prefix inputsUsuario">verified_user</i>
                                    <input id="name" type="text" class="validate inputsUsuario" v-model="usuario.NombreCuenta">
                                    <label for="name" class="active tituloContenidoConfiguracion">Usuario:</label>
                                </div>

                                <div class="input-field col s6">
                                    <i class="material-icons prefix inputsUsuario">verified_user</i>
                                    <input id="correo" type="text" class="validate inputsUsuario" v-model="usuario.Correo">
                                    <label for="correo" class="active tituloContenidoConfiguracion">Correo Eletrónico:</label>
                                </div>
                                
                                <div class="input-field col s6">
                                    <i class="material-icons prefix cambioPassUsuario inputsUsuario" @click="editarConstrasenia()">verified_user</i>
                                    <input id="password" :type="contra" class="validate inputsUsuario" v-model="usuario.Contrasenia" readonly>
                                    <label for="password" class="active tituloContenidoConfiguracion">Contraseña:</label>
                                </div>

                                <div class="input-field col s6">
                                    <select class="inputsUsuario" id="my-select">
                                        <template v-if="this.$session.get('genero') == 'Femenino'">
                                            <option value="Femenino">Femenino</option>
                                            <option value="Masculino">Masculino</option>
                                        </template>
                                        <template v-else>
                                            <option value="Masculino">Masculino</option>
                                            <option value="Femenino">Femenino</option>
                                        </template>
                                    </select>
                                    <label class="tituloContenidoConfiguracion">Género:</label>
                                </div>

                                <div class="input-field col s12">
                                    <button class="btn waves-effect waves-light botonUsuario" type="submit" @click="enviarUsuarioModificado()"> 
                                        Guardar cambios
                                    </button>
                                </div>
                                
                            </form>
                        </div>
                    </div>
                </li>

                <!-- Series Favoritas -->
                <li>
                    <div class="collapsible-header"><i class="material-icons get">star</i>Series favoritas</div>
                    <div class="collapsible-body" data-collapsible="expandable">
                        <ol id="lista3" class="abajo">
                            <li v-for="serie in favoritas" :key="serie.serieId">
                                <router-link :to="{name:'SerieDetalle', params:{ id:serie.serieId }}">
                                    {{ serie.titulo }}
                                </router-link>
                            </li>
                        </ol>
                    </div>
                </li>
            </ul>
            
            <div class="rectanguloAbajo">
            </div>

        </div>
    </main>
</template>

<script>
import axios from 'axios'
var genero= "";

export default {
    mounted(){    
        $(document).ready(function(){
            $('.collapsible').collapsible();
        });     
        
        $('select').material_select(); 

        $(document).ready(function() {
            $("#my-select").change(function() {
                genero = $(this).val(); 
            });
        });

        this.cargarObjetoUsuario();
        this.cargarFavoritas();
    },
    name: 'Usuario',
    data(){
        return{
            icono:'settings',
            cambio: false,
            contra: 'password',
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
            favoritas:[],
            arrayClean: [],
        }
    },
    methods: {
        cambiarIcono(){
            this.cambio = !this.cambio;
            if(this.cambio){
                this.icono = 'beenhere';
            }else{
                this.icono = 'settings';
            }
        },
        editarConstrasenia(){
            swal({
                title: '¿Recuerdas la respuesta a tu pregunta de seguridad?',
                buttons: {
                    cancel: "No, no la tengo.",
                    catch: {
                    text: "Sí, la recuerdo!",
                    value: "catch",
                    },
                },
            })
            .then((value) => {
            switch (value) {
                case "catch":
                    swal({
                        title: "Escribe la respuesta a tu pregunta de seguridad:",
                        content: "input",
                    })
                    .then((value) => {
                        if(value == this.usuario.PreguntaDeSeguridad){
                            swal('Muy bien', '', 'success');
                            this.$router.push('/CambioDeContrasenia')
                        } else {
                            swal('No es la respuesta', '', 'warning');
                        }
                    });
                break;

                default:
                    swal('Por seguridad', 'Para asegurarnos de que eres ' + this.$session.get('nombre') + ' por favor coloca el código que se te propicio mientras te registrabas, con este podremos recordarte tu respuesta a la pregunta de seguridad', 'warning');
                    this.$router.push('/QrReader');
            }
            });
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
            this.usuario.PreguntaDeSeguridad = this.$session.get('preguntaDeSeguridad');
        },
        enviarUsuarioModificado(){

            event.preventDefault(); //Evito el refresh
            if(genero == ''){
                this.usuario.Sexo = this.usuario.Sexo;
            }else{
               this.usuario.Sexo = genero;
            }
            axios.put('http://localhost:8642/api/Usuarios/Put', this.usuario).then(response => {
                if(response.data == true){

                    //Renovar La Sesion
                    axios.get('http://localhost:8642/api/Usuarios/Get/'+this.usuario.UsuarioId).then(response => {
                        
                        // Relleno la sesion
                        this.$session.clear();
                        this.$session.set('id', response.data.usuarioId)
                        this.$session.set('nombre', response.data.nombre)
                        this.$session.set('apellido', response.data.apellido)
                        this.$session.set('nombreCuenta', response.data.nombreCuenta)
                        this.$session.set('contrasenia', response.data.contrasenia)
                        this.$session.set('correo', response.data.correo)
                        this.$session.set('genero', response.data.sexo)
                        this.$session.set('tipo', response.data.tipo)
                        this.$session.set('preguntaDeSeguridad', response.data.preguntaDeSeguridad)

                        //Informando al padre por si se cambio el genero:
                        this.$emit('TalvezCambioElGenero');
                        
                        //Actualiando objeto Usuario:
                        this.cargarObjetoUsuario();
                    });

                    swal("Muy bien!", "Usuario modificado correctamente!", "success"); 
                }else{
                    swal("¡Ha ocurrido un inconveniente!", "No se ha podido modificar su usuario.", "error");
                }
            }); 
        },
        ObtenerNombres(){
            axios.post('http://localhost:8642/api/Series/ObtenerFavoritas', this.arrayClean).then(response => {
                this.favoritas = response.data;
            });
        },
        cargarFavoritas(){
            if(this.usuario.UsuarioId != undefined){
                axios.get('http://localhost:8642/api/UsuariosSeries/Get/'+this.usuario.UsuarioId).then(response => {
                    if(response.data){
                        this.favoritas = response.data;

                        this.arrayClean.length = this.favoritas.length;

                        for(var i = 0; i < this.favoritas.length ; i++){
                            this.arrayClean[i] = this.favoritas[i].serieId;
                        }

                        this.ObtenerNombres();
                    }
                });
            }
        },
        cerrarSesion(){
            this.$emit('ResetaElGeneroUsuario');
            this.$session.destroy()
            this.$router.push('/')
        },
    },
}
</script>

<style>
    .rectanguloArriba{
        margin-top: 15px !important;
        background-color: teal;
        opacity: 0.8;
        border-radius:  90px  90px 0px 0px;
        border-top: 1px solid white;
        height: 20px !important;
    }

    .rectanguloAbajo{
        margin-top: 15px !important;
        background-color: teal;
        opacity: 0.8;
        border-radius:  0px 0px 90px  90px;
        border-bottom: 1px solid white;
        height: 20px !important;
        margin-bottom: 15px !important;
    }

    .collapsible-header{
        background-color: black !important;
        opacity: 0.8;
        color: white;
        font-size: 20px !important;
    }

    .collapsible-body{
        background-color: teal !important;
        opacity: 0.8;
    }

    .unflowcito{
        opacity: 0.8;
        border-radius: 100px 0px 0px 100px;
        margin-top: 20px !important;
    }
    
    .logout{
        color: teal !important;
        float: right;
    }

    .logout:hover{
        color: red !important;
    }

    .usuario{
        padding-bottom: 0px !important;
    }

    .contenidoUsuario{
        margin-top: -10px !important;
    }

    .tituloContenidoUsuario{
        color: teal;
        float: left;
        font-size: 20px !important;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-weight: bold; 
    }

    .tituloContenidoConfiguracion{
        font-size: 20px !important;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-weight: bold;
        color: white !important; 
    }

    .contenidoDelUsuario{
        margin-left: 15px !important;
        float: left;
        font-size: 20px !important;
        color: white;    
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-weight: normal;
    }

    .usuarioLeft{
        margin-left: 20px !important;
    }

    .correoLeft{
        margin-left: 27px !important;        
    }

    .moverContenido{
        margin-top: -10px !important;
        margin-bottom: -25px !important;
    }

    .set{
        color: teal;
    }

    .get{
        color: yellow;
    }

    .seriesFavoritas{
        bottom: 10px !important;
        font-size: 25px !important;
        color: white;
        text-shadow: 1px 1px 1px black;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-weight: normal;
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

    .abajo{
        margin-bottom:  -10px !important;
    }

    .inputsUsuario{
        color: white !important;
    }

    .botonUsuario{
        background-color: black !important;
        font-size: 25px !important;
        text-shadow: 1px 1px 1px white;
        height: 50px !important ;
        width: 100%;
        border: white solid 1px;
    }

    .botonUsuario:hover{
        background-color: white !important; /* Cambiar cuando llegue la luz */
        color: teal;
        text-shadow: 1px 1px 1px teal;
        border: teal solid 1px;
    }

    .cambioPassUsuario:hover{
        cursor: pointer;
    }
</style>


