// register plugins
// gsap.registerPlugin(ScrollTrigger);
// console.log(select('#signature').getTotalLength());

const select = e => document.querySelector(e);
const selectAll = e => document.querySelectorAll(e);

const stage = select('.main');

// ================================================== intro
function initIntro() {

  gsap.from('.headline span', {
    ease: 'power2.out',
    opacity: 0,
    y: 20,
    stagger: 0.1,
    duration: 1
  });

  gsap.from('.logo > div > img', {
    ease: 'power3.out',
    opacity: 0,
    x: 80,
    duration: 1,
    stagger: 0.03,
  });

  // fadein
  const fadein = gsap.utils.toArray('.fadein');
  fadein.forEach((item, i) => {
    const anim = gsap.fromTo(item,
      {autoAlpha: 0},
      {duration: 1, autoAlpha: 1}
    );
    ScrollTrigger.create({
      trigger: item,
      animation: anim,
      toggleActions: 'play none complete none',
    });
  });

  // circles
  const circles = gsap.utils.toArray('.circle--design, .circle--dev');
  circles.forEach((circle, i) => {
    const anim = gsap.fromTo(circle,
      {autoAlpha: 0, scale: 0.9},
      {ease: 'power2.out', duration: 1.5, autoAlpha: 1, scale: 1}
    );
    ScrollTrigger.create({
      trigger: circle,
      animation: anim,
      toggleActions: 'play none complete none',
    });
  });
}

// ================================================== parallax / circles
function parallax() {
  const cDev = select('.circle--dev');
  const cDesign = select('.circle--design');

  gsap.to(cDesign, {
    scrollTrigger: {
      trigger: cDesign,
      start: 'top bottom',
      end: 'bottom top',
      ease: 'expo',
      scrub: 8,
      // markers: true,
    },
    y: 1.005 * (cDesign.offsetHeight),
  });

  gsap.to(cDev, {
    scrollTrigger: {
      trigger: cDev,
      start: 'top bottom',
      end: 'bottom top',
      ease: 'expo',
      scrub: 10,
      // markers: true,
    },
    y: -1.005 * (cDev.offsetHeight),
  });

}

// ================================================== custom cursor
// -> http://ahrengot.com/tutorials/greensock-javascript-animation
function customCursor() {

  // const cursorMain = select('#custom-cursor-main');
  const cursorFollow = select('#custom-cursor-follow');
  const draggableArea = select('#draggable-area');
  let mouseIsOver = false;

  function is_touch_enabled() {
    return 'ontouchstart' in window || navigator.maxTouchPoints;
  }

  // hide cursor on touch devices
  if (is_touch_enabled()) {
    // cursorMain.classList.add('hide');
    cursorFollow.classList.add('hide');
  }

  function moveCircle(e) {
    // gsap.to(cursorMain, {
    //   x: e.clientX,
    //   y: e.clientY,
    //   duration: 0,
    // });
    gsap.to(cursorFollow, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.4,
    });
  }

  window.addEventListener('mousemove', moveCircle);
}

// ================================================== custom cursor

// function backgroundAnimation(){
//   const background = select('.background__inner');

//   window.addEventListener('mousemove', moveBackground);

//   function moveBackground(e) {
//     gsap.to(background, {
//       x: e.clientX,
//       y: e.clientY,
//       duration: 5,
//       // scrub: 30,
//     });
//   }
// }

// ================================================== write the current year to footer
function curretYear() {
  const currentYear = new Date().getFullYear()
  const currentYearContainer = select('.currentYear');
  currentYearContainer.textContent = currentYear.toString();
}

// ================================================== fadein
// function fadeIn() {
//   // function hide(elem) {
//   //   gsap.set(elem, {autoAlpha: 0});
//   // }

//   function addInViewClass(elem) {
//     elem.classList.add('inview');
//   }

//   gsap.utils.toArray(selectAll('.x')).forEach(function(elem) {
//     // assure that the element is hidden when scrolled into view
//     // hide(elem);

//     ScrollTrigger.create({
//       trigger: elem,
//       onEnter: function() { addInViewClass(elem) },
//     });
//   });
// }

window.onload = () => {
  gsap.set(stage, { autoAlpha: 1 });
  initIntro();
  customCursor();
  // parallax();
  curretYear(); // footer
};
