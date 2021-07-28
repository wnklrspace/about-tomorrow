// register plugins
// gsap.registerPlugin(ScrollTrigger);
// console.log(select('#signature').getTotalLength());

const select = e => document.querySelector(e);
const selectAll = e => document.querySelectorAll(e);
const colorBrandPrimary = '#3BA55D';

const stage = select('.main');
const body = select('.body');
let page = $('.document')

// Slider
let oneSlide,
    twoSlide,
    threeSlide;

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

     if(!item.hasClass('locked')){
        if(description.hasClass('show')){
          description.removeClass('show');
          page.removeClass('no-scroll');
        } else {
            description.addClass('show');
            page.addClass('no-scroll');
            initSwiper();
        }
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

    // threeSlide.destroy( true, true );
    // twoSlide.destroy( true, true );
    // oneSlide.destroy( true, true );

    destroySlider();

    if(itemParent.hasClass('show')){
        itemParent.removeClass('show');
        page.removeClass('no-scroll');
        destroySlider();
     } else {
        itemParent.addClass('show');
        page.addClass('no-scroll');
     }
  })
};

// ================================================== init Swiperslider
function initSwiper() {
  threeSlide = new Swiper('.threeSlide', {
    slidesPerView: 1,
    spaceBetween: 30,
    // freeMode: true,
    slidesOffsetAfter: 0,
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
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  })

  twoSlide = new Swiper('.twoSlide', {
    slidesPerView: 1,
    spaceBetween: 10,
    // freeMode: true,
    slidesOffsetAfter: 0,
    // scrollbar: {
    //   el: ".swiper-scrollbar",
    //   hide: true,
    // },
    breakpoints: {
      990: {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
      1320: {
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
    }
  })

  oneSlide = new Swiper('.oneSlide', {
    slidesPerView: 1,
    spaceBetween: 30,
    // freeMode: true,
    slidesOffsetAfter: 0,
    centeredSlides: true,
    // scrollbar: {
    //   el: ".swiper-scrollbar",
    //   hide: true,
    // }
    breakpoints: {
        990: {
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }
      }
    }
  })
}

// ================================================== destroy swiper
function destroySlider(){
  if(oneSlide !== undefined){
    oneSlide.forEach(slider => {
      slider.destroy();
      console.log("destroyed oneSlide")
    })
  }
  if(twoSlide !== undefined){
    twoSlide.destroy();
    console.log("destroyed twoSlide")
  }
  if(threeSlide !== undefined){
    threeSlide.destroy();
    console.log("destroyed threeSlide")
  }
}


// ================================================== custom cursor
// -> http://ahrengot.com/tutorials/greensock-javascript-animation
function customCursor() {

  // const cursorMain = select('#custom-cursor-main');
  const cursorEye = select('#custom-cursor-eye');
  const cursorFollow = select('#custom-cursor-follow');
  const draggableArea = select('#draggable-area');
  const btns = selectAll('.btn');
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
    gsap.to(cursorEye, {
      x: e.clientX,
      y: e.clientY,
      duration: 0,
    });
    gsap.to(cursorFollow, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.4,
    });
  }

  // btns.forEach(btn => {
  //   btn.addEventListener('mouseover', () => {
  //     cursorEye.classList.add('show');
  //     cursorFollow.classList.add('hide');
  //     btn.classList.add('no-cursor');
  //     body.classList.add('no-cursor');
  //     console.log('classes get added');
  //   })
  //   btn.addEventListener('mouseleave', () => {
  //     cursorEye.classList.remove('show');
  //     cursorFollow.classList.remove('hide');
  //     btn.classList.remove('no-cursor');
  //     body.classList.remove('no-cursor');
  //   })
  // })

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
