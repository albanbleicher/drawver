<template>
  <div class="container">
    <p v-if="!loaded">
      please wait, loading the song, the paint, and the brushes ...
    </p>
    <p v-if="loaded && !hasClicked">
      click to play the song, then draw with your mouse for 30 seconds.
    </p>
    <div  v-show="loaded && hasClicked" id="canvas"></div>
  </div>
</template>
<script>
import store from '../store'
import router from '../router'
import p5 from 'p5'
import '../../node_modules/p5/lib/addons/p5.sound'
const getColors = require('get-image-colors')
import htmlToImage from 'html-to-image'
export default {
  data() {
    return {
      store,
      loaded: false,
      hasClicked: false,
      saveImage: false
    }
  },
  methods: {
    success() {
      setTimeout(() => {
        this.loaded = true
      }, 4000)
    }
  },
  async mounted() {
    console.log('from generate', store)
    if (!store.songData.title) {
      router.push('/')
    } else {
      let colors = []
      await getColors(store.songData.cover).then(data => {
        // `colors` is an array of color objects
        data.forEach(item => {
          colors.push('rgba(' + item._rgb.join(',') + ')')
        })
      })

      document.body.style.backgroundColor = colors[0]
      document.body.style.color = colors[4]

      const sketch = s => {
        let w = s.windowWidth
        let h = s.windowHeight
        let mySound
        let fft = new p5.FFT()
        let fonts = []
        let amplitude
        let rotatez = s.random(100, 1000)
        let i = 0
        s.preload = () => {
          s.soundFormats('mp3', 'ogg')
          mySound = s.loadSound(store.songData.url, this.success)
        }
        s.setup = () => {
          s.createCanvas(w, h, s.WEBGL)
          s.smooth()
          amplitude = new p5.Amplitude()
          s.background(colors[0])
        }

        s.draw = () => {

          var color1, color2, color3, color4
          color1 = s.color(colors[0])
          color2 = s.color(colors[1])
          color3 = s.color(colors[2])
          color4 = s.color(colors[3])

          var spectrum = fft.analyze()

          // console.log('lowMid',fft.getEnergy('lowMid', spectrum));
          if (this.hasClicked && mySound.isPlaying()) {
            s.noFill()
            s.strokeWeight(3)
            s.stroke(color4)
            s.translate(s.mouseX - s.width / 2, s.mouseY - s.height / 2)

            s.rotateZ(s.frameCount * 0.00625)
            s.rotateY(s.frameCount * 0.00625)
            color2.setAlpha(
              fft.getEnergy('bass', spectrum) +
                fft.getEnergy('bass', spectrum) * s.sin(s.millis() / 1000)
            )
            color3.setAlpha(
              fft.getEnergy('bass', spectrum) +
                fft.getEnergy('bass', spectrum) * s.sin(s.millis() / 1000)
            )
            color4.setAlpha(
              fft.getEnergy('bass', spectrum) +
                fft.getEnergy('bass', spectrum) * s.sin(s.millis() / 1000)
            )
            s.ellipseMode(s.CENTER)
            s.ellipse(
              0,
              0,
              fft.getEnergy('lowMid', spectrum) * 0.5,
              fft.getEnergy('lowMid', spectrum) * 0.5
            )
            s.stroke(color3)
            s.ellipse(
              0,
              0,
              fft.getEnergy('bass', spectrum),
              fft.getEnergy('bass', spectrum)
            )
            s.stroke(color2)
          }
          i++;
          if(this.hasClicked && !mySound.isPlaying() && !this.saveImage) {
              this.saveImage = true;
                      var node = document.querySelector('html')

              htmlToImage
                .toJpeg(node, { quality: 0.4 })
                .then(function(dataUrl) {
                 store.result=dataUrl;
                 setTimeout(()=> {
                     store.result = dataUrl;
                     router.push('/tadaaa')
                 },2000)
                })
                .catch(function(error) {
                  console.error('oops, something went wrong!', error)
                })
          }
        }
        s.mouseClicked = () => {
          if (!this.hasClicked) {
            this.hasClicked = true
            mySound.play()
          }
        }
      }

      let canvas = new p5(sketch, 'canvas')
    }
  }
}
</script>