import {
  Color,
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Mesh,
  SphereGeometry,
  AxesHelper,
  PlaneGeometry,
  MeshBasicMaterial,
  MeshLambertMaterial,
  DirectionalLight,
  RepeatWrapping,
  AmbientLight,
  BufferGeometry,
  BufferAttribute,
  PointsMaterial,
  Points,
  Vector3,
  TorusGeometry,
  ConeGeometry,
  CylinderGeometry,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Reflector } from 'three/addons/objects/Reflector.js'
// import { WaterRefractionShader } from 'three/addons/shaders/WaterRefractionShader.js'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js'
import Stats from 'stats-js'
import LoaderManager from '@/js/managers/LoaderManager'
import GUI from 'lil-gui'
import vertexShader from '../glsl/main.vert'
import fragmentShader from '../glsl/main.frag'
import { randFloat } from 'three/src/math/MathUtils'
import Satellite from './shape'
import gsap from 'gsap'

export default class MainScene {
  canvas
  renderer
  scene
  camera
  controls
  stats
  width
  height
  guiObj = {
    skyReflectorColor: '#01002e',
    reflectorTransmission: 0.6,
    waveStrength: 0.05,
    waveSpeed: 2.5,
  }

  constructor() {
    this.canvas = document.querySelector('.scene')

    this.init()
  }

  init = async () => {
    // Preload assets before initiating the scene
    const assets = [
      {
        name: 'matcap',
        texture: './img/matcap.png',
      },
      { name: 'robotoSlabFont', font: './fonts/Roboto_Slab_Regular.typeface.json' },
      { name: 'waterdudv', texture: './img/waterdudv.jpg' },
      { name: 'moon', texture: './img/moon-w2.jpg' },
      { name: 'particle', texture: './img/particle-2.png' },
    ]

    await LoaderManager.load(assets)

    this.setStats()
    this.setGUI()
    this.setScene()
    this.setRender()
    this.setCamera()
    this.setControls()
    // this.setAxesHelper()

    this.setSatellites()
    this.setMoon()
    this.setText()
    this.setReflector()
    this.setLights()
    this.setStars()
    // this.setGroundRefractor()

    this.handleResize()

    // start RAF
    this.events()

    // this.controls.enabled = false

    gsap.fromTo(
      this.camera.position,
      {
        x: this.camera.position.x - 10,
        z: this.camera.position.z + 5,
      },
      {
        duration: 2,
        ease: 'expo.out',
        x: this.camera.position.x,
        z: this.camera.position.z,
        onUpdate: () => {
          this.controls.update()
        },
        onComplete: () => {
          // this.controls.enabled = true
        },
      }
    )
  }

  /**
   * Our Webgl renderer, an object that will draw everything in our canvas
   * https://threejs.org/docs/?q=rend#api/en/renderers/WebGLRenderer
   */
  setRender() {
    this.renderer = new WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
    })
  }

  /**
   * This is our scene, we'll add any object
   * https://threejs.org/docs/?q=scene#api/en/scenes/Scene
   */
  setScene() {
    this.scene = new Scene()
    this.scene.background = new Color(this.guiObj.skyReflectorColor)
  }

  /**
   * Our Perspective camera, this is the point of view that we'll have
   * of our scene.
   * A perscpective camera is mimicing the human eyes so something far we'll
   * look smaller than something close
   * https://threejs.org/docs/?q=pers#api/en/cameras/PerspectiveCamera
   */
  setCamera() {
    const aspectRatio = this.width / this.height
    const fieldOfView = 45
    const nearPlane = 0.1
    const farPlane = 1000

    this.camera = new PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane)
    this.camera.position.y = 1
    this.camera.position.x = 8
    this.camera.position.z = 7
    this.camera.lookAt(0, 0, 0)

    this.scene.add(this.camera)
  }

  /**
   * Threejs controls to have controls on our scene
   * https://threejs.org/docs/?q=orbi#examples/en/controls/OrbitControls
   */
  setControls() {
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true
    // this.controls.dampingFactor = 0.04
  }

  /**
   * Axes Helper
   * https://threejs.org/docs/?q=Axesh#api/en/helpers/AxesHelper
   */
  setAxesHelper() {
    const axesHelper = new AxesHelper(3)
    this.scene.add(axesHelper)
  }

  /**
   * Create a SphereGeometry
   * https://threejs.org/docs/?q=box#api/en/geometries/SphereGeometry
   * with a Basic material
   * https://threejs.org/docs/?q=mesh#api/en/materials/MeshBasicMaterial
   */
  setSatellites() {
    this.satellites = []
    const sphereGeo = new SphereGeometry(1, 32, 32)
    const torusGeo = new TorusGeometry(1, 0.3, 16, 100)
    const coneGeo = new ConeGeometry(1, 3, 32)
    const cylinderGeo = new CylinderGeometry(1, 1, 3, 32)
    const material = new MeshLambertMaterial({ color: new Color(0xffffff) })

    const satellite1 = new Satellite({
      geo: sphereGeo,
      mat: material,
      pos: new Vector3(6, 2, 7),
      speed: 1,
      rangeY: 1,
      scale: 0.8,
      scene: this.scene,
      index: 3,
    })

    const satellite2 = new Satellite({
      geo: torusGeo,
      mat: material,
      pos: new Vector3(-4, 3, 4),
      speed: 1.2,
      rangeY: 0.6,
      scale: 1,
      scene: this.scene,
      index: 1,
    })

    const satellite3 = new Satellite({
      geo: coneGeo,
      mat: material,
      pos: new Vector3(-12, 2, -6),
      speed: 0.6,
      rangeY: 0.5,
      scale: 0.8,
      scene: this.scene,
      index: 0,
    })

    const satellite4 = new Satellite({
      geo: cylinderGeo,
      mat: material,
      pos: new Vector3(2, 4, -6),
      speed: 1.1,
      rangeY: 1.2,
      scale: 0.7,
      scene: this.scene,
      index: 2,
    })

    this.satellites.push(satellite1)
    this.satellites.push(satellite2)
    this.satellites.push(satellite3)
    this.satellites.push(satellite4)
  }

  /**
   * TextGeometry
   * https://threejs.org/docs/?q=text#examples/en/geometries/TextGeometry
   */
  setText() {
    // One of the best way to use texts in Three.JS is to use MSDF Fonts, I'll write a tutorial about it
    // but for the purpose of this example, TextGeometry is great enough
    const textGeo = new TextGeometry('How To Code That?', {
      font: LoaderManager.assets['robotoSlabFont'].font,
      size: 0.8,
      height: 0.2,
      curveSegments: 12,
      bevelEnabled: false,
      // bevelThickness: 10,
      // bevelSize: 8,
      // bevelOffset: 0,
      // bevelSegments: 5,
    })

    textGeo.computeBoundingBox()

    const centerOffset = -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x)

    // Get CSS var color
    const style = window.getComputedStyle(document.body)
    const color = style.getPropertyValue('--color-orange').replace(' ', '')

    const textMat = new MeshLambertMaterial({ color: new Color(0xffffff) })
    this.textMesh = new Mesh(textGeo, textMat)
    this.textMesh.receiveShadow = true
    this.textMesh.castShadow = true

    this.textMesh.position.x = centerOffset
    this.textMesh.position.y = 0
    this.textMesh.position.z = 0

    this.scene.add(this.textMesh)

    // animate
    gsap.fromTo(this.textMesh.scale, { x: 1, y: 0, z: 0 }, { x: 1, y: 1, z: 1, duration: 1.7, ease: 'expo.out' })
  }

  setLights() {
    const dirLight = new DirectionalLight(0xffffff)
    dirLight.position.set(-3, 10, 10)
    this.scene.add(dirLight)

    // this.scene.add(new CameraHelper(dirLight.shadow.camera))

    const light = new AmbientLight(0xcccccc) // soft white light
    this.scene.add(light)
  }

  setReflector() {
    const geometry = new PlaneGeometry(500, 500)
    // Use Reflector
    // https://github.com/mrdoob/three.js/blob/master/examples/jsm/objects/Reflector.js
    // https://github.com/mrdoob/three.js/blob/master/examples/jsm/shaders/WaterRefractionShader.js

    const customShader = Reflector.ReflectorShader
    customShader.vertexShader = vertexShader
    customShader.fragmentShader = fragmentShader

    const dudvMap = LoaderManager.assets['waterdudv'].texture
    dudvMap.wrapS = dudvMap.wrapT = RepeatWrapping
    customShader.uniforms.tDudv = { value: dudvMap }
    customShader.uniforms.waveStrength = { value: this.guiObj.waveStrength }
    customShader.uniforms.time = { value: 0 }
    customShader.uniforms.transmission = { value: this.guiObj.reflectorTransmission }
    customShader.uniforms.waveSpeed = { value: this.guiObj.waveSpeed / 1000 }

    this.reflector = new Reflector(geometry, {
      clipBias: 0.1,
      textureWidth: window.innerWidth,
      textureHeight: window.innerHeight,
      shader: customShader,
      color: this.guiObj.skyReflectorColor,
    })
    this.reflector.position.y = 0
    this.reflector.rotateX(-Math.PI / 2)
    this.scene.add(this.reflector)
  }

  setStars() {
    const geometry = new BufferGeometry()
    // create a simple square shape. We duplicate the top left and bottom right
    // vertices because each vertex needs to appear once per triangle.

    const vertices = []
    const nb = 1000

    const range = 1000

    for (let i = 0; i < nb; i++) {
      const point = [randFloat(-range, range), randFloat(20, 200), randFloat(-range, range)]
      vertices.push(...point)
    }

    // itemSize = 3 because there are 3 values (components) per vertex
    geometry.setAttribute('position', new BufferAttribute(new Float32Array(vertices), 3))
    const material = new PointsMaterial({
      color: 0xffffff,
      size: 2.5,
      // depthTest: false,
      // depthWrite: false,
      transparent: true,
      map: LoaderManager.assets['particle'].texture,
    })
    const mesh = new Points(geometry, material)

    mesh.renderOrder = -1
    this.scene.add(mesh)
  }

  setMoon() {
    const geometry = new SphereGeometry(25, 32, 32)
    const material = new MeshBasicMaterial({ map: LoaderManager.assets['moon'].texture, color: new Color(0xffffff) })

    this.moonMesh = new Mesh(geometry, material)
    this.moonMesh.position.y = 70
    this.moonMesh.position.x = -250
    this.moonMesh.position.z = -180
    this.scene.add(this.moonMesh)
  }

  /**
   * Build stats to display fps
   */
  setStats() {
    this.stats = new Stats()
    this.stats.showPanel(0)
    document.body.appendChild(this.stats.dom)
  }

  setGUI() {
    const gui = new GUI()
    gui
      .addColor(this.guiObj, 'skyReflectorColor')
      .name('sky color')
      .onChange(() => {
        this.scene.background = new Color(this.guiObj.skyReflectorColor)
        this.reflector.material.uniforms.color.value = new Color(this.guiObj.skyReflectorColor)
      })

    gui.add(this.guiObj, 'reflectorTransmission', 0, 1).onChange(() => {
      this.reflector.material.uniforms.transmission.value = this.guiObj.reflectorTransmission
    })

    gui.add(this.guiObj, 'waveStrength', 0, 0.5).onChange(() => {
      this.reflector.material.uniforms.waveStrength.value = this.guiObj.waveStrength
    })

    gui.add(this.guiObj, 'waveSpeed', 0, 5).onChange(() => {
      this.reflector.material.uniforms.waveSpeed.value = this.guiObj.waveSpeed / 1000
    })
  }
  /**
   * List of events
   */
  events() {
    window.addEventListener('resize', this.handleResize, { passive: true })
    this.draw(0)
  }

  // EVENTS

  /**
   * Request animation frame function
   * This function is called 60/time per seconds with no performance issue
   * Everything that happens in the scene is drawed here
   * @param {Number} now
   */
  draw = (time) => {
    // now: time in ms
    this.stats.begin()

    if (this.controls) this.controls.update() // for damping
    this.renderer.render(this.scene, this.camera)

    for (let i = 0; i < this.satellites.length; i++) {
      const satellite = this.satellites[i]
      satellite.render(time)
    }

    if (this.reflector.material.uniforms) {
      this.reflector.material.uniforms.time.value += 1
    }

    this.stats.end()
    this.raf = window.requestAnimationFrame(this.draw)
  }

  /**
   * On resize, we need to adapt our camera based
   * on the new window width and height and the renderer
   */
  handleResize = () => {
    this.width = window.innerWidth
    this.height = window.innerHeight

    // Update camera
    this.camera.aspect = this.width / this.height
    this.camera.updateProjectionMatrix()

    const DPR = window.devicePixelRatio ? window.devicePixelRatio : 1

    this.renderer.setPixelRatio(DPR)
    this.renderer.setSize(this.width, this.height)
  }

  guiChange = () => {
    if (this.mesh) this.mesh.position.y = this.guiObj.y
  }
}
