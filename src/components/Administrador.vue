<template>
  <main class="animated fadeInDown">
    <div class="rectanguloArribaAd">
    </div>       

      <!-- Elementos a Administrar -->
      <div class="col s12 m7">
          <div class="card horizontal black unflowcito">
            <div class="card-image">
              <img src="~@/assets/imagenes/settings-icon.png" height="200px">
            </div>
            <div class="card-stacked">
                <div class="card-content usuario">
                  <div class="contenidoUsuarioAdmin">

                    <!-- Series -->
                    <button class="btn waves-effect waves-light botonAdmin" @click="editarSeries()"> 
                      Administrar Series y Capítulos
                    </button>

                    <!-- Usuarios -->
                    <button class="btn waves-effect waves-light botonAdmin" @click="editarUsuarios()"> 
                      Administrar Usuarios
                    </button>
                    
                  </div>
                </div>
            </div>
          </div>
      </div>

    <div class="rectanguloAbajoAd">
    </div>
  </main>
</template>
        
<script>
import axios from 'axios'

export default {
  name: 'Administrador',
  data(){
    return{
      id:0,
      path: 'static/Servidor/Series/',
    }
  },
  methods:{
    editarSeries(){
      this.$router.push('/EditarSerie')
    },
    editarUsuarios(){
      this.$router.push('/EditarUsuario')
    }
  }
}
</script>

<style>
  .rectanguloArribaAd{
    margin-top: 145px !important;
    background-color: teal;
    opacity: 0.8;
    border-radius:  90px  90px 0px 0px;
    border-top: 1px solid white;
    height: 20px !important;
  }

  .rectanguloAbajoAd{
    margin-top: 15px !important;
    background-color: teal;
    opacity: 0.8;
    border-radius:  0px 0px 90px  90px;
    border-bottom: 1px solid white;
    height: 20px !important;
    margin-bottom: 15px !important;
  }

  .botonAdmin{
    background-color: teal !important;
    font-size: 25px !important;
    text-shadow: 1px 1px 1px white;
    height: 50px !important ;
    width: 100%;
    border-radius: 50px 50px 50px 50px;
    border-top: white solid 1px;
    border-bottom: white solid 1px;
    margin-bottom: 10px !important;
  }

  .botonAdmin:hover{
    background-color: white !important; /* Cambiar cuando llegue la luz */
    color: teal;
    text-shadow: 1px 1px 1px teal;
    border-top: teal solid 1px;
    border-bottom: teal solid 1px;
  }

  .contenidoUsuarioAdmin{
    margin-top: 20px !important;
  }
</style>


