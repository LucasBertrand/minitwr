var response = document.getElementById("response");

var res = false;

	if(res)	{
		response.classList.add("success");
	}
	else	{
		response.classList.add("fail");
	}


if(response!=undefined){
	if(response.innerHTML=="Success"){
		response.style.backgroundColor="#66FF33";
	}
	if(response.innerHTML=="Fail")	{
		response.style.backgroundColor="#FE3A3C";
	}
}

