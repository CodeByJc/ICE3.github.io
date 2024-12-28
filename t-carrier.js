const carrierHierarchy = {
  ds0: {
    name: "DS0 (Digital Signal Level 0)",
    baseRate: 64000,
    channelsInNextTier: 24,
    explanation:
      "The fundamental 64 Kbps communication channel - the building block of digital networks.",
  },
  t1: {
    name: "T1 Carrier",
    baseRate: 1_544_000,
    channelsInNextTier: 28,
    explanation:
      "Combines 24 DS0 channels into a high-speed 1.544 Mbps communication line.",
  },
  t3: {
    name: "T3 Carrier",
    baseRate: 44_736_000,
    channelsInNextTier: 6,
    explanation:
      "Aggregates 28 T1 lines, creating a massive 672-channel link with 44.736 Mbps bandwidth.",
  },
  t4: {
    name: "T4 Carrier",
    baseRate: 274_176_000,
    channelsInNextTier: 0,
    explanation:
      "The pinnacle of T-carrier hierarchy, combining 6 T3 lines with 4,032 total channels.",
  },
};

document.getElementById("calculate-btn").addEventListener("click", () => {
  const carrierType = document.getElementById("carrier-type").value;
  const inputValue = parseFloat(
    document.getElementById("bandwidth-input").value
  );
  const tierBreakdownsContainer = document.getElementById("tier-breakdowns");
  const explanationElement = document.getElementById("carrier-explanation");

  // Clear previous results
  tierBreakdownsContainer.innerHTML = "";

  // Validate input
  if (isNaN(inputValue) || inputValue <= 0) {
    alert("Please enter a valid positive number.");
    return;
  }

  const currentCarrier = carrierHierarchy[carrierType];
  explanationElement.textContent = currentCarrier.explanation;

  // Calculate breakdown
  let remainingValue = inputValue;
  let currentTier = carrierType;
  let delay = 0;

  while (currentTier) {
    const tierInfo = carrierHierarchy[currentTier];

    // Create tier breakdown element
    const breakdownElement = document.createElement("div");
    breakdownElement.classList.add("tier-breakdown");
    breakdownElement.innerHTML = `
                  <div class="tier-icon">${tierInfo.name.charAt(0)}</div>
                  <div>
                      <strong>${tierInfo.name}</strong>
                      <p>Bandwidth: ${(remainingValue / 1_000_000).toFixed(
                        2
                      )} Mbps</p>
                      ${
                        tierInfo.channelsInNextTier > 0
                          ? `<p>Channels in Next Tier: ${tierInfo.channelsInNextTier}</p>`
                          : "<p>Highest Tier Reached</p>"
                      }
                  </div>
              `;

    // Animate each breakdown
    setTimeout(() => {
      breakdownElement.style.opacity = "1";
      breakdownElement.style.transform = "translateX(0)";
    }, delay);

    tierBreakdownsContainer.appendChild(breakdownElement);

    // Prepare for next tier
    if (tierInfo.channelsInNextTier > 0) {
      remainingValue *= tierInfo.channelsInNextTier;

      // Move to next tier based on current tier
      switch (currentTier) {
        case "ds0":
          currentTier = "t1";
          break;
        case "t1":
          currentTier = "t3";
          break;
        case "t3":
          currentTier = "t4";
          break;
        default:
          currentTier = null;
      }
    } else {
      currentTier = null;
    }

    // Increase delay for staggered animation
    delay += 200;
  }
});
