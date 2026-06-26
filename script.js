function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.style.display = 'none';
    });
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.style.display = 'block';
    }
}

const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');

let particlesArray = [];
const numberOfParticles = 80;
const maxDistance = 150;

let mouse = { x: null, y: null };

window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = (Math.random() * 1) - 0.5;
        this.speedY = (Math.random() * 1) - 0.5;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
        if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;
    }

    draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    particlesArray = [];
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();

        if (mouse.x !== null && mouse.y !== null) {
            let dx = mouse.x - particlesArray[i].x;
            let dy = mouse.y - particlesArray[i].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
                let opacity = 1 - (distance / maxDistance);
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(mouse.x, mouse.y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animate);
}

init();
animate();

document.addEventListener('DOMContentLoaded', () => {
    showPage('home');
});
