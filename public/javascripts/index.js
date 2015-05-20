function updateUsersCount (connections) {
	var connected = document.getElementById("connected-users");
	connected.innerHTML = connections + " twiiter(s) connected";
}

function showPopup(content) {
	var modal = document.getElementById("oModal");
	if (!modal.style.opacity) {
		var link = document.getElementById("goToTwiit");
		link.setAttribute("href", content.url);
		link.innerHTML = content.name + " has twiited !!!";

		modal.style.opacity = 1;
		modal.style.top = 0;
		setTimeout(function() {
			modal.style.top = -35 + "px";
			modal.style.opacity = null;
		}, 5000)
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

	var twiitForm = document.getElementById("postTwiit");
	if (twiitForm) {
		twiitForm.onsubmit = function(e) {
			var name = document.getElementById("userName").value;
			var twiit = document.getElementById("twiit").value;
			var date = Date.now();
			var url = "/twiit_page?twiit=" + date + ".txt";
			document.getElementById("dateTwiit").value = date;
			socket.emit("twiitCreated", {name: name, twiit: twiit, url: url});
		}
	}
};





