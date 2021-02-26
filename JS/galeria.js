var app = angular.module('julioApp', []);

//Botón cerrar ventana emergente.

function ocultar1() {
    $("#emergenteIlustra").css("display", "none").css("animation-name", "none");
}




function casos(opcion) {
    var categoria = $(' h1 #seccionVer');
        
    switch (opcion) {
    case 0:
        $('#seccionVer h1').text('ILUSTRACIÓN');
        return "imagenes.json";
    case 1:
        $('#seccionVer h1').text('LOGOS');
        return "logos.json";
    case 2:
        $('#seccionVer h1').text('WEB FRONT-END');
        return "web.json";
    
    }
}

$('.menuS').click(function(){
    var $href = $(this).attr('href');
    var $anchor = $($href).offset();
    $('body').animate({ scrollTop: $anchor.top },"slow");
    return false;

});





$('.seccionMostrar').mouseover(function() {
    
    animation($(this).children(".seccionMostrarArriba"));
});

$('.seccionMostrar').mouseout(function() {
    mouseOut($(this).children(".seccionMostrarArriba"));
});

function animation($aux) {
	$aux.css("display", "flex");
	$aux.css("opacity", "0.6");
	$aux.css("animationName", "arriba");
	$aux.css("animationDuration", "0.3s");
}

function mouseOut($aux) {
	$aux.css("display", "none");
	$aux.css("animationName", "none");
}

