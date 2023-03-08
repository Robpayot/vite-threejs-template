import gsap from 'gsap'
import { Mesh } from 'three'

export default class Satellite {
  mat
  pos
  initY
  speed
  rangeY
  scale
  mesh

  constructor({ geo, mat, pos, speed, rangeY, scale, scene, index }) {
    this.mat = mat
    this.pos = pos
    this.initY = pos.y
    this.speed = speed
    this.rangeY = rangeY

    this.mesh = new Mesh(geo, mat)
    this.mesh.position.copy(this.pos)
    this.mesh.scale.set(scale, scale, scale)
    scene.add(this.mesh)

    // animate
    gsap.fromTo(
      this.mesh.scale,
      { x: 0, y: 0, z: 0 },
      { x: scale, y: scale, z: scale, duration: 2, delay: 0.2 + index * 0.1, ease: 'expo.out' }
    )
  }

  render(time) {
    this.mesh.position.y = this.initY + Math.cos(time * this.speed * 0.001) * this.rangeY
    this.mesh.rotation.x += 0.01 * this.speed
    this.mesh.rotation.y += 0.01 * this.speed
    this.mesh.rotation.z += 0.02 * this.speed
  }
}
