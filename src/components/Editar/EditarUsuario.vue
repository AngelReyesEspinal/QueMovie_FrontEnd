<template>
    <main>
        <div class="container animated fadeInDown">
            <div class="row">
            
                <div class="col s6">
                    <div class="card-panel teal cartaListaUsuario">
                        <i class="material-icons tamanioIconoEditarUsuarios">account_circle</i>
                        <br>
                        <span class="card-title tituloListaDeUsuario">USUARIOS REGISTRADOS</span>
                        
                        <ol id="lista4">
                            <li v-for="usuario in todosLosUsuarios" :key="usuario.usuarioId" @click="seleccionarUsuario(usuario.usuarioId)"> 
                                <span class="nombreUsuarioEditarUsuario">
                                    {{usuario.nombre}} {{ usuario.apellido}}
                                </span>
                            </li> 
                        </ol>
                    </div>
                    <div class="card-reveal colorfooter"></div>
                </div>
                
                <div class="col s6">
                    <div class="card-panel black cartaListaUsuarioEdicion">
                        <i class="material-icons tamanioIconoEditarUsuarios">settings</i>
                        <br>
                        
                        <form>
                            <div class="input-field col s6">
                                <input id="first_name" type="text" class="validate contenidoDelUsuarioE" v-model="usuario.Nombre">
                                <label for="first_name" class="active tituloContenidoConfiguracion">Nombre:</label>
                            </div>

                            <div class="input-field col s6">
                                <input id="last_name" type="text" class="validate contenidoDelUsuarioE" v-model="usuario.Apellido">
                                <label for="last_name" class="active tituloContenidoConfiguracion">Apellidos:</label>
                            </div>

                            <div class="input-field col s12">
                                <input id="name" type="text" class="validate contenidoDelUsuarioE" v-model="usuario.NombreCuenta">
                                <label for="name" class="active tituloContenidoConfiguracion">Usuario:</label>
                            </div>

                            <div class="input-field col s12">
                                <input id="correo" type="email" class="validate contenidoDelUsuarioE" v-model="usuario.Correo">
                                <label for="correo" class="active tituloContenidoConfiguracion">Correo Eletrónico:</label>
                            </div>

                            <div class="input-field col s12">
                                <input id="preguntaDeSeguridad" type="text" class="validate contenidoDelUsuarioE" v-model="usuario.PreguntaDeSeguridad">
                                <label for="preguntaDeSeguridad" class="active tituloContenidoConfiguracion">Pregunta de seguridad:</label>
                            </div>
                            
                            <i class="material-icons prefix verContraIconoEditarUsuario col s1" @click="verConstrasenia()">remove_red_eye</i>
                            <div class="input-field col s11">
                                <input id="password" :type="type" class="validate contenidoDelUsuarioE" v-model="usuario.Contrasenia">
                                <label for="password" class="active tituloContenidoConfiguracion">Contraseña:</label>
                            </div>

                            <p class="letras radios">Género:</p>
                            <div class="espacioEU">
                                <input name="group1" type="radio" id="Masculino" value="Masculino" v-model="usuario.Sexo" required/>
                                <label for="Masculino" class="letras radios">Masculino</label>
                                <input name="group1" type="radio" id="Femenino" value="Femenino"  v-model="usuario.Sexo" required/>
                                <label for="Femenino" class="letras radios">Femenino</label>
                            </div>

                            <br>
                            <p class="letras radios">Tipo de cuenta:</p>
                            <div class="espacioEU">
                                <input name="group2" type="radio" id="administrador" value="administrador" v-model="usuario.Tipo" required/>
                                <label for="administrador" class="letras radios">Administrador</label>
                                <input name="group2" type="radio" id="cliente" value="cliente"  v-model="usuario.Tipo" required/>
                                <label for="cliente" class="letras radios">Cliente</label>
                            </div>
                            
                            <!-- Botones -->
                            <div class="input-field col s6">
                                <button class="btn waves-effect waves-light botonUsuarioEditar" type="submit" @click="enviarUsuarioModificado()"> 
                                    <i class="material-icons">check</i>
                                </button>
                            </div>
                            <div class="input-field col s6">
                                <button class="btn waves-effect waves-light botonUsuarioEditarCerrar" type="submit" @click="eliminarUsuario()"> 
                                    <i class="material-icons">clear</i>
                                </button>
                            </div>

                        </form>
                    </div>
                    <div class="card-reveal colorfooterEditar"></div>                    
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import axios from 'axios'

export default {
    mounted(){
        $('select').material_select(); 
        this.cargarListado();
    },
    name:'EditarUsuario',
    data(){
        return{
            usuario:{
                UsuarioId: 0,
                Nombre: '',
                Apellido: '',
                NombreCuenta: '',
                Contrasenia: '',
                Correo: '',
                Sexo:'',
                Tipo: '',
                PreguntaDeSeguridad: ''
            },
            todosLosUsuarios:[],
            type: 'password',
            controladorType: false,
        }
    },
    methods:{
        cargarListado(){
            axios.get('http://localhost:8642/api/Usuarios/Get').then(response => {
                if(response.data){
                    this.todosLosUsuarios = response.data;
                }
            });
        },
        seleccionarUsuario(id){
            for(var i = 0; i < this.todosLosUsuarios.length ; i++){
                if(id == this.todosLosUsuarios[i].usuarioId)
                { 
                    this.usuario.UsuarioId = this.todosLosUsuarios[i].usuarioId;
                    this.usuario.Nombre = this.todosLosUsuarios[i].nombre;
                    this.usuario.Apellido = this.todosLosUsuarios[i].apellido;
                    this.usuario.NombreCuenta = this.todosLosUsuarios[i].nombreCuenta;
                    this.usuario.Contrasenia = this.todosLosUsuarios[i].contrasenia;
                    this.usuario.Correo = this.todosLosUsuarios[i].correo;
                    this.usuario.Sexo = this.todosLosUsuarios[i].sexo;
                    this.usuario.Tipo = this.todosLosUsuarios[i].tipo;
                    this.usuario.PreguntaDeSeguridad = this.todosLosUsuarios[i].preguntaDeSeguridad;
                }
            }
        },
        enviarUsuarioModificado(){
            event.preventDefault(); 
            //Validacion
            axios.put('http://localhost:8642/api/Usuarios/Put', this.usuario).then(response => {
                if(response.data == true){
                    
                    //Actualiando listado:
                    this.cargarListado();

                    swal("Muy bien!", "Usuario modificado correctamente!", "success"); 
                }else{
                    swal("¡Ha ocurrido un inconveniente!", "No se ha podido modificar su usuario.", "error");
                }
            }); 
        },
        verConstrasenia(){
            this.controladorType = !this.controladorType;

            if(this.controladorType == true){
                this.type = 'text';
            } else {
                this.type = 'password';
            }
        },
        eliminarUsuario(){
            event.preventDefault();
            if(this.usuario.UsuarioId > 0){
                swal({
                    title: "¿Estás seguro?",
                    text: "El usuario se eliminará permanentemente.",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willDelete) => {
                if (willDelete) {
                    axios.delete('http://localhost:8642/api/Usuarios/Delete/'+ this.usuario.UsuarioId).then(response => {
                        if(response.data == true){
                            this.cargarListado();

                            //Limpiando objeto usuario
                            this.usuario.UsuarioId = 0;
                            this.usuario.Nombre = '';
                            this.usuario.Apellido = '';
                            this.usuario.NombreCuenta = '';
                            this.usuario.Contrasenia = '';
                            this.usuario.Correo = '';
                            this.usuario.Sexo = '';
                            this.usuario.Tipo = '';
                            this.usuario.PreguntaDeSeguridad = '';
                        }
                    });
                    swal("Usuario eliminado correctamente!", {
                    icon: "success",
                    });
                } else {
                    swal("No se elimino el usuario!");
                }
                });
            }
        },
    }
}
</script>

<style>
    .nombreUsuarioEditarUsuario{
        color:black !important;
    }

    .cartaListaUsuario{
        opacity: 0.8;
        margin-top: 15px !important;
    }

    .cartaListaUsuarioEdicion{
        opacity: 0.8;
        margin-top: 15px !important;
        height: 750px!important;
    }

    .tituloListaDeUsuario{
        font-size: 30px !important;
        color: white;
        text-shadow: 2px 2px 7px black;
    }

    .tamanioIconoEditarUsuarios{
        font-size: 80px !important;
        color: white;    
    }

    .tituloContenidoConfiguracion{
        font-size: 20px !important;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-weight: bold;
        color: white !important; 
    }

    .contenidoDelUsuarioE{
        float: left;
        font-size: 15px !important;
        color: white;    
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-weight: normal;
    }

    /* Lista */

    #lista4 {
        counter-reset: li; 
        list-style: none; 
        *list-style: decimal; 
        font: 15px 'trebuchet MS', 'lucida sans';
        padding: 0;
        margin-bottom: 0;
        text-shadow: 0 1px 0 rgba(255,255,255,.5);
    }

    #lista4 ol {
        margin: 0 0 0 2em; 
    }

    #lista4 li{
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

    #lista4 li:hover{
        background: #eee;
        cursor: pointer;
    }   

    #lista4 li:before{
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

    #lista4 li:after{
        position: absolute; 
        content: '';
        border: .5em solid transparent;
        left: -1em;
        top: 50%;
        margin-top: -.5em;
        transition: all .3s ease-out;               
    }

    #lista4 li:hover:after{
        left: -.5em;
        border-left-color: black;             
    }
    
    .colorfooter {
        height: 40px !important;
        background-color: black !important;
        margin-top: -15px !important;
        opacity: 0.8;
    }
    
    .colorfooterEditar{
        height: 40px !important;
        background-color: teal !important;
        margin-top: -15px !important;
        margin-bottom: 15px !important;
        opacity: 0.8;
    }

    .botonUsuarioEditar{
        background-color: black !important;
        font-size: 15px !important;
        width: 100%;
        text-shadow: 1px 1px 1px white;
        border: white solid 1px;
        border-radius: 5px 5px 5px 5px;
    }
    
    .botonUsuarioEditarCerrar{
        background-color: black !important;
        font-size: 15px !important;
        width: 100%;
        text-shadow: 1px 1px 1px white;
        border: white solid 1px;
        border-radius: 5px 5px 5px 5px;        
    }

    .botonUsuarioEditar:hover{
        background-color: white !important; /* Cambiar cuando llegue la luz */
        color: teal;
        text-shadow: 1px 1px 1px teal;
        border: teal solid 1px;
    }

    .botonUsuarioEditarCerrar:hover{
        background-color: red !important; /* Cambiar cuando llegue la luz */
        color: white;
        text-shadow: 1px 1px 1px black;
        border: black solid 1px;
    }

    .inputsUsuarioEditar{
        color: white !important;
    }

    .verContraIconoEditarUsuario{
        color: white !important;
        margin-top: 25px !important;
    }

    .verContraIconoEditarUsuario:hover{
        cursor: pointer;
        color: teal !important;
    }

    .inputsSelect{
        color: white !important;
    }

    .letras{
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 20px !important;
    }

    .radios{
        color:white !important;
    }

    .espacioEU{
        float:left;
    }

</style>


