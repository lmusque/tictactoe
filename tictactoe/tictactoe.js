//here I selected all of the tic tac toe divs
//they turned into a NodeList (also functions as array)
//used for of loop to select the individual divs in the array to add event listeners to each
//in event listeners (e) is passed into playerClicks
let boxes = document.querySelectorAll(".grid >div");
let refresh = document.getElementById("refresh");
// let main = document.querySelector("main");
for (let box of boxes) {
	box.addEventListener("click", playerClicks);
}

const h2 = document.querySelector("h2");
let counter = 0;

function playerClicks(e) {
	// for (let i = 0; i < 9; i++)
	if (counter % 2 == 0) {
		e.target.textContent = "X";
	} else {
		e.target.textContent = "O";
	}
	counter++;
	e.target.removeEventListener("click", playerClicks);
	const hasWinner = winnerWinner();
	if (counter == 9 && !hasWinner) {
		h2.textContent = "It's a tie";
	}
}
//there's 9 boxes, so you can have a maximum amount of times to run the loop
//counter is going to keep track of the number of clicks the players make
//so we can determine if the click event should read X or O
//playerClicks is the function to determine if the player click is odd or even (which will determine if it prints X or O)
//the counter is updated to count the clicks
//e.target.removeEventListener removes the click event after the player clicks once so answers can't be changed
//the function winnerWinner is saved as a new variable so that we can check if there's a tie
//if the counter reaches 9 (maximum number of clicks) and there's no winner (!hasWinner)
//then the h2 will display "tie"

//made an array to store all of the possible win outcomes
const wins = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];
/*created a function to check for winner
for "win of wins" loop will check the index of "win" in the "wins" array 
so if each at index it's not an empty string AND the each index the text
content is the same, then it's a win.
then the h2 will update to show if x or 0 wins
*/
function winnerWinner() {
	for (let win of wins) {
		if (
			boxes[win[0]].textContent != "" &&
			boxes[win[1]].textContent != "" &&
			boxes[win[2]].textContent != "" &&
			boxes[win[0]].textContent == boxes[win[1]].textContent &&
			boxes[win[0]].textContent == boxes[win[2]].textContent
		) {
			h2.textContent = boxes[win[0]].textContent + " won";
			for (let box of boxes) {
				box.removeEventListener("click", playerClicks);
			} //to stop game remove event listener (when player wins)
			return true;
		} //if true, then the winnerWinner function will be checked in the playerclicks functin above
		//to check for a tie
	}
	return false;
}

function refreshGame() {
	for (let box of boxes) {
		box.textContent = "";
		box.addEventListener("click", playerClicks);
	}
	h2.textContent = ""; // Clear the winner message
	counter = 0; // Reset the counter
}

refresh.addEventListener("click", refreshGame);
