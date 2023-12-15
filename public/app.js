const navBtn = document.querySelector(".nav-btn");
let isMobileNavOpened = false;
const mobileNav = document.querySelector(".nav-mobile");
const navIcons = document.querySelectorAll(".mobile-nav-btn");
const mobileNavBtns = [...navIcons];
const nextBtn = document.querySelector(".carousel-btn.next");
const prevBtn = document.querySelector(".carousel-btn.prev");
const resultForm = document.querySelector('#result-checker-form')
const closeModalBtn = document.querySelector('.close-modal-btn');


// event listeners
// toggle nav btn
navBtn.addEventListener("click", toggleMobileNav);

// toggle mobile dropdown btn
mobileNavBtns.forEach((btn) => {
  btn.addEventListener("click", toggleMobileNavList);
});

// carousel
nextBtn?.addEventListener("click", nextSlide);
prevBtn?.addEventListener("click", prevSlide);
window?.addEventListener("scroll", fixNavToTop);

// result checker
resultForm?.addEventListener('submit', checkResult);

// close modal
closeModalBtn?.addEventListener('click', closeModalPdf)


function toggleMobileNav() {
  isMobileNavOpened = !isMobileNavOpened;
  navBtn.classList.toggle("isOpened");
  mobileNav.classList.toggle("isOpened");
}

function closeMobileNav() {
  isMobileNavOpened = false;
}

function toggleMobileNavList(e) {
  const grandParent = e.target.parentElement.parentElement;
  const parent = e.target.parentElement;
  const children = parent.nextElementSibling.children;
  const childrenHeight =
    children[0].getBoundingClientRect().height * children.length;

  if (grandParent.classList.contains("isOpened")) {
    if (parent.classList.contains("with-inner-parent")) {
      grandParent.parentElement.style.height = `${
        grandParent.parentElement.children[0].getBoundingClientRect().height *
        grandParent.parentElement.children.length
      }px`;
    }

    grandParent.classList.remove("isOpened");
    parent.nextElementSibling.style.height = 0;
    return;
  }

  if (parent.classList.contains("with-inner-parent")) {
    grandParent.parentElement.style.height = `${
      parseInt(grandParent.parentElement.style.height, 10) + childrenHeight
    }px`;
  }

  grandParent.classList.add("isOpened");
  parent.nextElementSibling.style.height = `${childrenHeight}px`;
}

let timer;

function stopTimer() {
  clearInterval(timer);
}

function startTimer() {
  timer = setInterval(autoSlide, 5000);
}

startTimer();

function slide(direction, src) {
  const slides = [...document.querySelectorAll(".carousel-slide")];
  const currentSlide = document.querySelector(".carousel-slide.show");
  let index = slides.indexOf(currentSlide);
  currentSlide.classList.remove("show");

  if(src === 'btn'){
    stopTimer();
    startTimer();
  }

  if (direction === "left") {
    if (index === 0) {
      slides[slides.length - 1].classList.add("show");
      
      return;
    }
    slides[index - 1].classList.add("show");
  }

  if (direction === "right") {
    if (index === slides.length - 1) {
      slides[0].classList.add("show");
      
      return;
    }
    slides[index + 1].classList.add("show");
  }

 
}

function prevSlide() {
  slide("left", "btn");
}

function nextSlide() {
  slide("right", "btn");
}

function autoSlide() {
  slide("right", "auto");
}

// set nav to fixed on scroll
function fixNavToTop() {
  const navBar = document.querySelector(".nav");
  const smNav = document.querySelector(".nav-sm");
  if (window && window.innerWidth >= 992) {
    if (navBar.classList.contains("fixed") && window.scrollY >= 4) return;
    if (!navBar.classList.contains("fixed") && window.scrollY < 4) return;
    if (window.scrollY >= 4) {
      smNav.classList.remove('show');
      smNav.classList.add('hide');
      navBar.classList.add("fixed");
      return;
    }
    if (window.scrollY < 4) {
      smNav.classList.add('show');
      smNav.classList.remove('hide');
      navBar.classList.remove("fixed");
      return;
    }
  }
}

function closeModalPdf () {
  const modal = document.querySelector('#modal');
  modal.classList.remove('show');
}

async function submitForm(admissionNumber){
  const submitBtn = document.querySelector('.result-btn');
  submitBtn.classList.add('loading');
  const pdfViewer = document.querySelector('.pdf-viewer');
  const modal = document.querySelector('#modal');
  const errorBox = document.querySelector('.error-box');
  try {
    const res = await axios.get(`http://localhost:8002/api/v1/students/${admissionNumber}/check-student`);
    if(res.data.status === 'success'){
       submitBtn.classList.remove('loading');
       const student = res.data.data
       modal.classList.add('show');
       pdfViewer.setAttribute("src", `${student.results[0].docUrl}`);
       pdfViewer.classList.add('show');
       errorBox.classList.remove('show');
       clearForm()
    }
  } catch (error) {
    console.log(error);
     submitBtn.classList.remove('loading');
     pdfViewer.classList.remove('show');
     modal.classList.add('show');
     errorBox.classList.add('show');
     errorBox.textContent = error?.response?.data?.message || error.message
  }
}


function checkResult(e) {
  e.preventDefault();
  const admissionNumber = document.querySelector('#admissionNumber').value.toLowerCase();
  const term = document.querySelector('#term').value;
  const academicSession = document.querySelector('#session').value;
  submitForm(admissionNumber);
}

function clearForm(){
  const admissionNumber = document.querySelector('#admissionNumber');
  const term = document.querySelector('#term')
  const academicSession = document.querySelector('#session')
  admissionNumber.value = '';
  term.value = '';
  academicSession.value = '';
}