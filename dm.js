// Function to animate waveform generation
function generateModulation(type) {
  let input, canvas;

  if (type === "ask") {
    input = document.getElementById("ask-input").value.trim();
    if (!isValidBinarySequence(input)) return;
    canvas = document.getElementById("ask-canvas");
    generateASK(input, canvas);
  } else if (type === "fsk") {
    input = document.getElementById("fsk-input").value.trim();
    if (!isValidBinarySequence(input)) return;
    canvas = document.getElementById("fsk-canvas");
    generateFSK(input, canvas);
  } else if (type === "psk") {
    input = document.getElementById("psk-input").value.trim();
    if (!isValidBinarySequence(input)) return;
    canvas = document.getElementById("psk-canvas");
    generatePSK(input, canvas);
  } else if (type === "qam") {
    input = document.getElementById("qam-input").value.trim();
    if (!isValidBinarySequence(input)) return;
    canvas = document.getElementById("qam-canvas");
    generateQAM(input, canvas);
  }
}

function isValidBinarySequence(sequence) {
  if (!/^[01]+$/.test(sequence)) {
    alert("Invalid input. Enter a binary sequence containing only 0s and 1s.");
    return false;
  }
  return true;
}

function generateASK(binarySequence, canvas) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const amplitude = 50;
  const frequency = 0.05;
  const segmentWidth = canvas.width / binarySequence.length;

  let x = 0,
    i = 0;

  function animate() {
    if (i >= binarySequence.length) return;
    const bit = binarySequence[i];

    ctx.beginPath();
    ctx.strokeStyle = "#FF5733"; // Color for ASK waveform
    if (bit === "1") {
      for (let j = 0; j < segmentWidth; j++) {
        const y =
          canvas.height / 2 +
          amplitude * Math.sin(2 * Math.PI * frequency * (x + j));
        ctx.lineTo(x + j, y);
      }
    } else {
      ctx.moveTo(x, canvas.height / 2);
      ctx.lineTo(x + segmentWidth, canvas.height / 2);
    }
    ctx.stroke();
    x += segmentWidth;
    i++;
    setTimeout(() => requestAnimationFrame(animate), 200);
  }

  animate();
}

function generateFSK(binarySequence, canvas) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const freqHigh = 8;
  const freqLow = 4;
  const unitWidth = canvas.width / binarySequence.length;

  let i = 0,
    x = 0;

  function animate() {
    if (i >= binarySequence.length) return;
    const bit = binarySequence[i];
    const frequency = bit === "1" ? freqHigh : freqLow;

    ctx.beginPath();
    ctx.strokeStyle = "#33FF57"; // Color for FSK waveform
    for (let localX = 0; localX < unitWidth; localX++) {
      const y =
        Math.sin((localX / unitWidth) * frequency * Math.PI) *
        (canvas.height / 4);
      ctx.lineTo(x + localX, canvas.height / 2 - y);
    }
    ctx.stroke();
    x += unitWidth;
    i++;
    setTimeout(() => requestAnimationFrame(animate), 200);
  }

  animate();
}

function generatePSK(binarySequence, canvas) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const unitWidth = canvas.width / binarySequence.length;

  let i = 0,
    x = 0;

  function animate() {
    if (i >= binarySequence.length) return;
    const bit = binarySequence[i];
    const phaseShift = bit === "1" ? Math.PI : 0;

    ctx.beginPath();
    ctx.strokeStyle = "#5733FF"; // Color for PSK waveform
    for (let localX = 0; localX < unitWidth; localX++) {
      const y =
        Math.sin((localX / unitWidth) * 2 * Math.PI + phaseShift) *
        (canvas.height / 4);
      ctx.lineTo(x + localX, canvas.height / 2 - y);
    }
    ctx.stroke();
    x += unitWidth;
    i++;
    setTimeout(() => requestAnimationFrame(animate), 200);
  }

  animate();
}

function generateQAM(binarySequence, canvas) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const unitWidth = canvas.width / binarySequence.length;

  let i = 0,
    x = 0;

  function animate() {
    if (i >= binarySequence.length) return;
    const bit = binarySequence[i];
    const amplitude = bit === "1" ? 50 : 25;
    const frequency = bit === "1" ? 8 : 4;

    ctx.beginPath();
    ctx.strokeStyle = "#FFC300"; // Color for QAM waveform
    for (let localX = 0; localX < unitWidth; localX++) {
      const y =
        amplitude * Math.sin((localX / unitWidth) * frequency * Math.PI);
      ctx.lineTo(x + localX, canvas.height / 2 - y);
    }
    ctx.stroke();
    x += unitWidth;
    i++;
    setTimeout(() => requestAnimationFrame(animate), 200);
  }

  animate();
}
