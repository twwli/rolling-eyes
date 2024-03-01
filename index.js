document.querySelector("body");
var face = document.getElementsByClassName("face")[0];
var eyes = document.getElementsByClassName("eyes")[0]; // Ensure this correctly selects the .eyes element
var pupils = document.getElementsByClassName("pupil");
let addVisibleTimeout; // To store the timer for adding .is-visible
let mouseMoveTimeout;
let blinkingTimeout; // New timer to manage the delay between blinks

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
  if (face.classList.contains("is-visible")) {
    clearTimeout(blinkingTimeout); // Cancel any planned blinking
    // Adds the .blinking class to .eyes for 100ms
    eyes.classList.add("blinking");
    setTimeout(() => {
      eyes.classList.remove("blinking");
      // Schedules the next blinking after a random delay
      blinkingTimeout = setTimeout(startBlinking, Math.random() * (30000 - 15000) + 15000);
    }, 500); // Removes the class after 100ms
  }
}

document.onmousemove = function(event) {
  clearTimeout(mouseMoveTimeout); // Cancels the previous timer
  mouseMoveTimeout = setTimeout(() => {
    // Starts the blinking effect after a certain time without mouse movement
    startBlinking();
  }, 500); // Time before considering the mouse as immobile

  var x = event.clientX * 100 / window.innerWidth + "%";
  var y = event.clientY * 100 / window.innerHeight + "%";

  for (var i = 0; i < pupils.length; i++) {
    pupils[i].style.left = x;
    pupils[i].style.top = y;
    pupils[i].style.transform = "translate(-" + x + ", -" + y + ")";
  }

  // Plans the addition of .is-visible with a new color
  clearTimeout(addVisibleTimeout); // Make sure to cancel the previous timer before scheduling a new one
  addVisibleTimeout = setTimeout(() => {
    if (!face.classList.contains("is-visible")) {
      face.classList.add("is-visible");
      face.style.backgroundColor = getRandomColor();
    }
  }, 400);
};

document.addEventListener("click", function() {
  clearTimeout(addVisibleTimeout);
  clearTimeout(blinkingTimeout); // Stops the blinking when the user clicks
  face.classList.remove("is-visible");
});

face.addEventListener("mouseover", function() {
  clearTimeout(blinkingTimeout); // Also stops the blinking on hover
  face.classList.remove("is-visible");
});
