// SECTION REVEAL ANIMATION

const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries)=>{
entries.forEach((entry)=>{

if(entry.isIntersecting){
entry.target.classList.add("show");
}

});
},{
threshold:0.15
});

sections.forEach(section=>{
observer.observe(section);
});


// COUNTER ANIMATION

const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(!entry.isIntersecting) return;

const counter = entry.target;

const target = +counter.dataset.target;

let count = 0;

const speed = target / 50;

const updateCount = ()=>{

if(count < target){

count += speed;

counter.innerText = Math.ceil(count);

requestAnimationFrame(updateCount);

}else{

counter.innerText = target + "+";

}

};

updateCount();

counterObserver.unobserve(counter);

});

},{
threshold:0.5
});

counters.forEach(counter=>{
counterObserver.observe(counter);
});


// ACTIVE NAVIGATION

const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

let current = "";

document.querySelectorAll("section").forEach((section) => {

const sectionTop = section.offsetTop - 150;

if(window.scrollY >= sectionTop){

current = section.getAttribute("id");

}

});

navLinks.forEach((link) => {

link.classList.remove("active");

if(link.getAttribute("href") === "#" + current){

link.classList.add("active");

}

});

});


// SMOOTH HERO PARALLAX

window.addEventListener("scroll",()=>{

const heroImage = document.querySelector(".profile-pic");

if(heroImage){

const scroll = window.pageYOffset;

heroImage.style.transform =
`translateY(${scroll * 0.05}px)`;

}

});

/* SCROLL PROGRESS */

window.addEventListener("scroll", () => {

const winScroll =
document.body.scrollTop ||
document.documentElement.scrollTop;

const height =
document.documentElement.scrollHeight -
document.documentElement.clientHeight;

const scrolled =
(winScroll / height) * 100;

document.getElementById(
"progress-bar"
).style.width = scrolled + "%";

});

/* THEME TOGGLE */

const themeToggle =
document.getElementById("theme-toggle");

themeToggle.addEventListener("click",()=>{

document.body.classList.toggle(
"light-theme"
);

themeToggle.textContent =
document.body.classList.contains(
"light-theme"
)
? "☀️"
: "🌙";

});

/* PARTICLES */

const particleContainer =
document.getElementById("particles");

for(let i=0;i<40;i++){

const particle =
document.createElement("div");

particle.classList.add("particle");

particle.style.left =
Math.random()*100 + "%";

particle.style.animationDuration =
(10 + Math.random()*20) + "s";

particle.style.animationDelay =
Math.random()*10 + "s";

particle.style.width =
(2 + Math.random()*5) + "px";

particle.style.height =
particle.style.width;

particleContainer.appendChild(
particle
);

}

/* THREE JS HERO */

const container =
document.getElementById("three-container");

if(container){

const scene = new THREE.Scene();

const camera =
new THREE.PerspectiveCamera(
75,
window.innerWidth/window.innerHeight,
0.1,
1000
);

const renderer =
new THREE.WebGLRenderer({
alpha:true,
antialias:true
});

renderer.setSize(
window.innerWidth,
window.innerHeight
);

container.appendChild(
renderer.domElement
);

const geometry =
new THREE.IcosahedronGeometry(
2,
1
);

const material =
new THREE.MeshBasicMaterial({
color:0x00d4ff,
wireframe:true
});

const shape =
new THREE.Mesh(
geometry,
material
);

scene.add(shape);

camera.position.z = 5;
let mouseX = 0;
let mouseY = 0;

document.addEventListener(
"mousemove",
(event)=>{

mouseX =
(event.clientX /
window.innerWidth) * 2 - 1;

mouseY =
(event.clientY /
window.innerHeight) * 2 - 1;

}
);
document.addEventListener(
"touchmove",
(event)=>{

mouseX =
(event.touches[0].clientX /
window.innerWidth) * 2 - 1;

mouseY =
(event.touches[0].clientY /
window.innerHeight) * 2 - 1;

}
);
function animate(){

requestAnimationFrame(
animate
);

shape.rotation.x += 0.002;
shape.rotation.y += 0.003;

shape.rotation.x +=
(mouseY - shape.rotation.x) * 0.02;

shape.rotation.y +=
(mouseX - shape.rotation.y) * 0.02;

renderer.render(
scene,
camera
);

}

animate();

window.addEventListener(
"resize",
()=>{

camera.aspect =
window.innerWidth /
window.innerHeight;

camera.updateProjectionMatrix();

renderer.setSize(
window.innerWidth,
window.innerHeight
);

}
);

}
/* PARTICLE NETWORK */

const canvas =
document.getElementById("network");

if(canvas){

const ctx =
canvas.getContext("2d");

canvas.width =
window.innerWidth;

canvas.height =
window.innerHeight;

const particles = [];

const count = 60;

for(let i=0;i<count;i++){

particles.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,

vx:(Math.random()-0.5)*0.6,
vy:(Math.random()-0.5)*0.6

});

}

function animateNetwork(){

ctx.clearRect(
0,
0,
canvas.width,
canvas.height
);

particles.forEach((p)=>{

p.x += p.vx;
p.y += p.vy;

if(
p.x < 0 ||
p.x > canvas.width
){
p.vx *= -1;
}

if(
p.y < 0 ||
p.y > canvas.height
){
p.vy *= -1;
}

ctx.beginPath();

ctx.arc(
p.x,
p.y,
2,
0,
Math.PI*2
);

ctx.fillStyle =
"#00d4ff";

ctx.fill();

});

for(let a=0;a<particles.length;a++){

for(let b=a+1;b<particles.length;b++){

const dx =
particles[a].x -
particles[b].x;

const dy =
particles[a].y -
particles[b].y;

const distance =
Math.sqrt(dx*dx + dy*dy);

if(distance < 120){

ctx.beginPath();

ctx.moveTo(
particles[a].x,
particles[a].y
);

ctx.lineTo(
particles[b].x,
particles[b].y
);

ctx.strokeStyle =
"rgba(0,212,255,.12)";

ctx.stroke();

}

}

}

requestAnimationFrame(
animateNetwork
);

}

animateNetwork();

window.addEventListener(
"resize",
()=>{

canvas.width =
window.innerWidth;

canvas.height =
window.innerHeight;

}
);

}