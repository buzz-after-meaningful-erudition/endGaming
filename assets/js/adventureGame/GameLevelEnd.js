import GamEnvBackground from './GameEngine/GameEnvBackground.js';
import BackgroundParallax from './GameEngine/BackgroundParallax.js';
import Player from './GameEngine/Player.js';
import Npc from './GameEngine/Npc.js';
import Block from './Block.js';  
import Game from './Game.js';  // Import Game for quiz functionality
import HelpPanel from './HelpPanel.js';  // Add HelpPanel for help functionality

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
        
    const sprite_src_tux = path + "/images/gamify/tux.png";
    const sprite_greet_tux = "Welcome to the End! Ready to test your Linux knowledge?";
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
        reaction: function() {
          alert(sprite_greet_tux);
        },
        interact: function() {
          // Use the Game's quiz system with the NPC's ID as the category
          Game.attemptQuizForNpc('Tux', function(success) {
            if (success) {
              alert("Congratulations! You've mastered Linux commands!");
              // You could reward the player here
              Game.giveItem('linux_certificate', 1);
            } else {
              alert("Keep practicing your Linux skills!");
            }
          });
        }
    };
    
    this.classes = [
      { class: BackgroundParallax, data: image_data_parallax },  // Add parallax background first
      { class: GamEnvBackground, data: image_data_end },         // Then regular background
      { class: Player, data: sprite_data_chillguy },
      { class: Npc, data: sprite_data_tux },
      { class: Player, data: sprite_data_alex }
    ];
    
    // Initialize single block reference
    this.currentBlock = null;
    
    // Track whether a block is active
    this.blockActive = false;
    
    // Set up block spawn timer
    this.blockSpawnInterval = 2000; // Time between blocks (2 seconds)
    this.lastBlockSpawnTime = 0;
    
    // Start the block animation loop
    this.startBlockAnimation();

    // Add help panel keyboard listener (similar to what's in GameLevelAirport)
    document.addEventListener('keydown', (e) => {
      if (e.key.toLowerCase() === 'h') {
        HelpPanel.toggle();
      }
    });
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
        // Block has completed its cycle, remove it
        this.currentBlock.destroy();
        this.currentBlock = null;
        this.blockActive = false;
      }
      
      // Add collision detection code here if needed
      // Example: Check for collisions with players or NPCs
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
  }
  
  // Add this method if the game engine requires it
  initialize() {
    // Spawn initial block
    this.spawnBlock();
  }
}

export default GameLevelEnd;