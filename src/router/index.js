import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/Login'
import AgregarUsuario from '@/components/Agregar/AgregarUsuario'
import AgregarSerie from '@/components/Agregar/AgregarSerie'
import AgregarCapitulo from '@/components/Agregar/AgregarCapitulo'
import SerieDetalle from '@/components/SerieDetalle'
import CapitulosPorSerie from '@/components/CapitulosPorSerie'
import Reproductor from '@/components/Reproductor'
import Usuario from '@/components/Usuario'
import GeneroSerie from '@/components/GeneroSerie'
import EditarUsuario from '@/components/Editar/EditarUsuario'
import EditarCapitulo from '@/components/Editar/EditarCapitulo'
import EditarSerie from '@/components/Editar/EditarSerie'
import Administrador from '@/components/Administrador'
import NoEncontrado from '@/components/NoEncontrado'
import EditarGeneros from '@/components/Editar/EditarGeneros'
import QrReader from '@/components/CodigoQr/QrReader'
import QrWriter from '@/components/CodigoQr/QrWriter'
import CambioDeContrasenia from '@/components/CambioDeContrasenia'
import swal from 'sweetalert';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/AgregarUsuario',
      name: 'AgregarUsuario',
      component: AgregarUsuario
    },
    {
      path: '/AgregarSerie/:id',
      name: 'AgregarSerie',
      component: AgregarSerie
    },
    {
      path: '/AgregarCapitulo/:id/:accion',
      name: 'AgregarCapitulo',
      component: AgregarCapitulo
    },
    {
      path: '/SerieDetalle/:id',
      name: 'SerieDetalle',
      component: SerieDetalle
    },
    {
      path: '/CapitulosPorSerie/:id',
      name: 'CapitulosPorSerie',
      component: CapitulosPorSerie
    },
    {
      path: '/Usuario',
      name: 'Usuario',
      component: Usuario
    },
    {
      path: '/GeneroSerie/:Genero/:Nombre',
      name: 'GeneroSerie',
      props: true, // Los parametros se toman como propiedades.
      component: GeneroSerie
    },
    {
      path: '/EditarUsuario',
      name: 'EditarUsuario',
      component: EditarUsuario
    },
    {
      path: '/EditarSerie',
      name: 'EditarSerie',
      component: EditarSerie
    },
    {
      path: '/EditarCapitulo/:id',
      name: 'EditarCapitulo',
      component: EditarCapitulo
    },
    {
      path: '/Administrador',
      name: 'Administrador',
      component: Administrador
    },
    {
      path: '/NoEncontrado',
      name: 'NoEncontrado',
      component: NoEncontrado
    },
    {
      path: '/EditarGeneros',
      name: 'EditarGeneros',
      component: EditarGeneros
    },
    {
      path: '/QrReader',
      name: 'QrReader',
      component: QrReader
    },
    {
      path: '/QrWriter',
      name: 'QrWriter',
      component: QrWriter
    },
    {
      path: '/Reproductor/:serie/:capitulo',
      name: 'Reproductor',
      component: Reproductor
    },
    {
      path: '/CambioDeContrasenia',
      name: 'CambioDeContrasenia',
      component: CambioDeContrasenia
    }
  ]
})
