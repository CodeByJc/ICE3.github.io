// Function to generate wave for a specific line coding type
function generateWave(type) {
  // Get the input sequence based on the type
  let input = "";
  let canvas = null;

  if (type === "unipolarnrz") {
    input = document.getElementById("unipolar-nrz-input").value;
    canvas = document.getElementById("unipolar-nrz-canvas");
  } else if (type === "unipolarrz") {
    input = document.getElementById("unipolar-rz-input").value;
    canvas = document.getElementById("unipolar-rz-canvas");
  } else if (type === "polarnrz") {
    input = document.getElementById("polar-nrz-input").value;
    canvas = document.getElementById("polar-nrz-canvas");
  } else if (type === "polarrz") {
    input = document.getElementById("polar-rz-input").value;
    canvas = document.getElementById("polar-rz-canvas");
  } else if (type === "bipolarami") {
    input = document.getElementById("bipolar-ami-input").value;
    canvas = document.getElementById("bipolar-ami-canvas");
  } else if (type === "bipolarpseudoternary") {
    input = document.getElementById("bipolar-pseudoternary-input").value;
    canvas = document.getElementById("bipolar-pseudoternary-canvas");
  }else if (type === "manchester") {
    input = document.getElementById("manchester-input").value;
    canvas = document.getElementById("manchester-canvas");
  } else if (type === "diff_manchester") {
    input = document.getElementById("diff-manchester-input").value;
    canvas = document.getElementById("diff-manchester-canvas");
  } 
  // else if (type === "2b1q") {
  //   input = document.getElementById("2b1q-input").value;
  //   canvas = document.getElementById("2b1q-canvas");
  // } else if (type === "8b6t") {
  //   input = document.getElementById("8b6t-input").value;
  //   canvas = document.getElementById("8b6t-canvas");
  // } 

  if (!input || !canvas) {
    alert("Please enter a binary sequence.");
    return;
  }

  // Set up canvas and context
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Set up drawing parameters
  const width = canvas.width;
  const height = canvas.height;
  const bitWidth = width / input.length;
  const zeroLevel = height / 2;
  const posLevel = zeroLevel - height / 4;
  const negLevel = zeroLevel + height / 4;

  // Draw the waveform based on the type
  if (type === "unipolarnrz") {
    drawNRZL(ctx, input, bitWidth, zeroLevel, posLevel,width,height);
  } else if (type === "unipolarrz") {
    unipolarRZ(ctx, input, bitWidth, zeroLevel, posLevel,width,height);
  } else if (type === "polarnrz") {
    polarNRZ(ctx, input, bitWidth, zeroLevel, posLevel, negLevel,width,height);
  } else if (type === "polarrz") {
    polarRZ(ctx, input, bitWidth, zeroLevel, posLevel, negLevel,width,height);
  } else if (type === "bipolarami") {
    bipolarAMI(ctx, input, bitWidth, zeroLevel, posLevel, negLevel,width,height);
  }else if (type === "bipolarpseudoternary") {
    bipolarPSUDOTERNARY(ctx, input, bitWidth, zeroLevel, posLevel, negLevel,width,height);
  } else if (type === "manchester") {
    drawManchester(ctx, input, bitWidth, zeroLevel, posLevel, negLevel,width,height);
  } else if (type === "diff_manchester") {
    drawDifferentialManchester(ctx, input, bitWidth,zeroLevel, posLevel,negLevel,width,height);
  } 
  // else if (type === "2b1q") {
  //   draw2B1Q(ctx, input, bitWidth,zeroLevel, posLevel,negLevel,width,height);
  // } else if (type === "8b6t") {
  //   draw8B6T(ctx, input, bitWidth, zeroLevel, posLevel, negLevel,width,height);
  // }  
  // Draw labels for bit values above each waveform segment
  drawBitLabels(ctx, input, bitWidth);
}

// Function to draw bit labels above each waveform segment
function drawBitLabels(ctx, input, bitWidth) {
  ctx.font = "12px Arial";
  ctx.fillStyle = "#000";
  ctx.textAlign = "center";

  for (let i = 0; i < input.length; i++) {
    const x = i * bitWidth + bitWidth / 2;
    ctx.fillText(input[i], x, 20);
  }
}

function drawGrid(ctx, width, height, bitWidth, levels) {
  ctx.beginPath();
  ctx.strokeStyle = "#D3D3D3"; // Light gray for the grid
  ctx.lineWidth = 1;

  // Draw vertical lines for each bit
  for (let x = 0; x <= width; x += bitWidth) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
  }

  // Draw horizontal lines for levels (positive, zero, and negative)
  for (let y of levels) {
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
  }

  // Add optional labeling for the levels (uncomment if needed)
  ctx.stroke();
}



function drawNRZL(ctx, input, bitWidth, zeroLevel, posLevel,width,height) {
  
  drawGrid(ctx, width, height, bitWidth, [zeroLevel, posLevel]);
  
  ctx.beginPath();
  ctx.moveTo(0, input[0] === "1" ? posLevel : zeroLevel);


  for (let i = 0; i < input.length; i++) {
    if (input[i] !== "1" && input[i] !== "0") {
      alert("Invalid bit detected: " + input[i]);
      return;
    }

    const x = i * bitWidth;
    const y = input[i] === "1" ? posLevel : zeroLevel;

    ctx.lineTo(x, y);
    ctx.lineTo(x + bitWidth, y);
  }
  ctx.strokeStyle = "#007bff";
  ctx.lineWidth = 2;
  ctx.stroke();
}

function unipolarRZ(ctx, input, bitWidth, zeroLevel, posLevel,width,height) {
  drawGrid(ctx, width, height, bitWidth, [zeroLevel, posLevel]);
  ctx.beginPath();

  // Loop through each bit in the input sequence
  for (let i = 0; i < input.length; i++) {
    if (input[i] !== "1" && input[i] !== "0") {
      alert("Invalid bit detected: " + input[i]);
      return;
    }

    const x = i * bitWidth;
    const y = input[i] === "1" ? posLevel : zeroLevel;

    // If the bit is a binary '1'
    if (input[i] === "1") {
      // Draw the positive level for the first half of the bit
      

      ctx.lineTo(x , y);
      ctx.lineTo(x + bitWidth / 2, posLevel);
      ctx.lineTo(x + bitWidth / 2, zeroLevel);
      ctx.lineTo(x + bitWidth, zeroLevel); // Return to zero for the second half
    } else if (input[i] === "0") {
      // Remain at zero level for the entire bit duration
      ctx.moveTo(x, zeroLevel);
      ctx.lineTo(x + bitWidth, zeroLevel);
    }
  }

  // Style the line and stroke it
  ctx.strokeStyle = "#007bff";
  ctx.lineWidth = 2;
  ctx.stroke();
}

function polarNRZ(ctx, input, bitWidth, zeroLevel, posLevel, negLevel,width,height) {
  drawGrid(ctx, width, height, bitWidth, [zeroLevel, posLevel, negLevel]);
  ctx.beginPath();
  ctx.moveTo(0, input[0] === "1" ? posLevel : negLevel);

  for (let i = 0; i < input.length; i++) {
    if (input[i] !== "1" && input[i] !== "0") {
      alert("Invalid bit detected: " + input[i]);
      return;
    }

    const x = i * bitWidth;
    const y = input[i] === "1" ? posLevel : negLevel;

    ctx.lineTo(x, y);
    ctx.lineTo(x + bitWidth, y);
  }
  ctx.strokeStyle = "#007bff";
  ctx.lineWidth = 2;
  ctx.stroke();
}

function polarRZ(ctx, input, bitWidth, zeroLevel, posLevel, negLevel,width,height) {
  drawGrid(ctx, width, height, bitWidth, [zeroLevel, posLevel, negLevel]);
  ctx.beginPath();

  // Loop through each bit in the input sequence
  for (let i = 0; i < input.length; i++) {
    if (input[i] !== "1" && input[i] !== "0") {
      alert("Invalid bit detected: " + input[i]);
      return;
    }

    const x = i * bitWidth;
    const y = input[i] === "1" ? posLevel : negLevel;

    // If the bit is a binary '1'
    if (input[i] === "1") {
      // First half at positive level
      ctx.lineTo(x , y);
      ctx.lineTo(x + bitWidth / 2, posLevel);
      ctx.lineTo(x + bitWidth / 2, zeroLevel);
      ctx.lineTo(x + bitWidth, zeroLevel);
    }
    // If the bit is a binary '0'
    else if (input[i] === "0") {
      // First half at negative level
      ctx.lineTo(x, y);

      ctx.lineTo(x + bitWidth / 2, negLevel);
      ctx.lineTo(x + bitWidth / 2, zeroLevel);
      ctx.lineTo(x + bitWidth, zeroLevel);
    }
  }

  // Style the line and stroke it
  ctx.strokeStyle = "#007bff";
  ctx.lineWidth = 2;
  ctx.stroke();
}

function bipolarAMI(ctx, input, bitWidth, zeroLevel, posLevel, negLevel,width,height) {
  drawGrid(ctx, width, height, bitWidth, [zeroLevel, posLevel, negLevel]);
  ctx.beginPath();

  let isPositive = true; // Start with a positive level for the first '1'

  // Loop through each bit in the input sequence
  for (let i = 0; i < input.length; i++) {
    if (input[i] !== "1" && input[i] !== "0") {
      alert("Invalid bit detected: " + input[i]);
      return;
    }

    const x = i * bitWidth; // Start position for the bit

    if (input[i] === "1") {
      // Alternate between positive and negative levels
      const level = isPositive ? posLevel : negLevel;

      // Draw the signal
      ctx.moveTo(x, zeroLevel);
      ctx.lineTo(x, level);
      ctx.lineTo(x + bitWidth , level);
      ctx.lineTo(x + bitWidth, zeroLevel);

      // Toggle the level for the next '1'
      isPositive = !isPositive;
    } else if (input[i] === "0") {
      // Remain at zero level for the entire bit duration
      ctx.moveTo(x, zeroLevel);
      ctx.lineTo(x + bitWidth, zeroLevel);
    }
  }

  // Style the line and stroke it
  ctx.strokeStyle = "#007bff"; // Blue color for the waveform
  ctx.lineWidth = 2;
  ctx.stroke();
}

function bipolarPSUDOTERNARY(ctx, input, bitWidth, zeroLevel, posLevel, negLevel,width,height) {
  drawGrid(ctx, width, height, bitWidth, [zeroLevel, posLevel, negLevel]);
  ctx.beginPath();

  let isPositive = true; // Start with a positive level for the first '1'

  // Loop through each bit in the input sequence
  for (let i = 0; i < input.length; i++) {
    if (input[i] !== "1" && input[i] !== "0") {
      alert("Invalid bit detected: " + input[i]);
      return;
    }

    const x = i * bitWidth; // Start position for the bit
    const level = isPositive ? posLevel : negLevel;
    if (input[i] === "1") {
      // Alternate between positive and negative levels
      

      // Draw the signal
      ctx.moveTo(x, zeroLevel);
      ctx.lineTo(x + bitWidth, zeroLevel);

    } else if (input[i] === "0") {

      // ctx.moveTo(x, zeroLevel);
      ctx.lineTo(x, level);
      ctx.lineTo(x + bitWidth , level);
      ctx.lineTo(x + bitWidth, zeroLevel);
      isPositive = !isPositive;
    }
  }

  // Style the line and stroke it
  ctx.strokeStyle = "#007bff"; // Blue color for the waveform
  ctx.lineWidth = 2;
  ctx.stroke();
}

// Manchester waveform
function drawManchester(ctx, input, bitWidth, zeroLevel, posLevel, negLevel,width,height) {
  drawGrid(ctx, width, height, bitWidth, [zeroLevel, posLevel, negLevel]);
  ctx.beginPath();

  for (let i = 0; i < input.length; i++) {
    if (input[i] !== "1" && input[i] !== "0") {
      alert("Invalid bit detected: " + input[i]);
      return;
    }

    const x = i * bitWidth;

    if (input[i] === "1") {
      ctx.lineTo(x, negLevel);
      ctx.lineTo(x + bitWidth / 2, negLevel);
      ctx.lineTo(x + bitWidth / 2, posLevel);
      ctx.lineTo(x + bitWidth, posLevel);
    } else {
      ctx.lineTo(x, posLevel);
      ctx.lineTo(x + bitWidth / 2, posLevel);
      ctx.lineTo(x + bitWidth / 2, negLevel);
      ctx.lineTo(x + bitWidth, negLevel);
    }
  }

  ctx.strokeStyle = "#007bff";
  ctx.lineWidth = 2;
  ctx.stroke();
}

// Differential Manchester waveform
function drawDifferentialManchester(
  ctx,
  input,
  bitWidth,
  zeroLevel,
  posLevel,
  negLevel,width,height
) {
  drawGrid(ctx, width, height, bitWidth, [zeroLevel, posLevel, negLevel]);
  ctx.beginPath();

  // Start with an arbitrary initial level (e.g., positive)
  let previousLevel = posLevel;

  // Loop through each bit in the input sequence
  for (let i = 0; i < input.length; i++) {
    const x = i * bitWidth;

    // Determine if there's a transition at the start of the bit
    if (input[i] === "0") {
      // Transition at the start of the bit for binary '1'
      const currentLevel = previousLevel === posLevel ? negLevel : posLevel;
      ctx.lineTo(x, currentLevel);
      previousLevel = currentLevel;
    } else if (input[i] === "1") {
      // No transition at the start of the bit for binary '0'
      ctx.moveTo(x, previousLevel);
    } else {
      alert("Invalid bit detected: " + input[i]);
      return;
    }

    // Always transition at the middle of the bit
    const midX = x + bitWidth / 2;
    const midLevel = previousLevel === posLevel ? negLevel : posLevel;
    ctx.lineTo(midX, previousLevel);
    ctx.lineTo(midX, midLevel);
    previousLevel = midLevel;

    // Extend the signal to the end of the bit period
    const endX = x + bitWidth;
    ctx.lineTo(endX, midLevel);
  }

  // Style the line and stroke it
  ctx.strokeStyle = "#007bff"; // Blue color for the waveform
  ctx.lineWidth = 2;
  ctx.stroke();
}


// // 8B6T (8 Binary 6 Ternary) waveform
// function draw8B6T(ctx, input, bitWidth, zeroLevel, posLevel, negLevel,width,height) {
//   // drawGrid(ctx, width, height, bitWidth, [zeroLevel, posLevel, negLevel]);
//   ctx.beginPath();

//   // 8B6T encoding table (example mappings)
//   const levels = [-1, 0, 1];

//   for (let i = 0; i < input.length; i += 8) {
//     const x = (i / 8) * bitWidth;
//     const bits = input.substr(i, 8);

//     // For illustration, alternating levels for each bit
//     for (let j = 0; j < 6; j++) {
//       const y = j % 3 === 0 ? posLevel : j % 3 === 1 ? zeroLevel : negLevel;

//       ctx.lineTo(x + (j * bitWidth) / 6, y);
//     }
//   }
//   ctx.strokeStyle = "#fd7e14"; // Choose a unique color
//   ctx.lineWidth = 2;
//   ctx.stroke();
// }
