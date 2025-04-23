import GamEnvBackground from './GameEngine/GameEnvBackground.js';
import BackgroundParallax from './GameEngine/BackgroundParallax.js';
import Player from './GameEngine/Player.js';
import Npc from './GameEngine/Npc.js';
import Block from './Block.js';  // Import the Block class

class GameLevelEnd {
  constructor(gameEnv) {
    console.log("Initializing GameLevelEnd....");
    
    this.gameEnv = gameEnv;  // Store the gameEnv reference for use in other methods
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
        
    const sprite_src_dragon = path + "/images/gamify/end.png";
    const sprite_greet_dragon = "I dare you to kill me. If you suprisingly do then you will obtain the enderdragon egg!";
    const sprite_data_dragon = {
        id: 'Dragon',
        greeting: sprite_greet_dragon,
        src: sprite_src_dragon,
        SCALE_FACTOR: 6,
        ANIMATION_RATE: 1000000,
        pixels: {height: 976, width: 1128},
        INIT_POSITION: { x: (width / 2), y: (height / 2) },
        orientation: {rows: 2, columns: 2 },
        down: {row: 1, start: 0, columns: 1 },
        hitbox: { widthPercentage: 0.1, heightPercentage: 0.2 },
        zIndex: 10,  // Same z-index as player
        quiz: {
          title: "Linux Command Quiz",
          questions: [
            "It's eternity in here! It's eternity in here! It's eternity in here! It's eternity in here! It's eternity in here! It's eternity in here! It's eternity in here! It's eternity in here! \n1. huh\n2. what\n3. ...\n4. ok bye"
          ]
        },
        reaction: function() {
          alert(sprite_greet_dragon);
        }
    };
    
    this.classes = [
      { class: BackgroundParallax, data: image_data_parallax },  // Add parallax background first
      { class: GamEnvBackground, data: image_data_end },         // Then regular background
      { class: Player, data: sprite_data_chillguy },
      { class: Npc, data: sprite_data_dragon },
      { class: Player, data: sprite_data_alex }
    ];
    
    // Initialize single block reference
    this.currentBlock = null;
    
    // Track whether a block is active
    this.blockActive = false;
    
    // Set up block spawn timer
    this.blockSpawnInterval = 2000; // Time between blocks (2 seconds)
    this.lastBlockSpawnTime = 0;
    
    // Add scorekeeping for caught enderdragon eyes
    this.eyesCaught = 0;
    this.scoreElement = this.createScoreDisplay();
    
    // Create instruction element
    this.instructionElement = this.createInstructions();
    
    // Start the block animation loop
    this.startBlockAnimation();
  }
  
  // Create score display
  createScoreDisplay() {
    const scoreDisplay = document.createElement('div');
    scoreDisplay.id = 'score-display';
    scoreDisplay.style.position = 'absolute';
    scoreDisplay.style.top = '20px';
    scoreDisplay.style.left = '20px';
    scoreDisplay.style.padding = '10px';
    scoreDisplay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    scoreDisplay.style.color = 'white';
    scoreDisplay.style.fontFamily = 'Minecraft, sans-serif';
    scoreDisplay.style.fontSize = '18px';
    scoreDisplay.style.borderRadius = '5px';
    scoreDisplay.style.zIndex = '200';
    scoreDisplay.textContent = 'Eyes Caught: 0';
    document.body.appendChild(scoreDisplay);
    return scoreDisplay;
  }
  
  // Create instruction display
  createInstructions() {
    const instructionDisplay = document.createElement('div');
    instructionDisplay.id = 'instructions';
    instructionDisplay.style.position = 'absolute';
    instructionDisplay.style.top = '60px';
    instructionDisplay.style.left = '20px';
    instructionDisplay.style.padding = '10px';
    instructionDisplay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    instructionDisplay.style.color = 'white';
    instructionDisplay.style.fontFamily = 'Minecraft, sans-serif';
    instructionDisplay.style.fontSize = '16px';
    instructionDisplay.style.borderRadius = '5px';
    instructionDisplay.style.zIndex = '200';
    instructionDisplay.textContent = 'Press Z to catch falling Eyes of Ender!';
    document.body.appendChild(instructionDisplay);
    
    // Make instructions fade out after 5 seconds
    setTimeout(() => {
      instructionDisplay.style.transition = 'opacity 2s';
      instructionDisplay.style.opacity = '0';
    }, 5000);
    
    return instructionDisplay;
  }
  
  // Method to update score
  updateScore() {
    this.eyesCaught++;
    this.scoreElement.textContent = `Eyes Caught: ${this.eyesCaught}`;
    
    // Add visual feedback when score increases
    this.scoreElement.style.transform = 'scale(1.2)';
    this.scoreElement.style.transition = 'transform 0.2s';
    
    // Reset after animation
    setTimeout(() => {
      this.scoreElement.style.transform = 'scale(1)';
    }, 200);
  }
  
  // Method to handle block spawning and animation
  startBlockAnimation() {
    // Set up animation frame loop
    this.animationFrameId = requestAnimationFrame(this.updateBlocks.bind(this));
    
    // Set up block spawner interval
    this.blockSpawnerId = setInterval(() => {
      // Only spawn a new block if there's no active block
      if (!this.blockActive) {
        this.spawnBlock();
      }
    }, this.blockSpawnInterval);
  }
  
  // Method to spawn a new block
  spawnBlock() {
    // Destroy previous block if it exists
    if (this.currentBlock) {
      this.currentBlock.destroy();
    }
    
    // Create a new block
    this.currentBlock = new Block(this.gameEnv);
    this.blockActive = true;
  }
  
  // Method to update all blocks
  updateBlocks() {
    // Update the current block if it exists
    if (this.currentBlock) {
      this.currentBlock.update();
      
      // Check if the block has completed its cycle (based on fall count)
      // This assumes the Block class increments fallCount after each complete cycle
      if (this.currentBlock.fallCount > 0) {
        // If the block was destroyed by player (Z key), update score
        if (this.currentBlock.isDestroyed) {
          this.updateScore();
        }
        
        // Block has completed its cycle or was destroyed, remove it
        this.currentBlock.destroy();
        this.currentBlock = null;
        this.blockActive = false;
        
        // Spawn a new block immediately
        this.spawnBlock();
      }
    }
    
    // Continue the animation loop
    this.animationFrameId = requestAnimationFrame(this.updateBlocks.bind(this));
  }
  
  // Method to clean up resources when level ends
  cleanup() {
    // Cancel animation frame
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    
    // Clear block spawner interval
    if (this.blockSpawnerId) {
      clearInterval(this.blockSpawnerId);
    }
    
    // Destroy current block if it exists
    if (this.currentBlock) {
      this.currentBlock.destroy();
      this.currentBlock = null;
    }
    
    // Remove UI elements
    if (this.scoreElement && this.scoreElement.parentNode) {
      this.scoreElement.parentNode.removeChild(this.scoreElement);
    }
    
    if (this.instructionElement && this.instructionElement.parentNode) {
      this.instructionElement.parentNode.removeChild(this.instructionElement);
    }
  }
  
  // Add this method if the game engine requires it
  initialize() {
    // Spawn initial block
    this.spawnBlock();
  }
}

export default GameLevelEnd;