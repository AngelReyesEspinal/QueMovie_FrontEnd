<template>
    <main>
        <form class="col s12" enctype="multipart/form-data" name="fileinfo"> 
            <div class="row">
                <div class="col s12 animated fadeInDown">
                    <div class="card transparent .center-align">
                        <div class="card-content white-text">
                            <span v-if="id > 0" class="card-title titulo tituloSerie"> Editar Serie </span>
                            <span v-else class="card-title titulo tituloSerie"> Agregar Serie </span>
                            
                            <div class="row">
                                <div class="input-field col s3">
                                    <input id="titulo" type="text" class="validate" v-model="Serie.Titulo" required>
                                    <label for="titulo" class="active letras">Título:</label>
                                </div>

                                <div class="input-field col s4">
                                    <input id="productora" type="text" class="validate" v-model="Serie.Productora" required>
                                    <label for="productora" class="active letras">Productora:</label>
                                </div>

                                <div class="input-field col s7">
                                    <textarea id="sinopsis" class="materialize-textarea" v-model="Serie.Sinopsis" required></textarea>
                                    <label for="sinopsis" class="active letras">Sinopsis:</label>
                                </div>

                                <div class="file-field input-field col s7">
                                    <div class="btn">
                                        <span> Imagen: </span>
                                        <input type="file" accept="image/*" @change="processFile($event)">
                                    </div>
                                    <div class="file-path-wrapper">
                                        <input class="file-path validate" type="text" v-model="LimpiarImagen" required>
                                    </div>
                                </div>

                                <!-- Mis Generos >:) -->
                                <div class="col s5 cartaGeneros">
                                    <div class="card black cartillaHeight">
                                        <div class="card-content white-text">
                                            <p class="letras">
                                                Géneros:
                                            </p>

                                            <div class="input-field col s12">
                                                <i class="material-icons prefix colorIconoSerie">search</i>
                                                    <input id="icon_prefix" type="text" class="validate" v-model="generoABuscar" v-on:keydown.enter="obtenerGenero()">
                                                <label for="icon_prefix">Buscar género.</label>
                                            </div>

                                            <div class="input-field col s12">
                                                <i class="material-icons prefix colorIconoSerie">add</i>
                                                    <input id="icon_prefix" type="text" class="validate" v-model="Genero.Generos" v-on:keydown.enter="agregarGenero()">
                                                <label for="icon_prefix">Agrega un nuevo género.</label>
                                            </div>
                                            
                                            <div class="col s3 results">
                                                <label for="" class="letras">Resultado: </label>
                                            </div>

                                            <div class="col s9">
                                                <label id="resultado" class="letras resultado Bserie" @click="seleccionar()"> {{ generoObtenido }} </label>
                                            </div>

                                            <div class="input-field col s10">
                                                <input id="icon_prefix" type="text" class="validate generoInput" v-model="auxiliar" readonly>
                                            </div>

                                            <div class="col s1">
                                                <i class="material-icons prefix zaf" @click="limpiar()">delete_forever</i> 
                                            </div>
                                            <router-link to="/EditarGeneros"> 
                                                <div class="col s1">
                                                    <i class="material-icons prefix zaf af" @click="limpiar()">settings</i> 
                                                </div>
                                            </router-link>
                                        </div>
                                    </div>
                                </div>

                                <div class="input-field col s2 up">
                                    <input id="anio" type="number" class="validate" v-model="Serie.Anio" required>
                                    <label for="anio" class="active letras">Año de estreno:</label>
                                </div>

                                <div class="input-field col s2 up">
                                    <input id="temporadas" type="number" class="validate" v-model="Serie.Temporadas" required>
                                    <label for="temporadas" class="active letras">Temporadas:</label>
                                </div>

                                <div class="input-field col s3 up">
                                    <input id="duracion" type="text" class="validate" v-model="Serie.Duracion" required>
                                    <label for="duracion" class="active letras">Duración por capítulo:</label>
                                </div>

                                <div class="row segundaFila">
                                    
                                    <div class="input-field col s12">
                                        <input id="trailer"  type="text" class="validate" v-model="Serie.Trailer" required>
                                        <label for="trailer" class="active letras">Link del trailer (Embed):</label>
                                    </div>

                                    <button v-if="id > 0" class="btn boton waves-effect waves-light" type="submit" @click="enviarSerieEditada"> 
                                        Editar
                                    </button>
                                    <button v-else class="btn boton waves-effect waves-light" type="submit" @click="enviarSerie"> 
                                        Agregar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <div id="loaderSeries">
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

var serie = new FormData;

export default {
    name: 'AgregarSerie',
    mounted(){
        $('.tooltipped').tooltip({delay: 50});
        this.cargarSerieAEditar();
    },
    data(){
        return {
            id: this.$route.params.id,
            Genero:{
                Generos:''
            },
            Serie:{
                Titulo: '',
                Sinopsis: '',
                Anio: '',
                Productora: '',
                Duracion: '',
                Imagen: '',
                Trailer: '',
                Temporadas: ''
            },
            File: File,
            LimpiarImagen:'',
            generoABuscar:'',
            generoObtenido:'',
            idObtenido:0,
            auxiliar:'',
            aux:0,
            //Para gestionar la relacion Serie / Genero
            serieId:0,
            generosId:[],
            generosAEliminar:[],
            limpiaGenerosId:[],
        }
    },
    methods:{
        processFile(event) {
            this.File = event.target.files[0];
            this.Serie.Imagen = this.File.name;
        },
        limpiarInputs(){
            this.Serie.Titulo = '';
            this.Serie.Sinopsis = '';
            this.Serie.Anio = '';
            this.Serie.Productora = '';
            this.generoABuscar = '';
            this.generoObtenido = '';
            this.Serie.Duracion = '';
            this.Serie.Imagen = '';
            this.auxiliar = '';
            this.Serie.Trailer = '';
            this.LimpiarImagen = '';
            this.File = null;
            this.Serie.Temporadas = '';
        },
        validarCampos(){
            if(this.Serie.Trailer != ''){
                return true;
            }else {
                swal("Hay campos vacios", "", "error");
                event.preventDefault()
                return false;
            }
        },
        cargarObjetoAEnviar(){
            if(this.id > 0){
                serie.append('SerieId', this.id); //Solo para el editar
            }
            serie.append('Titulo', this.Serie.Titulo);
            serie.append('Sinopsis', this.Serie.Sinopsis);
            serie.append('Anio', this.Serie.Anio);
            serie.append('Productora', this.Serie.Productora);
            serie.append('Duracion', this.Serie.Duracion);
            serie.append('Imagen', this.Serie.Imagen);
            serie.append('Trailer', this.Serie.Trailer);
            serie.append('Temporadas', this.Serie.Temporadas);
            serie.append('File', this.File);
            
            return{
                serie
            }
        },
        limpiarObjetoAEnviar(){
            if(serie.get('SerieId') > 0){
                serie.delete('SerieId'); //Solo para el editar
            }
            serie.delete('Titulo');
            serie.delete('Sinopsis');
            serie.delete('Anio');
            serie.delete('Productora');
            serie.delete('Duracion');
            serie.delete('Imagen');
            serie.delete('Trailer');
            serie.delete('Temporadas');
            serie.delete('File');
        },
        enviarSerie(){
            if(this.validarCampos()){
                event.preventDefault();
                this.cargarObjetoAEnviar();
                axios.post('http://localhost:8642/api/Series/PostAsync', serie, $('#loaderSeries').fadeIn("slow")).then(response => {
                    this.Serie.Imagen = '';
                    if(response.data){
                        //Aqui cacho el id de la serie
                        this.serieId = response.data; 
                        this.aux = this.serieId;
                        //Agrego un ultimo elemento (serieId), un truquito jiji
                        this.generosId.push(this.serieId);
                        
                        //Aqui llamar el otro metodo grasa klk :v
                        axios.post('http://localhost:8642/api/GeneroSerie/Post', this.generosId).then(response => {
                            if(response.data == true)
                            {
                                //Limpiando los residuos 
                                this.SerieId = 0;
                                this.generosId = this.limpiaGenerosId;
                                this.limpiarInputs();
                                this.limpiarObjetoAEnviar();
                                $('#loaderSeries').fadeOut("slow");
                                swal("¡Muy bien!", "¡Se ha agregado correctamente!", "success");
                                this.$router.push('/AgregarCapitulo/' + this.aux + '/Agregar') 
                            }
                        });
                    }
                    else{
                        swal("¡Ha ocurrido un inconveniente!", "", "error");
                    }
                }).
                catch(function (error) {
                    console.log(error.response);
                });
            }
        },
        obtenerGenero(){
            event.preventDefault();
            if(this.generoABuscar == ''){
                swal("¡No inserto un género!", "", "error");
            } 
            else
            {
                axios.get('http://localhost:8642/api/Generos/GetGenero/' +this.generoABuscar, $('#loaderSeries').fadeIn("slow")).then(response => {
                if(response.data.generos != null)
                {
                    this.idObtenido = response.data.generoId;
                    this.generoObtenido = response.data.generos;
                    $('#loaderSeries').fadeOut("slow");
                }
                else{
                    swal('Disculpe', 'Por favor sea más específico.', 'warning');
                    $('#loaderSeries').fadeOut("slow");
                }
                });
            }              
        },
        seleccionar(){ //Aqui creo las relaciones
            if(this.auxiliar.includes(this.generoObtenido))
            {
                Materialize.toast('Ya ese género está!', 3000, 'rounded')
            }
            else{
                this.auxiliar += this.generoObtenido + ', ';
                this.generosId.push(this.idObtenido); // Arreglo con mis series
            }
        },
        limpiar(){ //Aqui elimino las relaciones
            if(this.id > 0) //Editando, eliminarlo 
            { 
                this.SerieId = parseInt(this.id);
                console.log(this.SerieId);
                axios.delete('http://localhost:8642/api/GeneroSerie/Delete/'+ this.SerieId).then(response => {
                    this.generosId = this.limpiaGenerosId;
                    this.SerieId = 0;
                });
            } 
            else //Creando, solo limpiarlo
            { 
                this.generosId = this.limpiaGenerosId;
                this.generoObtenido = '';
            }

            this.auxiliar = '';
        },
        agregarGenero(){
            event.preventDefault();
            if(this.Genero.Generos != ''){
                axios.post('http://localhost:8642/api/Generos/Post', this.Genero, $('#loaderSeries').fadeIn("slow")).then(response => {
                    if(response.data){
                        swal("¡Género agregado correctamente!", "", "success");
                        this.$emit('generoAgregado');
                        $('#loaderSeries').fadeOut("slow");
                    }else{
                        swal('Ese género ya fue agregado.', "", "warning");
                        $('#loaderSeries').fadeOut("slow");
                    }
                });
            } else {
                swal('No ha ingresado un genero ha agregar.', "", "error");
            }
            
        },
        cargarSerieAEditar(){
            if(this.id > 0){
                axios.get('http://localhost:8642/api/GeneroSerie/GetEditar/'+ this.id).then(response => {
                    this.generosId = response.data; //Carga el array
 
                    axios.post('http://localhost:8642/api/Generos/GetSearched', this.generosId).then(response => {
                        this.auxiliar = response.data; // Convierte el array en una grasita
                    
                        axios.get('http://localhost:8642/api/Series/Get/'+this.id).then(response => {
                            if(response.data){
                                this.Serie.Titulo = response.data.titulo;
                                this.Serie.Sinopsis = response.data.sinopsis;
                                this.Serie.Anio = response.data.anio;
                                this.Serie.Productora = response.data.productora;
                                this.Serie.Duracion = response.data.duracion;
                                this.Serie.Imagen = response.data.imagen;
                                this.LimpiarImagen = response.data.imagen;
                                this.Serie.Trailer = response.data.trailer;
                                this.Serie.Temporadas = response.data.temporadas;
                            }
                        });
                    });
                });
            }
        },
        enviarSerieEditada(){
            event.preventDefault();
            this.cargarObjetoAEnviar();
            axios.put('http://localhost:8642/api/Series/Editar', serie, $('#loaderSeries').fadeIn("slow")).then(response => {
                this.Serie.Imagen = '';
                if(response.data){

                    //Agrego un ultimo elemento (id en este caso jiji), un truquito jiji
                    this.generosId.push(this.id);
                    
                    //Aqui llamar el otro metodo grasa klk :v
                    axios.post('http://localhost:8642/api/GeneroSerie/PostEditar', this.generosId).then(response => {
                        if(response.data == true)
                        {
                            //Limpiando los residuos 
                            this.generosId = this.limpiaGenerosId;
                            this.limpiarInputs();
                            this.limpiarObjetoAEnviar();
                            $('#loaderSeries').fadeOut("slow");
                            swal("¡Muy bien!", "¡Se ha editado correctamente!", "success");
                            this.$router.push('/');
                        }
                    });
                }
                else{
                    swal("¡Ha ocurrido un inconveniente!", "", "error");
                }
            }).
            catch(function (error) {
                console.log(error.response);
            });
        }
    }
}
</script>

<style>
    #loaderSeries{
        margin-top: -450px !important;
        margin-left: 600px !important;
        position: absolute;
        z-index: 100;
        display: none;
    }

    .multiSelect{
        margin-top: 0;
    }

    .input-field label {
     color: white;
    }

    .titulo{
        color: teal;
        font-size: 50px !important;
        text-shadow: 1px 1px 1px white;
    }

    .cartaGeneros{
        margin-top: -210px !important;
    }

    .cartillaHeight{
        height: 340px !important;
        opacity: 0.7;
        border-bottom: 1px solid white;
    }

    .segundaFila{
        margin-top: -70px !important;
    }

    .letras{
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
        font-size: 20px !important;
    }

    .boton{
        width: 100%;
        font-size: 20px !important;
    }

    .Izquierda{
        float: left;
        margin-right: 5px !important;
    }

    .generosLetras{
        color: white !important;
    }

    .tituloSerie{
        margin-bottom: 100px !important;
    }

    .Bserie{
        float: left;
    }

    .Bserie:hover{
        color: teal;
        cursor: pointer;
    }

    .up{
        margin-top: -60px !important;
    }

    .colorIconoSerie{
        color: white;
    }

    .zaf{
        margin-top: 40px !important;
        cursor: pointer;
        color: white;
    }

    .zaf:hover{
        color: red !important;
        cursor: pointer;
    }

    .af:hover{
        color: teal !important;
    }

    .generoInput{
        color: white!important;
    }
</style>
