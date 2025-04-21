import GamEnvBackground from './GameEnvBackground.js';
import Player from './Player.js';
import Npc from './Npc.js';
import Quiz from './Quiz.js';
import Block from './Block.js';
import GameControl from './GameControl.js';
import GameLevelStarWars from './GameLevelStarWars.js';
import GameLevelMeteorBlaster from './GameLevelMeteorBlaster.js';
import GameLevelMinesweeper from './GameLevelMinesweeper.js';
import GameLevelEnd from './GameLevelEnd.js';

class GameLevelDesert {
  constructor(gameEnv) {
    // Store the gameEnv reference
    this.gameEnv = gameEnv;
    
    // Values dependent on this.gameEnv.create()
    let width = gameEnv.innerWidth;
    let height = gameEnv.innerHeight;
    let path = gameEnv.path;

    // Background data
    const image_src_desert = path + "/images/gamify/desert.png";
    const image_data_desert = {
        name: 'desert',
        greeting: "Welcome to the desert! It is hot and dry here, but there are many adventures to be had!",
        src: image_src_desert,
        pixels: {height: 580, width: 1038}
    };

    // Player data for Chillguy
    const sprite_src_chillguy = path + "/images/gamify/chillguy.png";
    const CHILLGUY_SCALE_FACTOR = 5;
    const sprite_data_chillguy = {
        id: 'Chill Guy',
        greeting: "Hi I am Chill Guy, the desert wanderer. I am looking for wisdom and adventure!",
        src: sprite_src_chillguy,
        SCALE_FACTOR: CHILLGUY_SCALE_FACTOR,
        STEP_FACTOR: 1000,
        ANIMATION_RATE: 50,
        INIT_POSITION: { x: 0, y: height - (height/CHILLGUY_SCALE_FACTOR) }, 
        pixels: {height: 384, width: 512},
        orientation: {rows: 3, columns: 4 },
        down: {row: 0, start: 0, columns: 3 },
        downRight: {row: 1, start: 0, columns: 3, rotate: Math.PI/16 },
        downLeft: {row: 2, start: 0, columns: 3, rotate: -Math.PI/16 },
        left: {row: 2, start: 0, columns: 3 },
        right: {row: 1, start: 0, columns: 3 },
        up: {row: 3, start: 0, columns: 3 },
        upLeft: {row: 2, start: 0, columns: 3, rotate: Math.PI/16 },
        upRight: {row: 1, start: 0, columns: 3, rotate: -Math.PI/16 },
        hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
        keypress: { up: 87, left: 65, down: 83, right: 68 } // W, A, S, D
    };

    // NPC Data for Tux 
    const sprite_src_tux = path + "/images/gamify/tux.png";
    const sprite_greet_tux = "Hi I am Tux, the Linux mascot. I am very happy to spend some linux shell time with you!";
    const sprite_data_tux = {
        id: 'Tux',
        greeting: sprite_greet_tux,
        src: sprite_src_tux,
        SCALE_FACTOR: 8,
        ANIMATION_RATE: 50,
        pixels: {height: 256, width: 352},
        INIT_POSITION: { x: (width / 2), y: (height / 2)},
        orientation: {rows: 8, columns: 11 },
        down: {row: 5, start: 0, columns: 3 },
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
        quiz: { 
          title: "Linux Command Quiz",
          questions: [
            "Which command is used to list files in a directory?\n1. ls\n2. dir\n3. list\n4. show",
            "Which command is used to change directories?\n1. cd\n2. chdir\n3. changedir\n4. changedirectory",
            "Which command is used to create a new directory?\n1. mkdir\n2. newdir\n3. createdir\n4. makedir",
            "Which command is used to remove a file?\n1. rm\n2. remove\n3. delete\n4. erase",
            "Which command is used to remove a directory?\n1. rmdir\n2. removedir\n3. deletedir\n4. erasedir",
            "Which command is used to copy files?\n1. cp\n2. copy\n3. duplicate\n4. xerox",
            "Which command is used to move files?\n1. mv\n2. move\n3. transfer\n4. relocate",
            "Which command is used to view a file?\n1. cat\n2. view\n3. show\n4. display",
            "Which command is used to search for text in a file?\n1. grep\n2. search\n3. find\n4. locate",
            "Which command is used to view the contents of a file?\n1. less\n2. more\n3. view\n4. cat" 
          ] 
        },
        reaction: function() {
          alert(sprite_greet_tux);
        },
        interact: function() {
          let quiz = new Quiz();
          quiz.initialize();
          quiz.openPanel(sprite_data_tux);
        }
    };

    // Game state
    this.blocks = [];
    this.blockCount = 5; // Number of falling blocks
    this.player = null;
    this.score = 0;
    this.isGameActive = true;
    this.difficultyMultiplier = 1.0;
    this.lastSpeedUpTime = Date.now();
    this.speedUpInterval = 10000; // Increase difficulty every 10 seconds
    
    // Add lives system
    this.lives = 3;
    this.invulnerable = false;
    this.invulnerabilityTime = 1500; // 1.5 seconds of immunity after getting hit
    
    // Score display
    this.scoreElement = document.createElement('div');
    this.scoreElement.style.position = 'absolute';
    this.scoreElement.style.top = '10px';
    this.scoreElement.style.right = '10px';
    this.scoreElement.style.padding = '10px';
    this.scoreElement.style.backgroundColor = 'rgba(0,0,0,0.7)';
    this.scoreElement.style.color = 'white';
    this.scoreElement.style.fontSize = '18px';
    this.scoreElement.style.fontFamily = 'Arial, sans-serif';
    this.scoreElement.style.borderRadius = '5px';
    this.scoreElement.style.zIndex = '1000';
    this.scoreElement.textContent = 'Score: 0';
    document.body.appendChild(this.scoreElement);
    
    // Lives display
    this.livesElement = document.createElement('div');
    this.livesElement.style.position = 'absolute';
    this.livesElement.style.top = '50px';
    this.livesElement.style.right = '10px';
    this.livesElement.style.padding = '10px';
    this.livesElement.style.backgroundColor = 'rgba(0,0,0,0.7)';
    this.livesElement.style.color = 'white';
    this.livesElement.style.fontSize = '18px';
    this.livesElement.style.fontFamily = 'Arial, sans-serif';
    this.livesElement.style.borderRadius = '5px';
    this.livesElement.style.zIndex = '1000';
    this.livesElement.textContent = 'Lives: ❤️❤️❤️';
    document.body.appendChild(this.livesElement);
    
    // Game instructions
    this.instructionsElement = document.createElement('div');
    this.instructionsElement.style.position = 'absolute';
    this.instructionsElement.style.top = '10px';
    this.instructionsElement.style.left = '10px';
    this.instructionsElement.style.padding = '10px';
    this.instructionsElement.style.backgroundColor = 'rgba(0,0,0,0.7)';
    this.instructionsElement.style.color = 'white';
    this.instructionsElement.style.fontSize = '14px';
    this.instructionsElement.style.fontFamily = 'Arial, sans-serif';
    this.instructionsElement.style.borderRadius = '5px';
    this.instructionsElement.style.zIndex = '1000';
    this.instructionsElement.style.maxWidth = '300px';
    this.instructionsElement.innerHTML = 'Desert Challenge: Collect the falling blocks for points!<br>Faster blocks = More points!<br>You have 3 lives. Getting hit by a block costs 1 life!<br>Press P to pause.';
    document.body.appendChild(this.instructionsElement);
    
    // Initialize blocks with staggered positions
    for (let i = 0; i < this.blockCount; i++) {
      const block = new Block(gameEnv);
      block.y = -block.height - (i * 200); // Stagger initial positions
      this.blocks.push(block);
    }

    // Set up game loop
    this.startGameLoop();

    // Pause control
    this.setupPauseControl();

    // List of objects definitions for this level
    this.classes = [
      { class: GamEnvBackground, data: image_data_desert },
      { class: Player, data: sprite_data_chillguy },
      { class: Npc, data: sprite_data_tux }
    ];

    // Listen for level creation to get player reference
    this.onLevelCreated = (event) => {
      // Find player in the game objects
      const gameObjects = event.detail?.gameObjects || [];
      this.player = gameObjects.find(obj => obj instanceof Player);
    };
    
    document.addEventListener('LevelCreated', this.onLevelCreated);
  }

  // Set up pause control
  setupPauseControl() {
    this.pauseHandler = (e) => {
      if (e.key === 'p' || e.key === 'P') {
        if (this.isGameActive) {
          this.pause();
          
          // Show pause message
          this.pauseMessage = document.createElement('div');
          this.pauseMessage.style.position = 'absolute';
          this.pauseMessage.style.top = '50%';
          this.pauseMessage.style.left = '50%';
          this.pauseMessage.style.transform = 'translate(-50%, -50%)';
          this.pauseMessage.style.padding = '20px';
          this.pauseMessage.style.backgroundColor = 'rgba(0,0,0,0.8)';
          this.pauseMessage.style.color = 'white';
          this.pauseMessage.style.fontSize = '24px';
          this.pauseMessage.style.fontFamily = 'Arial, sans-serif';
          this.pauseMessage.style.borderRadius = '10px';
          this.pauseMessage.style.zIndex = '2000';
          this.pauseMessage.style.textAlign = 'center';
          this.pauseMessage.innerHTML = 'PAUSED<br><span style="font-size:16px">Press P to resume</span>';
          document.body.appendChild(this.pauseMessage);
        } else {
          this.resume();
          
          // Remove pause message
          if (this.pauseMessage && this.pauseMessage.parentNode) {
            this.pauseMessage.parentNode.removeChild(this.pauseMessage);
            this.pauseMessage = null;
          }
        }
      }
    };
    
    document.addEventListener('keydown', this.pauseHandler);
  }

  // Start the game loop
  startGameLoop() {
    if (this.gameLoopId) {
      cancelAnimationFrame(this.gameLoopId);
    }
    
    const gameLoop = () => {
      if (!this.isGameActive) return;
      
      this.update();
      this.gameLoopId = requestAnimationFrame(gameLoop);
    };
    
    this.gameLoopId = requestAnimationFrame(gameLoop);
  }

  // Update method for game loop
  update() {
    // Gradually increase difficulty over time
    const currentTime = Date.now();
    if (currentTime - this.lastSpeedUpTime > this.speedUpInterval) {
      this.difficultyMultiplier += 0.1;
      this.lastSpeedUpTime = currentTime;
    }
    
    // Update each block
    this.blocks.forEach(block => {
      block.update();
      
      // Check for collision with player
      if (this.player && block.checkCollision(this.player)) {
        if (this.invulnerable) {
          // Skip collision if player is invulnerable
          // But still collect the block
          block.resetBlock();
          return;
        }
        
        if (block.isHurtful === undefined || block.isHurtful) {
          // Block hits the player and causes damage
          this.lives--;
          this.updateLivesDisplay();
          
          // Show damage effect
          this.showDamageEffect();
          
          // Check if player is dead
          if (this.lives <= 0) {
            this.playerDeath();
            return;
          }
          
          // Make player temporarily invulnerable
          this.setInvulnerable();
        }
        
        // Calculate score based on speed - faster blocks give more points
        const pointsEarned = Math.floor(block.speed * 2);
        this.score += pointsEarned;
        this.scoreElement.textContent = `Score: ${this.score}`;
        
        // Show points animation
        this.showPointsAnimation(pointsEarned, this.player.position.x, this.player.position.y);
        
        // Reset block
        block.resetBlock();
      }
    });
  }
  
  // Make player temporarily invulnerable after being hit
  setInvulnerable() {
    this.invulnerable = true;
    
    // Make player flash when invulnerable
    if (this.player) {
      this.flashInterval = setInterval(() => {
        if (this.player.sprite) {
          this.player.sprite.style.opacity = this.player.sprite.style.opacity === '0.5' ? '1' : '0.5';
        }
      }, 150);
    }
    
    // Reset invulnerability after timeout
    setTimeout(() => {
      this.invulnerable = false;
      clearInterval(this.flashInterval);
      if (this.player && this.player.sprite) {
        this.player.sprite.style.opacity = '1';
      }
    }, this.invulnerabilityTime);
  }
  
  // Show damage effect when player is hit
  showDamageEffect() {
    const damageOverlay = document.createElement('div');
    damageOverlay.style.position = 'absolute';
    damageOverlay.style.top = '0';
    damageOverlay.style.left = '0';
    damageOverlay.style.width = '100%';
    damageOverlay.style.height = '100%';
    damageOverlay.style.backgroundColor = 'rgba(255, 0, 0, 0.3)';
    damageOverlay.style.zIndex = '1500';
    damageOverlay.style.pointerEvents = 'none';
    document.body.appendChild(damageOverlay);
    
    // Fade out and remove
    setTimeout(() => {
      damageOverlay.style.transition = 'opacity 0.5s ease';
      damageOverlay.style.opacity = '0';
      
      setTimeout(() => {
        if (damageOverlay.parentNode) {
          damageOverlay.parentNode.removeChild(damageOverlay);
        }
      }, 500);
    }, 100);
  }
  
  // Update the lives display
  updateLivesDisplay() {
    let livesText = 'Lives: ';
    for (let i = 0; i < this.lives; i++) {
      livesText += '❤️';
    }
    this.livesElement.textContent = livesText;
  }
  
  // Handle player death
  playerDeath() {
    // Stop the game
    this.pause();
    
    // Create death screen
    this.deathScreen = document.createElement('div');
    this.deathScreen.style.position = 'absolute';
    this.deathScreen.style.top = '0';
    this.deathScreen.style.left = '0';
    this.deathScreen.style.width = '100%';
    this.deathScreen.style.height = '100%';
    this.deathScreen.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
    this.deathScreen.style.color = 'white';
    this.deathScreen.style.display = 'flex';
    this.deathScreen.style.flexDirection = 'column';
    this.deathScreen.style.justifyContent = 'center';
    this.deathScreen.style.alignItems = 'center';
    this.deathScreen.style.zIndex = '3000';
    
    // Death message
    const deathMessage = document.createElement('h1');
    deathMessage.style.fontSize = '48px';
    deathMessage.style.textShadow = '2px 2px 4px #000000';
    deathMessage.style.margin = '0 0 20px 0';
    deathMessage.textContent = 'GAME OVER';
    
    // Final score
    const scoreMessage = document.createElement('h2');
    scoreMessage.style.fontSize = '32px';
    scoreMessage.style.margin = '0 0 40px 0';
    scoreMessage.textContent = `Final Score: ${this.score}`;
    
    // Restart button
    const restartButton = document.createElement('button');
    restartButton.style.padding = '15px 30px';
    restartButton.style.fontSize = '20px';
    restartButton.style.backgroundColor = '#4CAF50';
    restartButton.style.color = 'white';
    restartButton.style.border = 'none';
    restartButton.style.borderRadius = '5px';
    restartButton.style.cursor = 'pointer';
    restartButton.style.transition = 'background-color 0.3s';
    restartButton.textContent = 'Restart Game';
    
    // Button hover effect
    restartButton.onmouseover = () => {
      restartButton.style.backgroundColor = '#45a049';
    };
    
    restartButton.onmouseout = () => {
      restartButton.style.backgroundColor = '#4CAF50';
    };
    
    // Button click to restart
    restartButton.onclick = () => {
      // Remove death screen
      if (this.deathScreen && this.deathScreen.parentNode) {
        this.deathScreen.parentNode.removeChild(this.deathScreen);
      }
      
      // Reset game state
      this.lives = 3;
      this.updateLivesDisplay();
      this.score = 0;
      this.scoreElement.textContent = 'Score: 0';
      this.difficultyMultiplier = 1.0;
      this.lastSpeedUpTime = Date.now();
      
      // Reset player if exists
      if (this.player && this.player.sprite) {
        this.player.sprite.style.opacity = '1';
      }
      
      // Reset all blocks
      this.blocks.forEach(block => block.resetBlock());
      
      // Resume game
      this.resume();
    };
    
    // Assemble death screen
    this.deathScreen.appendChild(deathMessage);
    this.deathScreen.appendChild(scoreMessage);
    this.deathScreen.appendChild(restartButton);
    document.body.appendChild(this.deathScreen);
  }
  
  // Show points animation
  showPointsAnimation(points, x, y) {
    const pointsElement = document.createElement('div');
    pointsElement.textContent = `+${points}`;
    pointsElement.style.position = 'absolute';
    pointsElement.style.left = `${x}px`;
    pointsElement.style.top = `${y - 20}px`;
    pointsElement.style.color = 'gold';
    pointsElement.style.fontWeight = 'bold';
    pointsElement.style.fontSize = '18px';
    pointsElement.style.textShadow = '1px 1px 2px black';
    pointsElement.style.zIndex = '1500';
    pointsElement.style.transition = 'all 1s ease-out';
    document.body.appendChild(pointsElement);
    
    // Animate the points floating up and fading out
    setTimeout(() => {
      pointsElement.style.top = `${y - 60}px`;
      pointsElement.style.opacity = '0';
    }, 10);
    
    // Remove the element after animation completes
    setTimeout(() => {
      if (pointsElement.parentNode) {
        pointsElement.parentNode.removeChild(pointsElement);
      }
    }, 1000);
  }

  // Pause the game
  pause() {
    this.isGameActive = false;
    if (this.gameLoopId) {
      cancelAnimationFrame(this.gameLoopId);
      this.gameLoopId = null;
    }
  }

  // Resume the game
  resume() {
    if (!this.isGameActive) {
      this.isGameActive = true;
      this.startGameLoop();
    }
  }

  // Clean up method to remove blocks when level changes
  destroy() {
    // Cancel the game loop
    if (this.gameLoopId) {
      cancelAnimationFrame(this.gameLoopId);
      this.gameLoopId = null;
    }
    
    // Remove all blocks
    if (this.blocks) {
      this.blocks.forEach(block => block.destroy());
      this.blocks = [];
    }
    
    // Remove UI elements
    if (this.scoreElement && this.scoreElement.parentNode) {
      this.scoreElement.parentNode.removeChild(this.scoreElement);
    }
    
    if (this.livesElement && this.livesElement.parentNode) {
      this.livesElement.parentNode.removeChild(this.livesElement);
    }
    
    if (this.instructionsElement && this.instructionsElement.parentNode) {
      this.instructionsElement.parentNode.removeChild(this.instructionsElement);
    }
    
    if (this.pauseMessage && this.pauseMessage.parentNode) {
      this.pauseMessage.parentNode.removeChild(this.pauseMessage);
    }
    
    if (this.deathScreen && this.deathScreen.parentNode) {
      this.deathScreen.parentNode.removeChild(this.deathScreen);
    }
    
    // Clear intervals
    if (this.flashInterval) {
      clearInterval(this.flashInterval);
    }
    
    // Remove event listeners
    document.removeEventListener('LevelCreated', this.onLevelCreated);
    document.removeEventListener('keydown', this.pauseHandler);
    
    this.isGameActive = false;
  }
}

export default GameLevelDesert;