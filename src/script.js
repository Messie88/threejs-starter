import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import gsap from 'gsap'

// CANVAS
const canvas = document.querySelector('canvas.webgl')

// CURSOR POSITON/COORDINATES
const cursor = { x: 0, y: 0 }
window.addEventListener('mousemove', (event) => {
  //To take values between 0 and 1 to prevent issues with different viewport sizes. We add - 0.5 to have negative values so values goes from - 0.5 to 0.5
  cursor.x = event.clientX / sizes.width - 0.5
  cursor.y = event.clientX / sizes.height - 0.5
})

// SCENE
const scene = new THREE.Scene()

// OBJECTS
const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const group = new THREE.Group()
group.scale.set(0.2, 0.2, 0.2)

const mesh1 = new THREE.Mesh(
  geometry,
  new THREE.MeshBasicMaterial({ color: 'green' })
)
mesh1.position.set(1, 0, 0)
const mesh2 = new THREE.Mesh(
  geometry,
  new THREE.MeshBasicMaterial({ color: 'yellow' })
)
mesh2.position.set(3, 0, 0)
const mesh3 = new THREE.Mesh(
  geometry,
  new THREE.MeshBasicMaterial({ color: 'red', wireframe: true })
)
mesh3.position.set(5, 0, 0)

group.add(mesh1)
group.add(mesh2)
group.add(mesh3)

scene.add(group)

// ROTATION ORDER
group.rotation.reorder('YXZ')

// AXES HELPER
const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

// SIZES
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

// RESIZE
window.addEventListener('resize', () => {
  // Update the canvas size
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight
  // Update the camera aspect property
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  // Update the renderer
  renderer.setSize(sizes.width, sizes.height)
  // To prevent performance issues on devices with very high pixel ratio
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

window.addEventListener('dblclick', () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement

  if (!fullscreenElement) {
    // Make the element you choose go fullscreen
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen()
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen()
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    }
  }
})

// CAMERA
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.set(0, 0, 3)
scene.add(camera)
camera.lookAt(group.position)

// CONTROLS
const controls = new OrbitControls(camera, canvas)
// To add some smoothness
controls.enableDamping = true

// RENDERER
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
})
renderer.setSize(sizes.width, sizes.height)

// ANIMATION

// Gsap
//actually use requestAnimationFrame. So no need to put it in a method as loopAnimation below, But we still need to render the result : renderer.render(scene, camera)
// gsap.to(mesh1.position, {x: 2, duration:1, delay: 1})
// gsap.to(mesh1.position, {x: 0, duration:1, delay: 2})

// Or
let clock = new THREE.Clock()

const loopAnimation = () => {
  // const elapsedTime = clock.getElapsedTime()

  // mesh1.position.z = 2 * Math.sin(elapsedTime)
  // mesh1.position.x = 2 * Math.cos(elapsedTime)
  // mesh2.position.z = -4 * Math.sin(elapsedTime)
  // mesh2.position.x = 4 * Math.cos(elapsedTime)
  // mesh3.position.z = -6 * Math.sin(elapsedTime)
  // mesh3.position.x = -6 * Math.cos(elapsedTime)

  // Update camera based on the mouse position if not using Orbit Controls
  // camera.position.x = cursor.x * 3
  // camera.position.y = -cursor.y * 3
  // // Math.PI gives an half rotation
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 10
  // camera.position.z = Math.cos(-cursor.y * Math.PI * 2) * 10
  // camera.position.y = -cursor.y * 5
  // camera.lookAt(group.position)

  //Update controls to enable the dumping to update on each frame
  controls.update()

  renderer.render(scene, camera)
  window.requestAnimationFrame(loopAnimation)
}

loopAnimation()
