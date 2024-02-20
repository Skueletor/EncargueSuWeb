$(document).ready(function(){new Swiper(".swiper",{loop:!0,pagination:{el:".swiper-pagination"},navigation:{nextEl:".swiper-button-next",prevEl:".swiper-button-prev"},autoplay:{delay:3e3},slidesPerView:1,spaceBetween:10,breakpoints:{640:{slidesPerView:2,spaceBetween:20},900:{slidesPerView:3,spaceBetween:30},1200:{slidesPerView:4,spaceBetween:40}}})});

(function () {
   $(document).ready(function() {
      const swiper = new Swiper('.swiper', {
         loop: true,
         // If we need pagination
         pagination: {
            el: '.swiper-pagination',
         },
         // Navigation arrows
         navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
         },
         autoplay: {
            delay: 3000,
         },
         slidesPerView: 1,
         spaceBetween: 10,
         // Responsive breakpoints
         breakpoints: {
            // when window width is >= 640px
            640: {
               slidesPerView: 2,
               spaceBetween: 20
            },
            // when window width is >= 900px
            900: {
               slidesPerView: 3,
               spaceBetween: 30
            },
            // when window width is >= 1200px
            1200: {
               slidesPerView: 4,
               spaceBetween: 40
            }
         },
      }); //end swiper
   }); //end ready
})();