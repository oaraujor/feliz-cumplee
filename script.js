function createStars() {
    const stars = document.querySelector('.stars');
    stars.innerHTML = '';
    for(let i=0; i<80; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 7 + 1;
        star.style.width = star.style.height = size + 'px';
        star.style.top = Math.random() * 100 + 'vh';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.opacity = Math.random() * 0.7 + 0.3;
        star.style.animationDuration = (Math.random()*2+2) + 's';
        stars.appendChild(star);
    }
}
createStars();

//confetti

const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
let confettiParticles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function createConfetti() {
    confettiParticles = [];
    for(let i=0; i<120; i++) {
        confettiParticles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * -canvas.height,
            r: Math.random()*7+3,
            d: Math.random()*canvas.height,
            color: `hsl(${Math.random()*360},80%,60%)`,
            tilt: Math.random()*10-5,
            tiltAngle: Math.random()*Math.PI*2,
            speed: Math.random()*3+2
        });
    }
}
function drawConfetti() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    confettiParticles.forEach(p => {
        ctx.beginPath();
        ctx.ellipse(p.x, p.y, p.r, p.r/2, p.tiltAngle, 0, 2*Math.PI);
        ctx.fillStyle = p.color;
        ctx.fill();
    });
}
function updateConfetti() {
    confettiParticles.forEach(p => {
        p.y += p.speed;
        p.x += Math.sin(p.tiltAngle) * 2;
        p.tiltAngle += 0.03;
        if(p.y > canvas.height){
            p.y = Math.random()*-40;
            p.x = Math.random()*canvas.width;
        }
    });
}

let confettiActive = false;
function runConfetti() {
    if(!confettiActive) return;
    updateConfetti();
    drawConfetti();
    requestAnimationFrame(runConfetti);
}

document.getElementById('btn-confetti').onclick = function() {
    confettiActive = true;
    createConfetti();
    runConfetti();
    setTimeout(()=>{
        confettiActive = false;
        ctx.clearRect(0,0,canvas.width,canvas.height);
    }, 4000);
};

document.getElementById('btn-easter').onclick = function() {
    document.getElementById('easter-egg').style.display = 'block';
};

document.getElementById('cake').onclick = function() {
    document.body.style.background = 'radial-gradient(circle at 60% 40%, #ffb6f7 0%, #8fd3f4 100%)';
    setTimeout(() => {
        document.body.style.background = 'linear-gradient(135deg, #ff8ec7 0%, #8fd3f4 100%)';
    }, 2000);
    alert("¡Te mando un abrazo gigante 🤍 y un pastel virtual! 🎂");
};

const cakeEasterEggs = [
    "Cupon valido para una salida 🎫",
    "Cupon valido para un cafe ☕",
    "Cupon valido para un pastel real 🍰"
];

function showCakeEasterEgg(message) {
    const popup = document.getElementById('cake-easter-egg');
    popup.innerText = message;
    popup.style.display = 'block';
    popup.style.opacity = '1';
    setTimeout(() => {
        popup.style.opacity = '0';
        setTimeout(() => {
            popup.style.display = 'none';
        }, 400);
    }, 2600);
}

document.getElementById('cake1').onclick = function() {
    showCakeEasterEgg(cakeEasterEggs[0]);
    this.style.opacity = '0';
    this.style.pointerEvents = 'none';
};
document.getElementById('cake2').onclick = function() {
    showCakeEasterEgg(cakeEasterEggs[1]);
    this.style.opacity = '0';
    this.style.pointerEvents = 'none';
};
document.getElementById('cake3').onclick = function() {
    showCakeEasterEgg(cakeEasterEggs[2]);
    this.style.opacity = '0';
    this.style.pointerEvents = 'none';
};

window.addEventListener('resize', () => {
    createStars();
});
