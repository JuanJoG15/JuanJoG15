// Muestra un formulario para un documento especifico

function form_to()
{
  data = $("#nuevo_doc").getForm();
  $(".sub_form, .btn_guardar").hide();
  if(data.tipo_doc!=0)
  {
    $("#sub_"+data.tipo_doc+" , .btn_guardar").show();
  }
}

// Guarda los datos de un documento

function guarda_doc()
{
  data = $("#nuevo_doc").getForm();
  json_info = JSON.stringify(data)
  switch(data.tipo_doc)
  {
    case "1": id = data.sub_1_numero; break;
    case "2": id = data.sub_2_numero; break;
  }
  localStorage.setItem(data.tipo_doc+"-"+id,json_info);
  $("#nuevo_doc").reset();
  $(".sub_form, .btn_guardar").hide();
  alert("El documento ha sido guardado");
  to("panel");
}

function listar()
{
  $("#lista_docs").html("");
  html = '<ul id="lista" data-role="listview">';
  for (var i=0; i<localStorage.length;i++)
  {
    key = localStorage.key(i);
    if(key!="user"&&key!="logued")
    {
      info = JSON.parse(localStorage[key]);
      console.log(key);
      html += '<li><a href="#view" onclick="view(\''+key+'\')">'+tipos[info["tipo_doc"]]+" "+key.split("-")[1]+'</a></li>';
    }
  }
  html += '</ul>';
  $("#lista_docs").html(html);
  $("#lista").trigger("create");
}

function view(key)
{
  console.log(key);
  $("#id_eliminar").val(key);
  window.doc_info = JSON.parse(localStorage[key]);
  $("#tipo").html(tipos[window.doc_info.tipo_doc]);
  $("#preform_"+window.doc_info.tipo_doc).find('strong').each(function(){
    id = $(this).attr("id").replace("view_","");
    $("#view_"+id).html(window.doc_info[id]);
  });
  $("#preform_"+info.tipo_doc).show();
}

tipos =
  {
    "1":"Tarjeta de identidad",
    "2":"Tarjeta bancaria"
  };

function eliminar()
{
  if(confirm("Desea eliminar este documento ?"))
  {
    key = $("#id_eliminar").val();
    console.log(key);
    localStorage.removeItem(key);
    to("panel");
    alert("Documento eliminado");
  }
}

function getPhoto(source) {
  // Retrieve image file location from specified source
  navigator.camera.getPicture(onPhotoURISuccess, onFail, { quality: 50,
    destinationType: destinationType.FILE_URI,
    sourceType: source });
}

function foto()
{
  uri = getPhoto(0);
  alert(uri);
}