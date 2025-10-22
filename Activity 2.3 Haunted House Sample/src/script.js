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
 * Textures
 */
//DoorTexture
const textureLoader = new THREE.TextureLoader()
const doorcolor = textureLoader.load('/textures/door/color.jpg')
const dooralphatexture = textureLoader.load('/textures/door/alpha.jpg')
const doorabmientocclusiontexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorheighttexture = textureLoader.load('/textures/door/height.jpg')
const doornormaltexture = textureLoader.load('/textures/door/normal.jpg')
const doormetalness = textureLoader.load('/textures/door/metalness.jpg')
const doorroguhness = textureLoader.load('/textures/door/roughness.jpg')

//BricksTexture
const brickcolor = textureLoader.load('/textures/bricks/color.jpg')
const brickambient = textureLoader.load('/textures/bricks/ambientOcclusion.jpg')
const bricknormal = textureLoader.load('/textures/bricks/normal.jpg')
const brickroughness = textureLoader.load('/textures/bricks/roughness.jpg')

//GrassTexture
const grasscolor = textureLoader.load('/textures/grass/color.jpg')
const grassambient = textureLoader.load('/textures/grass/ambientOcclusion.jpg')
const grassnormal = textureLoader.load('/textures/grass/normal.jpg')
const grassroughness = textureLoader.load('/textures/grass/roughness.jpg')

grasscolor.repeat.set(5, 5)
grassambient.repeat.set(5, 5)
grassnormal.repeat.set(5, 5)
grassroughness.repeat.set(5, 5)

grasscolor.wrapS = THREE.RepeatWrapping
grassambient.wrapS = THREE.RepeatWrapping
grassnormal.wrapS = THREE.RepeatWrapping
grassroughness.wrapS = THREE.RepeatWrapping

grasscolor.wrapT = THREE.RepeatWrapping
grassambient.wrapT = THREE.RepeatWrapping
grassnormal.wrapT = THREE.RepeatWrapping
grassroughness.wrapT = THREE.RepeatWrapping

/**
 * House
 */
const house = new THREE.Group()
scene.add(house)

//Wall 
const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
        map: brickcolor,
        aoMap: brickambient, 
        normalMap: bricknormal,
        roughnessMap: brickroughness
    })
)
walls.position.y = 1.2
house.add(walls)

//Roof
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1.5, 4),
    new THREE.MeshStandardMaterial({ color: 'rgba(97, 29, 2, 0.67)'})
)
roof.position.y = 2.95
roof.rotation.y = Math.PI * 0.25
house.add(roof)

//Door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 1.5),
    new THREE.MeshStandardMaterial({
        map: doorcolor,
        transparent: true,
        alphaMap: dooralphatexture,
        aoMap: doorabmientocclusiontexture,
        displacementMap: doorheighttexture,
        displacementScale: 0.1,
        normalMap: doornormaltexture,
        metalnessMap: doormetalness,
        roughnessMap: doorroguhness
    })
)
door.position.z = 2.001
door.position.y = 0.68
house.add(door)

//Chimney
const chimney = new THREE.Mesh(
    new THREE.BoxGeometry(0.7, 1, 0.7),
    new THREE.MeshStandardMaterial({
        map: brickcolor,
        aoMap: brickambient, 
        normalMap: bricknormal,
        roughnessMap: brickroughness
    })
)
chimney.position.set(-1.2, 3.2, -1.2)
house.add(chimney)

//Road
const road = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 4),
    new THREE.MeshStandardMaterial({ color: '#3a3737'})
)
road.rotation.x = - Math.PI * 0.5
road.position.y = 0.001
road.position.z = 8

const line = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 0.2),
    new THREE.MeshStandardMaterial({ color: '#ddddddff'})
)
line.rotation.x = - Math.PI * 0.5
line.position.y = 0.002
line.position.z = 8

house.add(road, line)

//roadlight
const pole1 = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 2.9, 12),
    new THREE.MeshStandardMaterial({ color: '#777'})
)
pole1.position.z = 5.5
pole1.position.x = -2
pole1.position.y = 1

const pole2 = new THREE.Mesh(
    new THREE.CylinderGeometry(0.05, 0.05, 1.5, 12),
    new THREE.MeshStandardMaterial({ color: '#777'})
)
pole2.rotation.x = - Math.PI * 0.55
pole2.position.x = -2
pole2.position.z = 5.7
pole2.position.y = 2.4

const boxlight = new THREE.Mesh(
    new THREE.BoxGeometry(0.3, 0.1, 0.5),
    new THREE.MeshStandardMaterial({ color: '#777'})
)
boxlight.rotation.x = - Math.PI * 0.05
boxlight.position.z = 6.2
boxlight.position.x = -2
boxlight.position.y = 2.4

house.add(pole1, pole2, boxlight)

//Grave
const graves = new THREE.Group()
scene.add(graves)

const gravegeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const gravematerial = new THREE.MeshStandardMaterial({ color: '#b2b6b1'})

for(let i = 0; i < 70; i++)
{
    const angle = Math.random() * Math.PI * -1
    const radius = 3 + Math.random() * 6
    const x = Math.cos(angle) * radius 
    const z = Math.sin(angle) * radius
    const grave = new THREE.Mesh(gravegeometry, gravematerial)
    grave.position.set(x, 0.3, z)
    grave.rotation.z = (Math.random() - 0.5) * 0.4
    grave.rotation.y = (Math.random() - 0.5) * 0.4
    graves.add(grave)
    grave.castShadow = true
}

// Floor
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({
        map: grasscolor,
        aoMap: grassambient,
        normalMap: grassnormal,
        roughnessMap: grassroughness 
    })
)
floor.rotation.x = - Math.PI * 0.5
floor.position.y = 0
scene.add(floor)

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#202e53', 0.5)
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
scene.add(ambientLight)

// Directional light
const moonLight = new THREE.DirectionalLight('#202e53', 0.5)
moonLight.position.set(4, 5, - 2)
gui.add(moonLight, 'intensity').min(0).max(1).step(0.001)
gui.add(moonLight.position, 'x').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'y').min(- 5).max(5).step(0.001)
gui.add(moonLight.position, 'z').min(- 5).max(5).step(0.001)
scene.add(moonLight)

//Door light 
const doorlight = new THREE.PointLight('#978624', 3, 3)
doorlight.position.set(0, 2.2, 2.7)
house.add(doorlight)

//Roadlight
const roadlight = new THREE.SpotLight('#978624',  7, 7, Math.PI * 3, 0.3, 3)
roadlight.position.set(-2, 2.5, 6.3)
roadlight.castShadow = true
roadlight.shadow.mapSize.width = 254
roadlight.shadow.mapSize.height = 254
roadlight.shadow.radius = 7
roadlight.target.position.set(-2, -1, 6.3)

const boxpointlight = new THREE.PointLight('#978624', 3, 3)
boxpointlight.position.set(-2, 2.3, 6.3)

house.add(roadlight, roadlight.target, boxpointlight)

//Ghosts 
const ghost1 = new THREE.PointLight('#ada8a8', 0.5, 3)
const ghost2 = new THREE.PointLight('#ada8a8', 0.5, 3)
const ghost3 = new THREE.PointLight('#ada8a8', 0.5, 3)
scene.add(ghost1, ghost2, ghost3)

moonLight.castShadow = true
doorlight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true
walls.castShadow = true

floor.receiveShadow = true
road.receiveShadow = true
line.receiveShadow = true

moonLight.shadow.mapSize.width = 258
moonLight.shadow.mapSize.height = 258
moonLight.shadow.camera.far = 10

doorlight.shadow.mapSize.width = 258
doorlight.shadow.mapSize.height = 258
doorlight.shadow.camera.far = 7

ghost1.shadow.mapSize.width = 258
ghost1.shadow.mapSize.height = 258
ghost1.shadow.camera.far = 7

ghost2.shadow.mapSize.width = 258
ghost2.shadow.mapSize.height = 258
ghost2.shadow.camera.far = 7

ghost3.shadow.mapSize.width = 258
ghost3.shadow.mapSize.height = 258
ghost3.shadow.camera.far = 7

//Fog
const fog = new THREE.Fog('#4f6c79', 1, 20)
scene.fog = fog

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
camera.position.x = 4
camera.position.y = 2
camera.position.z = 10
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
renderer.setClearColor('#999b9e')
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    //Ghosts
    const ghostangle = elapsedTime * 0.5
    ghost1.position.x = Math.cos(ghostangle) * 4
    ghost1.position.z = Math.sin(ghostangle) * 4
    ghost1.position.y = Math.sin(elapsedTime * 3)

    const ghost2angle = elapsedTime * 0.3
    ghost2.position.x = Math.cos(ghost2angle) * 5
    ghost2.position.z = Math.sin(ghost2angle) * 5
    ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

    const ghost3angle = elapsedTime * 0.1
    ghost3.position.x = Math.cos(ghost3angle) * (7 + Math.sin(elapsedTime * 0.3))
    ghost3.position.z = Math.sin(ghost3angle) * (7 + Math.sin(elapsedTime * 0.5))
    ghost3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()