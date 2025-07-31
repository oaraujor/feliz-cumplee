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

//pasteles
const cakeEasterEggs = [
    "Cupon comodin! Usalo como quieras cuando quieras. 🎫",
    "Cupon valido para un cafecito ☕",
    "Cupon valido para un pastel real 🍰"
];

const cakeElements = [
    document.getElementById('cake1'),
    document.getElementById('cake2'),
    document.getElementById('cake3')
];

const cakeRadius = 48;
const areaPadding = 10;

function randomCakePosition(radius) {
    return {
        x: Math.random() * (window.innerWidth - 2*radius - 2*areaPadding) + areaPadding + radius,
        y: Math.random() * (window.innerHeight - 2*radius - 2*areaPadding) + areaPadding + radius
    };
}
function randomVelocity() {
    let speed = 1.2 + Math.random() * 1.5;
    let angle = Math.random() * Math.PI * 2;
    return {
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed
    };
}

let cakes = [];
function initCakes() {
    cakes = [];
    for(let i=0; i<3; i++) {
        let pos, isOverlapping;
        do {
            pos = randomCakePosition(cakeRadius);
            isOverlapping = false;
            for(let j=0; j<cakes.length; j++) {
                let dx = cakes[j].x - pos.x;
                let dy = cakes[j].y - pos.y;
                let dist = Math.sqrt(dx*dx + dy*dy);
                if (dist < cakeRadius * 2) {
                    isOverlapping = true;
                    break;
                }
            }
        } while(isOverlapping);
        cakes.push({
            x: pos.x,
            y: pos.y,
            ...randomVelocity(),
            element: cakeElements[i],
            visible: true
        });
    }
    cakes.forEach(cake => {
        cake.element.style.left = (cake.x - cakeRadius) + "px";
        cake.element.style.top = (cake.y - cakeRadius) + "px";
        cake.element.style.opacity = 1;
        cake.element.style.pointerEvents = 'auto';
    });
}
initCakes();

//colisiones elasticas
function updateCakePositions() {
    let width = window.innerWidth, height = window.innerHeight;
    for(let i=0; i<cakes.length; i++) {
        let cake = cakes[i];
        if (!cake.visible) continue;
        cake.x += cake.vx;
        cake.y += cake.vy;
        if (cake.x - cakeRadius < areaPadding) {
            cake.x = areaPadding + cakeRadius;
            cake.vx *= -1;
        }
        if (cake.x + cakeRadius > width - areaPadding) {
            cake.x = width - areaPadding - cakeRadius;
            cake.vx *= -1;
        }
        if (cake.y - cakeRadius < areaPadding) {
            cake.y = areaPadding + cakeRadius;
            cake.vy *= -1;
        }
        if (cake.y + cakeRadius > height - areaPadding) {
            cake.y = height - areaPadding - cakeRadius;
            cake.vy *= -1;
        }
        cake.element.style.left = (cake.x - cakeRadius) + "px";
        cake.element.style.top = (cake.y - cakeRadius) + "px";
    }

    for(let i=0; i<cakes.length; i++) {
        for(let j=i+1; j<cakes.length; j++) {
            if (!cakes[i].visible || !cakes[j].visible) continue;
            let dx = cakes[i].x - cakes[j].x;
            let dy = cakes[i].y - cakes[j].y;
            let dist = Math.sqrt(dx*dx + dy*dy);
            if (dist < cakeRadius * 2) {
                let tempvx = cakes[i].vx;
                let tempvy = cakes[i].vy;
                cakes[i].vx = cakes[j].vx;
                cakes[i].vy = cakes[j].vy;
                cakes[j].vx = tempvx;
                cakes[j].vy = tempvy;
                let overlap = cakeRadius*2 - dist;
                let angle = Math.atan2(dy, dx);
                cakes[i].x += Math.cos(angle) * overlap/2;
                cakes[i].y += Math.sin(angle) * overlap/2;
                cakes[j].x -= Math.cos(angle) * overlap/2;
                cakes[j].y -= Math.sin(angle) * overlap/2;
            }
        }
    }
    requestAnimationFrame(updateCakePositions);
}
requestAnimationFrame(updateCakePositions);

// Window resize re-initializes cakes
window.addEventListener('resize', () => {
    createStars();
    initCakes();
});

// Clicking cakes
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

cakeElements.forEach((element, idx) => {
    element.onclick = function() {
        showCakeEasterEgg(cakeEasterEggs[idx]);
        element.style.opacity = '0';
        element.style.pointerEvents = 'none';
        cakes[idx].visible = false;
    };
});

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