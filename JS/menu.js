// JavaScript Document

var desplegado=false;
var cliqueado=document.getElementById("menuDesplegable");
var menuPeque=document.getElementById("menuPequeno");


cliqueado.addEventListener("click", verMenu);
window.addEventListener("resize", cambiar);

function verMenu()
{
	if(desplegado==false)
	{
		cliqueado.style.backgroundColor="#A81127";
		menuPeque.style.display="block";
		desplegado=true;
	}
	
	else
	{
		cliqueado.style.backgroundColor="#2E2E2E";
		menuPeque.style.display="none";
		desplegado=false;
	}
}

function cambiar()
{
	if(document.documentElement.clientWidth>550)
	{
			menuPeque.style.display="none";
			cliqueado.style.backgroundColor="#2E2E2E";
			desplegado=false;
	}
}