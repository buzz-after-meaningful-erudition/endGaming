import GamEnvBackground from './GameEngine/GameEnvBackground.js';
import BackgroundParallax from './GameEngine/BackgroundParallax.js';
import Player from './GameEngine/Player.js';
import Npc from './GameEngine/Npc.js';
import Quiz from './Quiz.js';
import Block from './Block.js'; // Import the Block class

class GameLevelEnd {
  constructor(gameEnv) {
    console.log("Initializing GameLevelEnd...");
    
    this.gameEnv = gameEnv; // Store gameEnv reference for later use
    let width = gameEnv.innerWidth;
    let height = gameEnv.innerHeight;
    let path = gameEnv.path;
    
    // Parallax background configuration
    const image_src_parallax = path + "/images/gamify/parallaxbg.png";
    const image_data_parallax = {
        name: 'parallax_background',
        id: 'parallax-background',
        greeting: "A mysterious parallax effect in the background.",
        src: image_src_parallax,
        pixels: {height: 1140, width: 2460},
        position: { x: 0, y: 0 },
        velocity: 0.2,  // Slower velocity for a more subtle effect
        layer: 0,  // Explicitly set the layer to 0 (furthest back)
        zIndex: 1  // Use positive z-index but keep it low
    };
    
    const image_src_end = path + "/images/gamify/TransparentEnd.png";
    const image_data_end = {
        name: 'end',
        id: 'end-background',
        greeting: "The End opens before you, a vast black void in the distance. The stone beneath your feet is yellowish and hard, and the air tingles.",
        src: image_src_end,
        pixels: {height: 1140, width: 2460},
        layer: 1,  // Set layer to 1 to be in front of parallax
        zIndex: 5  // Higher z-index to appear above parallax
    };
    
    const sprite_src_chillguy = path + "/images/gamify/Steve.png";
    const CHILLGUY_SCALE_FACTOR = 7;
    const sprite_data_chillguy = {
        id: 'Steve',
        greeting: "Hi, I am Steve.",
        src: sprite_src_chillguy,
        SCALE_FACTOR: CHILLGUY_SCALE_FACTOR,
        STEP_FACTOR: 1000,
        ANIMATION_RATE: 25,
        
        INIT_POSITION: { x: width/16, y: height/2 },
        pixels: {height: 256, width: 128},
        orientation: {rows: 8, columns: 4 },
        down: {row: 1, start: 0, columns: 4 },
        downRight: {row: 7, start: 0, columns: 4, rotate: Math.PI/8 },
        downLeft: {row: 5, start: 0, columns: 4, rotate: -Math.PI/8 },
        left: {row: 5, start: 0, columns: 4 },
        right: {row: 7, start: 0, columns: 4 },
        up: {row: 3, start: 0, columns: 4 },
        upLeft: {row: 5, start: 0, columns: 4, rotate: Math.PI/8 },
        upRight: {row: 7, start: 0, columns: 4, rotate: -Math.PI/8 },
        hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
        keypress: { up: 87, left: 65, down: 83, right: 68 }
    };
    
    const sprite_src_alex = path + "/images/gamify/Alex.png";
    const alex_SCALE_FACTOR = 7;
    const sprite_data_alex = {
        id: 'Alex',
        greeting: "Hi, I am Alex",
        src: sprite_src_alex,
        SCALE_FACTOR: alex_SCALE_FACTOR,
        STEP_FACTOR: 1000,
        ANIMATION_RATE: 25,
        
        INIT_POSITION: { x: 0, y: height/2 },
        pixels: {height: 256, width: 128},
        orientation: {rows: 8, columns: 4 },
        down: {row: 1, start: 0, columns: 4 },
        downRight: {row: 7, start: 0, columns: 4, rotate: Math.PI/8 },
        downLeft: {row: 5, start: 0, columns: 4, rotate: -Math.PI/8 },
        left: {row: 5, start: 0, columns: 4 },
        right: {row: 7, start: 0, columns: 4 },
        up: {row: 3, start: 0, columns: 4 },
        upLeft: {row: 5, start: 0, columns: 4, rotate: Math.PI/8 },
        upRight: {row: 7, start: 0, columns: 4, rotate: -Math.PI/8 },
        hitbox: { widthPercentage: 0.45, heightPercentage: 0.2 },
        keypress: { up: 73, left: 74, down: 75, right: 76 } // Using I, J, K, L for Alex to differentiate from Steve 
    };
        
    const sprite_src_tux = path + "/images/gamify/tux.png";
    const sprite_greet_tux = "THIS IS HOW IT ENDS - Tejo :P";
    const sprite_data_tux = {
        id: 'Tux',
        greeting: sprite_greet_tux,
        src: sprite_src_tux,
        SCALE_FACTOR: 8,
        ANIMATION_RATE: 1000000,
        pixels: {height: 256, width: 352},
        INIT_POSITION: { x: (width / 2), y: (height / 2) },
        orientation: {rows: 8, columns: 11 },
        down: {row: 5, start: 0, columns: 3 },
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
        zIndex: 10,  // Same z-index as player
        quiz: {
          title: "Linux Command Quiz",
          questions: [
            "It's eternity in here! It's eternity in here! It's eternity in here! It's eternity in here! It's eternity in here! It's eternity in here! It's eternity in here! It's eternity in here! \n1. huh\n2. what\n3. ...\n4. ok bye"
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
    
    // Store configuration for blocks
    this.blockConfig = {
      count: 10, // Number of blocks to create
      spawnInterval: 2000, // Time between new blocks in milliseconds
      collisionCallback: this.handleBlockCollision.bind(this) // Function to call on collision
    };
    
    this.blocks = []; // Array to store active blocks
    this.players = []; // Will store player references for collision detection
    this.lastBlockSpawnTime = 0; // Track when the last block was spawned
    this.gameStartTime = Date.now(); // Track game start time
    this.score = 0; // Initialize score
    this.gameActive = true; // Flag to track if game is running
    
    this.classes = [
      { class: BackgroundParallax, data: image_data_parallax },  // Add parallax background first
      { class: GamEnvBackground, data: image_data_end },         // Then regular background
      { class: Player, data: sprite_data_chillguy },
      { class: Npc, data: sprite_data_tux },
      { class: Player, data: sprite_data_alex }
    ];
  }

  // Method to initialize blocks after players are created
  initialize(gameObjects) {
    // Store references to player objects for collision detection
    this.players = gameObjects.filter(obj => obj instanceof Player);
    
    // Create initial blocks
    this.createInitialBlocks();
    
    // Set up score display
    this.createScoreDisplay();
    
    // Start the block update loop
    this.startBlockLoop();
  }
  
  // Create initial set of blocks
  createInitialBlocks() {
    // Create just a few blocks to start with to prevent overwhelming the player
    for (let i = 0; i < 3; i++) {
      const block = new Block(this.gameEnv);
      // Stagger initial positions
      block.y = -block.height - (i * 300);
      this.blocks.push(block);
    }
  }
  
  // Create a score display element
  createScoreDisplay() {
    this.scoreElement = document.createElement('div');
    this.scoreElement.style.position = 'absolute';
    this.scoreElement.style.top = '20px';
    this.scoreElement.style.right = '20px';
    this.scoreElement.style.fontSize = '24px';
    this.scoreElement.style.fontWeight = 'bold';
    this.scoreElement.style.color = 'white';
    this.scoreElement.style.textShadow = '2px 2px 4px #000000';
    this.scoreElement.style.zIndex = '1000';
    this.updateScore(0);
    document.body.appendChild(this.scoreElement);
  }
  
  // Update the score display
  updateScore(points) {
    this.score += points;
    if (this.scoreElement) {
      this.scoreElement.textContent = `Score: ${this.score}`;
    }
  }
  
  // Handle collisions between blocks and players
  handleBlockCollision(player, block) {
    console.log(`Collision detected between ${player.data.id} and block!`);
    
    // Subtract points when hit by a block
    this.updateScore(-10);
    
    // Visual feedback - flash the player
    if (player.sprite && player.sprite.style) {
      // Store original opacity
      const originalOpacity = player.sprite.style.opacity || '1';
      
      // Flash effect
      player.sprite.style.opacity = '0.3';
      setTimeout(() => {
        player.sprite.style.opacity = originalOpacity;
      }, 300);
    }
    
    // Remove the block that hit the player
    const blockIndex = this.blocks.indexOf(block);
    if (blockIndex !== -1) {
      block.destroy();
      this.blocks.splice(blockIndex, 1);
    }
    
    // Create a new block to replace the removed one
    setTimeout(() => {
      if (this.gameActive) {
        const newBlock = new Block(this.gameEnv);
        newBlock.y = -newBlock.height - Math.random() * 200;
        this.blocks.push(newBlock);
      }
    }, 1000);
  }
  
  // Main update loop for blocks
  startBlockLoop() {
    this.blockLoopInterval = setInterval(() => {
      this.updateBlocks();
      
      // Spawn new blocks periodically
      const currentTime = Date.now();
      if (currentTime - this.lastBlockSpawnTime > this.blockConfig.spawnInterval && 
          this.blocks.length < this.blockConfig.count) {
        this.spawnNewBlock();
        this.lastBlockSpawnTime = currentTime;
        
        // Gradually decrease spawn interval for increasing difficulty
        this.blockConfig.spawnInterval = Math.max(500, this.blockConfig.spawnInterval - 50);
      }
      
      // Add points over time for surviving
      if (currentTime - this.gameStartTime > 5000) {
        this.updateScore(1);
        this.gameStartTime = currentTime;
      }
    }, 16); // ~60fps
  }
  
  // Update all active blocks
  updateBlocks() {
    for (let i = this.blocks.length - 1; i >= 0; i--) {
      const block = this.blocks[i];
      block.update();
      
      // Check for collisions with players
      this.players.forEach(player => {
        if (block.checkCollision(player)) {
          this.blockConfig.collisionCallback(player, block);
        }
      });
    }
  }
  
  // Spawn a new block
  spawnNewBlock() {
    if (this.blocks.length < this.blockConfig.count) {
      const block = new Block(this.gameEnv);
      this.blocks.push(block);
    }
  }
  
  // Clean up when level is unloaded
  cleanup() {
    // Clear block update loop
    if (this.blockLoopInterval) {
      clearInterval(this.blockLoopInterval);
    }
    
    // Remove all blocks
    this.blocks.forEach(block => block.destroy());
    this.blocks = [];
    
    // Remove score display
    if (this.scoreElement && this.scoreElement.parentNode) {
      this.scoreElement.parentNode.removeChild(this.scoreElement);
    }
    
    this.gameActive = false;
  }
}

export default GameLevelEnd;