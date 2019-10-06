<template>
  <div class="scene">
    <div
      ref="scene"
      class="scene--container" />
    <a
      v-if="artlebedev"
      href="https://artlebedev.ru/romandkos"
      class="scene--artlebedev" />
  </div>
</template>

<script>
import Vue from 'vue'
import TheScene from '~/components/TheScene.vue'

export default {
  data() {
    return {
      artCompanies: [],
      artlebedev: false,
      animation: false,
      footer: false,
      raycaster: {},
      renderer: {},
      camera: {},
      mouse: {},
      scene: {},
      icon: {},
    }
  },

  mounted() {
    this.initScene()
    this.initMouseEvents()
    this.addLights()
    this.addArtlebedev()
    this.render()
    this.startAnimation()
  },

  methods: {
    initScene() {
      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
      this.camera.position.set(0, 0, 20)

      this.renderer = new THREE.WebGLRenderer({ alpha: true })
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.renderer.setClearColor(0x000000, 0)
      this.renderer.setPixelRatio(2)

      this.$refs.scene.appendChild(this.renderer.domElement)
      window.addEventListener('resize', this.onWindowResize, false)
    },

    mouseMove(event){
      const mousePosition = new THREE.Vector2() 
      mousePosition.x = ((event.clientX / window.innerWidth) * 2) - 1
      mousePosition.y = -((event.clientY / window.innerHeight) * 2) + 1
      this.mouse = mousePosition
    },

    initMouseEvents() {
      this.raycaster = new THREE.Raycaster()
      this.mouse = new THREE.Vector2()
      window.addEventListener('mousemove', this.mouseMove, false)
    },

    onWindowResize(){
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()

      this.renderer.setSize(window.innerWidth, window.innerHeight)
    },

    addLights() {
      const light = new THREE.PointLight(0xffffff, 1, 0)
      light.position.set(1, 1, 100)
      this.scene.add(light)
    },

    render() {
      this.renderer.render(this.scene, this.camera)
      const scroll = window.pageYOffset
      const opacity = 1 - (scroll / window.innerWidth)

      this.raycaster.setFromCamera(this.mouse, this.camera)
      const intersects = this.raycaster.intersectObjects(this.scene.children)
      this.artlebedev = intersects.filter(model => model.object.name === 'artlebedev').length > 0

      requestAnimationFrame(this.render)
    },

    addArtCompany(modelPath, data) {
      const loader = new THREE.OBJLoader()
      loader.load(
        modelPath,
        (object) => {
          object.scale.set(data.scale, data.scale, data.scale)
          object.position.x = data.x
          object.position.y = data.y
          object.traverse((obj) => {
            if (obj.isMesh) {
              obj.material = new THREE.MeshPhongMaterial({
                color: data.color,
                opacity: 1
              })
            }
          })
          Vue.set(this.artCompanies, this.artCompanies.length, object)
          this.scene.add(object)
        }
      )
    },

    addArtlebedev() {
      this.addArtCompany('/3d/gazprom.obj', { x: -12, y: -4, scale: 8, color: 0x007ac2 })
      this.addArtCompany('/3d/cbr.obj', { x: 11, y: 7, scale: 10, color: 0xcccccc })
      this.addArtCompany('/3d/sgtrans.obj', { x: 8, y: -7, scale: 100, color: 0x0062b1 })
    },

    startAnimation() {
      setTimeout(() => {
        this.animation = true
      }, 1500)
    }
  },
}
</script>

<style lang="sass">
.scene
  &,
  &--artlebedev
    position: fixed
    height: 100%
    width: 100%
    left: 0
    top: 0
</style>
