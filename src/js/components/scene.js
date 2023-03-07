import {
  Color,
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Mesh,
  SphereGeometry,
  MeshMatcapMaterial,
  AxesHelper,
  CircleGeometry,
  PlaneGeometry,
  MeshBasicMaterial,
  HemisphereLight,
  MeshLambertMaterial,
  Fog,
  DirectionalLight,
  MeshPhongMaterial,
  DoubleSide,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Reflector } from 'three/examples/jsm/objects/Reflector.js'
import Stats from 'stats-js'
import LoaderManager from '@/js/managers/LoaderManager'
import GUI from 'lil-gui'
import { degToRad } from 'three/src/math/MathUtils'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'

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
      { name: 'robotoSlabFont', font: './fonts/Roboto_Slab_Regular.typeface.json' },
    ]

    await LoaderManager.load(assets)

    this.setStats()
    this.setGUI()
    this.setScene()
    this.setRender()
    this.setCamera()
    this.setControls()
    // this.setAxesHelper()

    this.setSphere()
    this.setText()
    this.setGroundMirror()
    this.setGround()

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
    this.camera.position.y = 2
    this.camera.position.x = 7
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
  setSphere() {
    const geometry = new SphereGeometry(1, 32, 32)
    const material = new MeshMatcapMaterial({ matcap: LoaderManager.assets['matcap'].texture })

    this.sphereMesh = new Mesh(geometry, material)
    this.sphereMesh.position.y = 1
    this.sphereMesh.position.x = -5
    this.sphereMesh.position.z = -5
    this.scene.add(this.sphereMesh)
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
      height: 0.25,
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
  }

  setGround() {
    // const geo = new PlaneGeometry(100, 100)
    // const mat = new MeshBasicMaterial({ color: new Color(0xf8c291) })
    // const mesh = new Mesh(geo, mat)
    // mesh.rotation.x = degToRad(90)
    // mesh.position.y = 5
    // this.scene.add(mesh)

    this.scene.background = new Color(0xb3efff)
    this.scene.fog = new Fog(0xb3efff, 10, 500000)

    const hemiLight = new HemisphereLight(0xffffff, 0x000000)
    hemiLight.position.set(0, 20, 0)
    this.scene.add(hemiLight)

    const dirLight = new DirectionalLight(0xffffff)
    dirLight.position.set(-3, 10, 10)
    dirLight.castShadow = true
    dirLight.shadow.camera.top = 2
    dirLight.shadow.camera.bottom = -2
    dirLight.shadow.camera.left = -2
    dirLight.shadow.camera.right = 2
    dirLight.shadow.camera.near = 0.1
    dirLight.shadow.camera.far = 40
    this.scene.add(dirLight)

    // this.scene.add( new CameraHelper( dirLight.shadow.camera ) );

    // floor

    const mesh = new Mesh(
      new PlaneGeometry(1000000, 1000000),
      new MeshBasicMaterial({ color: 0xf8c291, depthWrite: false, side: DoubleSide })
    )
    mesh.rotation.x = -Math.PI / 2
    // mesh.receiveShadow = true

    mesh.position.y = 10000
    this.scene.add(mesh)

    // ground

    const groundMesh = new Mesh(
      new PlaneGeometry(1000000, 1000000),
      new MeshBasicMaterial({ color: 0xf8c291, depthWrite: false, side: DoubleSide })
    )
    groundMesh.rotation.x = -Math.PI / 2
    groundMesh.receiveShadow = true

    groundMesh.position.y = -5
    this.scene.add(groundMesh)
  }

  setGroundMirror() {
    const geometry = new CircleGeometry(20, 64)
    // Use Reflector
    // https://github.com/mrdoob/three.js/blob/master/examples/jsm/objects/Reflector.js
    this.groundMirror = new Reflector(geometry, {
      clipBias: 0.03,
      textureWidth: window.innerWidth * window.devicePixelRatio,
      textureHeight: window.innerHeight * window.devicePixelRatio,
      // color: 0xffffff,
    })
    this.groundMirror.receiveShadow = true
    this.groundMirror.position.y = 0
    this.groundMirror.rotateX(-Math.PI / 2)
    this.scene.add(this.groundMirror)
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
  draw = (time) => {
    // now: time in ms
    this.stats.begin()

    if (this.controls) this.controls.update() // for damping
    this.renderer.render(this.scene, this.camera)

    this.sphereMesh.position.y = Math.sin(time / 1000) + 2

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
