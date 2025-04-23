class Block {
  constructor(gameEnv) {
    this.gameEnv = gameEnv;
    this.width = 50; // Width of the image
    this.height = 50; // Height of the image
    
    // Position the image in a random column
    this.x = Math.random() * (gameEnv.innerWidth - this.width);
    this.y = 0; // Start from top of the screen
    
    // Horizontal movement properties
    this.horizontalSpeed = (Math.random() - 0.5) * 5; // Random horizontal speed (-2.5 to 2.5)
    this.horizontalAcceleration = 0; // Can be used for curved paths
    
    // Speed and physics properties
    this.baseSpeed = 1; // Initial falling speed
    this.speed = this.baseSpeed;
    this.acceleration = 0.2; // Acceleration per frame
    this.maxSpeed = 20; // Maximum speed cap
    this.bounceForce = -10; // Force of bounce (negative to go up)
    this.gravity = 0.4; // Gravity effect
    this.bounceDecay = 0.6; // Bounce decay factor (0-1, lower means more dampening)
    this.bounceCount = 0; // Track bounces for a single fall
    this.maxBounces = 2; // Maximum number of bounces before resetting
    this.fallCount = 0; // Track how many times the image has fallen completely
    
    // State flags
    this.isBouncing = false;
    this.isDestroyed = false; // Track if block has been destroyed by player
    
    // Array of image URLs to use
    this.imageUrls = [
      'https://static.wikia.nocookie.net/minecraft_gamepedia/images/7/7a/Eye_of_Ender_JE2_BE2.png', // Eye of Ender
    ];
    
    // Select a random image URL
    this.imageUrl = this.imageUrls[Math.floor(Math.random() * this.imageUrls.length)];
    
    // Create HTML element for the image
    this.element = document.createElement('img');
    this.element.src = this.imageUrl;
    this.element.style.position = 'absolute';
    this.element.style.width = this.width + 'px';
    this.element.style.height = this.height + 'px';
    this.element.style.zIndex = '100'; // Make sure images appear above background
    this.element.style.filter = 'drop-shadow(2px 2px 3px rgba(0,0,0,0.3))'; // Add drop shadow
    document.body.appendChild(this.element);
    
    // Set initial trajectory type
    this.trajectoryTypes = ['straight', 'zigzag', 'sine', 'spiral'];
    this.currentTrajectory = this.trajectoryTypes[Math.floor(Math.random() * this.trajectoryTypes.length)];
    
    // Trajectory parameters
    this.time = 0; // Time counter for trajectory calculations
    this.amplitude = Math.random() * 5 + 3; // For sine waves and spiral patterns
    this.frequency = Math.random() * 0.05 + 0.01; // For sine waves
    this.zigzagTimer = 0; // For zigzag pattern
    this.zigzagInterval = Math.random() * 30 + 20; // Duration before changing zigzag direction
    
    // Add click handler for this block
    this.setupKeyHandler();
  }
  
  // Add keyboard event handler
  setupKeyHandler() {
    // Create a bound reference to the handler so we can remove it later
    this.keydownHandler = this.handleKeyDown.bind(this);
    document.addEventListener('keydown', this.keydownHandler);
  }
  
  // Handle key presses
  handleKeyDown(event) {
    // Check if Z key was pressed (key code 90 or key 'z')
    if ((event.keyCode === 90 || event.key === 'z' || event.key === 'Z') && !this.isDestroyed) {
      // Check if the player has caught the block
      // We could add more conditions here like checking if player is near the block
      
      // Mark block as destroyed
      this.isDestroyed = true;
      
      // Trigger block destruction and respawn
      this.destroy();
      
      // Signal that a new block should be spawned
      // This will be picked up by GameLevelEnd's updateBlocks method
      this.fallCount = 1; // Set to trigger a new block spawn
    }
  }

  update() {
    // Skip updating destroyed blocks
    if (this.isDestroyed) return;
    
    // Update time counter
    this.time++;
    
    // Apply vertical physics
    if (!this.isBouncing) {
      // Exponential acceleration during fall
      this.speed += this.acceleration * (1 + this.y / (this.gameEnv.innerHeight / 2));
      this.speed = Math.min(this.speed, this.maxSpeed);
    } else {
      // Apply gravity during bounce
      this.speed += this.gravity;
    }
    
    // Update vertical position
    this.y += this.speed;
    
    // Apply horizontal movement based on trajectory type
    this.updateTrajectory();
    
    // Check if image hit the bottom
    if (this.y > this.gameEnv.innerHeight - this.height && this.speed > 0) { 
      // Bounce behavior
      if (this.bounceCount < this.maxBounces) {
        // Calculate bounce force based on impact speed and decay
        let bounceStrength = this.bounceForce * Math.min(this.speed / 10, 1) * Math.pow(this.bounceDecay, this.bounceCount);
        this.speed = bounceStrength;
        this.isBouncing = true;
        this.bounceCount++;
        
        // Ensure the image doesn't go below the ground
        this.y = this.gameEnv.innerHeight - this.height;
      } else {
        // Reset after max bounces
        this.resetBlock();
      }
    }
    
    // Check if image hit the sides of the screen
    if (this.x < 0) {
      this.x = 0;
      this.horizontalSpeed = Math.abs(this.horizontalSpeed); // Bounce off left wall
    } else if (this.x > this.gameEnv.innerWidth - this.width) {
      this.x = this.gameEnv.innerWidth - this.width;
      this.horizontalSpeed = -Math.abs(this.horizontalSpeed); // Bounce off right wall
    }
    
    // Check if image reached top of bounce
    if (this.isBouncing && this.speed >= 0) {
      this.isBouncing = false;
    }
    
    // Update HTML element position
    this.element.style.top = this.y + 'px';
    this.element.style.left = this.x + 'px';
    
    // Add subtle rotation effect based on movement for visual interest
    const rotation = Math.sin(this.y / 50) * 10;
    this.element.style.transform = `rotate(${rotation}deg)`;
  }
  
  updateTrajectory() {
    switch (this.currentTrajectory) {
      case 'straight':
        // Simple straight line with constant horizontal velocity
        this.x += this.horizontalSpeed;
        break;
        
      case 'zigzag':
        // Zigzag pattern changing direction periodically
        this.zigzagTimer++;
        if (this.zigzagTimer > this.zigzagInterval) {
          this.horizontalSpeed = -this.horizontalSpeed;
          this.zigzagTimer = 0;
        }
        this.x += this.horizontalSpeed;
        break;
        
      case 'sine':
        // Sinusoidal wave pattern
        const centerX = this.x; // Current position is center
        this.x = centerX + Math.sin(this.time * this.frequency) * this.amplitude;
        break;
        
      case 'spiral':
        // Spiral-like movement (increasing sine amplitude)
        const spiralFactor = Math.min(this.y / (this.gameEnv.innerHeight / 2), 1);
        this.x += Math.sin(this.time * this.frequency) * this.amplitude * spiralFactor;
        break;
        
      default:
        // Default to straight line if trajectory type is unknown
        this.x += this.horizontalSpeed;
    }
  }
  
  resetBlock() {
    // Reset position to top
    this.y = -this.height - Math.random() * 200; // Stagger the heights
    
    // Change to a new random column
    this.x = Math.random() * (this.gameEnv.innerWidth - this.width);
    
    // Reset physics
    this.speed = this.baseSpeed;
    this.bounceCount = 0;
    this.isBouncing = false;
    
    // Choose a new trajectory type
    this.currentTrajectory = this.trajectoryTypes[Math.floor(Math.random() * this.trajectoryTypes.length)];
    
    // Reset trajectory parameters
    this.horizontalSpeed = (Math.random() - 0.5) * 5;
    this.amplitude = Math.random() * 5 + 3;
    this.frequency = Math.random() * 0.05 + 0.01;
    this.zigzagTimer = 0;
    this.zigzagInterval = Math.random() * 30 + 20;
    
    // Increase fall count for difficulty progression
    this.fallCount++;
    
    // Increase base difficulty slightly
    this.baseSpeed += 0.1;
    this.acceleration += 0.01;
    
    // Change image on each reset (if multiple images available)
    this.imageUrl = this.imageUrls[Math.floor(Math.random() * this.imageUrls.length)];
    this.element.src = this.imageUrl;
  }
  
  // Method to manually set trajectory
  setTrajectory(trajectoryType) {
    if (this.trajectoryTypes.includes(trajectoryType)) {
      this.currentTrajectory = trajectoryType;
    } else {
      console.warn(`Invalid trajectory type: ${trajectoryType}. Using 'straight' instead.`);
      this.currentTrajectory = 'straight';
    }
  }

  render(ctx) {
    // If using canvas for rendering instead of DOM
    if (ctx) {
      const img = new Image();
      img.src = this.imageUrl;
      ctx.drawImage(img, this.x, this.y, this.width, this.height);
    }
  }
  
  // Clean up when block is no longer needed
  destroy() {
    // Remove event listener
    document.removeEventListener('keydown', this.keydownHandler);
    
    // Remove element from DOM
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element);
    }
  }
}

export default Block;