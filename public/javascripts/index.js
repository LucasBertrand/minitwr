function updateUsersCount (connections) {
	var connected = document.getElementById("connected-users");
	connected.innerHTML = connections + " twiiter(s) connected";
}

function showPopup(content) {
	var modal = document.getElementById("oModal");
	if (!modal.style.opacity) {
		document.getElementById("popupName").innerHTML = content.name + " has twiited !!!";
		document.getElementById("goToTwiit").setAttribute("href", content.url);

		var	modalWidth = modal.offsetWidth,
			modalHeight = modal.offsetHeight,
			width = window.innerWidth,
			height = window.innerHeight;

		modal.style.left = width/2 - modalWidth/2 + "px";
		modal.style.top = height/2 - modalHeight/2 + "px";
		modal.style.opacity = 1;
	}
}

var socket = io.connect("http://localhost:3000");
socket.on("traffic-info", updateUsersCount);
socket.on("newTwiit", showPopup);

// The section panel will follow the user-scrolling
window.onscroll = function(event) {
	var topOffset = window.pageYOffset + 20;
	var formulaire = document.getElementById('formulaire');
	if (formulaire) formulaire.style.marginTop = topOffset + "px";
};

window.onload = function() {
	document.getElementById("close").onclick = function(e) {
		document.getElementById("oModal").style.opacity = 0;
	};
	var twiitForm = document.getElementById("postTwiit");
	if (twiitForm) {
		twiitForm.onsubmit = function(e) {
			console.log("okok")
			var name = document.getElementById("userName").value;
			var twiit = document.getElementById("twiit").value;
			var date = Date.now();
			var url = "/twiit_page?twiit=" + date + ".txt";
			document.getElementById("dateTwiit").value = date;
			socket.emit("twiitCreated", {name: name, twiit: twiit, url: url});
		}
	}
};





