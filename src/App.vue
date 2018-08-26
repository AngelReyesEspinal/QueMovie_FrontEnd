<template>
  <div id="app">
    <header>
      <div class="navbar-fixed">
        <!-- Dropdown Structure-->
        
        <!-- Generos -->
        <ul id="dropdown1" class="dropdown-content">
          <li>
            <router-link :to="{name:'GeneroSerie', params:{ Genero:genero.generoId, Nombre:genero.generos }}" class="red-teal" v-for="genero in Generos" :key="genero.generoId">
              {{ genero.generos }}
            </router-link>
          </li>
        </ul>
        
        <!-- Funciones de Administrador -->
        <ul id="dropdown2" class="dropdown-content">
          <li><router-link to="/AgregarSerie">Agregar Serie</router-link></li>
          <li><router-link to="/AgregarCapitulo">Agregar Capítulo</router-link></li>
          <li><router-link to="/EditarUsuario">Editar Usuarios</router-link></li> 
        </ul>
        
        <!--Navbar-->
        <nav> 
          <div class="nav-wrapper  teal">
            <a href="#" class="left brand-logo logo"><router-link to="/"><img class="responsive-img" src="~@/assets/imagenes/LogoQueMovie.png" width="170px"></router-link></a>
              <ul class="right hide-on-med-and-down">
                <!-- Inicio -->
                <li><router-link to="/"><img src="~@/assets/imagenes/Claqueta.png" alt="Inicio" width="60px"></router-link></li>
                
                <!-- Administrador -->
                <li v-if="this.$session.get('tipo') == 'administrador'"><router-link to="/Administrador"><img src="~@/assets/imagenes/administrador.png" alt="Administrar" width="60px"></router-link></li>
                
                <!-- Generos -->
                <li><a class="dropdown-button" href="#!" data-activates="dropdown1">Géneros<i class="material-icons right">arrow_drop_down</i></a></li>
                
                <!-- Iniciar Sesion / Ya logeado -->
                <li v-if="this.$session.exists()">
                  <router-link to="/Usuario">
                    <!-- Usuario Masculino o Femenino -->
                    <img :src="path+generoUsuario"  alt="Usuario" width="65px" class="animated infinite pulse">
                  </router-link>
                </li>
                <li v-else>
                  <router-link to="/Login"><img src="~@/assets/imagenes/Login.png" alt="Usuario" width="65px" class="animated infinite pulse"></router-link>
                </li>
              </ul> 
          </div>
        </nav>
      </div>
    </header>

    <router-view 
      v-on:generoAgregado="cargarGeneros()" 
      v-on:TalvezCambioElGenero="validarGenero()" 
      v-on:ResetaElGeneroUsuario="limpiarGenero()"
      v-on:PrendeElGeneroUsuario="cargarGeneroDelUsuario()"
    />

    <footer class="page-footer teal">
        <div class="footer-copyright ">
          <div class="container">
            © 2018 Todos los derechos reservador por QueMovie!
          </div>
        </div>
    </footer>
  </div>
</template>

<script>
import axios from 'axios'
import Login from '@/components/Login'
import Usuario from '@/components/Usuario'
import AgregarSerie from '@/components/Agregar/AgregarSerie'
import AgregarUsuario from '@/components/Agregar/AgregarUsuario'
import EditarGeneros from '@/components/Editar/EditarGeneros'

export default {
  mounted(){
    this.cargarGeneros();
    //Dropdown
    $( document ).ready(function(){
          $('.dropdown-button').dropdown({
            inDuration: 300,
            outDuration: 225,
            constrainWidth: false, // Does not change width of dropdown to that of the activator
            hover: true, // Activate on hover
            gutter: 0, // Spacing from edge
            belowOrigin: false, // Displays dropdown below the button
            alignment: 'left', // Displays dropdown with edge aligned to the left of button
            stopPropagation: false // Stops event propagation
          }
        );
      }
    );
  },
  name: 'App',
  data(){
    return{
      Generos:[],
      path: 'static/Servidor/GeneroUsuario/',
      generoUsuario: '',
      id: 0,
    }
  },
  methods:{
    cargarGeneros(){
      axios.get('http://localhost:8642/api/Generos/Get').then(response => {
        this.Generos = response.data;
      });
    },
    validarGenero(){
      if(this.$session.get('genero') == 'Masculino'){
        this.generoUsuario = 'UsuarioMasculino.png';
      }else {
        this.generoUsuario = 'UsuarioFemenino.png';
      }
    },
    cargarGeneroDelUsuario(){
      this.validarGenero();
    },
    limpiarGenero(){
      this.generoUsuario = '';
    },
  },
  components: {
    AgregarSerie,
    Usuario,
    Login,
    EditarGeneros,
    AgregarUsuario,
  } 
}
</script>

<style>
  #app {
    background: url("~@/assets/imagenes/fondo.jpg") no-repeat 0px 0px;
    background-attachment: fixed;
    background-size: cover;
    background-color: gray;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    height: 600px;  

    display: flex !important;
    min-height: 100vh !important;
    flex-direction: column !important;
  }

  main {
    flex: 1 0 auto !important;
  }

  .logo{
    margin-left: -680px !important;
  }

  ::-webkit-scrollbar {
    display: none;
  }
</style>
