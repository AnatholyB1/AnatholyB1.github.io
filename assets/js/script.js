let scene, camera, renderer, cube;

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

    // Création du cube
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshPhongMaterial({ color: 0x156289, emissive: 0x072534, emissiveIntensity: 1 });
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Lumière
    const light = new THREE.PointLight(0xFFFFFF, 2); // Augmentez la seconde valeur pour l'intensité
    light.position.set(0, 10, 10);
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040, 1);
    scene.add(ambientLight);


    // Listener pour le mouvement de la souris
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    
    // Mise à jour de la taille du rendu au redimensionnement
    window.addEventListener('resize', onWindowResize, false);

    animate();
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

function animate() {
    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;

    cube.rotation.x += 0.05 * (targetY - cube.rotation.x);
    cube.rotation.y += 0.05 * (targetX - cube.rotation.y);

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

init();
