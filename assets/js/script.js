let scene, camera, renderer, cube;
let textureLoader = new THREE.TextureLoader();

function init() {
    // Création de la scène
    scene = new THREE.Scene();

    // Initialisation de la caméra
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Création du rendu et ajout au DOM
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Chargeons la texture
    textureLoader.load('texture.jpg', function(texture) {
        // Une fois la texture chargée, nous pouvons créer le cube avec la texture
        const geometry = new THREE.BoxGeometry(2, 2, 2);
        const material = new THREE.MeshPhongMaterial({ 
            map: texture, 
            emissive: 0x072534, 
            emissiveIntensity: 1 
        });
        cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        // Lumière
        const light = new THREE.PointLight(0xFFFFFF, 2); 
        light.position.set(0, 10, 10);
        scene.add(light);

        const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5); // Lumière de fond claire
        scene.add(ambientLight);

        // Puis on lance l'animation
        animate();
    });
}

let mouseX = 0, mouseY = 0;
let targetX = 0, targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowHalfX);
    mouseY = (event.clientY - windowHalfY);
}

function onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    renderer.setSize(width, height);
}

let autoRotateSpeedX = 0.005;
let autoRotateSpeedY = 0.005;

function animate() {
    // Rotation automatique
    cube.rotation.x += autoRotateSpeedX;
    cube.rotation.y += autoRotateSpeedY;

    // Influence de la souris sur la vitesse de rotation
    let targetSpeedX = 0.005 + mouseX * 0.0001;
    let targetSpeedY = 0.005 + mouseY * 0.0001;
    
    autoRotateSpeedX += (targetSpeedX - autoRotateSpeedX) * 0.05;
    autoRotateSpeedY += (targetSpeedY - autoRotateSpeedY) * 0.05;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

init();
