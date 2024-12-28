function generateTDM(type) {
  const channelsInput =
    type === "synchronous"
      ? document.getElementById("sync-channels")
      : document.getElementById("async-channels");
  const slotsInput =
    type === "synchronous"
      ? document.getElementById("sync-slots")
      : document.getElementById("async-slots");
  const canvas =
    type === "synchronous"
      ? document.getElementById("sync-tdm-canvas")
      : document.getElementById("async-tdm-canvas");

  const channels = parseInt(channelsInput.value, 10);
  const slots = parseInt(slotsInput.value, 10);

  if (isNaN(channels) || isNaN(slots) || channels <= 0 || slots <= 0) {
    alert("Please enter valid positive numbers for channels and time slots.");
    return;
  }

  const ctx = canvas.getContext("2d");

  // Clear the canvas before drawing
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Canvas dimensions and parameters
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const slotWidth = canvasWidth / slots;
  const channelHeight = canvasHeight / channels;

  // Color palette transitioning from light to dark
  const colors = [
    "#FF9AA2", // Soft Pink
    "#FFDAC1", // Light Peach
    "#B5EAD7", // Mint Green
    "#C7CEEA", // Lavender
    "#2F4550", // Charcoal Blue
    "#1B3A4B", // Midnight Teal
    "#1A1A2E", // Deep Navy
    "#0F0F0F", // Pure Black
  ];
  
  // Utility to darken a color
  function darkenColor(color, amount) {
    const hex = color.replace("#", "");
    const num = parseInt(hex, 16);
    const r = Math.max(0, (num >> 16) - amount * 255);
    const g = Math.max(0, ((num >> 8) & 0x00ff) - amount * 255);
    const b = Math.max(0, (num & 0x0000ff) - amount * 255);
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, "0")}`;
  }

  // Gradient and shadow effects with darker progression
  function createGradient(ctx, x, y, width, height, color, isLast) {
    const gradient = ctx.createLinearGradient(x, y, x + width, y + height);

    if (isLast) {
      // More dramatic darkening for last colors
      gradient.addColorStop(0, darkenColor(color, 0.5));
      gradient.addColorStop(1, darkenColor(color, 0.7));
    } else {
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, darkenColor(color, 0.2));
    }
    return gradient;
  }

  // Advanced animation function with darker progression
  function animateRect(ctx, x, y, width, height, color, isLast) {
    let progress = 0;
    const duration = 60; // Total animation frames
    const shadowBlur = isLast ? 40 : 20; // More intense shadow for darker colors

    function animate() {
      ctx.clearRect(x, y, width, height);

      // Scale and opacity animation
      const scale =
        1 - Math.sin((progress / duration) * Math.PI) * (isLast ? 0.3 : 0.2);
      const opacity = Math.max(0.3, 1 - progress / duration); // Gradual reduction in opacity

      // Draw with gradient, shadow, and animation
      ctx.save();
      ctx.globalAlpha = opacity;

      // Shadow effect
      ctx.shadowColor = isLast ? "rgba(0,0,0,0.5)" : color;
      ctx.shadowBlur = shadowBlur * (1 - progress / duration);

      // Gradient fill with darker progression
      const gradient = createGradient(ctx, x, y, width, height, color, isLast);
      ctx.fillStyle = gradient;

      // Scaled rectangle
      ctx.translate(x + width / 2, y + height / 2);
      ctx.scale(scale, scale);
      ctx.fillRect(-width / 2, -height / 2, width, height);

      // Border with darker color for last slots
      ctx.strokeStyle = isLast ? darkenColor(color, 0.6) : color;
      ctx.lineWidth = isLast ? 3 : 2;
      ctx.strokeRect(-width / 2, -height / 2, width, height);

      ctx.restore();

      progress++;
      if (progress < duration) {
        requestAnimationFrame(animate);
      } else {
        // At the end of animation, make the color darker
        ctx.save();
        ctx.globalAlpha = 0.8; // Reduce opacity for the final display
        ctx.fillStyle = darkenColor(color, 0.5); // Darken the color further
        ctx.fillRect(x, y, width, height);
        ctx.restore();
      }
    }

    animate();
  }

  // Rest of the previous implementation remains the same...
  // Draw the grid with subtle style
  ctx.strokeStyle = "rgba(204, 204, 204, 0.5)";
  ctx.lineWidth = 1;
  for (let i = 0; i <= slots; i++) {
    const x = i * slotWidth;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvasHeight);
    ctx.stroke();
  }

  for (let j = 0; j <= channels; j++) {
    const y = j * channelHeight;
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvasWidth, y);
    ctx.stroke();
  }

  // Enhanced drawing logic with darker colors progression
  let totalDelay = 0;
  const baseDelay = 100;
  const randomnessMultiplier = type === "synchronous" ? 0 : 0.7;

  for (let ch = 0; ch < channels; ch++) {
    for (let sl = 0; sl < slots; sl++) {
      const x = sl * slotWidth;
      const y = ch * channelHeight;

      // More sophisticated randomness for async
      if (type === "synchronous" || Math.random() > randomnessMultiplier) {
        // Determine if this is one of the last few slots
        const colorIndex = (ch + sl) % colors.length;
        const color = colors[colorIndex];
        const isLast = colorIndex >= colors.length - 3; // Last 3 colors are considered "dark"

        // Staggered animation with slight randomness
        setTimeout(() => {
          animateRect(ctx, x, y, slotWidth, channelHeight, color, isLast);
        }, totalDelay);

        // Increment delay with some randomness
        totalDelay += baseDelay + Math.random() * 200;
      }
    }
  }

  // Background glow effect
  function addBackgroundGlow() {
    ctx.save();
    ctx.globalCompositeOperation = "destination-over";
    const gradient = ctx.createRadialGradient(
      canvasWidth / 2,
      canvasHeight / 2,
      0,
      canvasWidth / 2,
      canvasHeight / 2,
      Math.max(canvasWidth, canvasHeight)
    );
    gradient.addColorStop(0, "rgba(0, 0, 0, 0.05)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0.1)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    ctx.restore();
  }

  // Add background glow after animations complete
  setTimeout(addBackgroundGlow, totalDelay);
}
