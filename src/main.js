//Dependencias
import Vue from 'vue'
import App from './App'
import router from './router'
import indexcss from './assets/css/index.css'
import animatecss from './assets/css/animate.css'
require('./assets/jquery/dist/jquery.min.js')
import materializecss from './assets/materialize/css/materialize.min.css'
require('./assets/materialize/js/materialize.min.js') 

//MediaElement


//Sesion
import VueSession from 'vue-session'
Vue.use(VueSession)

Vue.config.productionTip = false

//Jquery Materialize
//Nabvar
$( document ).ready(function(){
    $(".button-collapse").sideNav();
  }
);
//Inputs
$(document).ready(function() {
  Materialize.updateTextFields();
});
//Multi Selector
$(document).ready(function() {
  $('select').material_select();
});

/* eslint-disable no-new */ 
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
