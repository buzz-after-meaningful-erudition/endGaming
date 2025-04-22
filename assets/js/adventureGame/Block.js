class Block {
    constructor(gameEnv) {
      this.gameEnv = gameEnv;
      this.width = 50; // Width of the image
      this.height = 50; // Height of the image
      
      // Position the image in a random column
      this.x = Math.random() * (gameEnv.innerWidth - this.width);
      this.y = 0; // Start from top of the screen
      
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
      
      // Array of image URLs to use
      this.imageUrls = [
        'https://static.wikia.nocookie.net/minecraftpocketedition/images/3/30/Eye_of_Ender.png/revision/latest?cb=20150424052459', // Star
        'https://cdn-icons-png.flaticon.com/512/3082/3082059.png', // Heart
        'https://cdn-icons-png.flaticon.com/512/616/616655.png',   // Diamond
        'https://cdn-icons-png.flaticon.com/512/1828/1828884.png', // Smiley
        'https://cdn-icons-png.flaticon.com/512/3132/3132693.png', // Moon
        'https://cdn-icons-png.flaticon.com/512/740/740842.png',   // Music note
        'https://cdn-icons-png.flaticon.com/512/1752/1752772.png', // Lightning
        'https://cdn-icons-png.flaticon.com/512/5110/5110770.png', // Flame
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
    }
  
    update() {
      // Apply gravity and acceleration
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
    
    resetBlock() {
      // Reset position to top
      this.y = -this.height - Math.random() * 200; // Stagger the heights
      
      // Change to a new random column
      this.x = Math.random() * (this.gameEnv.innerWidth - this.width);
      
      // Reset physics
      this.speed = this.baseSpeed;
      this.bounceCount = 0;
      this.isBouncing = false;
      
      // Increase fall count for difficulty progression
      this.fallCount++;
      
      // Increase base difficulty slightly
      this.baseSpeed += 0.1;
      this.acceleration += 0.01;
      
      // Change image on each reset
      this.imageUrl = this.imageUrls[Math.floor(Math.random() * this.imageUrls.length)];
      this.element.src = this.imageUrl;
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
      if (this.element && this.element.parentNode) {
        this.element.parentNode.removeChild(this.element);
      }
    }
  }
  
  export default Block;