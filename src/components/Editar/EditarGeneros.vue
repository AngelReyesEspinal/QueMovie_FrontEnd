<template>
    <main class="animated fadeInDown">
        <div class="container">
            <div class="card-panel teal cartaListaUsuario">
                <span class="card-title tituloListaDeUsuario">GÉNEROS REGISTRADOS</span>
                <ol id="lista4">
                    <li v-for="genero in generos" :key="genero.generoId" @click="seleccionar(genero.generoId, genero.generos)"> 
                        <span class="nombreUsuarioEditarUsuario">
                            {{genero.generos}}
                        </span>
                    </li> 
                </ol>
                <br>
                <br>
                <div class="row">
                    <div class="input-field col s6">
                        <input id="first_name" type="text" class="validate InputGenero" v-model="genero.Generos">
                        <label for="first_name" class="active tituloInputGenero">Género seleccionado:</label>
                    </div>

                    <button class="btn waves-effect waves-light botonSerieF col s3" @click="editarGenero()"> 
                        Editar
                    </button>
                    <button class="btn waves-effect waves-light botonSerieF col s3" @click="eliminarGenero()"> 
                        Eliminar
                    </button>
                </div>                
            </div>
            <div class="card-reveal colorfooter"></div>
        </div>
    </main>
</template>

<script>
import axios from 'axios'

export default {
    mounted(){
        this.cargarGeneros();
    },
    name: 'EditarGeneros',
    data(){
        return{
            generos: [],
            genero:{
                GeneroId:0,
                Generos:''
            },
            id: 0,
        }
    },
    methods: { 
        cargarGeneros(){
            axios.get('http://localhost:8642/api/Generos/Get').then(response => {
                this.generos = response.data
            });
        },
        seleccionar(id, nombre){
            this.genero.GeneroId = id;
            this.genero.Generos = nombre;
        },
        eliminarGenero(){
            if(this.genero.GeneroId != 0 && this.genero.Generos != ''){
                swal({
                    title: "¿Estás seguro?",
                    text: "El género se eliminará permanentemente.",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                .then((willDelete) => {
                if (willDelete) {
                    this.id = this.genero.GeneroId;
                    axios.delete('http://localhost:8642/api/Generos/Delete/'+ this.id).then(response => {
                        if(response.data == true){
                            this.cargarGeneros();
                            this.$emit('generoAgregado');
                            //Limpiando u know
                            this.genero.Generos = '';
                            this.genero.GeneroId = 0; 
                        }
                    });
                    swal("Genero eliminado correctamente!", {
                    icon: "success",
                    });
                } else {
                    swal("No se elimino el genero!");
                }
                });
            } 
            else 
            {
                swal('Debes seleccionar un genero','','warning');
            }
        },
        editarGenero(){
            if(this.genero.GeneroId != 0 && this.genero.Generos != ''){
                axios.put('http://localhost:8642/api/Generos/Put', this.genero).then(response => {
                    if(response.data == true){
                        this.cargarGeneros();
                        this.$emit('generoAgregado');
                        swal('Muy bien', 'genero modificado correctamente', 'success');
                    }
                });
            } 
            else 
            {
                swal('Debes seleccionar un genero','','warning');
            }
        },
    }
}
</script>

<style>
    ::-webkit-scrollbar {
        display: none;
    }

    .cartaListaUsuario{
        opacity: 0.8;
        margin-top: 15px !important;
    }

    .tamanioIconoEditarUsuarios{
        font-size: 80px !important;
        color: white;    
    }

    .tituloListaDeUsuario{
        font-size: 30px !important;
        color: white;
        text-shadow: 2px 2px 7px black;
    }

    .nombreUsuarioEditarUsuario{
        color:black !important;
    }
    
    .colorfooter {
        height: 40px !important;
        background-color: black !important;
        margin-top: -15px !important;
        opacity: 0.8;
    }

    
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

    .flotar{
        float: left;
    }

    .InputGenero{
        float: left;
        font-size: 15px !important;
        color: white;    
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-weight: normal;
    }

    .tituloInputGenero{
        font-size: 20px !important;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-weight: bold;
        color: white !important; 
    }

    .botonSerieF{
        margin-top: 10px!important;
        background-color: black !important;
        font-size: 25px !important;
        text-shadow: 1px 1px 1px black;
        height: 50px !important ;
        width: 50%;
        border: white solid 1px;
    }

    .botonSerieF:hover{
        background-color: black !important; /* Cambiar cuando llegue la luz */
        text-shadow: 1px 1px 1px black;
        border: teal solid 1px;
        border-radius: 50px 50px 50px 50px;
    }
</style>
