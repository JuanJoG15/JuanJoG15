// Resetear formulario

$.fn.reset=function(){$(this).each(function(){this.reset()})}

// Formulario a objeto JSON

$.fn.getForm = function()
{
  var o = {};
  var a = this.serializeArray();
  $.each(a, function() {
    if (o[this.name] !== undefined) {
      if (!o[this.name].push) {
        o[this.name] = [o[this.name]];
      }
      o[this.name].push(this.value || '');
    } else {
      o[this.name] = this.value || '';
    }
  });
  return o;
};

// Cambiar entre ventanas

function to(page){$.mobile.changePage("#"+page);}

// Funciones de login

function login()
{
  data = $("#login_form").getForm();
  console.log(data);
  if(data.user=="user"&&data.password=="12345")
  {
    window.localStorage.setItem("logued",true);
    window.localStorage.setItem("user","user");
    to("panel");
    $("#login_form").reset();
    $("#login_fail").html("");
  }
}

function unlog()
{
  window.localStorage.removeItem("logued");
  window.localStorage.removeItem("user");
  window.localStorage.removeItem("identifier");
  to("login");
}

/* Funciones iniciales */

$(function(){$("body>[data-role='panel']").panel();});

$(document).on('pageinit','#login',function(){
  if(window.localStorage.getItem("logued")=="true"){to("panel");}
});