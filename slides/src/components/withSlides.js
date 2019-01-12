import axios from 'axios'
import config from '../config'

export default {
  name: 'withSlides',

  data: () => ({
    slides: []
  }),

  created() {
    this.fetchSlides()
  },

  methods: {
    async fetchSlides() {
      try {
        const numbers = [
          ...Array(config.maxSlides).keys(),
        ]

        const promises = numbers.map(number => axios.get(`/static/${number}.md`))
        const slides = await Promise.all(promises)
        this.slides = slides.map(slide => slide.data)
      } catch (error) {
        console.log('* Error', error) // eslint-disable-line
      }
    }
  },

  render() {
    return this.$scopedSlots.default({ slides: this.slides })
  }
}