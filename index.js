document.querySelector("body");
var face = document.getElementsByClassName("face")[0];
var pupils = document.getElementsByClassName("pupil");
let addVisibleTimeout; // Pour stocker le temporisateur d'ajout de .is-visible

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

document.onmousemove = function(event) {
  clearTimeout(addVisibleTimeout); // Annule le temporisateur précédent

  var x = event.clientX * 100 / window.innerWidth + "%";
  var y = event.clientY * 100 / window.innerHeight + "%";

  for (var i = 0; i < pupils.length; i++) {
    pupils[i].style.left = x;
    pupils[i].style.top = y;
    pupils[i].style.transform = "translate(-" + x + ", -" + y + ")";
  }

  // Planifie l'ajout de .is-visible avec une nouvelle couleur
  addVisibleTimeout = setTimeout(() => {
    if (!face.classList.contains("is-visible")) { // Ajoute seulement si .is-visible n'est pas déjà présent
      face.classList.add("is-visible");
      face.style.backgroundColor = getRandomColor(); // Applique une nouvelle couleur
    }
  }, 400);
};

document.addEventListener("click", function() {
  clearTimeout(addVisibleTimeout); // Annule le temporisateur pour éviter l'ajout après un clic
  face.classList.remove("is-visible");
});

// Ajout d'un gestionnaire d'événements pour le survol de .face
face.addEventListener("mouseover", function() {
  face.classList.remove("is-visible");
});
