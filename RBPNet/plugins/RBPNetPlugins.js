// JavaScript Document
(function ($) {
   $.fn.links_flotantes = function (ajustes) {
      var ajustes = $.extend(
         {
            botones_etiquetas: [],
            rutas: [],
         },
         ajustes
      );

      var li_ = "";

      if (ajustes.botones_etiquetas.length == 0) {
         li_ = "\n\
         <li>No hay páginas</li>\n\
         ";
      } else {
         for (var i = 0; i < ajustes.botones_etiquetas.length; i++) {
            li_ +=
               "<li onclick=\"javascript:document.location='" +
               ajustes.rutas[i] +
               "'\">" +
               ajustes.botones_etiquetas[i] +
               "</li>";
         }
      }

      var html =
         '\n\
      <ol class="menu-flotante">\n\
         ' +
         li_ +
         "\n\
      </ol>\n\
      ";

      // se imprimen los links en pantalla

      $("body").prepend(html);
   };
   $.fn.ventanaModal = function (ajustes, botones__) {
      var ajustes = $.extend({}, $.fn.ventanaModal.defaults, ajustes);

      var elemento = ".VENTANA_MODAL_1";
      // definir html
      var html_ =
         '\n\
				<div class="VENTANA_MODAL_1 anim">\n\
				<div class="vent-cont">\n\
					<div class="vent anim col-lg-8 col-md-10 col-sm-10">\n\
					<div class="info">\n\
						<h1 class="tit anim">\n\
						Iniciando postulación de Jurado\n\
						</h1>\n\
						<p class="cont anim"></p>\n\
						<p class="preg anim"></p>\n\
					</div>\n\
					<div class="filete"></div>\n\
					<div class="bots container row">\n\
							<div class="btn anim"></div>\n\
							<div class="btn anim"></div>\n\
					</div>\n\
					</div>\n\
				</div>\n\
				</div>';

      // imprimir
      if ($(elemento).length == 0) {
         $("body").append(html_);
      }

      // imprimir textos
      $(elemento + " .tit").html(ajustes.titulo);
      $(elemento + " .cont").html(ajustes.contenido);
      $(elemento + " .preg").html(ajustes.pregunta);
      // crear botones

      $(elemento).find(".bots").empty();
      ajustes.botones.forEach(function (e, i) {
         var botonesTipo_;
         if (
            ajustes.botonesTipo == undefined ||
            ajustes.botonesTipo.length == 0
         ) {
            botonesTipo_ = "btn-primary";
         } else {
            botonesTipo_ = ajustes.botonesTipo[i];
         }
         $(elemento)
            .find(".bots")
            .append(
               "<div class='anim col-xm-12 col-sm-12 col-md-3 col-lg-3 col-xlg-2 px-1'><div class='" +
                  botonesTipo_ +
                  " btn'>" +
                  e +
                  "</div></div>"
            );
      });

      $(elemento)
         .find(".bots>div")
         .each(function (i, e) {
            $(e).on("click", function () {
               gsap.to($(".VENTANA_MODAL_1"), {
                  duration: 0.25,
                  opacity: 0,
                  ease: "sine",
                  onComplete: function () {
                     // borrar la ventana modal
                     $(".VENTANA_MODAL_1").remove();
                     // ejecutar correspondiente callback
                     ajustes.botonesCallbacks[i]();
                  },
               });
            });
         });

      // animar
      var tl = gsap.timeline();

      tl.from(".VENTANA_MODAL_1", {
         duration: 0.3,
         opacity: 0,
         stagger: 0.05,
         ease: "sine",
      });

      tl.from($(".VENTANA_MODAL_1 .anim"), {
         duration: 0.3,
         y: 10,
         opacity: 0,
         stagger: 0.05,
         ease: "sine",
      });
   };

   $.fn.ventanaModal.defaults = {
      titulo: "Hola!",
      contenido:
         "Este es un mensaje predeterminado de la ventana modal del plugin <b>RBPNetPlugins.min.js</b>. Puedes predeterminarla como lo desees, si deseas saber más haz clic <a target='blank_' href='https://github.com/rafaelblanco00/RBPNetPlugins/blob/master/docs/rbp_ventana_modal.md'>aquí</a>",
      pregunta: "¿Qué deseas hacer?",
      botones: ["Aceptar"],
      botonesTIpo: ["btn-primary"],
      botonesCallbacks: [
         function () {
            // no pasa nada...
         },
      ],
   };

   $.fn.smallHelp = function (ajustes) {
      // detengo la ejecución del script si el selector no encuentra el elemento al que apunta
      if ($(this).length == 0) {
         return false;
      }

      var ajustes = $.extend({}, $.fn.smallHelp.defaults, ajustes);

      if (ajustes["ruta_json"] !== "") {
         var que_form__ = $(this);

         $.getJSON(ajustes.ruta_json + ajustes.archivo_json, function (datos) {
            var titulo = ajustes.titulo;
            // /*

            $.each($(que_form__).find("small"), function (llave, valor) {
               var tit = titulo;
               var que_tip = $(this).attr("data-rbp-small-help");
               var tip = datos["tips"][que_tip];
               var html =
                  "\n\
							 <div><strong>" +
                  tit +
                  "</strong></div>\n\
							 <div>" +
                  tip +
                  "</div\n\
						  >";
               $(this).addClass("rbp-small-help");
               $(this).html(html);
               $(this).hide();
               $(this).css("opacity", 0);

               var ver_que_tip = $(this).attr("data-rbp-small-help");
               if (ajustes.ver_que_tip == true) {
                  ver_que_tip = ": " + ver_que_tip;
               } else {
                  ver_que_tip = "";
               }

               var boton_ayuda =
                  " <span class='rbp-small-help-btn'>(Ayuda" +
                  ver_que_tip +
                  ")</span>";

               $(this).prev().prev().append(boton_ayuda);
            });

            // activación botón ver ayuda
            $(que_form__)
               .find(".rbp-small-help-btn")
               .on("click", function () {
                  //----------------//
                  var elemento = $(this).parent().next().next();
                  //----------------//
                  var slideUp__ = function (this__) {
                     $(this__).slideUp("fast", function () {});
                  };

                  $.each($("form").find("small"), function (llave, valor) {
                     if ($(this).is(":visible")) {
                        slideUp__($(this));
                     }
                  });

                  if (elemento.is(":visible")) {
                     gsap.to(elemento, {
                        duration: 0.25,
                        opacity: 0,
                        ease: "sine",
                        onComplete: function () {
                           slideUp__($(this));
                        },
                     });
                  } else {
                     elemento.slideDown("fast", function () {
                        gsap.to(elemento, {
                           duration: 0.5,
                           opacity: 1,
                           ease: "sine",
                        });
                     });
                  }
               });
         });
      } else {
         alert("Debe especificar la propiedad -ruta_json- en $.fn.smallHelp");
      }
   };

   $.fn.smallHelp.defaults = {
      duracion: 0.25,
      titulo: "Tenga en cuenta",
      ruta_json: "RBPNet/plugins/small-help-tips/",
      archivo_json: "rbp-small-help-f1.json",
      ver_que_tip: false,
   };

   $.fn.paginador = function (ajustes) {
      if ($(this).length == 0) {
         // detengo la ejecución del código
         return false;
      }

      var ajustes = $.extend({}, $.fn.paginador.defaults, ajustes);

      var paginador_html =
         '\n\
         <div style="height:20px;"></div>\n\
         <nav aria-label="...">\n\
               <ul class="pagination">\n\
                  <li class="page-item">\n\
                     <a class="page-link rbp-btn-ant" href="#" data-boton-anterior>\n\
                     <span class="d-none d-sm-block">Anterior</span>\n\
                     <span class="d-block d-sm-none">Ant.</span>\n\
                     </a>\n\
                  </li>\n\
                  \n\
                  <li class="page-item">\n\
                     <a class="page-link rbp-btn-sig" href="#" data-boton-siguiente>\n\
                     <span class="d-none d-sm-block">Siguiente</span>\n\
                     <span class="d-block d-sm-none">Sig.</span>\n\
                     </a>\n\
                  </li>\n\
               </ul>\n\
         </nav>\n\
         <div style="height:5px;"></div>\n\
         ';

      var dur = 0.25;
      var form_ = $(this);
      //var form_ = $("form[name='" + ajustes.formulario_name + "']");
      var total_grupos = form_.find(".form-row" + ajustes.paginas).length;
      var contador = 0;

      if (total_grupos > 1) {
         // agregar paginador al inicio
         $("[data-slides-cont]").before(paginador_html);

         // agregar paginador al final
         $("[data-slides-cont]").after(paginador_html);
      } else {
         // si no hay mas de una página no es necesario mostrar el paginador
      }

      // :::: TITULO AL INICIO de cada slide
      $.each($(form_).find(".form-row.rbp-slide"), function () {
         var que_titulo = $(this).attr("data-slide-titulo");
         var html = '<h6 class="slide-titulo">' + que_titulo + "</h6>";
         if (!que_titulo) {
            // si el atributo titulo no está definido entonces no se muestra el título
         } else {
            $(this).prepend(html);
         }
      });

      // :::: PIÉ AL final de cada slide
      $("[data-paginador-botones]").before(
         '\n\
      <div class="slide-pie">\n\
      <strong><span data-avance></span></strong>Utilice el botón <strong>guardar</strong> para conservar su avance. Esto le permitirá retomar el diligenciamiento del formulario (en otra ocasión) en caso de que sea necesario.\n\
      </div>'
      );

      $.fn.pasar_pagina = function (contador__, callback__ = function () {}) {
         // oculto el formaulario
         contador = contador__;
         gsap.to(form_, {
            opacity: 0,
            ease: "sine",
            duration: dur,
            onComplete: function () {
               var obj = form_.find(".form-row" + ajustes.paginas);
               obj.hide();
               obj.removeAttr("data-slide-visible");

               // muestro la pagina
               form_
                  .find(".form-row" + ajustes.paginas)
                  .eq(contador__)
                  .show();
               form_
                  .find(".form-row" + ajustes.paginas)
                  .eq(contador__)
                  .attr("data-slide-visible", "");

               callback__();

               // muestro el formulario
               gsap.to(form_, {
                  ease: "sine",
                  duracion: dur,
                  opacity: 1,
               });
               $.fn.resaltar_pagina_actual();

               // si hay un campo que necesite validación se hace foco en el
               //$.fn.enfocar_campo_invalido();//borrar
            },
         });
      };

      // mostrar primera pagina
      $.fn.pasar_pagina(contador);

      // crear páginas
      for (var i = 0; i < total_grupos; i++) {
         $(".pagination li:last-child").before(
            '<li data-page-id="' +
               i +
               '" class="page page-item"><a class="page-link rbp-page-link" href="#">' +
               (i + 1) +
               "</a></li>"
         );
      }

      // resaltar pagina actual
      $.fn.resaltar_pagina_actual = function () {
         $.each($(".pagination"), function () {
            $(this).find("li.page").removeClass("active");
            $(this).find("li.page").eq(contador).addClass("active");
         });
      };
      $.fn.resaltar_pagina_actual();

      // ocultar validacion
      var ocultar_validacion = function () {
         $("form").removeClass("was-validated");
         $.each(
            $("form")
               .find("[data-slide-visible]")
               .find("input,select,textarea"),
            function () {
               $(this).removeClass("is-valid is-invalid");
            }
         );
      };

      $("[data-boton-siguiente]").on("click", function () {
         //ocultar_validacion();
         contador++;
         if (contador == total_grupos) {
            contador = total_grupos - 1;
         }
         $.fn.pasar_pagina(contador);
         $.fn.resaltar_pagina_actual();
      });

      $("[data-boton-anterior]").on("click", function () {
         //ocultar_validacion();
         contador--;
         if (contador < 0) {
            contador = 0;
         }
         $.fn.pasar_pagina(contador);
         $.fn.resaltar_pagina_actual();
      });

      $(".pagination>li.page").on("click", function () {
         //ocultar_validacion();
         var pag = $(this).attr("data-page-id");
         contador = pag;
         $.fn.pasar_pagina(pag);
      });

      $(".pagination")
         .find(".page")
         .on("click", function () {
            // elimino el resalto de paginas
            $(".pagination").find(".page").removeClass("active");
            // marco el actual
            $(this).addClass("active");
         });

      $.fn.enfocar_campo_invalido = function () {
         $.each($("[data-slide-visible]").find(".is-invalid"), function () {
            $(this).focus();
            // al encontrar el primero, detiene la busqueda.
            return false;
         });
      };

      $.fn.validar_todo_el_formulario = function () {
         // valido todo el formulario
         $.each($("form").find("input,select,textarea"), function () {
            $(this)
               .removeClass("is-valid is-invalid")
               .addClass(this.checkValidity() ? "is-valid" : "is-invalid");
         });
      };

      $.fn.porcentaje_avance = function () {
         var porcentaje = ($.fn.avance_formulario() * 100).toFixed(0) + "%";
         return porcentaje;
      };

      $.fn.avance_formulario = function () {
         var total_inputs = form_.find("[data-slides-cont]").find("[required]")
            .length;
         var total_inputs_validos = form_.find(".is-valid[required]").length;
         var avance = (total_inputs_validos / total_inputs).toFixed(2);
         return avance;
      };

      $.fn.imprimir_avance = function () {
         // alert($.fn.avance_formulario());
         var porcentaje = ($.fn.avance_formulario() * 100).toFixed(0) + "%";
         var mensaje = "A diligenciado el " + porcentaje + " del formulario. ";
         $(form_).find(".slide-pie").find("[data-avance]").html(mensaje);
      };

      $.fn.activo_validacion_constante = function () {
         // activo la validación constante
         $("form")
            .find("input,select,textarea")
            .on("change blur keydown keyup", function () {
               $(this)
                  .removeClass("is-valid is-invalid")
                  .addClass(this.checkValidity() ? "is-valid" : "is-invalid");
               // imprimir avance
               $.fn.imprimir_avance();
            });
      };

      // activo la validación constante
      $.fn.activo_validacion_constante();

      // click en botón guarda
      $("[name='guardar-btn-001']").on("click", function () {
         $.fn.ventanaModal({
            titulo: "¿Desea guardar?",
            contenido:
               "Ha completado el " +
               $.fn.porcentaje_avance() +
               " del formulario. Utilice el botón guardar para conservar este avance. Al alcanzar el 100% del diligenciamiento se le permitirá enviar el formulario.",
            pregunta: "¿Qúe desea hacer?",
            botones: ["Guardar", "Cancelar"],
            botonesTipo: ["btn-primary", "btn-secondary"],
            botonesCallbacks: [
               function () {
                  $.fn.paginador.defaults.boton_guardar();
               },
               function () {
                  // no pasa nada.
               },
            ],
         });
      });

      $.fn.revisar_formulario = function () {
         var input_invalid = form_
            .find(".is-invalid")
            .closest(".form-row.rbp-slide")
            .index();

         if (input_invalid == -1) {
            // formulario listo para enviar
            $.fn.ventanaModal({
               titulo: "Formulario listo para enviar",
               contenido:
                  "Haz logrado diligenciar el fomulario completamente, te invidatmos a guardar tu avance o en caso contrario a proceder con el envío del mismo utilizando los botones correspondientes.",
               pregunta: "",
               botones: ["Aceptar"],
               botonesTipo: ["btn-primary"],
               botonesCallbacks: [
                  function () {
                     // no pasa nda...
                  },
               ],
            });
         } else {
            contador = input_invalid;
            $.fn.pasar_pagina(input_invalid, function () {
               $.fn.enfocar_campo_invalido();
            });
            $.fn.resaltar_pagina_actual();
         }
      };

      // clic en el botón revisar
      $("[name='btn-revisar']").on("click", function () {
         $.fn.validar_todo_el_formulario();
         $.fn.revisar_formulario();
      });

      // clic en el botón enviar

      $("[name='btn-enviar']").on("click", function () {
         // activo la validación
         $.fn.validar_todo_el_formulario();
         $.fn.activo_validacion_constante();

         // busco una formulario no validado
         if ($("form").find("input,select,textarea").hasClass("is-invalid")) {
            // si encuentra un campo no válido muestro una ventana modal
            $.fn.ventanaModal({
               titulo: "¿Desea enviar?",
               contenido:
                  "Para enviar el formulario, debe haber terminado con el diligenciamiento del mismo. Utilice el botón revisar para ir a los campos que necesitan ser diligenciados. Al terminar se le permitirá enviar el formaulario.",
               pregunta: "¿Qué desea hacer?",
               botones: ["Revisar", "Cancelar"],
               botonesTipo: ["btn-primary", "btn-secondary"],
               botonesCallbacks: [
                  function () {
                     // revisar el formulario
                     $.fn.revisar_formulario();
                  },
                  function () {
                     // no pasa nada
                  },
               ],
            });
         } else {
            $.fn.paginador.defaults.boton_enviar();
         }
      });

      // MOSTRAR NOMBRE DE LOS ARCHIVOS EN INPUTS FILE
      $.each($(this).find(".custom-file-input"), function () {
         $(this).on("change", function () {
            //get the file name
            var fileName = $(this).val();
            //replace the "Choose a file" label
            $(this).next(".custom-file-label").html(fileName);
         });
      });

      $("[data-avance]").on("click", function () {
         $.fn.imprimir_avance();
      });

      if (ajustes.ver_que_control_name == true) {
         $.each(
            $(ajustes.paginas)
               .find(".form-group")
               .find("input,select,textarea"),
            function () {
               var padre = $(this).parent();
               var control_name = padre.prop("tagName");
               var name_ = "";
               if ($(this).attr("name")) {
                  name_ = "name: " + $(this).attr("name");
               } else {
                  name_ = "(no name)";
               }
               var html = "<div class='rbp-control-name'>" + name_ + "</div>";
               padre.prepend(html);
            }
         );
      }
   };

   $.fn.paginador.defaults = {
      paginas: ".rbp-slide",
      boton_guardar: function () {
         alert(
            "Utilice la propiedad <b>$.fn.paginador.defaults.btn_guardar</b> para especificar una función que se ejecute al hacer clic en el botón <b>guardar</b>."
         );
      },
      boton_enviar: function () {
         alert(
            "Utilice la propiedad <b>$.fn.paginador.defaults.btn_enviar</b> para especificar una función que se ejecute al hacer clic en el botón <b>enviar</b>."
         );
      },
      ver_que_control: false,
   };

   $.fn.menuLateral = function (ajustes) {

      // ajustes iniciales
      var ajustes = $.extend(
         {
            caption: "Opciones",
            titulo: "¿Qué desea hacer?",
            pie: "www.rafaelblanco.net",
            botones: ["Botón No.1", "Botón No.2", "Botón No.3"],
            botonesFunciones: [
               function () {
                  alert("Acciones para el botón No.1");
               },
               function () {
                  alert("Acciones para el botón No.2");
               },
               function () {
                  alert("Acciones para el botón No.3");
               },
            ],
            colorFondo: "#121232",
            colorTextos: "#ffffff",
            colorBloqueo:"rgba(0,0,0,0.25)"
         },
         $.fn.menuLateral.defaults,
         ajustes
      );

      var opciones_html = '';
      var contador = 0;
      $.each(ajustes.botones,function(){
         opciones_html += '\n\
         <div class="col-12 __boton">\n\
            <div><span style="color:'+ajustes.colorTextos+'">'+ajustes.botones[contador]+'</span></div>\n\
         </div>';
         contador++;
      });

      // inicio del plugin
      var html =
         '\n\
        <div class="rbp-opciones-laterales __RBP_BARRA_LATERAL__" style="background-color:'+ajustes.colorBloqueo+';">\n\
            <div class="container-fluid h-100">\n\
                <div class="row justify-content-end h-100">\n\
                    <div class="__OPCIONES_LATERAL_VENTANA__ col-12 col-sm-9 col-lg-5 col-xl-4 col-xxl-3 col-md-6 px-0 h-100 rbp-opciones-laterales-sombra rbp-op-cont" style="overflow-y: scroll; background-color:'+ajustes.colorFondo+'">\n\
                        <div class="sticky row mx-0 justify-content-end rbp-ops-lateral-barra-superior" style="background-color:'+ajustes.colorFondo+'">\n\
                            <div class="col-auto px-0">\n\
                                <div class="rbp-btn-cerrar ____RBP_BOTON_CERRAR___">\n\
                                    <svg style="color:'+ajustes.colorTextos+';" width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-x" fill="currentColor"\n\
                                        xmlns="http://www.w3.org/2000/svg">\n\
                                        <path fill-rule="evenodd"\n\
                                            d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z" />\n\
                                        <path fill-rule="evenodd"\n\
                                            d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z" />\n\
                                    </svg>\n\
                                </div>\n\
                            </div>\n\
                        </div>\n\
                        <div class="row mx-0 rbp-bar-lateral-sombra-sup">\n\
                            <div class="col-12 mt-4 rbp-op-lateral-titulos">\n\
                                <div class="caption" style="color:'+ajustes.colorTextos+';">'+ajustes.caption+'</div>\n\
                                <h5 style="color:'+ajustes.colorTextos+';">'+ajustes.titulo+'</h5>\n\
                            </div>\n\
                            <div class="col w-100"></div>\n\
                            <div style="height: 20px;" class="w-100"></div>\n\
                            <div class="row w-100 mx-0 px-0 pl-2 rbp-opciones-btn">\n\
                                '+opciones_html+'\n\
                            </div>\n\
                        </div>\n\
                        <div class="__pie" style="color:'+ajustes.colorTextos+';">\n\
                           '+ajustes.pie+'\n\
                        </div>\n\
                    </div>\n\
                </div>\n\
            </div>\n\
        </div>\n\
        ';

      // imprimo el html
      $("body").prepend(html);

      gsap.from(".__RBP_BARRA_LATERAL__", {opacity: 0, duration: .5,onComplete:function(){
         var contador2 = 0;
         // se asignan las funciones a cada botón
         $.each($(".rbp-opciones-btn>.__boton"),function(){
            $(this).on("click",function(){
               ajustes.botonesFunciones[contador2]();
               contador2++;
            });
         });
      }});

      // activo el boton de cierrre

      $(".____RBP_BOTON_CERRAR___").on("click", function () {
         gsap.to(".__RBP_BARRA_LATERAL__", {opacity: 0, duration: .25,onComplete:function(){
            $(".__RBP_BARRA_LATERAL__").remove();
         }});
      });
      
   };
})(jQuery);
