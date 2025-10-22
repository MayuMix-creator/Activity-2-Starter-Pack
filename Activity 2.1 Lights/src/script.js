import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.3)
pointLight.position.x = 0
pointLight.position.y = 0
pointLight.position.z = 0
scene.add(pointLight)
 //spotlight 1
const spotLight = new THREE.SpotLight('#FFFF00', 7, 7, Math.PI * 0.07, 0.3, 3)
spotLight.position.set(2.5, -0.8, 2.5)
scene.add(spotLight)

spotLight.target.position.x = 0
scene.add(spotLight.target)

// const spotLightHelper = new THREE.SpotLightHelper(spotLight)
// scene.add(spotLightHelper)

//spotlight 2
const spotLight2 = new THREE.SpotLight('#00ff15', 7, 7, Math.PI * 0.07, 0.3, 3)
spotLight2.position.set(-2.5, -0.8, 2.5)
scene.add(spotLight2)

spotLight2.target.position.x = 0
scene.add(spotLight2.target)

// const spotLightHelper2 = new THREE.SpotLightHelper(spotLight2)
// scene.add(spotLightHelper2)

//spotlight 3
const spotLight3 = new THREE.SpotLight('#ff0095', 7, 7, Math.PI * 0.07, 0.3, 3)
spotLight3.position.set(-2.5, -0.8, -2.5)
scene.add(spotLight3)

spotLight3.target.position.x = 0
scene.add(spotLight3.target)

// const spotLightHelper3 = new THREE.SpotLightHelper(spotLight3)
// scene.add(spotLightHelper3)

//spotlight 4
const spotLight4 = new THREE.SpotLight('#00ccff', 7, 7, Math.PI * 0.07, 0.3, 3)
spotLight4.position.set(2.5, -0.8, -2.5)
scene.add(spotLight4)

spotLight4.target.position.x = 0
scene.add(spotLight4.target)

// const spotLightHelper4 = new THREE.SpotLightHelper(spotLight4)
// scene.add(spotLightHelper4)

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.roughness = 0.4

// Objects
const cube = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.3, 0.3),
    material
)
cube.rotation.x = 0
cube.rotation.z = Math.PI * 0.25

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.5, 0.18 , 32, 64),
    material
)

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    material
)
plane.rotation.x = - Math.PI * 0.5
plane.position.y = - 0.8

scene.add(cube, torus, plane)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    
    torus.rotation.y = 1 * elapsedTime
    cube.rotation.y = -1 * elapsedTime 

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()