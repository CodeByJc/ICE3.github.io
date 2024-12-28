// function calculateBitRate() {
//     const bandwidth = parseFloat(document.getElementById("bandwidth").value);
//     const level = parseFloat(document.getElementById("level").value);

//     if (bandwidth > 0 && level > 0) {
//       const bitRate = 2 * bandwidth * Math.log2(level); // Formula: 2 x bandwidth x 10^2 x L
//       document.getElementById(
//         "bit-rate-result"
//       ).innerText = `Bit Rate: ${bitRate.toFixed(2)} bps`;
//     } else {
//       document.getElementById("bit-rate-result").innerText =
//         "Please enter valid values for bandwidth and length.";
//     }
//   }

//   function calculateBitLength() {
//     const speed = parseFloat(document.getElementById("speed").value);
//     const duration = parseFloat(document.getElementById("duration").value);
//     if (speed > 0 && duration > 0) {
//       const bitLength = speed * duration;
//       document.getElementById(
//         "bit-length-result"
//       ).innerText = `Bit Length: ${bitLength.toFixed(2)} meters`;
//     } else {
//       document.getElementById("bit-length-result").innerText =
//         "Please enter valid values for speed and duration.";
//     }
//   }

//   function calculateBandwidth() {
//     const bitRate = parseFloat(document.getElementById("bit-rate").value);
//     if (bitRate > 0) {
//       const bw1 = bitRate / 2;
//       const bw3 = (3 * bitRate) / 2;
//       const bw5 = (5 * bitRate) / 2;
//       document.getElementById(
//         "harmonic-result"
//       ).innerText = `1st Harmonic Bandwidth: ${bw1.toFixed(
//         2
//       )} Hz\n3rd Harmonic Bandwidth: ${bw3.toFixed(
//         2
//       )} Hz\n5th Harmonic Bandwidth: ${bw5.toFixed(2)} Hz`;
//     } else {
//       document.getElementById("harmonic-result").innerText =
//         "Please enter a valid bit rate.";
//     }
//   }

//   function calculateBitsPerLevel() {
//     const levels = parseFloat(document.getElementById("levels").value);
//     if (levels > 1) {
//       const bitsPerLevel = Math.log2(levels);
//       document.getElementById(
//         "bits-level-result"
//       ).innerText = `Bits per Level: ${bitsPerLevel.toFixed(2)}`;
//     } else {
//       document.getElementById("bits-level-result").innerText =
//         "Please enter a valid number of levels greater than 1.";
//     }
//   }

//   function calculateNyquist() {
//     const bandwidth = parseFloat(
//       document.getElementById("nyquist-bandwidth").value
//     );
//     const levels = parseFloat(document.getElementById("nyquist-levels").value);
//     if (bandwidth > 0 && levels > 1) {
//       const bitRate = 2 * bandwidth * Math.log2(levels);
//       document.getElementById(
//         "nyquist-result"
//       ).innerText = `Maximum Bit Rate: ${bitRate.toFixed(2)} bps`;
//     } else {
//       document.getElementById("nyquist-result").innerText =
//         "Please enter valid values for bandwidth and levels.";
//     }
//   }

//   function calculateShannon() {
//     const bandwidth = parseFloat(
//       document.getElementById("shannon-bandwidth").value
//     );
//     const snr = parseFloat(document.getElementById("shannon-snr").value);
//     if (bandwidth > 0 && snr >= 0) {
//       const capacity = bandwidth * Math.log2(1 + snr);
//       document.getElementById(
//         "shannon-result"
//       ).innerText = `Channel Capacity: ${capacity.toFixed(2)} bps`;
//     } else {
//       document.getElementById("shannon-result").innerText =
//         "Please enter valid values for bandwidth and SNR.";
//     }
//   }

//   function convertSNRtoDb() {
//     const snr = parseFloat(document.getElementById("snr-value").value);
//     if (snr >= 0) {
//       const snrDb = 10 * Math.log10(snr);
//       document.getElementById(
//         "snr-db-result"
//       ).innerText = `SNR in dB: ${snrDb.toFixed(2)} dB`;
//     } else {
//       document.getElementById("snr-db-result").innerText =
//         "Please enter a valid SNR.";
//     }
//   }

//   function convertDbToSNR() {
//     const db = parseFloat(document.getElementById("db-value").value);
//     if (db >= 0) {
//       const snr = Math.pow(10, db / 10);
//       document.getElementById("db-snr-result").innerText = `SNR: ${snr.toFixed(
//         2
//       )}`;
//     } else {
//       document.getElementById("db-snr-result").innerText =
//         "Please enter a valid dB value.";
//     }
//   }
//   function calculateSNR() {
//     const signalPower = parseFloat(document.getElementById("signal-power").value);
//     const noisePower = parseFloat(document.getElementById("noise-power").value);
//     if (signalPower > 0 && noisePower > 0) {
//       const snr = signalPower / noisePower;
//       document.getElementById("snr-result").innerText = `SNR: ${snr.toFixed(2)}`;
//     } else {
//       document.getElementById("snr-result").innerText =
//         "Please enter valid values for signal and noise power.";
//     }
//   }

//   function calculateBandwidthDelayProduct() {
//     const bandwidth = parseFloat(
//       document.getElementById("delay-bandwidth").value
//     );
//     const delay = parseFloat(document.getElementById("delay-time").value);
//     if (bandwidth > 0 && delay > 0) {
//       const product = bandwidth * delay;
//       document.getElementById(
//         "delay-product-result"
//       ).innerText = `Bandwidth-Delay Product: ${product.toFixed(2)} bits`;
//     } else {
//       document.getElementById("delay-product-result").innerText =
//         "Please enter valid values for bandwidth and delay.";
//     }
//   }

//   function calculateTotalLatency() {
//     const propagationTime = parseFloat(
//       document.getElementById("propagation-time").value
//     );
//     const transmissionTime = parseFloat(
//       document.getElementById("transmission-time").value
//     );
//     const queuingTime = parseFloat(document.getElementById("queuing-time").value);
//     const processingDelay = parseFloat(
//       document.getElementById("processing-delay").value
//     );
//     if (
//       propagationTime >= 0 &&
//       transmissionTime >= 0 &&
//       queuingTime >= 0 &&
//       processingDelay >= 0
//     ) {
//       const latency =
//         propagationTime + transmissionTime + queuingTime + processingDelay;
//       document.getElementById(
//         "latency-result"
//       ).innerText = `Total Latency: ${latency.toFixed(2)} seconds`;
//     } else {
//       document.getElementById("latency-result").innerText =
//         "Please enter valid values for all delay components.";
//     }
//   }

// second code
// function calculateFrequency() {
//   const period = parseFloat(document.getElementById('period').value);
//   if (!isNaN(period) && period > 0) {
//     const frequency = (1 / period).toFixed(2);
//     document.getElementById('frequency-result').textContent = `Frequency = ${frequency} Hz`;
//   } else {
//     document.getElementById('frequency-result').textContent = 'Please enter a valid period.';
//   }
// }

// function calculateNyquistRate() {
//   const bandwidth = parseFloat(document.getElementById('nyquist-bandwidth').value);
//   const levels = parseFloat(document.getElementById('nyquist-levels').value);
//   if (!isNaN(bandwidth) && !isNaN(levels) && levels > 1) {
//     const rate = (2 * bandwidth * Math.log2(levels)).toFixed(2);
//     document.getElementById('nyquist-result').textContent = `Nyquist Rate = ${rate} bps`;
//   } else {
//     document.getElementById('nyquist-result').textContent = 'Please enter valid values.';
//   }
// }

// function calculateShannonCapacity() {
//   const bandwidth = parseFloat(document.getElementById('shannon-bandwidth').value);
//   const snr = parseFloat(document.getElementById('shannon-snr').value);
//   if (!isNaN(bandwidth) && !isNaN(snr) && snr >= 0) {
//     const capacity = (bandwidth * Math.log2(1 + snr)).toFixed(2);
//     document.getElementById('shannon-result').textContent = `Shannon Capacity = ${capacity} bps`;
//   } else {
//     document.getElementById('shannon-result').textContent = 'Please enter valid values.';
//   }
// }

// Third Code
function calculateFrequency() {
  const period = parseFloat(document.getElementById("period").value);

  if (isNaN(period) || period <= 0) {
    document.getElementById("frequency-result").innerText =
      "Invalid Input: Period must be a positive number.";
    return;
  }

  const result = (1 / period).toFixed(2);
  document.getElementById(
    "frequency-result"
  ).innerText = `Frequency: ${result} Hz`;
}

function calculateNyquistRate() {
  const bandwidth = parseFloat(
    document.getElementById("nyquist-bandwidth").value
  );
  const levels = parseFloat(document.getElementById("nyquist-levels").value);

  if (isNaN(bandwidth) || bandwidth <= 0) {
    document.getElementById("nyquist-result").innerText =
      "Invalid Input: Bandwidth must be a positive number.";
    return;
  }

  if (isNaN(levels) || levels <= 1) {
    document.getElementById("nyquist-result").innerText =
      "Invalid Input: Levels must be greater than 1.";
    return;
  }

  const result = (2 * bandwidth * Math.log2(levels)).toFixed(2);
  document.getElementById(
    "nyquist-result"
  ).innerText = `Nyquist Rate: ${result} bps`;
}

function calculateShannonCapacity() {
  const bandwidth = parseFloat(
    document.getElementById("shannon-bandwidth").value
  );
  const snr = parseFloat(document.getElementById("shannon-snr").value);

  if (isNaN(bandwidth) || bandwidth <= 0) {
    document.getElementById("shannon-result").innerText =
      "Invalid Input: Bandwidth must be a positive number.";
    return;
  }

  if (isNaN(snr) || snr < 0) {
    document.getElementById("shannon-result").innerText =
      "Invalid Input: SNR must be zero or greater.";
    return;
  }

  const result = (bandwidth * Math.log2(1 + snr)).toFixed(2);
  document.getElementById(
    "shannon-result"
  ).innerText = `Capacity: ${result} bps`;
}

function calculateBandwidthDelay() {
  const bandwidth = parseFloat(document.getElementById("bandwidth").value);
  const delay = parseFloat(document.getElementById("delay").value);

  if (isNaN(bandwidth) || bandwidth <= 0) {
    document.getElementById("bandwidth-delay-result").innerText =
      "Invalid Input: Bandwidth must be a positive number.";
    return;
  }

  if (isNaN(delay) || delay < 0) {
    document.getElementById("bandwidth-delay-result").innerText =
      "Invalid Input: Delay must be zero or greater.";
    return;
  }

  const result = (bandwidth * delay).toFixed(2);
  document.getElementById(
    "bandwidth-delay-result"
  ).innerText = `Product: ${result} bits`;
}

function calculateSNR() {
  const signal = parseFloat(document.getElementById("signal-power").value);
  const noise = parseFloat(document.getElementById("noise-power").value);

  if (isNaN(signal) || signal <= 0) {
    document.getElementById("snr-result").innerText =
      "Invalid Input: Signal power must be a positive number.";
    return;
  }

  if (isNaN(noise) || noise <= 0) {
    document.getElementById("snr-result").innerText =
      "Invalid Input: Noise power must be a positive number.";
    return;
  }

  const result = (10 * Math.log10(signal / noise)).toFixed(2);
  document.getElementById("snr-result").innerText = `SNR: ${result} dB`;
}
