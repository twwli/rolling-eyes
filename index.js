document.querySelector("body");
var face = document.getElementsByClassName("face")[0];
var eyes = document.getElementsByClassName("eyes")[0]; // S'assurer que cela sélectionne bien l'élément .eyes
var pupils = document.getElementsByClassName("pupil");
let addVisibleTimeout; // Pour stocker le temporisateur d'ajout de .is-visible
let mouseMoveTimeout;
let blinkingTimeout; // Nouveau temporisateur pour gérer le délai entre les clignotements

// Liste des couleurs prédéfinies
const colors = [
  "#304538",
  "#ef8ec4",
  "#8da0b2",
  "#ebe5d8",
  "#858d4b"
];

// Fonction pour choisir une couleur aléatoire
function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

function startBlinking() {
  if (face.classList.contains("is-visible")) {
    clearTimeout(blinkingTimeout); // Annule tout clignotement prévu
    // Ajoute la classe .blinking à .eyes pour 100ms
    eyes.classList.add("blinking");
    setTimeout(() => {
      eyes.classList.remove("blinking");
      // Planifie le prochain clignotement après un délai aléatoire
      blinkingTimeout = setTimeout(startBlinking, Math.random() * (12000 - 6000) + 6000);
    }, 500); // Enlève la classe après 100ms
  }
}

document.onmousemove = function(event) {
  clearTimeout(mouseMoveTimeout); // Annule le temporisateur précédent
  mouseMoveTimeout = setTimeout(() => {
    // Démarre l'effet de clignotement après un certain temps sans mouvement de la souris
    startBlinking();
  }, 500); // Temps avant de considérer que la souris est immobile

  var x = event.clientX * 100 / window.innerWidth + "%";
  var y = event.clientY * 100 / window.innerHeight + "%";

  for (var i = 0; i < pupils.length; i++) {
    pupils[i].style.left = x;
    pupils[i].style.top = y;
    pupils[i].style.transform = "translate(-" + x + ", -" + y + ")";
  }

  // Planifie l'ajout de .is-visible avec une nouvelle couleur
  clearTimeout(addVisibleTimeout); // Assurez-vous d'annuler le temporisateur précédent avant d'en planifier un nouveau
  addVisibleTimeout = setTimeout(() => {
    if (!face.classList.contains("is-visible")) {
      face.classList.add("is-visible");
      face.style.backgroundColor = getRandomColor();
    }
  }, 400);
};

document.addEventListener("click", function() {
  clearTimeout(addVisibleTimeout);
  clearTimeout(blinkingTimeout); // Arrête le clignotement lorsque l'utilisateur clique
  face.classList.remove("is-visible");
});

face.addEventListener("mouseover", function() {
  clearTimeout(blinkingTimeout); // Arrête également le clignotement lors du survol
  face.classList.remove("is-visible");
});
