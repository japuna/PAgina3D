// JavaScript Document
var SCREEN_WIDTH = document.getElementById("contenedor3d").offsetWidth;//ancho de div para 3D
var SCREEN_HEIGHT = document.getElementById("contenedor3d").offsetHeight;//alto de div para el 3d

var webglRenderer = new THREE.WebGLRenderer();
var scene = new THREE.Scene();
var loader = new THREE.JSONLoader();
var factor=80;
var posIniX=-10.5;//Posición inicial en x;
var posIniY=2;
var posIniZ=7;//Posición inicial en z;

var posFinX=-3;//Posición final en x;
var posFinY=0.3;
var posFinZ=-6;//Posición final en z;
var aux=-1;
var aux1=1;
var rotIniZ=-0.5;
var contador=0;
var panta=document.documentElement.clientWidth;
var camera = new THREE.PerspectiveCamera( 45, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000 ); 
var cuerpo =new THREE.Mesh();
var cabeza=new THREE.Mesh();
var pico=new THREE.Mesh();
var alaIzquierda=new THREE.Mesh();
var alaDerecha=new THREE.Mesh();
if(panta>1100)
{
	posFinX=-4;//Posición final en x;
	posFinY=0.3;
	posFinZ=1;//Posición final en z;
	inicio();

	
}else if(panta>730)
{
	posFinX=-2;//Posición final en x;
	posFinY=0.3;
	posFinZ=0;//Posición final en z;
	inicio();
}else 
{
	elem= document.getElementById("contenedor3d");
		if(elem)
	{
		elem.parentNode.removeChild(elem);
	}	
}





function inicio() 
{
	
	//var camera = new THREE.OrthographicCamera( -SCREEN_WIDTH / factor, SCREEN_WIDTH / factor, SCREEN_HEIGHT /factor, 			-SCREEN_HEIGHT /factor, 1, 100 );

	camera.position.z=13;
	camera.position.x=1;

	//creación de luces
		var directionalLight = new THREE.DirectionalLight( 0xffFFFF,0.4 );
		directionalLight.position.set( 400, 200, 400 ).normalize();
		directionalLight.rotation.y=-Math.PI/4;
		directionalLight.rotation.x=Math.PI/4;
		scene.add( directionalLight );
		
		var directionalLight2 = new THREE.DirectionalLight( 0xffFFFF,0.4);
		directionalLight2.position.set( -400, 200, 400 ).normalize();
		directionalLight2.rotation.y=Math.PI/4;
		directionalLight2.rotation.x=-Math.PI/4;
		scene.add( directionalLight2 );
		
		pointLight = new THREE.PointLight( 0xFFFFFF );
		pointLight.position.x = 100;
		pointLight.position.y = 0;
		pointLight.position.z = 1000;
		pointLight.intensity =0.5;
		scene.add(pointLight);

	  	directionalLight.castShadow = true;//Producir sombras
		directionalLight.shadowDarkness = 0.5;	//intensidadMaterial de la sombra
		directionalLight2.castShadow = true;
		directionalLight2.shadowDarkness = 0.5;

		webglRenderer.setSize(document.getElementById("contenedor3d").offsetWidth, document.getElementById("contenedor3d").offsetHeight);
		webglRenderer.domElement.style.position = "relative";
		document.getElementById("contenedor3d").appendChild( webglRenderer.domElement );
		webglRenderer.shadowMapEnabled = true;//Habilitar sombras
		webglRenderer.shadowMapSoft = true;//suavizar sombra
		webglRenderer.shadowCameraNear = 3;
		webglRenderer.shadowCameraFar = camera.far;
		webglRenderer.shadowCameraFov = 50;
		webglRenderer.shadowMapBias = 0.0039;
		webglRenderer.shadowMapDarkness = 0.5;
		webglRenderer.shadowMapWidth = 5000;
		webglRenderer.shadowMapHeight = 5000;
		

		var sup1=function(geometry, materials){crearAla(geometry,materials)};
		loader.load( "modelos/aladerecha.js",sup1);//Se carga el modelo
	
		var sup2=function(geometry, materials){crearCuerpo(geometry,materials)};
		loader.load( "modelos/cuerpo.js",sup2);//Se carga el modelo
	
		var sup3=function(geometry, materials){crearAlaIzquierda(geometry,materials)};
		loader.load( "modelos/alaIzquierda.js",sup3);//Se carga el modelo
	
		var sup4=function(geometry, materials){crearCabeza(geometry,materials)};
		loader.load( "modelos/cabeza.js",sup4);//Se carga el modelo
	
		var sup5=function(geometry, materials){crearPico(geometry,materials)};
		loader.load( "modelos/pico.js",sup5);//Se carga el modelo
	
		animate();

}
	
function crearAla( geometry, materials) {

	
		var materialAlaDerecha = new THREE.MeshLambertMaterial({
        		map: THREE.ImageUtils.loadTexture('Textura/ala1.png'),
      });
	  var aux=new THREE.Mesh( geometry,materialAlaDerecha);
	  alaDerecha=aux;
	alaDerecha.rotation.z=-rotIniZ;	
	alaDerecha.rotation.y=0.2;
	  scene.add(alaDerecha);//Se adiciona el objeto a la escena 
	  alaDerecha.castShadow = true;
	  alaDerecha.receiveShadow = true;
	    alaDerecha.position.set(posIniX-0.5,posIniY+0.1,posIniZ+0.1);
	 //alaDerecha.rotation.set(-3*Math.PI/2,0,0);	
		
}	

function crearCuerpo( geometry, materials) {

	
		var materialCuerpo = new THREE.MeshLambertMaterial({
        		map: THREE.ImageUtils.loadTexture('Textura/body.png'),
      });
	  cuerpo=new THREE.Mesh( geometry,materialCuerpo);
	 cuerpo.position.set(posIniX,posIniY,posIniZ);
	 cuerpo.rotation.z=-rotIniZ;
	  scene.add(cuerpo);//Se adiciona el objeto a la escena 
	  cuerpo.castShadow = true;
	  cuerpo.receiveShadow = true; 
	 
}	

function crearAlaIzquierda( geometry, materials) {
	
		var materialAlaIzquierda = new THREE.MeshLambertMaterial({
        		map: THREE.ImageUtils.loadTexture('Textura/ala1.png'),
      });
	  alaIzquierda=new THREE.Mesh( geometry,materialAlaIzquierda);
	 alaIzquierda.rotation.y=Math.PI/2;
	  alaIzquierda.rotation.z=-rotIniZ;
	  alaIzquierda.position.set(posIniX-0.4,posIniY+0.3,posIniZ-1);
	

	  scene.add(alaIzquierda);//Se adiciona el objeto a la escena 
	  alaIzquierda.castShadow = true;
	  
	  alaIzquierda.receiveShadow = true;
	

}	

function crearCabeza( geometry, materials) {
	
		var materialCabeza = new THREE.MeshLambertMaterial({
        		map: THREE.ImageUtils.loadTexture('Textura/head.png'),
      });
	  cabeza=new THREE.Mesh( geometry,materialCabeza);
	  cabeza.position.set(posIniX,posIniY,posIniZ);
	   cabeza.rotation.z=-rotIniZ+0.1;	
	  scene.add(cabeza);//Se adiciona el objeto a la escena 
	  cabeza.castShadow = true;
	  cabeza.receiveShadow = true;
}	

function crearPico( geometry, materials) {
	
		var materialPico = new THREE.MeshLambertMaterial({
        		map: THREE.ImageUtils.loadTexture('Textura/pico.png'),
      });
	    
	  pico=new THREE.Mesh( geometry,materialPico);
	  pico.position.set(posIniX,posIniY,posIniZ);
	  pico.rotation.z=-rotIniZ;
	  scene.add(pico);//Se adiciona el objeto a la escena 
	  pico.castShadow = true;
	  pico.receiveShadow = true;
	
}	

//Crea los frames para refrescar la pantalla y actualizar los elementos : 60 FPS. 			
function animate(){
	requestAnimationFrame( animate );	

				
	render();
}
//Posibilita el renderizado (visualización en pantalla) de los objetos 3D
function render() {
	if(cuerpo.position.x<posFinX)
	{		
		cuerpo.position.x+=0.08;
		cabeza.position.x+=0.08;
		pico.position.x+=0.08;
		alaIzquierda.position.x+=0.08;
		alaDerecha.position.x+=0.08;
				
	
	}
	
	
	if(cuerpo.position.z>posFinZ)
	{		
		cuerpo.position.z-=0.06;
		cabeza.position.z-=0.06;
		pico.position.z-=0.06;
		alaIzquierda.position.z-=0.06;
		alaDerecha.position.z-=0.06;
		
		
	}
	
		if(cuerpo.position.y>posFinY)
	{		
		cuerpo.position.y-=0.03;
		cabeza.position.y-=0.03;
		pico.position.y-=0.03;
		alaIzquierda.position.y-=0.03;
		alaDerecha.position.y-=0.03;

	}
	
	
		if(cuerpo.rotation.z>0)
	{		
		cuerpo.rotation.z-=0.005;
		cabeza.rotation.z-=0.005;
		pico.rotation.z-=0.005;
		alaIzquierda.rotation.z-=0.005;
		alaDerecha.rotation.z-=0.005;
		
			
		}
		
	
	if(contador<9)
	{

	if(alaDerecha.rotation.y<=0.2||alaDerecha.rotation.y>=Math.PI/2-0.2)
	{
		aux=aux*-1;
		aux1=aux1*-1;
		contador++;
	}
	
	alaDerecha.rotation.y+=aux*0.033;
	alaIzquierda.rotation.y+=aux1*0.033;
	
	}
	else if(alaDerecha.rotation.y>=Math.PI/4-0.2)
	{
			
		alaDerecha.rotation.y+=aux*0.033;
		alaIzquierda.rotation.y+=aux1*0.033;
	}else 	if(cuerpo.position.x<posFinX+14)
	{		
		cuerpo.position.x+=0.08;
		cabeza.position.x+=0.08;
		pico.position.x+=0.08;
		alaIzquierda.position.x+=0.08;
		alaDerecha.position.x+=0.08;
		cuerpo.position.y-=0.08;
		cabeza.position.y-=0.08;
		pico.position.y-=0.08;
		alaIzquierda.position.y-=0.08;
		alaDerecha.position.y-=0.08;
		cuerpo.rotation.z-=0.01;
		cabeza.rotation.z-=0.01;
		pico.rotation.z-=0.01;
		alaIzquierda.rotation.z-=0.01;
		alaDerecha.rotation.z-=0.01;
	}
	else
	{
		window.cancelAnimationFrame(animate);	
	elem=document.getElementById("contenedor3d");
	if(elem)
	{
		elem.parentNode.removeChild(elem);
	}	
	}

	webglRenderer.render( scene, camera );
	
}




