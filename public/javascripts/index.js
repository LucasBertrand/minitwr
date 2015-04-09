/*var box = document.getElementById("twiit");
var message ="Votre twiit" 
console.log(box);

box.addEventListener("focus", function(event)      //Lorsque je clique dans la box
{
	
	if(box.innerHTML == message)		               //Si "Votre miniTwit"
	box.innerHTML = "";                                //La box se vide
});


box.addEventListener("blur", function(event)       //Lorsque je clique en dehors
{
	if(!(/^\s+$/.test(box.innerHTML)))    
	{
		console.log('ok');
		box.innerHTML = message; 
	}        
});


