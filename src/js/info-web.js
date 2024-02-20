$(document).ready(function(){$(".ver-mas").click(function(){let t=$(this).attr("to");$(".data-modal").addClass("d-none"),$(t).removeClass("d-none")}),$(".cambiar-color").click(function(){$(this).toggleClass("btn-primary"),$(this).toggleClass("btn-danger")}),$(".rotar").click(function(){$(this).animate({deg:"+=25"},{duration:500,step:function(t){$(this).css({transform:"rotate("+t+"deg)"})}})}),$("[typeAnimate]").click(function(){main.doAnimate(this)})});

(function () {
   'use strict';
   $(document).ready(function () {
      $(".ver-mas").click(function () {

         let to = $(this).attr("to");
         $(".data-modal").addClass("d-none");
         $(to).removeClass("d-none");

      });

      //animaciones de ejemplo
      $(".cambiar-color").click(function () {
         $(this).toggleClass("btn-primary");
         $(this).toggleClass("btn-danger");
      });
      $(".rotar").click(function() {
         $(this).animate({
            deg: "+=25"
         }, {
            duration: 500,
            step: function(now) {
               $(this).css({
                  transform: "rotate(" + now + "deg)"
               });
            }
         });
      });
      $("[typeAnimate]").click(function() {
         main.doAnimate(this);
      });
   });//end ready
})();