let ile = 38;

let tekstHTML = "<p>";

let foty = document.getElementById('focie');

for(let i=1; i<=ile; i++) tekstHTML += "<img onclick='HesGalery.show("+i+")' src='obrazy/focia ("+i+").jpg' />";

foty.innerHTML = tekstHTML + '</p>';

