const main = (function () {
   'use strict';
   /*//remove banner without jquery
   setTimeout(function() {
      const banner = document.getElementById("banner-load");
      if (banner) {
         banner.remove();
      }
   }, 5000);*/
   
   //ready jquery
   $( document ).ready( function() {
      //change img to better resolution
      $('img[data-src]').each(function() {
         _changeImg(this);
      });
      //change img to better resolution
      $('[data-srcset]').each(function() {
         _changeImg(this, 'srcset');
      });
      //change img to better resolution
      $('[data-url]').each(function() {
         _changeImg(this, 'url');
      });

      //handle aspectRatio
      _aspectRatio( ".a-r", {
         width: 16,
         height: 8.3,
         complete: function (width, height) {
            $(".cuerpo").css("top", height + "px");
         }
      });

      //animation btn sidebar
      setInterval(function() {
         doAnimate("#ds-side",{animation: "animate__heartBeat"})
      }, 7000);
      //animation btn whtsapp
      setInterval(function() {
         doAnimate("#whatsapp",{animation: "animate__pulse"})
      }, 5000);

      //sidebar hide, show
      $('#ds-side, #cerrar').click(function(e) {
         e.preventDefault();
         const $this = $(this);
         const toggleIn = $this.attr("toggleIn");
         const toggleOut = $this.attr("toggleOut");
         if ( $("#sidebar").hasClass("d-none") ) {
            doAnimate(this, {
               animation: toggleIn,
               to: true
            })
         } else {
            doAnimate(this, {
               animation: toggleOut,
               to: true,
               entry: false
            })
         }
      });

      //Btn subir al top
      var lastTop;
      $( document ).on("scroll", function () {
         let top = $(this).scrollTop();
         const $subir = $("#subir");
         if (top >= 200 && top < lastTop) {
            $subir.removeClass("animate__lightSpeedOutLeft");
            $subir.addClass("animate__lightSpeedInLeft");
         } else {
            $subir.removeClass("animate__lightSpeedInLeft");
            $subir.addClass("animate__lightSpeedOutLeft");
         }
         lastTop = top;
      });

      //Btn sidebar, toggle animate
      $('#animaciones').change(function () {
         handleLocalStorage("animaciones", $(this).prop('checked'), true);
         window.location.reload();
      });

      //Get parm animacion from url
      const animacionesUrl = _getParamValue("animaciones") || true;
      //Update Local Storage
      const animaciones = handleLocalStorage("animaciones", animacionesUrl, !!_getParamValue("animaciones"));
      
      //scroll to id url and remove old animate
      const idUrl = _getIdFromUrl();
      if (idUrl) {
         //$element.attr( "class", newClass.join(" ") );
         _scrollTo( idUrl, function(){
            const $element = $( idUrl );
            const newClass = $element.attr("class").split(" ").filter(function(className) {
               return !className.startsWith("animate__");
            });
            $element.attr( "class", newClass.join(" ") );
            doAnimate( idUrl, {animation: "animate__heartBeat"}) 
         });
      }

      //init animate of scroll
      $('.invisible').removeClass('invisible');
      if ( !idUrl && animaciones || animaciones == "on" || animaciones == "si" ) {
         const wow = new WOW({
            animateClass: 'animate__animated',
            offset: 100,
         });
         wow.init();
         $('#animaciones').prop('checked', true);
      } else {
         $('#animaciones').prop('checked', false);
      }

      //_checkURL();

   }); //end ready
   //----------------- fun down----------------------
   const nameWeb = 'EncargueSuWeb';
   
   //handle localStorage
   function handleLocalStorage(key, value = "Sin valor asignado, EncargueSuWeb.", modify = false) {
      try {
         const data = localStorage.getItem(key);
         if (data == undefined || modify && value != "Sin valor asignado, EncargueSuWeb.") {
            localStorage.setItem(key, JSON.stringify(value));
            return JSON.parse(localStorage.getItem(key));
         } else {
            return JSON.parse(data);
         }
      } catch (e) {
         return value
      }
   };
   
   //realizar animacion
   function doAnimate (element, options= {}) {
      const $element =  $(element);
      const {
         animation = $element.attr("typeAnimate"),//animacion a ejecutar
         to = false,//elemento a apliacar animacion attr html to
         entry = true,//si es una animacion de entrada o salida 
         complete=function () {}//callback al final de la animacion
      } = options;
      const attrTo= $element.attr("to");
      const $node =  to && attrTo ? $( attrTo ) : $element ;
      entry && $node.removeClass("d-none");
      console.log(animation)
      $node.addClass(`animate__animated ${ animation }`).one('animationend', function () {
         $node.removeClass(`animate__animated ${ animation }`);
         !entry && $node.addClass("d-none");
         complete();
      });
   }
   
   //-----------------internal fun down----------------------
   //register service
   function _registerSW() {

   }

   //change resolution to img to better
   function _changeImg(element, type='src') {
      const types = {
         src : 'data-src',
         url: 'data-url',
         srcset: 'data-srcset'
      }
      const attr = types[ type ];
      const img = new Image();
      const $img = $(element);
      const src = $img.attr( attr );
      img.src = src;
      img.onload = function() {
         if ( type !== 'url' ) {
            $img.attr( type, src );
         } else {
            $img.css('background-image', `url(${ src })`)
         }
      };
   }
   
   //Optener parametros de url
   function _getParamValue (param) {
      const query = window.location.search.substring(1);
      const params = query.split('&');
      for (var i = 0; i < params.length; i++) {
         var name = params[i].split('=');
         if (name[0] == param) {
            return name[1];
         }
      }
      return null;
   }
   
   //scroll to id
   function _scrollTo(element, fun= function(){}) {
      const targetOffset = $(element).offset()?.top;
      $("html, body").animate(
         {
            scrollTop: targetOffset - 100
         },{
            duration: 2000,
            complete: function() {
               fun();
            }//end complete
         }
      );//end animate
   }
   
   //handle aspect-ratio 
   function _aspectRatio( element , options = {} ) {
      const { width = 16, height = 9, from = "width", complete = function(){} } = options;
      __aspectRatio();
      $(window).resize(function () {
         __aspectRatio();
      });

      function __aspectRatio() {
         const $element = $(element);
         let aspectRatio;
         let widthElement;
         let heightElement;
         if (from === "width") {
            aspectRatio = height / width;
            widthElement = $element.width();
            heightElement = widthElement * aspectRatio;
            $element.height( heightElement );
         } else {
            aspectRatio = width / height;
            heightElement = $element.height();
            widthElement = heightElement * aspectRatio;
            $element.width( widthElement );
         }
         complete(widthElement, heightElement);
      }
   }

   //obtenr id de url
   function _getIdFromUrl() {
      const hash = window.location.hash;
      if (hash && hash.length > 1) {
         return hash;
      } else {
         return null;
      }
   }

   function _checkURL() {
      const url = window.location.href;
      const expectedUrl = "https://skueletor.github.io/";

      if (!url.startsWith(expectedUrl)) {
         window.location.href = expectedUrl + nameWeb + "/";
      }
   }


   //return doAnimate fun external
   return {
      nameWeb: nameWeb,
      handleLocalStorage: handleLocalStorage,
      doAnimate: doAnimate,
   }

})();
