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


// NAVBAR ACTIVE LINK

const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

let current = "";

document.querySelectorAll("section").forEach(section=>{

const sectionTop = section.offsetTop - 150;

if(pageYOffset >= sectionTop){

current = section.getAttribute("id");

}

});

navLinks.forEach(link=>{

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