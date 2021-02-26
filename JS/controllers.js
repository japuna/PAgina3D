var galeria = 0; 


app.controller('verCtrl', function ($scope, $http) {
    $scope.images = "";
    $scope.sizeImage = function (id) {
      
    
        
	    document.getElementById("emergenteIlustra").style.display = "block";
	    document.getElementById("emergenteIlustra").style.animationName = "emerge1";
	    document.getElementById("tituloIlustra").innerHTML = "<center><h1>" + $scope.images[id].titleItem + "</h1></center>";
	    document.getElementById("descripcionIlustra").innerHTML = "<center>" + $scope.images[id].description + "</center>";
        
        if($scope.images[id].image){
             $("#imagenIlustra1").hide(100);
             $("#imagenIlustra2").hide(100);
            $("#imagenIlustra").show(100);
            document.getElementById("imagenIlustra").style.backgroundImage = "url('" + $scope.images[id].image + "')";
        }
        else{
             $("#imagenIlustra").hide(100);
            $("#imagenIlustra1").show(100);
            $("#imagenIlustra1").css("background-image","url('" + $scope.images[id].image1 + "')");
            
             $("#imagenIlustra2").show(100);
            $("#imagenIlustra2").css("background-image","url('" + $scope.images[id].image2 + "')");
        }
    };

    $scope.eventos = function (id) {
        $('#imagen' + id).click(function () {
            $scope.sizeImage(id - 1);
        });
    };
      
    $scope.init = function () {
        var i = 0;
        var contador = 0;
        var numeroImagenes = $scope.images.length;
        var contenedor = document.getElementById("seleccion");
        var filas = 0;
        var idImagen = 1;
        var auxNumeroImagenes = 0;
        var aux = 0;
        var fila = " ";
    
        contenedor.innerHTML = " ";
        
        while (numeroImagenes > 0) {
            filas++;
            contenedor.innerHTML = contenedor.innerHTML + "<div id='fila" + filas + "' class='fondoCuadrosSeleccion' ></div>";

            if (numeroImagenes >= 5) {
                auxNumeroImagenes = 5;
            } else {
                auxNumeroImagenes = numeroImagenes;
            }
    
            for (i = 0; i < auxNumeroImagenes; i++) {
                fila = document.getElementById("fila" + filas);
                $("#fila" + filas).append("<div class = 'cuadroseccion' id = 'imagen" + idImagen + "'></div>");
              //  fila.innerHTML = fila.innerHTML+ "<div class = 'cuadroseccion' id = 'imagen" + idImagen + "' ng-click ='sizeImage('" + aux + ")'></div>";  
                if($scope.images[idImagen - 1].image){
                $('#imagen' + idImagen).css("backgroundImage", "url('" + $scope.images[idImagen - 1].image + "')").css("backgroundSize", $scope.images[idImagen - 1].tamano);
                }else{
                $('#imagen' + idImagen).css("backgroundImage", "url('" + $scope.images[idImagen - 1].image1 + "')").css("backgroundSize", $scope.images[idImagen - 1].tamano);
                }
                
                idImagen++;
                aux = idImagen - 1;
            }
            numeroImagenes = numeroImagenes - 5;
        }
        contador = ((filas) * 200) + (filas + 2) * 20;
        contenedor.style.height = contador + "px";
        
        for (i = 1; i <= $scope.images.length; i = i + 1) {
            $scope.eventos(i);
        }
    };
   
    $scope.loadJson = function (auxiliar1) {
        var yeison = casos(auxiliar1);
        $http.get(yeison).success(function (response) {$scope.images = response.Catalogo; }).then(function () {$scope.init(); });
    };
    
    
    
    function inicio() {
        $('#next').click(function () {
            categorias(1);
        });

        $('#prev').click(function () {
            categorias(-1);
        });
        
    }
    function categorias(aux) {
        galeria+= aux;
        if (galeria > 2) {
            galeria = 0;
        } else if (galeria < 0) {
            galeria = 2;
        }
        $scope.loadJson(galeria);    
    }
    
    $scope.loadJson(0);
    inicio();

});





