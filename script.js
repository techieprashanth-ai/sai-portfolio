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