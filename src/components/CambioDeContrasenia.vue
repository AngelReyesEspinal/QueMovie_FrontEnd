<template>
    <main>
        <div class="tituloSeriesCapitulosPorSerie">
            <h1>Cambio de contraseña</h1>    
        </div>
        <div class="row margenTop">
        <form class="col s12">
            <div class="row">
                <div class="input-field col s6">
                    <i class="material-icons prefix iconoCdC" @click="verVieja()">remove_red_eye</i>
                    <input id="icon_prefix" :type="contraViejaType" class="validate contenido" v-model="usuario.Contrasenia">
                    <label for="icon_prefix" class="active lblCdC">Antigua contraseña:</label>
                </div>
                <div class="input-field col s6">
                    <i class="material-icons prefix iconoCdC" @click="verNueva()">remove_red_eye</i>
                    <input id="icon_telephone" :type="contraNuevaType" class="validate contenido" v-model="nuevaContrasenia">
                    <label for="icon_telephone" class="lblCdC">Nueva contraseña:</label>
                </div>
            </div>
        </form>

        <button class="btn waves-effect waves-light botonEnviarCdC" type="submit" @click="enviar()"> 
            Cambiar contraseña
        </button>
    </div>

    </main>
</template>

<script>
import axios from 'axios'

export default {
    mounted(){
        this.cargarUsuario();
    },
    name: 'CambioDeContrasenia',
    data(){
        return{
            contraViejaType:'password',
            contraNuevaType:'password',
            contraseniaViejaOjo: false,
            contraseniaNuevaOjo: false,
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
            nuevaContrasenia:'',
        }
    },
    methods:{
        cargarUsuario(){
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
        enviar(){
            event.preventDefault(); 
            if( this.nuevaContrasenia != ''){
                
                //new password
                this.usuario.Contrasenia = this.nuevaContrasenia; 

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
                            
                            //Actualiando objeto Usuario:
                            this.cargarUsuario();
                            swal("Muy bien!", "Contraseña modificada correctamente!", "success"); 
                            this.$router.push('/Usuario')
                        });
                    }else{
                        swal("¡Ha ocurrido un inconveniente!", "No se ha podido modificar su contraseña.", "error");
                    }
                }); 
            } else {
                swal('¡No ha ingresado la nueva contraseña!', '', 'warning');
            }
        },
        verVieja(){
            this.contraseniaViejaOjo = !this.contraseniaViejaOjo;
            
            if(this.contraseniaViejaOjo){
                this.contraViejaType = 'text'
            } else {
                this.contraViejaType = 'password'
            }
        },
        verNueva(){
            this.contraseniaNuevaOjo = !this.contraseniaNuevaOjo;
            
            if(this.contraseniaNuevaOjo){
                this.contraNuevaType = 'text'
            } else {
                this.contraNuevaType = 'password'
            }
        }
    }
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

    .iconoCdC{
        color: white;
        margin-top: 10px;
    }

    .iconoCdC:hover{
        cursor: pointer;
        color: green;
    }

    .margenTop{
        margin-top: 130px;
    }

    .lblCdC{
        font-size: 20px !important;
        font-weight: bold;
    }

    .contenido{
        color: white;
        font-size: 18px !important;
    }

    .botonEnviarCdC{
        margin-top: 40px;
        background-color: black !important;
        font-size: 30px !important;
        text-shadow: 1px 1px 1px black;
        border-top: white solid 1px;
        width: 50%;
        height: 60px;
        border-bottom: white solid 1px;
        border-radius: 50px 50px 50px 50px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
    }

    .botonEnviarCdC:hover{
        background-color: white !important; 
        text-shadow: 1px 1px 1px black;
        color: black !important;
        border-top: black solid 1px;
        border-bottom:black solid 2px;
    }
</style>

