import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { TextureLoader } from 'three'

class LoaderManager {
  constructor() {
    this.assets = {}

    this.textureLoader = new TextureLoader()
    this.GLTFLoader = new GLTFLoader()
    this.DRACOLoader = new DRACOLoader()
  }

  load = (data) =>
    new Promise((resolve) => {
      const promises = []
      for (let i = 0; i < data.length; i++) {
        const { name, gltf, texture, img } = data[i]

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
}

export default new LoaderManager()
