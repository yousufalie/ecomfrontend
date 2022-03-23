
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }


  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }




  /**
   * Preloader
   */
  let preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }




  // Today's deal Or trending products =======================

  var sliders = document.querySelectorAll(".slider-wrapper");

  window.addEventListener("resize", () => {
    for (let i = 0; i < sliders.length; i++) {
      setWrapperWidth(sliders[i]);
    }
  });

  for (let i = 0; i < sliders.length; i++) {
    let slider = sliders[i].querySelector(".slider");
    let wrapper = slider.querySelector(".wrapper");

    setWrapperWidth(sliders[i]);

    // prev/next event listeners
    let navR = sliders[i].querySelector("nav .right");
    let navL = sliders[i].querySelector("nav .left");

    slider.addEventListener("scroll", () => {
      if (slider.scrollLeft === 0) navL.classList.add("disabled");
      else navL.classList.remove("disabled");

      if (slider.scrollLeft >= wrapper.clientWidth - slider.clientWidth)
        navR.classList.add("disabled");
      else navR.classList.remove("disabled");
    });

    if (navR)
      navR.addEventListener("click", (e) => {
        navL.classList.remove("disabled");
        transition(slider, 0, slider.clientWidth, "right", () => {
          if (slider.scrollLeft >= wrapper.clientWidth - slider.clientWidth) {
            navR.classList.add("disabled");
          }
        });
      });

    if (navL)
      navL.addEventListener("click", (e) => {
        navR.classList.remove("disabled");
        transition(slider, 0, slider.clientWidth, "left", () => {
          if (slider.scrollLeft == 0) navL.classList.add("disabled");
        });
      });
  }

  function transition(el, from, to, dir, cb) {
    let inc = from;
    let spd = 20;
    let interval = setInterval(() => {
      if (inc >= to) {
        clearInterval(interval);
        spd = to - inc;
        cb(); // callback
      }
      el.scrollLeft = dir === "right" ? el.scrollLeft + spd : el.scrollLeft - spd;
      inc += spd;
    }, 8);
  }

  function setWrapperWidth(sliderWrapper) {
    let slider = sliderWrapper.querySelector(".slider");
    let wrapper = slider.querySelector(".wrapper");
    let slides = wrapper.querySelectorAll(".slide");
    wrapper.style.width = slides.length * slides[0].clientWidth + "px";
  }


  // =========== Nav dropdown

  document.getElementById('bar').addEventListener('click', function () {
    document.getElementById('nav-menu').style.display = "flex";
    document.getElementById('bar').style.display = "none";
    document.getElementById('close-bar').style.display = "block";
  })
  document.getElementById('close-bar').addEventListener('click', function () {
    document.getElementById('nav-menu').style.display = "none";
    document.getElementById('bar').style.display = "block";
    document.getElementById('close-bar').style.display = "none";
  })
