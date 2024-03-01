document.querySelector("body");
var face = document.getElementsByClassName("face")[0];
var eyes = document.getElementsByClassName("eyes")[0]; // Ensure this correctly selects the .eyes element
var pupils = document.getElementsByClassName("pupil");
let addVisibleTimeout; // To store the timer for adding .is-visible
let mouseMoveTimeout;
let isMouseMoving = false; // To track mouse movement

// List of predefined colors
const colors = [
  "#304538",
  "#ef8ec4",
  "#8da0b2",
  "#ebe5d8",
  "#858d4b"
];

// Function to choose a random color
function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

function startBlinking() {
  if (!isMouseMoving) { // Removes the check for .is-visible
    eyes.classList.add("blinking");
    setTimeout(() => {
      eyes.classList.remove("blinking");
    }, 250); // Removes the class after 250ms
    
    // Schedule the next blinking after a random delay
    setTimeout(startBlinking, Math.random() * (12000 - 6000) + 6000);
  }
}

document.onmousemove = function(event) {
  isMouseMoving = true; // Indicates the mouse is moving
  clearTimeout(mouseMoveTimeout); // Cancels the timer for mouse inactivity
  
  mouseMoveTimeout = setTimeout(() => {
    isMouseMoving = false; // Resets the movement indicator after a delay without movement
    startBlinking(); // Restart blinking only if the mouse is still
  }, 500); // Time before considering the mouse as immobile

  var x = event.clientX * 100 / window.innerWidth + "%";
  var y = event.clientY * 100 / window.innerHeight + "%";

  for (var i = 0; i < pupils.length; i++) {
    pupils[i].style.left = x;
    pupils[i].style.top = y;
    pupils[i].style.transform = "translate(-" + x + ", -" + y + ")";
  }

  // Plans the addition of .is-visible with a new color after 1 minute of inactivity
  clearTimeout(addVisibleTimeout); // Make sure to cancel the previous timer before scheduling a new one
  addVisibleTimeout = setTimeout(() => {
    if (!face.classList.contains("is-visible")) {
      face.classList.add("is-visible");
      face.style.backgroundColor = getRandomColor();
    }
  }, 60000); // 60000 ms for 1 minute
};

document.addEventListener("click", function() {
  clearTimeout(addVisibleTimeout);
  face.classList.remove("is-visible");
});

face.addEventListener("mouseover", function() {
  face.classList.remove("is-visible");
});
