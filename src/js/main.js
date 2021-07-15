// register plugins
// gsap.registerPlugin(ScrollTrigger);
// console.log(select('#signature').getTotalLength());

const select = e => document.querySelector(e);
const selectAll = e => document.querySelectorAll(e);
const colorBrandPrimary = '#3BA55D';

const stage = select('.main');
const body = select('.body');
let page = $('.document')

// ================================================== show pointer
function showPointer() {
  ScrollTrigger.create({
    trigger: '#timeline',
    start: 'top center',
    end: 'bottom center+=50px',
    toggleClass: {
      targets: '.timeline__point',
      className: 'show'
    },
    // markers: true,
  });
}

// ================================================== timeline
function timeLineAnimation() {

  let cards = $('.card'),
      cardBgs = $('.card__bg'),
      cardBg,
      container,
      cardHalfTop,
      cardHalfBottom;

  cardBgs.each(function(card, i) {
    cardBg = $(this);
    container = cardBg.parent();
    cardHalfTop = container.children('.card__half-top');
    cardHalfBottom = container.children('.card__half-bottom');

    gsap.to(cardBg, {
      scrollTrigger: {
        trigger: cardHalfTop,
        start: 'top bottom-=50%',
        end: 'bottom top+=50%',
        ease: 'expo',
        scrub: 0,
        // markers: true,
      },
      background: `radial-gradient(${colorBrandPrimary}, #fff)`,
      // opacity: 1,
      transformOrigin: 'top center',
    });

    gsap.from(cardBg, {
      scrollTrigger: {
        trigger: cardHalfBottom,
        start: 'top bottom-=50%',
        end: 'bottom top+=50%',
        ease: 'expo',
        scrub: 0,
        // markers: true,
      },
      background: `radial-gradient(${colorBrandPrimary}, #fff)`,
      // opacity: 1,
      transformOrigin: 'top center',
    });

    cardBg.css('background', 'radial-gradient(#fff,#fff)');

  });
}


// ================================================== intro
function showDescriptions() {
  let body = $('.body'),
      btns = $('.btn'),
      close = $('.description__close'),
      closeBtn = $('.description__close-btn'),
      item,
      itemParent,
      description;

  btns.on('click', function(){
     item = $(this);
     itemParent = item.parent().parent().parent().parent().parent().parent();
     description = itemParent.children('.description');

     if(description.hasClass('show')){
        description.removeClass('show');
        page.removeClass('no-scroll');
     } else {
        description.addClass('show');
        page.addClass('no-scroll');
        initSwiper();
     }
  });

  close.on('click', function(){
    item = $(this);
    itemParent = item.parent();

    if(itemParent.hasClass('show')){
        itemParent.removeClass('show');
        page.removeClass('no-scroll');
     } else {
        itemParent.addClass('show');
        page.addClass('no-scroll');
     }
     console.log('click clack')
  })

  closeBtn.on('click', function(){
    item = $(this);
    itemParent = item.parent();

    if(itemParent.hasClass('show')){
        itemParent.removeClass('show');
        page.removeClass('no-scroll');
     } else {
        itemParent.addClass('show');
        page.addClass('no-scroll');
     }
  })
};

// ================================================== init Swiperslider
function initSwiper() {
  let threeSlide = new Swiper('.threeSlide', {
      slidesPerView: 1,
      spaceBetween: 30,
      // freeMode: true,
      slidesOffsetAfter: 0,
      scrollbar: {
        el: ".swiper-scrollbar",
        hide: true,
      },
      breakpoints: {
        300: {
          // centeredSlides: true,
          slidesPerView: 1,
          spaceBetween: 10,
        },
        850: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        1920: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
        2200: {
          slidesPerView: 2,
          spaceBetween: 30,
        }
        // 1440:{
        //   slidesPerView: 4,
        //   spaceBetween: 30,
        // },
        // 1680:{
        //   slidesPerView: 4.5,
        //   spaceBetween: 30,
        // }
      },
      // navigation: {
      //   nextEl: '.swiper-button-next',
      //   prevEl: '.swiper-button-prev',
      // },
  })

  let twoSlide = new Swiper('.twoSlide', {
      slidesPerView: 1,
      spaceBetween: 30,
      freeMode: true,
      slidesOffsetAfter: 0,
      scrollbar: {
        el: ".swiper-scrollbar",
        hide: true,
      },
      breakpoints: {
        300: {
          // centeredSlides: true,
          slidesPerView: 2,
          spaceBetween: 10,
        },
        850: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        1080: {
          slidesPerView: 2,
          spaceBetween: 30,
        }
        // 1440:{
        //   slidesPerView: 4,
        //   spaceBetween: 30,
        // },
        // 1680:{
        //   slidesPerView: 4.5,
        //   spaceBetween: 30,
        // }
      },
      // navigation: {
      //   nextEl: '.swiper-button-next',
      //   prevEl: '.swiper-button-prev',
      // },
  })

  let oneSlide = new Swiper('.oneSlide', {
      slidesPerView: 1,
      spaceBetween: 30,
      // freeMode: true,
      slidesOffsetAfter: 0,
      centeredSlides: true,
      scrollbar: {
        el: ".swiper-scrollbar",
        hide: true,
      }
      // navigation: {
      //   nextEl: '.swiper-button-next',
      //   prevEl: '.swiper-button-prev',
      // },
  })

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


window.onload = () => {
  gsap.set(stage, { autoAlpha: 1 });
  customCursor();
  showPointer();
  timeLineAnimation();
  showDescriptions();
  // initSwiper();
};
