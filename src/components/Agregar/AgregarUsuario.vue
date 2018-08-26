<template>
    <main>
        <!-- <particlesJSRegister class="animated fadeInDown"/> -->
        <form class="col s12">
            <div class="row">
                <div class="col s12 animated fadeInDown">
                    <div class="card black z-depth-5 .center-align rx">
                        <div class="card-content white-text">
                            <span class="card-title tituloRegistro "> ¡Bienvenidos! </span>
                            <div class="row">
                                <div class="input-field col s6">
                                    <input id="nombre" type="text" class="validate" v-model="usuario.Nombre" required>
                                    <label for="nombre" class="letras">Nombres:</label>
                                </div>
                    
                                <div class="input-field col s6">
                                    <input id="apellido" type="text" class="validate" v-model="usuario.Apellido" required>
                                    <label for="apellido" class="letras">Apellidos:</label>
                                </div>

                                <div class="input-field col s12">
                                    <input id="usuario" type="text" class="validate" v-model="usuario.NombreCuenta" required>
                                    <label for="usuario" class="letras"> Usuario: </label>
                                </div>

                                <div class="input-field col s12">
                                    <input id="email" type="email" class="validate" v-model="usuario.Correo" required>
                                    <label for="email" class="letras">Correo Electrónico:</label>
                                </div>
                    
                                <div class="input-field col s6">
                                    <input id="contrasenia"  type="password" class="validate" v-model="usuario.Contrasenia" required>
                                    <label for="contrasenia" class="letras">Contraseña:</label>
                                </div>

                                <div class="input-field col s6">
                                    <input id="repetirContrasenia" type="password" class="validate" v-model="repetirContrasenia" required>
                                    <label for="repetirContrasenia" class="letras">Repetir Contraseña:</label>
                                </div>

                                <div class="espacio">
                                    <input name="group1" type="radio" id="Masculino" value="Masculino" v-model="usuario.Sexo" required/>
                                    <label for="Masculino" class="letras radios">Masculino</label>

                                    <input name="group1" type="radio" id="Femenino" value="Femenino"  v-model="usuario.Sexo" required/>
                                    <label for="Femenino" class="letras radios">Femenino</label>
                                </div>
                                <button class="btn boton waves-effect waves-light" type="submit" v-on:click="registrarse">
                                    Enviar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>

        <div id="loaderUsuarios">
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
import particlesJSRegister from '@/components/Particles/particlesJSRegister'

export default {
    name: 'AgregarUsuario',
    data(){
        return {
            usuario: {
                Nombre: '',
                Apellido: '',
                NombreCuenta: '',
                Contrasenia: '',
                Correo: '',
                Sexo:'',
                Tipo: 'cliente',
                PreguntaDeSeguridad: ''
            },
            repetirContrasenia: ''
        }
    },
    methods:{
        validarContrasena(){
            if(this.usuario.Sexo != ''){
                if(this.repetirContrasenia != this.usuario.Contrasenia){
                    swal("¡Las contraseñas son distintas!", "Por favor intentelo nuevamente", "warning");
                    event.preventDefault();
                    return false;
                } else {
                    return true;
                }
            }else {
                return false;
            }
        },
        limpiarInputs(){
            this.usuario.Nombre = '';
            this.usuario.Apellido = '';
            this.usuario.NombreCuenta = '';
            this.usuario.Contrasenia = '';
            this.usuario.Correo = '';
            this.usuario.Sexo = '';
            this.repetirContrasenia = '';
        },
        registrarse(){
            if(this.validarContrasena()){
                event.preventDefault();
                axios.post('http://localhost:8642/api/Usuarios/Post', this.usuario ,$('#loaderUsuarios').fadeIn("slow")).then(response => {
                    
                    if(response.data == true){
                        
                        axios.post('http://localhost:8642/api/Usuarios/IniciarSesion', this.usuario).then(response => {
                            console.log(response.data);
                        if(response.data.usuarioId != 0){

                            // Sesion
                            this.$session.start()
                            this.$session.set('id', response.data.usuarioId)
                            this.$session.set('nombre', response.data.nombre)
                            this.$session.set('apellido', response.data.apellido)
                            this.$session.set('nombreCuenta', response.data.nombreCuenta)
                            this.$session.set('contrasenia', response.data.contrasenia)
                            this.$session.set('correo', response.data.correo)
                            this.$session.set('genero', response.data.sexo)
                            this.$session.set('tipo', response.data.tipo)
                            this.$session.set('preguntaDeSeguridad', response.data.preguntaDeSeguridad)

                            this.$emit('PrendeElGeneroUsuario');
                            this.limpiarInputs();
                            $('#loaderUsuarios').fadeOut("slow");
                            this.$router.push('/QrWriter');
                            
                        }else{
                            swal("¡Ha ocurrido un inconveniente!", "No se ha podido agregar su usuario.", "error");
                        }
                        });

                    }else{
                        swal("¡Ha ocurrido un inconveniente!", "No se ha podido agregar su usuario.", "error");
                    }
                }); 
            }
        }
    },
    components:{
    particlesJSRegister 
  }
}
</script>

<style>
    #loaderUsuarios{
        margin-top: -300px !important;
        margin-left: 650px !important;
        position: absolute;
        z-index: 100;
        display: none;
    }
    
    .tituloRegistro{
        color: teal;
        font-size: 65px !important;
        text-shadow: 1px 1px 1px white;
    }

    .letras{
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 20px !important;
    }

    .radios{
        color:white !important;
    }

    .boton{
        margin-top: 20px;
        width: 100%;
    }

    .rx{
        margin-top: 40px !important;
        opacity: 0.8;
    }
</style>
