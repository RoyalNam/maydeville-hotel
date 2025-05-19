function setupToggleTrigger({
  trigger,
  target,
  closeBtn,
  outsideClick = false,
  lockScroll = false,
}) {
  const triggerEl = document.querySelector(trigger);
  const targetEl = document.querySelector(target);
  const closeEl = closeBtn ? document.querySelector(closeBtn) : null;

  if (!triggerEl || !targetEl) return;

  triggerEl.addEventListener("click", (e) => {
    e.preventDefault();
    const isActive = targetEl.classList.toggle("active");
    if (lockScroll) {
      if (isActive) {
        openOverlay();
      } else {
        closeOverlay();
      }
    }
  });

  if (closeEl) {
    closeEl.addEventListener("click", () => {
      targetEl.classList.remove("active");
      if (lockScroll) closeOverlay();
    });
  }

  if (outsideClick) {
    document.addEventListener("click", (e) => {
      if (
        !targetEl.contains(e.target) &&
        !triggerEl.contains(e.target) &&
        targetEl.classList.contains("active")
      ) {
        targetEl.classList.remove("active");
        if (lockScroll) closeOverlay();
      }
    });
  }
}

function openOverlay() {
  document.body.classList.add("no-scroll");
  document.querySelector(".overlay").classList.add("active");
}

function closeOverlay() {
  document.body.classList.remove("no-scroll");
  document.querySelector(".overlay").classList.remove("active");
}

document.addEventListener("DOMContentLoaded", function () {
  // Scroll header
  const header = document.querySelector(".site-header");
  function toggleHeaderClass() {
    header?.classList.toggle("scrolled", window.scrollY > 50);
  }
  toggleHeaderClass();
  window.addEventListener("scroll", toggleHeaderClass);

  // Mobile nav
  setupToggleTrigger({
    trigger: ".menu-btn",
    target: ".mobile-nav",
    // outsideClick: true,
    lockScroll: true,
  });
  setupToggleTrigger({
    trigger: ".mobile-nav-close",
    target: ".mobile-nav",
    lockScroll: true,
  });
  setupToggleTrigger({
    trigger: ".sec-tour-services-detail .btn-primary",
    target: ".booking-form-section",
    outsideClick: true,
    lockScroll: true,
  });

  const btnGift = document.querySelector(".header-actions .btn-gift");
  const promotionBox = document.getElementById("promotionInfo");
  const btnClosePromotionBox = promotionBox.querySelector(".btn-close");

  btnGift.addEventListener("click", function (e) {
    e.preventDefault();

    if (promotionBox.classList.contains("is-expanded")) {
      slideUp(promotionBox);
    } else {
      slideDown(promotionBox);
    }
  });
  btnGift.click();

  btnClosePromotionBox.addEventListener("click", function (e) {
    slideUp(promotionBox);
  });
  document.querySelectorAll(".footer-heading").forEach((heading) => {
    heading.addEventListener("click", () => {
      const menu = heading.nextElementSibling;

      if (!menu) return;

      if (menu.classList.contains("is-expanded")) {
        slideUp(menu);
      } else {
        slideDown(menu);
      }
    });
  });

  document.querySelectorAll(".toggle-submenu").forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const item = toggle.closest(".mobile-nav-item");
      const submenu = item.querySelector(".mobile-submenu");

      if (!submenu) return;

      if (submenu.classList.contains("is-expanded")) {
        slideUp(submenu);
      } else {
        slideDown(submenu);
      }

      submenu.classList.toggle("active");
    });
  });

  const modal = document.getElementById("bookingModal");
  const wrapper = modal.querySelector(".form-wrapper .container");
  const closeBtn = modal.querySelector(".form-wrapper .close-btn");

  modal.addEventListener("click", function () {
    modal.classList.remove("active");
    closeOverlay();
  });
  closeBtn.addEventListener("click", function () {
    modal.classList.remove("active");
    closeOverlay();
  });

  wrapper.addEventListener("click", function (e) {
    e.stopPropagation();
  });
  //
});
document.addEventListener("DOMContentLoaded", function () {
  const today = new Date().toISOString().split("T")[0];
  const dateInput = document.getElementById("departure");
  dateInput.value = today;
  dateInput.min = today;
});
document.addEventListener("DOMContentLoaded", function () {
  const toggles = document.querySelectorAll(".footer-heading");

  toggles.forEach((btn) => {
    btn.addEventListener("click", function () {
      const parent = btn.closest(".col-12");
      const allCols = document.querySelectorAll(".col-12");

      allCols.forEach((col) => {
        if (col !== parent) {
          col.classList.remove("active");
        }
      });

      parent.classList.toggle("active");
    });
  });

  document.querySelectorAll(".content-nav .title").forEach(function (el) {
    el.addEventListener("click", function () {
      this.classList.toggle("active");
    });
  });
});

const bannerSwiper = new Swiper(".swiper-banner", {
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  speed: 600,
  effect: "fade",
  navigation: {
    nextEl: ".swiper-banner .swiper-button-next",
    prevEl: ".swiper-banner .swiper-button-prev",
  },
});

const offersSwiper = new Swiper(".swiper-offers", {
  loop: true,
  spaceBetween: 32,
  navigation: {
    nextEl: ".swiper-offers .button-next",
    prevEl: ".swiper-offers .button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1200: {
      slidesPerView: 3,
    },
  },
});

const diningSwiper = new Swiper(".swiper-dining", {
  spaceBetween: 32,
  slidesPerView: "auto",
  // centeredSlides: true,
  navigation: {
    nextEl: ".swiper-dining .button-next",
    prevEl: ".swiper-dining .button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
  },
  on: {
    init: function () {
      toggleNavButtons(this);
    },
    slideChange: function () {
      toggleNavButtons(this);
    },
  },
});

function toggleNavButtons(swiper) {
  const prevBtn = swiper.navigation.prevEl;
  const nextBtn = swiper.navigation.nextEl;

  if (swiper.isBeginning) {
    prevBtn.style.display = "none";
  } else {
    prevBtn.style.display = "block";
  }

  if (swiper.isEnd) {
    nextBtn.style.display = "none";
  } else {
    nextBtn.style.display = "block";
  }
}

const toursSwiper = new Swiper(".swiper-tours", {
  loop: true,
  spaceBetween: 32,
  navigation: {
    nextEl: ".swiper-tours .button-next",
    prevEl: ".swiper-tours .button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    992: {
      slidesPerView: 2,
    },
  },
});

const eventsSwiper = new Swiper(".swiper-events", {
  loop: true,
  spaceBetween: 32,
  navigation: {
    nextEl: ".swiper-events .button-next",
    prevEl: ".swiper-events .button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1200: {
      slidesPerView: 3,
    },
  },
});
const newsSwiper = new Swiper(".swiper-news", {
  loop: true,
  spaceBetween: 32,
  navigation: {
    nextEl: ".swiper-news .button-next",
    prevEl: ".swiper-news .button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1200: {
      slidesPerView: 3,
    },
  },
});
const accommodationSwiper = new Swiper(".accommodation-swiper", {
  slidesPerView: "auto",
  centeredSlides: true,
  loop: true,
  spaceBetween: 30,
  navigation: {
    nextEl: ".button-next",
    prevEl: ".button-prev",
  },

  on: {
    init: function () {
      updateContent(this.slides[this.activeIndex]);
    },
    slideChange: function () {
      updateContent(this.slides[this.activeIndex]);
    },
  },
});

const roomGallerySwiper = new Swiper(".room-gallery-swiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: ".room-gallery-swiper .swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".room-gallery-swiper .button-next",
    prevEl: ".room-gallery-swiper .button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
  },
});
const diningGallerySwiper = new Swiper(".gallery-slider", {
  slidesPerView: 1,
  // spaceBetween: 30,
  loop: true,
  pagination: {
    el: ".gallery-slider .swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".gallery-slider .button-next",
    prevEl: ".gallery-slider .button-prev",
  },
});
const lightboxSwiper = new Swiper(".lightbox-swiper", {
  slidesPerView: 1,
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".lightbox-swiper .swiper-pagination",
    type: "fraction",
  },
  navigation: {
    nextEl: ".lightbox-swiper .button-next",
    prevEl: ".lightbox-swiper .button-prev",
  },
});

lightboxSwiper.autoplay.stop();

const items = document.querySelectorAll(".masonry .item");
const lightbox = document.querySelector(".lightbox-slider");

items.forEach((item, index) => {
  item.addEventListener("click", () => {
    lightbox.classList.add("active");
    openOverlay();

    lightboxSwiper.slideToLoop(index);
  });
});

function closeLightbox() {
  lightbox.classList.remove("active");
  closeOverlay();
  lightboxSwiper.autoplay.stop();
  stopProgressBar();
  isPlaying = false;
  playButton.classList.remove("icon-stop");
  playButton.classList.add("icon-play");
}

document.querySelector(".icon-xmark").addEventListener("click", closeLightbox);

const playButton = document.querySelector(".toggle-play");
const progressBar = document.querySelector(".progress-bar");
let isPlaying = false;

function startProgressBar() {
  progressBar.style.animation = "none";
  progressBar.offsetHeight;
  progressBar.style.animation = "progressAnimation 3s linear";
}

function stopProgressBar() {
  progressBar.style.animation = "none";
  progressBar.style.width = "0%";
}

playButton.addEventListener("click", () => {
  if (!isPlaying) {
    lightboxSwiper.autoplay.start();
    startProgressBar();
    isPlaying = true;
    playButton.classList.remove("icon-play");
    playButton.classList.add("icon-stop");
  } else {
    lightboxSwiper.autoplay.stop();
    stopProgressBar();
    isPlaying = false;
    playButton.classList.remove("icon-stop");
    playButton.classList.add("icon-play");
  }
});

lightboxSwiper.on("slideChange", () => {
  if (isPlaying) {
    startProgressBar();
  }
});

function updateContent(slide) {
  const title = slide.getAttribute("data-title") || "";
  const area = slide.getAttribute("data-area") || "";
  const guest = slide.getAttribute("data-guest") || "";
  const bed = slide.getAttribute("data-bed") || "";

  document.getElementById("accommodation-title").innerText = title;
  document.getElementById("accommodation-area").innerText = area;
  document.getElementById("accommodation-guest").innerText = guest;
  document.getElementById("accommodation-bed").innerText = bed;
}

const buttons = document.querySelectorAll(".btn-container button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((btn) => btn.classList.remove("active"));

    button.classList.add("active");
  });
});

//
let hideTimeout;
const controls = document.querySelector(".controls-wrapper");

function showControls() {
  controls.classList.remove("hidden");
}

function hideControls() {
  controls.classList.add("hidden");
}

function resetTimer() {
  showControls();
  clearTimeout(hideTimeout);
  hideTimeout = setTimeout(hideControls, 4000);
}

["mousemove", "keydown", "touchstart"].forEach((evt) =>
  document.addEventListener(evt, resetTimer)
);

resetTimer();

function slideDown(el) {
  if (
    el.classList.contains("is-expanded") ||
    el.classList.contains("is-transitioning")
  )
    return;

  el.classList.add("is-transitioning");
  el.style.maxHeight = el.scrollHeight + "px";

  el.addEventListener("transitionend", function handler() {
    el.classList.remove("is-transitioning");
    el.classList.add("is-expanded");
    // el.style.maxHeight = "";
    el.removeEventListener("transitionend", handler);
  });
}

function slideUp(el) {
  if (
    !el.classList.contains("is-expanded") ||
    el.classList.contains("is-transitioning")
  )
    return;

  el.style.maxHeight = "0px";
  el.classList.remove("is-expanded");
  el.classList.remove("is-transitioning");
}
