import returnUsers from "./users.js";
(function () {
   'use strict';
   $(document).ready(function () {

      //get paramts from url
      const nameUrl = main.getParamValue("name") || "EncargaTuWeb";
      const pvUrl = main.getParamValue("pv") || false;

      //update local storage
      const name = main.handleLocalStorage("name", nameUrl, !!main.getParamValue("name"));
      const pv = main.handleLocalStorage("pv", pvUrl, !!main.getParamValue("pv"));

      const user = users?.[name] || users["EncargaTuWeb"];
      _renderData(user, pv);

   });


   const $username = $("#name");
   const $social = $("#social");
   const $imgUser = $("#img-user");

   const pathImg = "./src/img/";

   const users = returnUsers;

   //--------------------------------------
   function _renderData(user, pv) {
      const {name, img, social} = user;
      let cont = 0;

      $username.text(name);
      $imgUser.attr("src", pathImg + img)

      for (var link = 0; link < social.length; link++) {
         const {nameSocial, url, privated} = social[link];
         
         if (pv == "true" || !privated) {
            let animate = cont % 2 == 0 ? "animate__backInLeft" : "animate__backInRight";
            let a =`
               <li>
                  <a class="w-100 py-2 my-2 btn btn-outline-info  btn-lg wow ${ animate }" href="${ url }">
                     ${ nameSocial }
                  </a>
               </li>
            `

            $social.append(a);
            cont+=1;
         }
      }
   };

})();