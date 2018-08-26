<template>
  <main>
    <!-- <particlesJSLogin class="animated fadeInDown"/> -->
    <div class="col s12 m7 animated fadeInDown">
      
      <div class="card transparent horizontal alto">
        <div class="card-image">
          <img src="~@/assets/imagenes/blacklist.jpg" class="imagenLogin">
        </div>
        <div class="card-stacked cartaBackground">
          <div class="card-content">
            <div class="unPoquitoDeEspacio">
              <div class="input-field col s12">
                <i class="material-icons prefix modificacionIconoLoginPassword">account_circle</i>
                <input id="usuario" type="text" class="validate" v-model="Usuario.nombreCuenta" required>
                <label for="usuario" class="letrasLogin">Usuario:</label>
              </div>

              <div class="input-field col s12">
                <i class="material-icons prefix modificacionIconoLoginPassword" @click="verConstrasenia()">remove_red_eye</i>
                <input id="contrasenia" :type="contra" class="validate" v-model="Usuario.contrasenia" required>
                <label for="contrasenia" class="letrasLogin">Contraseña:</label>
              </div>

              <div>
                <a class="olvidemiPass" @click="recuperarContrasenia()">He olvidado mi contraseña</a>
              </div>
              <br>
              <button class="btn waves-effect waves-light botonLogin" type="submit" @click="iniciarSesion()"> 
                Iniciar Sesión
              </button>

              <button class="btn waves-effect waves-light botonRegistrarse" type="submit" @click="Registrarse()"> 
                ¿No te has registrado?
              </button>
            </div>
          </div>
          <div class="card-action colorfooter">
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios'
import particlesJSLogin from '@/components/Particles/particlesJSLogin'

export default {
  name: 'Login',
  data(){
    return{
      Usuario:{
        id: 0,
        nombre: '',
        apellido: '',
        nombreCuenta: '',
        contrasenia: '',
        correo: '',
        sexo:'',
        tipo:'',
        preguntaDeSeguridad:''
      },
      objetoUsuarioRecuperarContrasenia:{
        id: 0,
        nombre: '',
        apellido: '',
        nombreCuenta: '',
        contrasenia: '',
        correo: '',
        sexo:'',
        tipo:'',
        preguntaDeSeguridad:''
      },
      contra:'password',
      cambio: false,
    }
  },
  methods: {
    iniciarSesion(){
      event.preventDefault();
      if(this.Usuario.nombreCuenta != '' && this.Usuario.contrasenia != '')
      {
        axios.post('http://localhost:8642/api/Usuarios/IniciarSesion', this.Usuario).then(response => {
          if(response.data.usuarioId != 0){
            swal("¡Bienvenido " + response.data.nombre + "!", "", "success");

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
            this.$router.push('/')
            
          }else{
            swal("Por favor verifique sus credenciales", "", "warning");
          }
        });
      }
      else {
        swal("Hay campos vacios.", "", "warning");
      }
    },
    verConstrasenia(){
      this.cambio = !this.cambio;
      if(this.cambio){
        this.contra = 'text';
      }else{
        this.contra = 'password';
      }
    },
    Registrarse(){
      this.$router.push('/AgregarUsuario')
    },
    recuperarContrasenia()
    {
      //Primer Swal
      swal({
        title: "Introduce tu usuario:",
        content: "input",
      })
      .then((value) => {
        this.objetoUsuarioRecuperarContrasenia.nombreCuenta = value; 
        //Segundo Swal
        swal({
          title: "Introduce la respuesta a tu pregunta de seguridad:",
          content: "input",
        })
        .then((value2) => {
          this.objetoUsuarioRecuperarContrasenia.preguntaDeSeguridad = value2; 
          axios.post('http://localhost:8642/api/Usuarios/RecuperarContrasenia', this.objetoUsuarioRecuperarContrasenia).then(response => {
            if(response.data.usuarioId != 0){
              this.objetoUsuarioRecuperarContrasenia.nombre = response.data.nombre;
              this.objetoUsuarioRecuperarContrasenia.contrasenia = response.data.contrasenia;
              swal(this.objetoUsuarioRecuperarContrasenia.nombre + ' tu contraseña es:', this.objetoUsuarioRecuperarContrasenia.contrasenia ,'success');
              //Limpiar
              this.objetoUsuarioRecuperarContrasenia.nombre = '';
              this.objetoUsuarioRecuperarContrasenia.contrasenia = '';
              this.objetoUsuarioRecuperarContrasenia.nombreCuenta = '';
              this.objetoUsuarioRecuperarContrasenia.preguntaDeSeguridad = '';
            } else {
              swal('¡El usuario o pregunta de seguridad fueron incorrectos!', '', 'warning');
              //Limpiar
              this.objetoUsuarioRecuperarContrasenia.nombre = '';
              this.objetoUsuarioRecuperarContrasenia.contrasenia = '';
              this.objetoUsuarioRecuperarContrasenia.nombreCuenta = '';
              this.objetoUsuarioRecuperarContrasenia.preguntaDeSeguridad = '';
            }
          });
        });
      });

    }
  },
  components:{
    particlesJSLogin 
  }
}
</script>

<style>
  ::-webkit-scrollbar {
    display: none;
  }

  .tamañoImagenLogin{
    margin-top: -20px !important;
    height: 139px !important;
    margin-bottom: -40px !important;
  }

  .colorfooter {
    background-color: black !important;
    opacity: 0.9;
  }

  .imagenLogin {
    opacity: 0.8;
    height: 400px !important;
  }

  /*ARRIBA*/

  .botonLogin{
    background-color: black !important;
    font-size: 25px !important;
    text-shadow: 1px 1px 1px black;
    height: 50px !important ;
    width: 100%;
    border-top: white solid 1px;
    border-bottom: white solid 1px;
    border-radius: 50px 50px 50px 50px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
  }

  .botonLogin:hover{
    background-color: white !important; /* Cambiar cuando llegue la luz */
    text-shadow: 1px 1px 1px black;
    color: black !important;
    border-top: black solid 1px;
    border-bottom:black solid 2px;
  }

  /*ABAJO*/

   /*ARRIBA*/

  .botonRegistrarse{
    margin-top:10px!important;
    float: right;
    background-color: black !important;
    font-size: 15px !important;
    text-shadow: 1px 1px 1px black;
    border-top: white solid 1px;
    border-bottom: white solid 1px;
    border-radius: 50px 50px 50px 50px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
  }

  .botonRegistrarse:hover{
    background-color: white !important; /* Cambiar cuando llegue la luz */
    text-shadow: 1px 1px 1px black;
    color: black !important;
    border-top: black solid 1px;
    border-bottom:black solid 2px;
  }

  /*ABAJO*/

  .unPoquitoDeEspacio{
    margin-top: 40px !important;
  }

  .input-field{
    color: white !important;
  }

  .letrasLogin{
    font-size: 24px !important;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
    color: white !important;
  }

  .cartaBackground{
    background-color: teal;
    opacity: 0.8;
  }

  .olvidemiPass{
    margin-top: -5px !important;
    float: right;
    color: white !important;
  }

  .olvidemiPass:hover{
    color: black !important;
    cursor: pointer;
  }

  .modificacionIconoLoginPassword{
    top: 15px !important;
  }

  .modificacionIconoLoginPassword:hover{
    cursor: pointer;
    color: black;
  }

  .alto{
    margin-top: 85px !important;
  }
</style>
