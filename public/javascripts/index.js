window.onscroll=function(event) {
	var topOffset=window.pageYOffset;
	var formulaire=document.getElementById('formulaire');
	formulaire.style.marginTop=topOffset + "px";
}

