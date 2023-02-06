import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextureLoader } from 'three'

class LoaderManager {
  assets
  constructor() {
    this.assets = {} // Dictionary of assets, can be different type, gltf, texture, img, font, feel free to make a Enum if using TypeScript

    this.textureLoader = new TextureLoader()
    this.GLTFLoader = new GLTFLoader()
    this.OBJLoader = new OBJLoader()
    this.DRACOLoader = new DRACOLoader()
    this.FontLoader = new FontLoader()
  }

  load = (data) =>
    new Promise((resolve) => {
      const promises = []
      for (let i = 0; i < data.length; i++) {
        const { name, gltf, texture, img, font, obj } = data[i]

        if (!this.assets[name]) {
          this.assets[name] = {}
        }

        if (gltf) {
          promises.push(this.loadGLTF(gltf, name))
        }

        if (texture) {
          promises.push(this.loadTexture(texture, name))
        }

        if (img) {
          promises.push(this.loadImage(img, name))
        }

        if (font) {
          promises.push(this.loadFont(font, name))
        }

        if (obj) {
          promises.push(this.loadObj(obj, name))
        }
      }

      Promise.all(promises).then(() => resolve())
    })

  loadGLTF(url, name) {
    return new Promise((resolve) => {
      this.DRACOLoader.setDecoderPath('../scene/vendor/three/draco/')
      this.GLTFLoader.setDRACOLoader(this.DRACOLoader)

      this.GLTFLoader.load(
        url,
        (result) => {
          this.assets[name].gltf = result
          resolve(result)
        },
        undefined,
        (e) => {
          console.log(e)
        }
      )
    })
  }

  loadTexture(url, name) {
    if (!this.assets[name]) {
      this.assets[name] = {}
    }
    return new Promise((resolve) => {
      this.textureLoader.load(url, (result) => {
        this.assets[name].texture = result
        resolve(result)
      })
    })
  }

  loadImage(url, name) {
    return new Promise((resolve) => {
      const image = new Image()

      image.onload = () => {
        this.assets[name].img = image
        resolve(image)
      }

      image.src = url
    })
  }

  loadFont(url, name) {
    // you can convert font to typeface.json using https://gero3.github.io/facetype.js/
    return new Promise((resolve) => {
      this.FontLoader.load(
        url,

        // onLoad callback
        (font) => {
          this.assets[name].font = font
          resolve(font)
        },

        // onProgress callback
        () =>
          // xhr
          {
            // console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
          },

        // onError callback
        (err) => {
          console.log('An error happened', err)
        }
      )
    })
  }

  // https://threejs.org/docs/#examples/en/loaders/OBJLoader
  loadObj(url, name) {
    return new Promise((resolve) => {
      // load a resource
      this.OBJLoader.load(
        // resource URL
        url,
        // called when resource is loaded
        (object) => {
          this.assets[name].obj = object
          resolve(object)
        },
        // onProgress callback
        () =>
          // xhr
          {
            // console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
          },
        // called when loading has errors
        (err) => {
          console.log('An error happened', err)
        }
      )
    })
  }
}

export default new LoaderManager()
