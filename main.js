let numSquares = 6;
let colors = [];
let pickedColor;

let squares = document.querySelectorAll(".square");
let colorDisplay = document.querySelector("#color-display");
let messageDisplay = document.querySelector("#message");
let h1 = document.querySelector("h1");
let resetButton = document.querySelector("#reset");
let modeButtons = document.querySelectorAll(".mode");
let easyButton = document.querySelector(".mode");

// Function to generate random color
function generateColor() {
	let r = Math.floor(Math.random() * 256);    // This picks a random number between 0 and 255
	let g = Math.floor(Math.random() * 256);    
	let b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")"; 
}

// Function to put randomly generated number in the array
function genRandomColors(num) {
	let arr = [];
	for (let i = 0; i < num; i++) {
		arr.push(generateColor());
	}
	return arr;
}

// Function to pick a random color from the array
function chooseColor() {
	let random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

// Function to setup squares containing color options
function setupSquares() {
	for (let i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = colors[i];
		squares[i].addEventListener("click", function() {
			let clickedColor = this.style.backgroundColor;
			if(clickedColor === pickedColor) {
				messageDisplay.textContent = "Correct";
				resetButton.textContent = "Play Again";
				changeColors(pickedColor);
                modeButtons.style.backgroundColor = pickedColor;
			}
			else {
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "try again";
			}
		});
	}
}


// Function to choose between easy, medium and hard mode
function setupMode() {
	for(let i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener("click", function() {
			for (let i = 0; i < modeButtons.length; i++) {
				modeButtons[i].classList.remove("selected");
			}
			this.classList.add("selected");
			if (this.textContent === "Easy") {
				numSquares = 3;
			}
			else if(this.textContent === "Medium") {
				numSquares = 6;
			}
            else {
                numSquares = 9;
            }
			reset();
		});
	}
}

// Function to reset color options and pick a new random color
function reset() {
	colors = genRandomColors(numSquares);
	pickedColor = chooseColor();
	colorDisplay.textContent = pickedColor;
	h1.style.backgroundColor = "blueviolet";
	resetButton.textContent = "Generate New Colors";
	messageDisplay.textContent = "";
	for (let i = 0; i < squares.length; i++) {
		if(colors[i]) { 
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		}
		else {
			squares[i].style.display = "none";
		}
	}
}

// Initialize the reset function on the button
resetButton.addEventListener("click", function() {
	reset();
});

// Function to change colors inside the squares
function changeColors(color) {
	for(let i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
		h1.style.backgroundColor = color;
	}
}

// Function to initialize all above functions
function initialize() {
	colorDisplay.textContent = pickedColor;
	setupSquares();
	setupMode();
	reset();
}

initialize();