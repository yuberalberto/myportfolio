// Initialize a new Vue application
const app = Vue.createApp({
  // Reactive data properties for the app
  data() {
    return {
      currentView: "mainMenu", // Tracks the current view/state of the game
      board: Array(9).fill(""), // Represents the game board as an array of 9 elements
      currentPlayer: "X", // Tracks the current player ('X' or 'O')
      gameOverMessage: "", // Message to display when the game is over
    };
  },

  // Methods for game logic and event handling
  methods: {
    // Starts a new game
    startGame() {
      this.currentView = "playingState"; // Change the view to the game playing state
      this.board = Array(9).fill(""); // Reset the board
      this.currentPlayer = "X"; // Set the starting player
    },

    // Handles a move made by a player
    makeMove(index) {
      // Check if the cell is already taken or if the game isn't in 'playingState'
      if (this.board[index] !== "" || this.currentView !== "playingState") {
        return; // Ignore the move
      }

      // Mark the cell with the current player's symbol
      this.board[index] = this.currentPlayer;

      // Check for a win or a draw
      if (this.checkWin()) {
        this.gameOver(`${this.currentPlayer} wins!`); // Game over with win
        return;
      }
      if (this.checkDraw()) {
        this.gameOver("Draw!"); // Game over with draw
        return;
      }

      // Switch the player
      this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
    },

    // Checks if the current player has won the game
    checkWin() {
      // Define all winning combinations
      const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8], // Rows
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8], // Columns
        [0, 4, 8],
        [2, 4, 6], // Diagonals
      ];

      // Check if any winning condition is met
      return winConditions.some((condition) => {
        return condition.every((index) => {
          return this.board[index] === this.currentPlayer;
        });
      });
    },

    // Checks if the game is a draw
    checkDraw() {
      // The game is a draw if all cells are filled and no one has won
      return this.board.every((cell) => cell !== "");
    },

    // Ends the game and sets the game over message
    gameOver(message) {
      this.gameOverMessage = message; // Set the game over message
      this.currentView = "gameOverState"; // Change view to game over state
    },

    // Returns to the main menu
    returnToMenu() {
      this.currentView = "mainMenu"; // Change view back to the main menu
    },
  },
});

// Mount the Vue application to the HTML element with id 'app'
app.mount("#app");
