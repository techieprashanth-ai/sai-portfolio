const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
},{
  threshold:0.15
});

sections.forEach((section)=>{
  observer.observe(section);
});

const counters = document.querySelectorAll("#stats h2");

counters.forEach(counter => {
  const target = counter.innerText;
  counter.style.opacity = "0";
  
  setTimeout(() => {
    counter.style.opacity = "1";
  }, 500);
});