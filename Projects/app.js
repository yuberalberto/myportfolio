function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: [],
      surrendered: false,
    };
  },
  watch: {
    playerHealth(value){
        if (value <= 0 && this.monsterHealth <= 0) {
            this.winner = 'draw';
            console.log('draw'); //Draw
        }
        else if(value <= 0) {
            this.winner = 'You Lost!';
            console.log('You Lost!'); //Player lost
        }
    },
    monsterHealth(value) {
        if (value <= 0 && this.playerHealth <= 0) {
            this.winner = 'draw';
            console.log('draw'); //Draw
        }
        else if(value <= 0) {
            this.winner = 'You Won!';
            console.log('You Won!'); //Monster lost
        }
    },
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth > 0) {
        return { width: this.monsterHealth + '%' };
      } else {
        return { width: '0%' };
      }
    },
    playerBarStyles() {
      if (this.playerHealth > 0 || this.monsterHealth <= 100) {
        return { width: this.playerHealth + '%' };
      } else {
        return { width: '0%' };
      }
    },
    SpecialAttackEnabled() {
      return this.currentRound % 4 !== 0 || this.currentRound === 0;
    },
    healingEnabled() {
      return this.currentRound % 2 !== 0 || this.currentRound === 0;
    },
  },
  methods: {
    starNewGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.currentRound = 0;
      this.winner = null;
      this.logMessages = [];
      this.surrendered = false;
    },
    PlayerSurrenders() {
      this.winner = 'You Lost!';
      this.surrendered = true;
    },
    attackMonster() {
        this.currentRound++;
        const attackValue = getRandomValue(5, 12); 
        this.monsterHealth -= attackValue;
        this.addLogMessage('player', 'attack', attackValue, this.currentRound);
        this.attackPlayer();
        if (this.monsterHealth < 0) {
            this.monsterHealth = 0;
        }
    },
    attackPlayer() {
        const attackValue = getRandomValue(8, 15);
        this.playerHealth -= attackValue;  
        if (this.playerHealth < 0) {
            this.playerHealth = 0;
        }
        this.addLogMessage('monster', 'attack', attackValue, this.currentRound);
        
    },
    specialAttackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(15, 30);
      this.monsterHealth -= attackValue;
      this.addLogMessage('player', 'attack', attackValue, this.currentRound);
      this.attackPlayer();
      if(this.monsterHealth < 0) {
        this.monsterHealth = 0;
      }
    },
    healPlayer() {
      this.currentRound++;
      const healValue = getRandomValue(7, 20);
      this.playerHealth += healValue;
      this.addLogMessage('player', 'heal', healValue, this.currentRound);
      this.attackPlayer();
      if (this.playerHealth > 100) {
        this.playerHealth = 100;
      }
    },
    addLogMessage(who, what, value, round) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
        actionRound: round,
      });
    },
  },
});

app.mount("#game");
