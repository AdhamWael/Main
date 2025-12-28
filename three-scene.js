/**
 * Three.js Hero Scene
 * Creates a subtle interactive particle field / abstract shape
 */

const initHeroScene = () => {
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true
    });

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Particles
    const particlesCount = 1000;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 10;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.005,
        color: '#c4d600', // Acid Green
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Resize handler
    const onWindowResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', onWindowResize);
    onWindowResize();

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX;
        mouseY = event.clientY;
    });

    // Animation loop
    const clock = new THREE.Clock();

    const animate = () => {
        const elapsedTime = clock.getElapsedTime();

        // Update particles
        particlesMesh.rotation.y = elapsedTime * 0.05;

        // Mouse reaction
        const targetX = (mouseX / window.innerWidth - 0.5) * 2;
        const targetY = (mouseY / window.innerHeight - 0.5) * 2;

        particlesMesh.position.x += (targetX - particlesMesh.position.x) * 0.05;
        particlesMesh.position.y += (-targetY - particlesMesh.position.y) * 0.05;

        renderer.render(scene, camera);
        requestAnimationFrame(animate);
    };

    animate();
};

// Start the scene when DOM is ready
document.addEventListener('DOMContentLoaded', initHeroScene);
