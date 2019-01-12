<template>
  <withSlides>
    <div class="container" slot-scope="{ slides }">
      <transition name="checkout"> 
        <div class="markdown-body" v-html="compileMarkdown(slides)" />
      </transition>
    </div>
  </withSlides>
</template>

<script>
import withSlides from '@/components/withSlides.js'
import config from './config'
import marked from 'marked'

export default {
  name: 'App',
  components: { withSlides },
  data: () => ({
    currentIndex: 0
  }),
  created() {
    this.listenForSlideChanges()
  },
  methods: {
    compileMarkdown(slides) {
      return marked(slides[this.currentIndex] || '')
    },
    listenForSlideChanges() {
      window.focus()
      document.addEventListener('keydown', event => {
        if (event.code === 'ArrowLeft') {
          const beforeStep = this.currentIndex - 1
          this.currentIndex = (beforeStep < 0)
            ? this.currentIndex
            : beforeStep
        } else if (event.code === 'ArrowRight') {
          const nextStep = this.currentIndex + 1
          this.currentIndex = (nextStep > (config.maxSlides - 1))
            ? this.currentIndex
            : nextStep
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import "./style";

html, body, .container { width: 100%; height: 100%; overflow: hidden; }
.container {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.checkout-enter-active,
.checkout-leave-active {
  transition: all 1s;
}
.checkout-enter,
.checkout-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
