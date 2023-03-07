import {
  Color,
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Mesh,
  SphereGeometry,
  MeshMatcapMaterial,
  AxesHelper,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Stats from 'stats-js'
import LoaderManager from '@/js/managers/LoaderManager'
import GUI from 'lil-gui'

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
    y: 0,
    showTitle: true,
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
    ]

    await LoaderManager.load(assets)

    this.setStats()
    this.setGUI()
    this.setScene()
    this.setRender()
    this.setCamera()
    this.setControls()
    this.setAxesHelper()

    this.setSphere()

    this.handleResize()

    // start RAF
    this.events()
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
    this.scene.background = new Color(0xffffff)
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
    const fieldOfView = 60
    const nearPlane = 0.1
    const farPlane = 10000

    this.camera = new PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane)
    this.camera.position.y = 5
    this.camera.position.x = 5
    this.camera.position.z = 5
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
  setSphere() {
    const geometry = new SphereGeometry(1, 32, 32)
    const material = new MeshMatcapMaterial({ matcap: LoaderManager.assets['matcap'].texture })

    this.mesh = new Mesh(geometry, material)
    this.scene.add(this.mesh)
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
    const titleEl = document.querySelector('.main-title')
    const gui = new GUI()
    gui.add(this.guiObj, 'y', -3, 3).onChange(this.guiChange)
    gui
      .add(this.guiObj, 'showTitle')
      .name('show title')
      .onChange(() => {
        titleEl.style.display = this.guiObj.showTitle ? 'block' : 'none'
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
  draw = () => {
    // now: time in ms
    this.stats.begin()

    if (this.controls) this.controls.update() // for damping
    this.renderer.render(this.scene, this.camera)

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
