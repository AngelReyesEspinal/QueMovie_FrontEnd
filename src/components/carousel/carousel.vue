<template>
  <div class="carousel">
    <slot></slot>
    <button class="carousel__nav carousel__next animated infinite pulse" @click.prevent="next" > <i class="material-icons colorIcono">arrow_forward</i> </button>
    <button class="carousel__nav carousel__prev animated infinite pulse" @click.prevent="prev" > <i class="material-icons colorIcono">arrow_back</i> </button>
    <div class="carousel__pagination">
      <button v-for="n in slidesCount" @click="goto(n - 1)" :class="{active: n - 1 == index}" :key="n.id"></button>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      index: 0,
      slides:[],
      direction: null
    }
  },
  mounted(){
    this.slides = this.$children
    this.slides.forEach((slide, i) => {
      slide.index = i
    })
  },
  computed: {
    slidesCount (){ return this.slides.length }
  },
  methods: {
    next (){
      this.index++
      this.direction = 'right'
      if(this.index >= this.slidesCount){
        this.index = 0
      }
    },
    prev(){
      this.index--
      this.direction = 'left'
      if(this.index < 0){
        this.index = this.slidesCount - 1
      }
    },
    goto(index){
      this.direction = index > this.index ? 'right' : 'left'
      this.index = index
    }
  }
}
</script>

<style>
  .carousel{
    position: relative;
    overflow: hidden;
  }

  .carousel__nav{
    position: absolute;
    top: 50%;
    margin-top: -31px;
    background-color: #009688;
    left: 10px;
    width: 63px;
    height: 63px;
    border: none;
    opacity: 0.5;
  }

  .carousel__nav button:focus{
    background-color: #009688!important;
  }

  .carousel__nav.carousel__next{
    right: 10px;
    left: auto;
    background-attachment: fixed;
  }

  .carousel__pagination{
    position: absolute;
    bottom: 10px;
    left: 0;
    right: 0;
    text-align: center;
  }

  .carousel__pagination button{
    display: inline-block;
    width: 20px;
    height: 20px;
    background-color: #009688;
    opacity: 0.7;
    border: none;
    border-radius: 50%;
    margin: 0 2px;
  }

  .carousel__pagination button.active{
    background-color: #fff;
  }

  .colorIcono{
    color: white;
  }
</style>
